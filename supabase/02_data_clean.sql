--
-- PostgreSQL database dump
--


-- Dumped from database version 17.12
-- Dumped by pg_dump version 19.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: activities; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.activities (pos, id, data) OVERRIDING SYSTEM VALUE VALUES (12, 'tkit', '{"id": "tkit", "wa": "08111020904", "desc": "Taman kanak-kanak Islam terpadu yang memadukan pembelajaran umum dengan pembiasaan nilai Islam sejak usia dini.", "group": "pendidikan", "image": {"alt": "TKIT", "src": "https://fuvgpeuxvcdwoebmcybc.supabase.co/storage/v1/object/public/media/2026/mwuhaw0j-6c8l.jpg", "width": 1195, "height": 1600}, "title": "TKIT", "daftar": true}');
INSERT INTO public.activities (pos, id, data) OVERRIDING SYSTEM VALUE VALUES (14, 'mahasiswa-pemberdaya', '{"id": "mahasiswa-pemberdaya", "desc": "Wadah mahasiswa untuk belajar, berbagi, dan memberdayakan warga sekitar masjid.", "group": "sosial", "image": null, "title": "Mahasiswa Pemberdaya", "detail": "<h2>Kegiatan</h2><ul><li>Mentoring Mahasiswa</li><li>Belajar Baca Al-Qur''an</li><li>Pasar Bahagia</li></ul>"}');
INSERT INTO public.activities (pos, id, data) OVERRIDING SYSTEM VALUE VALUES (16, 'kajian-subuh-bahagia', '{"id": "kajian-subuh-bahagia", "desc": "Kajian ringan setelah sholat Subuh untuk memulai hari dengan ilmu.", "group": "dakwah", "image": null, "title": "Kajian Subuh Bahagia", "schedule": "Setiap Hari - Ba''da Shubuh"}');
INSERT INTO public.activities (pos, id, data) OVERRIDING SYSTEM VALUE VALUES (13, 'yatim-bahagia', '{"id": "yatim-bahagia", "desc": "Pendampingan dan santunan bagi anak yatim dan dhuafa binaan masjid.", "group": "sosial", "image": null, "title": "Yatim Bahagia"}');
INSERT INTO public.activities (pos, id, data) OVERRIDING SYSTEM VALUE VALUES (15, 'jumat-berkah', '{"id": "jumat-berkah", "desc": "Pembagian makan siang gratis setelah sholat Jumat untuk jamaah dan warga yang membutuhkan.", "group": "sosial", "image": null, "title": "Jumat Berkah"}');
INSERT INTO public.activities (pos, id, data) OVERRIDING SYSTEM VALUE VALUES (17, 'dakwah', '{"id": "dakwah", "desc": "Kegiatan dakwah masjid untuk jamaah dan masyarakat luas.", "group": "dakwah", "image": null, "title": "Dakwah", "schedule": ""}');
INSERT INTO public.activities (pos, id, data) OVERRIDING SYSTEM VALUE VALUES (18, 'pengajian', '{"id": "pengajian", "desc": "Pengajian rutin bersama jamaah dengan tema keislaman sehari-hari.", "group": "dakwah", "image": null, "title": "Pengajian", "schedule": ""}');
INSERT INTO public.activities (pos, id, data) OVERRIDING SYSTEM VALUE VALUES (19, 'kajian-kitab', '{"id": "kajian-kitab", "desc": "Membahas kitab-kitab ulama secara bertahap bersama ustaz.", "group": "dakwah", "image": null, "title": "Kajian Kitab", "schedule": ""}');
INSERT INTO public.activities (pos, id, data) OVERRIDING SYSTEM VALUE VALUES (20, 'majelis-taklim', '{"id": "majelis-taklim", "desc": "Majelis ilmu untuk jamaah yang ingin memperdalam pemahaman agama.", "group": "dakwah", "image": null, "title": "Majelis Ta''lim", "schedule": ""}');
INSERT INTO public.activities (pos, id, data) OVERRIDING SYSTEM VALUE VALUES (27, 'mentoring-mahasiswa-mwy8', '{"id": "mentoring-mahasiswa-mwy8", "desc": "Program ini bertujuan untuk meningkatkan pengetahuan dan keterampilan peserta melalui berbagai kegiatan edukatif dan sosial.", "group": "pendidikan", "title": "Mentoring Mahasiswa", "detail": "Program ini bertujuan untuk meningkatkan pengetahuan agama dan keterampilan sosial anggota komunitas. Setiap sesi mencakup kajian, diskusi, dan kegiatan praktis yang mendukung pengembangan karakter serta kepedulian sosial. Kegiatan ini terbuka untuk semua usia dan dirancang agar peserta dapat menerapkan ilmu yang diperoleh dalam kehidupan sehari-hari."}');
INSERT INTO public.activities (pos, id, data) OVERRIDING SYSTEM VALUE VALUES (30, 'pasar-bahagia-r685', '{"id": "pasar-bahagia-r685", "desc": "Deskripsi Pasar Bahagia", "group": "sosial", "title": "Pasar Bahagia"}');
INSERT INTO public.activities (pos, id, data) OVERRIDING SYSTEM VALUE VALUES (29, 'belajar-baca-qur-an-pxep', '{"id": "belajar-baca-qur-an-pxep", "desc": "Program ini bertujuan untuk meningkatkan pengetahuan dan keterampilan peserta melalui kegiatan edukatif dan sosial yang bermanfaat.", "group": "pendidikan", "title": "Belajar Baca Qur''an"}');
INSERT INTO public.activities (pos, id, data) OVERRIDING SYSTEM VALUE VALUES (11, 'tpq', '{"id": "tpq", "wa": "6289637589083", "desc": "Taman Pendidikan Al-Qur''an untuk anak-anak: belajar membaca Al-Qur''an, dasar-dasar ibadah, dan akhlak.", "group": "pendidikan", "image": {"alt": "TPQ", "src": "https://fuvgpeuxvcdwoebmcybc.supabase.co/storage/v1/object/public/media/2026/mwuhak1u-a3j7.jpg", "width": 1600, "height": 1195}, "title": "TPQ", "daftar": true, "detail": "<p>Memasuki masjid berarti memasuki ruang yang Allah muliakan. Di dalamnya ada sujud, dzikir, dan percakapan yang saling menguatkan. Karena itu, adab yang baik bukan sekadar formalitas, melainkan cara kita menghormati tempat dan orang-orang di dalamnya.</p>\n<p>Beberapa kebiasaan sederhana berikut membantu menjaga ketenangan masjid sekaligus membuat jamaah lain merasa nyaman.</p>\n<ul><li>Mengucapkan salam saat masuk dan keluar masjid.</li><li>Menyenyapkan nada dering sebelum masuk ruang sholat.</li><li>Mendahulukan kaki kanan, lalu berdoa dengan tenang.</li><li>Menjaga kebersihan alas sholat dan membuang sampah pada tempatnya.</li><li>Menghindari percakapan keras ketika jamaah lain sedang sholat atau membaca Al-Qur''an.</li></ul>\n<h2>Adab yang tumbuh dari kesadaran</h2>\n<p>Adab juga mencakup cara kita menyikapi perbedaan. Masjid adalah tempat berkumpulnya warga dengan latar belakang yang beragam. Menyapa tamu, memberi ruang bagi jamaah lanjut usia, dan menahan diri dari perdebatan adalah bagian dari akhlak yang diajarkan Rasulullah SAW.</p>\n<blockquote>Masjid yang nyaman lahir dari jamaah yang saling menjaga, bukan hanya dari bangunan yang megah.</blockquote>\n<p>Mari mulai dari hal kecil: datang lebih awal, sholat dengan tenang, dan pulang dengan hati yang lebih lapang.</p>", "schedule": ""}');


