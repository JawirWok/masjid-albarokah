-- Jalankan SEKALI di Supabase: SQL Editor > New query > paste > Run. Aman dijalankan ulang.
--
-- Alur donasi baru: pengunjung membayar, lalu menekan "Saya sudah bayar".
-- Donasi selalu tercatat berstatus "pending"; pengurus mengecek lalu mengisi nominal & menekan Verifikasi di admin.

create or replace function submit_donation(p jsonb) returns jsonb
language plpgsql security definer set search_path = public as $$
declare
  v_id     text := p->>'id';
  v_prog   text := p->>'program';
  v_name   text := btrim(coalesce(p->>'name', ''));
  v_anon   boolean := coalesce((p->>'anon')::boolean, false);
  v_ip     text;
  v_hdr    json := nullif(current_setting('request.headers', true), '')::json;
  v_row    jsonb;
begin
  if v_id is null or v_id !~ '^donasi-[a-z0-9-]{3,60}$' then raise exception 'id donasi tidak valid'; end if;
  if v_anon then v_name := 'Hamba Allah'; end if;
  if char_length(v_name) not between 3 and 80 then raise exception 'nama tidak valid'; end if;
  if coalesce(p->>'method', '') not in ('Transfer bank', 'QRIS', 'E-wallet') then raise exception 'metode tidak valid'; end if;
  if coalesce(jsonb_typeof(p->'anon'), 'boolean') <> 'boolean' then raise exception 'data tidak valid'; end if;
  if not donation_program_ok(v_prog) then raise exception 'program tidak tersedia'; end if;

  -- batas spam: maks 200 konfirmasi/jam untuk seluruh situs dan 20/jam per alamat IP
  v_ip := nullif(btrim(coalesce(v_hdr->>'cf-connecting-ip', split_part(coalesce(v_hdr->>'x-forwarded-for', ''), ',', 1))), '');
  if (select count(*) from donors where created_at > now() - interval '1 hour') >= 200 then
    raise exception 'terlalu banyak donasi, coba lagi nanti';
  end if;
  if v_ip is not null and (select count(*) from donors where ip = v_ip and created_at > now() - interval '1 hour') >= 20 then
    raise exception 'terlalu banyak donasi dari perangkat ini, coba lagi nanti';
  end if;

  -- nominal diisi pengurus saat verifikasi (0 = belum diisi); status selalu pending
  v_row := jsonb_build_object(
    'id', v_id, 'name', v_name, 'program', v_prog, 'amount', 0, 'method', p->>'method',
    'date', to_char(now() at time zone 'Asia/Jakarta', 'YYYY-MM-DD'),
    'status', 'pending', 'anon', v_anon);
  insert into donors (id, data, ip) values (v_id, v_row, v_ip);
  return v_row;
end $$;
grant execute on function submit_donation(jsonb) to anon, authenticated;

-- Hapus sisa pengaturan lama dari Pembayaran
update settings set data = data - 'auto' where key = 'bayar';

-- Hapus 6 donatur contoh. Ini TIDAK mengubah angka "Terkumpul" maupun "jumlah donatur" program.
delete from donors where id in ('donasi-1', 'donasi-2', 'donasi-3', 'donasi-4', 'donasi-5', 'donasi-6');
