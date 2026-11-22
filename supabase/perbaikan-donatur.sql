-- Jalankan SEKALI di Supabase: SQL Editor > New query > paste > Run. Aman dijalankan ulang.
-- Memperbaiki "10 donatur terakhir" yang kosong di situs publik.
-- Tabel donors tetap tertutup untuk pengunjung; nama donatur anonim tetap disamarkan jadi "Hamba Allah".

-- 1) Perkuat view lama (dipakai sebagai cadangan)
create or replace view public_donors with (security_invoker = false) as
  select id, pos,
         case when coalesce((data->>'anon')::boolean, false)
              then jsonb_set(data, '{name}', '"Hamba Allah"') else data end as data
  from donors
  where data->>'status' is distinct from 'pending';
grant select on public_donors to anon, authenticated;

-- 2) Fungsi database yang dipakai situs: hanya donasi terverifikasi, terbaru lebih dulu
create or replace function public_donor_list() returns setof jsonb
language sql stable security definer set search_path = public as $$
  select case when coalesce((data->>'anon')::boolean, false)
              then jsonb_set(data, '{name}', '"Hamba Allah"') else data end
  from donors
  where data->>'status' is distinct from 'pending'
  order by pos desc
  limit 300
$$;
grant execute on function public_donor_list() to anon, authenticated;

-- 3) Cek hasil: kedua angka di bawah harus sama dan lebih dari 0 bila sudah ada donasi terverifikasi
select
  (select count(*) from donors where data->>'status' is distinct from 'pending') as terverifikasi_di_tabel,
  (select count(*) from public_donor_list()) as terbaca_lewat_fungsi;
