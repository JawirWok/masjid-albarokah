-- Jalankan SEKALI di SQL Editor (setelah schema, donasi-publik, media, hardening).
-- Donasi dari situs sekarang lewat fungsi submit_donation(): data tercatat di Supabase dan,
-- bila MODE DEMO aktif, langsung terverifikasi + total program naik otomatis.

alter table donors add column if not exists created_at timestamptz not null default now();
alter table donors add column if not exists ip text;

create or replace function submit_donation(p jsonb) returns jsonb
language plpgsql security definer set search_path = public as $$
declare
  v_id     text := p->>'id';
  v_prog   text := p->>'program';
  v_name   text := btrim(coalesce(p->>'name', ''));
  v_amount numeric;
  v_auto   boolean;
  v_status text;
  v_ip     text;
  v_hdr    json := nullif(current_setting('request.headers', true), '')::json;
  v_row    jsonb;
begin
  -- validasi (sama ketatnya dengan hardening.sql)
  if v_id is null or v_id !~ '^donasi-[a-z0-9-]{3,60}$' then raise exception 'id donasi tidak valid'; end if;
  if jsonb_typeof(p->'amount') is distinct from 'number' then raise exception 'nominal tidak valid'; end if;
  v_amount := (p->>'amount')::numeric;
  if v_amount not between 10000 and 100000000 then raise exception 'nominal di luar batas'; end if;
  if char_length(v_name) not between 3 and 80 then raise exception 'nama tidak valid'; end if;
  if coalesce(p->>'method', '') not in ('BSI', 'QRIS', 'E-wallet', 'Tunai', 'Lainnya') then raise exception 'metode tidak valid'; end if;
  if coalesce(jsonb_typeof(p->'anon'), 'boolean') <> 'boolean' then raise exception 'data tidak valid'; end if;
  if not donation_program_ok(v_prog) then raise exception 'program tidak tersedia'; end if;

  -- rate limit: maks 200 donasi/jam untuk seluruh situs dan 20/jam per alamat IP
  v_ip := nullif(btrim(coalesce(v_hdr->>'cf-connecting-ip', split_part(coalesce(v_hdr->>'x-forwarded-for', ''), ',', 1))), '');
  if (select count(*) from donors where created_at > now() - interval '1 hour') >= 200 then
    raise exception 'terlalu banyak donasi, coba lagi nanti';
  end if;
  if v_ip is not null and (select count(*) from donors where ip = v_ip and created_at > now() - interval '1 hour') >= 20 then
    raise exception 'terlalu banyak donasi dari perangkat ini, coba lagi nanti';
  end if;

  -- MODE DEMO: bila settings "bayar" berisi auto=true, donasi langsung terverifikasi
  select coalesce((data->>'auto')::boolean, false) into v_auto from settings where key = 'bayar';
  v_status := case when coalesce(v_auto, false) then 'verified' else 'pending' end;

  v_row := jsonb_build_object(
    'id', v_id, 'name', v_name, 'program', v_prog, 'amount', v_amount, 'method', p->>'method',
    'date', to_char(now() at time zone 'Asia/Jakarta', 'YYYY-MM-DD'),
    'status', v_status, 'anon', coalesce((p->>'anon')::boolean, false));
  insert into donors (id, data, ip) values (v_id, v_row, v_ip);

  if v_status = 'verified' then
    update programs set data = jsonb_set(jsonb_set(data, '{collected}', to_jsonb(coalesce((data->>'collected')::numeric, 0) + v_amount)),
                                         '{donors}', to_jsonb(coalesce((data->>'donors')::int, 0) + 1))
     where id = v_prog;
  end if;
  return v_row;
end $$;
grant execute on function submit_donation(jsonb) to anon, authenticated;

-- Pengunjung tidak lagi boleh menulis langsung ke tabel donors; semua lewat fungsi di atas.
drop policy if exists "public donate" on donors;

-- Nyalakan MODE DEMO. Untuk produksi: matikan lewat Admin > Donasi > Pembayaran, atau jalankan:
--   update settings set data = data || '{"auto": false}' where key = 'bayar';
insert into settings (key, data) values ('bayar', '{"auto": true}')
on conflict (key) do update set data = settings.data || '{"auto": true}'::jsonb;
