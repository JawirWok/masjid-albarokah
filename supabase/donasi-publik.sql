-- Jalankan SEKALI di SQL Editor (setelah schema.sql). Aman dijalankan ulang untuk bagian fungsi.

-- 1) Jumlah donasi yang masih menunggu verifikasi (untuk membatasi spam)
create or replace function pending_donor_count() returns int
language sql security definer set search_path = public as
$$ select count(*)::int from donors where data->>'status' = 'pending' $$;
grant execute on function pending_donor_count() to anon;

-- 2) Pengunjung (anon) boleh MENAMBAH donasi, hanya berstatus "pending" dan hanya bila datanya wajar.
--    Mereka tetap tidak bisa membaca, mengubah, atau menghapus isi tabel donors.
drop policy if exists "public donate" on donors;
create policy "public donate" on donors for insert to anon
with check (
  id like 'donasi-%'
  and data->>'status' = 'pending'
  and (data->>'amount')::numeric between 10000 and 100000000
  and char_length(coalesce(data->>'name', '')) between 3 and 80
  and pending_donor_count() < 300
);

-- 3) Realtime: angka program di situs berubah tanpa refresh; admin melihat donasi baru langsung
do $$ begin
  begin alter publication supabase_realtime add table programs; exception when duplicate_object then null; end;
  begin alter publication supabase_realtime add table donors;   exception when duplicate_object then null; end;
end $$;
