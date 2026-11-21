-- Jalankan SEKALI di SQL Editor (setelah donasi-publik.sql dan media.sql).
-- Memperketat apa yang boleh dikirim pengunjung lewat API, di sisi database.

-- 1) Hanya program yang masih aktif yang boleh menerima donasi.
create or replace function donation_program_ok(pid text) returns boolean
language sql stable security definer set search_path = public as
$$ select exists (select 1 from programs where id = pid and data->>'status' is distinct from 'selesai') $$;
grant execute on function donation_program_ok(text) to anon;

-- 2) Aturan donasi dari pengunjung diganti dengan versi yang lebih ketat.
drop policy if exists "public donate" on donors;
create policy "public donate" on donors for insert to anon
with check (
  id ~ '^donasi-[a-z0-9-]{3,60}$'
  and data->>'id' = id
  -- hanya kolom yang dikenal, tidak ada data tambahan/sampah
  and (data - array['id','name','program','amount','method','date','status','anon']) = '{}'::jsonb
  and data->>'status' = 'pending'
  and jsonb_typeof(data->'amount') = 'number'
  and (data->>'amount')::numeric between 10000 and 100000000
  and char_length(coalesce(data->>'name', '')) between 3 and 80
  and donation_program_ok(data->>'program')
  and data->>'method' in ('BSI', 'QRIS', 'E-wallet', 'Tunai', 'Lainnya')
  and coalesce(jsonb_typeof(data->'anon'), 'boolean') = 'boolean'
  -- tanggal harus hari ini (toleransi zona waktu), bukan tanggal acak
  and (data->>'date')::date between current_date - 2 and current_date + 1
  and pending_donor_count() < 300
);

-- 3) Bucket gambar: maksimal 3 MB per file, hanya JPEG/PNG/WebP.
update storage.buckets
   set file_size_limit = 3145728,
       allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp']
 where id = 'media';
