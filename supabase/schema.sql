-- Jalankan di Supabase: SQL Editor > New query > paste > Run
-- Satu tabel per modul; isi data disimpan sebagai JSON (kolom data), sama seperti struktur di aplikasi.

create table if not exists programs   (pos bigint generated always as identity, id text primary key, data jsonb not null);
create table if not exists events     (pos bigint generated always as identity, id text primary key, data jsonb not null);
create table if not exists activities (pos bigint generated always as identity, id text primary key, data jsonb not null);
create table if not exists articles   (pos bigint generated always as identity, id text primary key, data jsonb not null);
create table if not exists donors     (pos bigint generated always as identity, id text primary key, data jsonb not null);
create table if not exists settings   (key text primary key, data jsonb not null);

alter table programs   enable row level security;
alter table events     enable row level security;
alter table activities enable row level security;
alter table articles   enable row level security;
alter table donors     enable row level security;
alter table settings   enable row level security;

-- Admin (user yang sudah login) boleh semuanya
create policy "admin all" on programs   for all to authenticated using (true) with check (true);
create policy "admin all" on events     for all to authenticated using (true) with check (true);
create policy "admin all" on activities for all to authenticated using (true) with check (true);
create policy "admin all" on articles   for all to authenticated using (true) with check (true);
create policy "admin all" on donors     for all to authenticated using (true) with check (true);
create policy "admin all" on settings   for all to authenticated using (true) with check (true);

-- Pengunjung (anon) hanya boleh MEMBACA data yang memang tampil di situs publik
create policy "public read" on programs   for select to anon using (data->>'status' is distinct from 'selesai');
create policy "public read" on events     for select to anon using (true);
create policy "public read" on activities for select to anon using (true);
create policy "public read" on articles   for select to anon using (data->>'status' is distinct from 'draft');
create policy "public read" on settings   for select to anon using (key in ('profil','sholat','bayar','kontak'));

-- Donatur: tabel asli TIDAK dibuka ke publik. Situs publik membaca lewat view ini
-- (hanya donasi terverifikasi, nama anonim disamarkan menjadi "Hamba Allah").
create or replace view public_donors as
  select id, pos,
         case when coalesce((data->>'anon')::boolean, false)
              then jsonb_set(data, '{name}', '"Hamba Allah"') else data end as data
  from donors
  where data->>'status' is distinct from 'pending';
grant select on public_donors to anon, authenticated;