--
-- Data for Name: articles; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.articles (pos, id, data) OVERRIDING SYSTEM VALUE VALUES (2, 'sholat-berjamaah', '{"id": "sholat-berjamaah", "body": "<p>Sholat berjamaah bukan hanya ibadah yang lebih utama, tetapi juga latihan sosial yang membentuk karakter. Dalam satu shaf, kita berdiri sejajar tanpa membedakan jabatan, kekayaan, atau asal-usul.</p>\n<h2>Lebih dari sekadar pahala</h2>\n<p>Rasulullah SAW menganjurkan sholat berjamaah karena di dalamnya terdapat kedisiplinan waktu, kepatuhan pada imam, dan kepedulian pada jamaah di sekitar kita. Seseorang yang terbiasa datang tepat waktu akan membawa kebiasaan itu ke tempat kerja dan keluarganya.</p>\n<ul><li>Melatih disiplin terhadap waktu dan komitmen.</li><li>Menumbuhkan rasa setara di hadapan Allah.</li><li>Membuka peluang silaturahmi antarwarga.</li><li>Menjadi sarana saling mengenal dan membantu.</li></ul>\n<p>Bagi masjid, jamaah yang hidup adalah kekuatan utama. Semakin sering kita hadir, semakin besar peluang kebaikan yang bisa kita rawat bersama.</p>\n<blockquote>Sholat berjamaah mengajarkan bahwa kebaikan tidak dilakukan sendirian.</blockquote>", "date": "2026-10-14", "read": 6, "image": null, "title": "Keutamaan Sholat Berjamaah bagi Kehidupan Sosial", "author": "Ust. Abdurrahman", "status": "terbit", "excerpt": "Satu shaf mengajarkan kedisiplinan, kesetaraan, dan kepedulian yang sulit ditemukan di tempat lain.", "category": "Ibadah"}');
INSERT INTO public.articles (pos, id, data) OVERRIDING SYSTEM VALUE VALUES (3, 'jumat-berkah', '{"id": "jumat-berkah", "body": "<p>Seusai sholat Jumat, aroma makanan dari dapur masjid menandakan program Jum''at Berkah dimulai. Porsi makan siang disiapkan oleh relawan, lalu dibagikan kepada jamaah, pekerja jalan, dan warga yang membutuhkan.</p>\n<p>Program ini lahir dari kebiasaan sederhana warga: berbagi kepada siapa pun yang hadir, tanpa bertanya dari mana asalnya. Sebagian jamaah membawa lauk tambahan, sebagian lain membantu memasak dan membagikan.</p>\n<blockquote>Yang dibagikan bukan hanya makanan, tetapi rasa bahwa tidak ada warga yang berjuang sendirian.</blockquote>\n<p>Bagi yang ingin terlibat, kontribusi dapat disalurkan melalui program Donasi Umum atau langsung kepada koordinator kegiatan saat hari Jumat. Relawan selalu terbuka untuk membantu persiapan dan distribusi.</p>", "date": "2026-10-11", "read": 4, "image": {"alt": "Warga berkumpul dan menyiapkan makanan bersama dalam kegiatan sosial.", "src": "assets/stock/jumat-berkah.jpg", "width": 1400, "height": 933}, "title": "Jumat Berkah: Ketika Sepiring Makan Siang Menjadi Jembatan", "author": "Seksi Sosial & Kemaslahatan", "status": "terbit", "excerpt": "Seusai sholat Jumat, dapur masjid bekerja untuk jamaah dan warga yang membutuhkan. Begitulah kepedulian dirawat.", "category": "Berita"}');
INSERT INTO public.articles (pos, id, data) OVERRIDING SYSTEM VALUE VALUES (4, 'transparansi-donasi', '{"id": "transparansi-donasi", "body": "<p>Setiap donasi yang masuk ke masjid adalah amanah. Karena itu, pengurus mencatat setiap transaksi, memverifikasi bukti transfer, dan melaporkan penyalurannya kepada jamaah secara berkala.</p>\n<h2>Alur yang dijaga</h2>\n<ul><li>Donasi diterima melalui rekening resmi, QRIS, atau sekretariat masjid.</li><li>Admin mencatat nama, nominal, program, dan tanggal donasi.</li><li>Bukti transfer diverifikasi sebelum status diubah menjadi terverifikasi.</li><li>Laporan penyaluran disusun sesuai program dan dipublikasikan melalui halaman donasi.</li></ul>\n<p>Donatur yang ingin tampil anonim tetap dapat memantau laporannya. Nama mereka akan ditampilkan sebagai \"Hamba Allah\" atau tidak dicantumkan sama sekali.</p>\n<p>Transparansi bukan tanda ketidakpercayaan, melainkan bentuk saling menjaga. Dengan begitu, kepercayaan jamaah dapat terus tumbuh dan program kebaikan bisa berjalan lebih panjang.</p>", "date": "2026-10-06", "read": 4, "image": {"alt": "Relawan menyortir pakaian dan kebutuhan pokok ke dalam kotak donasi.", "src": "assets/stock/bakti-sosial.jpg", "width": 1400, "height": 933}, "title": "Menjaga Amanah Donasi: Transparansi sebagai Bagian dari Ibadah", "author": "Bendahara DKM", "status": "terbit", "excerpt": "Donasi yang dipercayakan jamaah bukan sekadar angka. Ada amanah yang harus dicatat, diverifikasi, dan dilaporkan.", "category": "Berita"}');
INSERT INTO public.articles (pos, id, data) OVERRIDING SYSTEM VALUE VALUES (1, 'adab-masjid', '{"id": "adab-masjid", "body": "<p>Memasuki masjid berarti memasuki ruang yang Allah muliakan. Di dalamnya ada sujud, dzikir, dan percakapan yang saling menguatkan. Karena itu, adab yang baik bukan sekadar formalitas, melainkan cara kita menghormati tempat dan orang-orang di dalamnya.</p>\n<p>Beberapa kebiasaan sederhana berikut membantu menjaga ketenangan masjid sekaligus membuat jamaah lain merasa nyaman.</p>\n<ul><li>Mengucapkan salam saat masuk dan keluar masjid.</li><li>Menyenyapkan nada dering sebelum masuk ruang sholat.</li><li>Mendahulukan kaki kanan, lalu berdoa dengan tenang.</li><li>Menjaga kebersihan alas sholat dan membuang sampah pada tempatnya.</li><li>Menghindari percakapan keras ketika jamaah lain sedang sholat atau membaca Al-Qur''an.</li></ul>\n<h2>Adab yang tumbuh dari kesadaran</h2>\n<p>Adab juga mencakup cara kita menyikapi perbedaan. Masjid adalah tempat berkumpulnya warga dengan latar belakang yang beragam. Menyapa tamu, memberi ruang bagi jamaah lanjut usia, dan menahan diri dari perdebatan adalah bagian dari akhlak yang diajarkan Rasulullah SAW.</p>\n<blockquote>Masjid yang nyaman lahir dari jamaah yang saling menjaga, bukan hanya dari bangunan yang megah.</blockquote>\n<p>Mari mulai dari hal kecil: datang lebih awal, sholat dengan tenang, dan pulang dengan hati yang lebih lapang.</p>", "date": "2026-10-22", "read": 1, "image": {"alt": "Adab Masuk Masjid: Sunnah Kecil yang Menghadirkan Ketenangan", "src": "assets/stock/kajian.jpg", "width": 1400, "height": 933}, "title": "Adab Masuk Masjid: Sunnah Kecil yang Menghadirkan Ketenangan", "author": "Ust. Muhammad Ridwan, S.Ag.", "status": "terbit", "excerpt": "Memasuki masjid berarti memasuki ruang yang Allah muliakan. Di dalamnya ada sujud, dzikir, dan percakapan yang saling menguatkan. Karena itu…", "category": "Akhlak"}');
INSERT INTO public.articles (pos, id, data) OVERRIDING SYSTEM VALUE VALUES (5, 'tiga-amalan-ringan', '{"id": "tiga-amalan-ringan", "body": "<p>Kadang kita menunggu kesempatan besar untuk berbuat baik. Padahal, Rasulullah SAW mengajarkan bahwa amalan ringan yang dilakukan dengan konsisten memiliki nilai besar di sisi Allah.</p>\n<h2>Tersenyum kepada saudara</h2>\n<p>Senyum sederhana dapat mencairkan ketegangan dan menyampaikan rasa hormat. Di masjid, senyum kepada jamaah baru atau tamu bisa membuat mereka merasa diterima.</p>\n<h2>Menyingkirkan gangguan di jalan</h2>\n<p>Memindahkan batu, dahan, atau sampah dari jalan bukan perkara sepele. Tindakan kecil ini menjaga orang lain dari bahaya dan menunjukkan kepedulian terhadap ruang bersama.</p>\n<h2>Membaca Al-Qur''an meski satu ayat</h2>\n<p>Membaca satu ayat setiap hari lebih baik daripada menunggu waktu luang yang panjang. Kebiasaan kecil ini menjaga hubungan dengan kitab Allah dan menenangkan hati.</p>\n<blockquote>Konsistensi lebih berharga daripada banyaknya amalan yang kemudian berhenti.</blockquote>\n<p>Mari memilih satu amalan ringan untuk dimulai hari ini, lalu menjaganya agar tetap berjalan.</p>", "date": "2026-09-28", "read": 5, "image": null, "title": "Tiga Amalan Ringan yang Berpahala Besar", "author": "Ust. Fikri Haikal", "status": "terbit", "excerpt": "Kebaikan tidak selalu menuntut banyak biaya. Ada amalan sederhana yang dapat dilakukan setiap hari.", "category": "Hadis"}');
INSERT INTO public.articles (pos, id, data) OVERRIDING SYSTEM VALUE VALUES (6, 'laporan-santunan', '{"id": "laporan-santunan", "body": "<p>Program santunan yatim dan dhuafa bulan September telah dilaksanakan di halaman masjid. Paket kebutuhan pokok dan bantuan pendidikan diserahkan kepada keluarga binaan yang telah terdata oleh seksi sosial.</p>\n<p>Kegiatan diawali dengan tausiyah singkat, lalu dilanjutkan dengan penyerahan santunan dan ramah tamah bersama warga. Relawan juga mendampingi keluarga yang membutuhkan pendampingan administrasi sekolah.</p>\n<p>Laporan rinci penerimaan dan penyaluran dapat dilihat pada halaman donasi. Donatur yang ingin berpartisipasi pada penyaluran berikutnya dapat menghubungi admin melalui WhatsApp.</p>", "date": "2026-09-21", "read": 3, "image": {"alt": "Relawan menyortir pakaian dan kebutuhan pokok ke dalam kotak donasi.", "src": "assets/stock/bakti-sosial.jpg", "width": 1400, "height": 933}, "title": "Santunan Yatim & Dhuafa: Laporan Kegiatan bulan September", "author": "Panitia Sosial", "status": "terbit", "excerpt": "Penyaluran santunan bulanan berjalan bersama relawan warga. Terima kasih kepada seluruh donatur.", "category": "Berita"}');
INSERT INTO public.articles (pos, id, data) OVERRIDING SYSTEM VALUE VALUES (16, 'tes-berita-53d0', '{"id": "tes-berita-53d0", "body": "<p>ini konten</p>", "date": "2026-11-24", "read": 1, "title": "tes berita", "author": "admin1", "status": "terbit", "excerpt": "ini ringkasan", "category": "Berita"}');


