# Website Masjid Jami' Al-Barokah (Vue 3 + Supabase)

Stack: Vue 3, Vite, Tailwind CSS 4, Headless UI, Heroicons, Chart.js, Leaflet, Supabase.

## 1. Siapkan Supabase
1. Buat project di https://supabase.com.
2. SQL Editor: jalankan `supabase/schema.sql`, `supabase/seed.sql` (data awal), lalu `supabase/donasi-publik.sql` (donasi dari pengunjung + realtime) `supabase/media.sql` (penyimpanan gambar), `supabase/hardening.sql` (aturan lebih ketat + batas ukuran gambar), lalu `supabase/donasi-otomatis.sql` (donasi lewat fungsi database + MODE DEMO).
3. Authentication > Users > **Add user**: isi email + password admin (centang Auto Confirm).
4. Authentication > Sign In / Providers > **matikan "Allow new users to sign up"** (agar hanya Anda yang bisa jadi admin).
5. Project Settings > API: salin **Project URL** dan **anon public key**.

## 2. Jalankan lokal
    cp .env.example .env     # isi URL dan anon key
    npm install
    npm run dev              # situs http://localhost:5173  |  admin http://localhost:5173/#admin

## 3. Deploy ke Vercel
Push ke GitHub, import di Vercel (framework: Vite). Di Settings > Environment Variables isi
`VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY`, lalu deploy.

## Keamanan
- Anon key memang publik; yang melindungi data adalah RLS di `schema.sql`: pengunjung hanya bisa
  membaca data publik, sedangkan ubah/hapus hanya untuk admin yang login.
- Tabel `donors` tidak dibuka ke publik; situs membaca view `public_donors` (hanya donasi
  terverifikasi, nama anonim disamarkan).
- Jangan pernah memakai `service_role` key di kode front end.

## Alur donasi
Pengunjung transfer/QRIS, mengisi form di situs, donasi tercatat berstatus *menunggu verifikasi* di Supabase.
Pengurus membuka Admin > Donasi > Donatur dan menekan **Verifikasi** setelah mencocokkan mutasi rekening;
saat itu total program bertambah dan angka di situs ikut berubah otomatis (realtime).
Batas spam: maksimal 300 donasi pending sekaligus (lihat `donasi-publik.sql`).

## Mode demo vs produksi
`donasi-otomatis.sql` menyalakan MODE DEMO: donasi langsung terverifikasi dan total program naik otomatis.
Sebelum dipakai sungguhan, matikan di Admin > Donasi > Pembayaran (hapus centang mode demo). Setelah itu donasi
berstatus *menunggu verifikasi* sampai pengurus menekan Verifikasi. Ada batas 200 donasi/jam (seluruh situs)
dan 20 donasi/jam per alamat IP.
