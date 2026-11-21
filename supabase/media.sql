-- Jalankan SEKALI di SQL Editor: tempat penyimpanan gambar (acara, kegiatan, berita, galeri).
-- Bucket bersifat publik (gambar boleh dilihat pengunjung); hanya admin yang boleh unggah/ubah/hapus.
insert into storage.buckets (id, name, public) values ('media', 'media', true) on conflict (id) do nothing;

drop policy if exists "media admin insert" on storage.objects;
drop policy if exists "media admin update" on storage.objects;
drop policy if exists "media admin delete" on storage.objects;
create policy "media admin insert" on storage.objects for insert to authenticated with check (bucket_id = 'media');
create policy "media admin update" on storage.objects for update to authenticated using (bucket_id = 'media');
create policy "media admin delete" on storage.objects for delete to authenticated using (bucket_id = 'media');