--
-- Data for Name: donors; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.donors (pos, id, data, created_at, ip) OVERRIDING SYSTEM VALUE VALUES (1, 'donasi-1', '{"id": "donasi-1", "date": "2026-10-24", "name": "Hamba Allah", "amount": 500000, "method": "BSI", "status": "verified", "program": "umum"}', '2026-11-23 14:05:01.07077+00', NULL);
INSERT INTO public.donors (pos, id, data, created_at, ip) OVERRIDING SYSTEM VALUE VALUES (2, 'donasi-2', '{"id": "donasi-2", "date": "2026-10-23", "name": "Keluarga Wijaya", "amount": 2500000, "method": "BSI", "status": "verified", "program": "pembangunan"}', '2026-11-23 14:05:01.07077+00', NULL);
INSERT INTO public.donors (pos, id, data, created_at, ip) OVERRIDING SYSTEM VALUE VALUES (3, 'donasi-3', '{"id": "donasi-3", "date": "2026-10-22", "name": "Ibu Siti Aminah", "amount": 300000, "method": "QRIS", "status": "verified", "program": "umum"}', '2026-11-23 14:05:01.07077+00', NULL);
INSERT INTO public.donors (pos, id, data, created_at, ip) OVERRIDING SYSTEM VALUE VALUES (4, 'donasi-4', '{"id": "donasi-4", "date": "2026-10-20", "name": "Anonim", "amount": 5000000, "method": "Mandiri", "status": "verified", "program": "pembangunan"}', '2026-11-23 14:05:01.07077+00', NULL);
INSERT INTO public.donors (pos, id, data, created_at, ip) OVERRIDING SYSTEM VALUE VALUES (5, 'donasi-5', '{"id": "donasi-5", "date": "2026-10-19", "name": "Hamba Allah", "amount": 150000, "method": "QRIS", "status": "verified", "program": "umum"}', '2026-11-23 14:05:01.07077+00', NULL);
INSERT INTO public.donors (pos, id, data, created_at, ip) OVERRIDING SYSTEM VALUE VALUES (6, 'donasi-6', '{"id": "donasi-6", "date": "2026-10-18", "name": "Ibu Ratna Dewi", "amount": 750000, "method": "E-wallet", "status": "verified", "program": "pembangunan"}', '2026-11-23 14:05:01.07077+00', NULL);


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.events (pos, id, data) OVERRIDING SYSTEM VALUE VALUES (1, 'tablig-akbar', '{"id": "tablig-akbar", "bio": "Dosen dan pendakwah dengan fokus kajian ukhuwah dan media.", "tag": "Kajian akbar", "date": "2026-11-14", "desc": "Kajian kebangsaan tentang cara menjaga persaudaraan di tengah arus informasi digital. Terbuka untuk jamaah umum, ikhwan dan akhwat, dengan area parkir tambahan di halaman sekolah sebelah.", "time": "19.30 – 21.30 WIB", "title": "Tablig Akbar: Menjaga Ukhuwah di Era Digital", "status": "akan", "speaker": "Ust. Dr. Ahmad Fauzan, Lc., M.A.", "category": "Umum", "location": "Ruang utama masjid"}');
INSERT INTO public.events (pos, id, data) OVERRIDING SYSTEM VALUE VALUES (2, 'kajian-tafsir', '{"id": "kajian-tafsir", "bio": "Pengajar tafsir di berbagai majelis taklim warga.", "tag": "Kajian rutin", "date": "2026-11-22", "desc": "Membahas adab sosial dan menjaga lisan melalui tafsir Surah Al-Hujurat. Peserta disarankan membawa Al-Qur''an dan buku catatan.", "time": "08.00 – 10.00 WIB", "title": "Kajian Tafsir: Menyelami Surah Al-Hujurat", "status": "akan", "speaker": "Ust. Muhammad Ridwan, S.Ag.", "category": "Khusus Ikhwan", "location": "Aula lantai 2"}');
INSERT INTO public.events (pos, id, data) OVERRIDING SYSTEM VALUE VALUES (3, 'santunan-yatim', '{"id": "santunan-yatim", "bio": "Pembina sosial dan pengurus lembaga amil setempat.", "tag": "Sosial", "date": "2026-12-05", "desc": "Penyaluran santunan, paket sekolah, dan kebutuhan pokok bagi anak yatim serta keluarga dhuafa binaan masjid. Donatur dapat hadir langsung untuk menyerahkan santunan.", "time": "09.00 – 12.00 WIB", "title": "Santunan Yatim & Dhuafa Akhir Tahun", "status": "akan", "speaker": "Panitia Sosial & Ust. Abdurrahman", "category": "Umum", "location": "Halaman masjid"}');
INSERT INTO public.events (pos, id, data) OVERRIDING SYSTEM VALUE VALUES (4, 'mabit-remaja', '{"id": "mabit-remaja", "bio": "Pembina remaja masjid dan mentor kajian pemuda.", "tag": "Remaja", "date": "2026-12-19", "desc": "Malam pembinaan remaja berisi kajian, qiyamul lail, dan kegiatan kelompok. Pendaftaran melalui WhatsApp admin dengan kuota terbatas.", "time": "20.00 WIB – 04.30 WIB", "title": "Malam Bina Iman & Taqwa (MABIT) Remaja", "status": "akan", "speaker": "Ust. Fikri Haikal", "category": "Khusus Akhwat", "location": "Masjid & aula"}');
INSERT INTO public.events (pos, id, data) OVERRIDING SYSTEM VALUE VALUES (5, 'kerja-bakti', '{"id": "kerja-bakti", "bio": "Koordinator relawan dan pengurus DKM Al-Barokah.", "tag": "Gotong royong", "date": "2027-02-06", "desc": "Membersihkan ruang sholat, merawat taman, dan menyiapkan fasilitas menjelang Ramadan. Warga dipersilakan membawa peralatan kebersihan.", "time": "07.00 – 11.00 WIB", "title": "Kerja Bakti & Bersih Masjid Menyambut Ramadan", "status": "akan", "speaker": "Pengurus DKM & relawan", "category": "Umum", "location": "Area masjid"}');


--
-- Data for Name: programs; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.programs (pos, id, data) OVERRIDING SYSTEM VALUE VALUES (1, 'umum', '{"id": "umum", "desc": "Disalurkan untuk tanggap bencana, santunan yatim piatu, dan kebutuhan darurat warga di sekitar masjid.", "icon": "heart", "name": "Donasi Umum", "type": "umum", "uses": ["Santunan bulanan anak yatim binaan", "Bantuan tanggap bencana & sembako darurat", "Beasiswa sekolah untuk keluarga dhuafa"], "donors": 86, "kicker": "Bencana & yatim piatu", "status": "aktif", "target": null, "deadline": null, "collected": 96450000}');
INSERT INTO public.programs (pos, id, data) OVERRIDING SYSTEM VALUE VALUES (2, 'pembangunan', '{"id": "pembangunan", "desc": "Perluasan ruang sholat, renovasi area wudhu, dan perawatan fasilitas agar jamaah beribadah lebih nyaman.", "icon": "building", "name": "Pembangunan Masjid", "type": "target", "uses": ["Perluasan ruang sholat lantai dua", "Renovasi area wudhu & tempat bersuci", "Karpet, pendingin, dan sound system baru"], "donors": 214, "kicker": "Ruang ibadah", "status": "aktif", "target": 500000000, "deadline": "2027-03-31", "collected": 312700000}');


--
-- Data for Name: settings; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.settings (key, data) VALUES ('bayar', '{"wa": "6281298850904", "auto": true, "bank": "BSI", "norek": "", "ewallet": "", "pemilik": ""}');
INSERT INTO public.settings (key, data) VALUES ('log', '[{"t": "Mengubah program: TKIT", "at": 1795530494143}, {"t": "Mengubah program: TPQ", "at": 1795530449666}, {"t": "Menambah artikel: tes berita", "at": 1795526538678}, {"t": "Mengubah program: TPQ", "at": 1795526135589}, {"t": "Mengubah program: Belajar Baca Qur''an", "at": 1795522537395}, {"t": "Menambah program: Pasar Bahagia", "at": 1795522529822}, {"t": "Menambah program: Belajar Baca Qur''an", "at": 1795522471207}, {"t": "Mengubah program: Mahasiswa Pemberdaya", "at": 1795522442493}]');
INSERT INTO public.settings (key, data) VALUES ('kontak', '{"wa": "6281298850904", "lat": "", "lng": "", "maps": "https://maps.app.goo.gl/kzyHBUKtcq12koBo9", "email": "", "alamat": "Jl. Ampera Poncol, Babakan, Kec. Setu, Kota Tangerang Selatan, Banten 15315", "wa_list": ["Pengurus Masjid | 6281298850904", "Koordinator Mahasiswa Pemberdaya | 6285767088554", "Koordinator TPQ | 6289637589083", "Koordinator TKIT | 08111020904"], "youtube": "", "facebook": "", "instagram": "jamialbarokahtangsel"}');
INSERT INTO public.settings (key, data) VALUES ('sholat', '{"lat": -6.33, "lng": 106.69, "auto": true, "isya": "19:08", "ashar": "15:05", "subuh": "04:03", "dzuhur": "11:40", "lokasi": "Tangerang Selatan", "metode": "20", "maghrib": "17:53", "updated": "2026-11-25"}');


--
-- Name: activities_pos_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.activities_pos_seq', 34, true);


--
-- Name: articles_pos_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.articles_pos_seq', 16, true);


--
-- Name: donors_pos_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.donors_pos_seq', 12, true);


--
-- Name: events_pos_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.events_pos_seq', 10, true);


--
-- Name: programs_pos_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.programs_pos_seq', 4, true);


--
-- PostgreSQL database dump complete
--


