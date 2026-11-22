
export const numberFormat = new Intl.NumberFormat("id-ID");
export const rupiah = (value) => "Rp" + numberFormat.format(value);
export const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
export const MONTHS_LONG = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
export const DAYS_LONG = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

export const IMG = {
    jumat: {
      src: "assets/stock/jumat-berkah.jpg",
      width: 1400,
      height: 933,
      alt: "Warga berkumpul dan menyiapkan makanan bersama dalam kegiatan sosial."
    },
    bakti: {
      src: "assets/stock/bakti-sosial.jpg",
      width: 1400,
      height: 933,
      alt: "Relawan menyortir pakaian dan kebutuhan pokok ke dalam kotak donasi."
    },
    kajian: {
      src: "assets/stock/kajian.jpg",
      width: 1400,
      height: 933,
      alt: "Jamaah membaca Al-Qur'an bersama di dalam masjid."
    }
  };

export const PROGRAMS = [
    {
      id: "umum",
      name: "Donasi Umum",
      kicker: "Bencana & yatim piatu",
      icon: "heart",
      desc: "Disalurkan untuk tanggap bencana, santunan yatim piatu, dan kebutuhan darurat warga di sekitar masjid.",
      uses: [
        "Santunan bulanan anak yatim binaan",
        "Bantuan tanggap bencana & sembako darurat",
        "Beasiswa sekolah untuk keluarga dhuafa"
      ],
      target: null,
      deadline: null,
      collected: 96450000,
      donors: 86
    },
    {
      id: "pembangunan",
      name: "Pembangunan Masjid",
      kicker: "Ruang ibadah",
      icon: "building",
      desc: "Perluasan ruang sholat, renovasi area wudhu, dan perawatan fasilitas agar jamaah beribadah lebih nyaman.",
      uses: [
        "Perluasan ruang sholat lantai dua",
        "Renovasi area wudhu & tempat bersuci",
        "Karpet, pendingin, dan sound system baru"
      ],
      target: 500000000,
      deadline: "2027-03-31",
      collected: 312700000,
      donors: 214
    }
  ];

export const DONORS = [
    { name: "Hamba Allah", program: "umum", date: "2026-10-24", amount: 500000, method: "BSI" },
    { name: "Keluarga Wijaya", program: "pembangunan", date: "2026-10-23", amount: 2500000, method: "BSI" },
    { name: "Ibu Siti Aminah", program: "umum", date: "2026-10-22", amount: 300000, method: "QRIS" },
    { name: "Anonim", program: "pembangunan", date: "2026-10-20", amount: 5000000, method: "Mandiri" },
    { name: "Hamba Allah", program: "umum", date: "2026-10-19", amount: 150000, method: "QRIS" },
    { name: "Ibu Ratna Dewi", program: "pembangunan", date: "2026-10-18", amount: 750000, method: "E-wallet" }
  ];

export const TRANSACTIONS = [
    { date: "2026-10-24", program: "umum", amount: 500000, status: "Terverifikasi" },
    { date: "2026-10-23", program: "pembangunan", amount: 2500000, status: "Terverifikasi" },
    { date: "2026-10-22", program: "umum", amount: 300000, status: "Terverifikasi" },
    { date: "2026-10-21", program: "pembangunan", amount: 1500000, status: "Terverifikasi" },
    { date: "2026-10-20", program: "pembangunan", amount: 5000000, status: "Terverifikasi" },
    { date: "2026-10-19", program: "umum", amount: 150000, status: "Menunggu verifikasi" }
  ];

export const EVENTS = [
    {
      id: "tablig-akbar",
      title: "Tablig Akbar: Menjaga Ukhuwah di Era Digital",
      date: "2026-11-14",
      time: "19.30 – 21.30 WIB",
      speaker: "Ust. Dr. Ahmad Fauzan, Lc., M.A.",
      category: "Umum",
      bio: "Dosen dan pendakwah dengan fokus kajian ukhuwah dan media.",
      location: "Ruang utama masjid",
      tag: "Kajian akbar",
      desc: "Kajian kebangsaan tentang cara menjaga persaudaraan di tengah arus informasi digital. Terbuka untuk jamaah umum, ikhwan dan akhwat, dengan area parkir tambahan di halaman sekolah sebelah."
    },
    {
      id: "kajian-tafsir",
      title: "Kajian Tafsir: Menyelami Surah Al-Hujurat",
      date: "2026-11-22",
      time: "08.00 – 10.00 WIB",
      speaker: "Ust. Muhammad Ridwan, S.Ag.",
      category: "Khusus Ikhwan",
      bio: "Pengajar tafsir di berbagai majelis taklim warga.",
      location: "Aula lantai 2",
      tag: "Kajian rutin",
      desc: "Membahas adab sosial dan menjaga lisan melalui tafsir Surah Al-Hujurat. Peserta disarankan membawa Al-Qur'an dan buku catatan."
    },
    {
      id: "santunan-yatim",
      title: "Santunan Yatim & Dhuafa Akhir Tahun",
      date: "2026-12-05",
      time: "09.00 – 12.00 WIB",
      speaker: "Panitia Sosial & Ust. Abdurrahman",
      category: "Umum",
      bio: "Pembina sosial dan pengurus lembaga amil setempat.",
      location: "Halaman masjid",
      tag: "Sosial",
      desc: "Penyaluran santunan, paket sekolah, dan kebutuhan pokok bagi anak yatim serta keluarga dhuafa binaan masjid. Donatur dapat hadir langsung untuk menyerahkan santunan."
    },
    {
      id: "mabit-remaja",
      title: "Malam Bina Iman & Taqwa (MABIT) Remaja",
      date: "2026-12-19",
      time: "20.00 WIB – 04.30 WIB",
      speaker: "Ust. Fikri Haikal",
      category: "Khusus Akhwat",
      bio: "Pembina remaja masjid dan mentor kajian pemuda.",
      location: "Masjid & aula",
      tag: "Remaja",
      desc: "Malam pembinaan remaja berisi kajian, qiyamul lail, dan kegiatan kelompok. Pendaftaran melalui WhatsApp admin dengan kuota terbatas."
    },
    {
      id: "kerja-bakti",
      title: "Kerja Bakti & Bersih Masjid Menyambut Ramadan",
      date: "2027-02-06",
      time: "07.00 – 11.00 WIB",
      speaker: "Pengurus DKM & relawan",
      category: "Umum",
      bio: "Koordinator relawan dan pengurus DKM Al-Barokah.",
      location: "Area masjid",
      tag: "Gotong royong",
      desc: "Membersihkan ruang sholat, merawat taman, dan menyiapkan fasilitas menjelang Ramadan. Warga dipersilakan membawa peralatan kebersihan."
    }
  ];

export const ACTIVITIES = [
    {
      id: "jumat-berkah",
      date: "2026-10-30",
      title: "Jum'at Berkah",
      schedule: "Setiap Jumat · 11.30 WIB",
      pic: "Seksi Sosial & Kemaslahatan",
      desc: "Pembagian makan siang gratis setelah sholat Jumat untuk jamaah, pekerja jalan, dan warga yang membutuhkan.",
      image: IMG.jumat
    },
    {
      id: "bakti-sosial",
      date: "2026-11-01",
      title: "Bakti Sosial Warga",
      schedule: "Ahad pertama tiap bulan · 08.00 WIB",
      pic: "Seksi Sosial",
      desc: "Penyaluran sembako, pemeriksaan kesehatan gratis, dan kunjungan ke rumah warga lanjut usia.",
      image: IMG.bakti
    },
    {
      id: "kajian-rutin",
      date: "2026-11-02",
      title: "Kajian Ba'da Maghrib",
      schedule: "Senin & Kamis · setelah Maghrib",
      pic: "Seksi Dakwah",
      desc: "Kajian tematik fiqih dan akhlak bersama ustaz setempat, terbuka untuk jamaah umum dan remaja.",
      image: IMG.kajian
    },
    {
      id: "tahsin",
      date: "2026-11-01",
      title: "Tahsin & Tahfiz Al-Qur'an",
      schedule: "Setiap Ahad · 08.00 – 10.00 WIB",
      pic: "Seksi Pendidikan",
      desc: "Kelas memperbaiki bacaan Al-Qur'an untuk dewasa dan anak, dibimbing pengajar yang berpengalaman.",
      image: IMG.kajian
    },
    {
      id: "kerja-bakti-rutin",
      date: "2026-11-07",
      title: "Kerja Bakti Masjid",
      schedule: "Sabtu pekan pertama · 07.00 WIB",
      pic: "Seksi Sarana & Prasarana",
      desc: "Membersihkan area masjid, merawat taman, dan menyiapkan fasilitas menjelang kegiatan besar.",
      image: IMG.bakti
    }
  ];

export const ARTICLES = [
    {
      id: "adab-masjid",
      title: "Adab Masuk Masjid: Sunnah Kecil yang Menghadirkan Ketenangan",
      category: "Akhlak",
      author: "Ust. Muhammad Ridwan, S.Ag.",
      date: "2026-10-20",
      read: 5,
      excerpt: "Masjid bukan hanya tempat sujud, tetapi rumah yang menenangkan. Beberapa adab sederhana membantu kita menjaganya.",
      image: IMG.kajian,
      body: `<p>Memasuki masjid berarti memasuki ruang yang Allah muliakan. Di dalamnya ada sujud, dzikir, dan percakapan yang saling menguatkan. Karena itu, adab yang baik bukan sekadar formalitas, melainkan cara kita menghormati tempat dan orang-orang di dalamnya.</p>
<p>Beberapa kebiasaan sederhana berikut membantu menjaga ketenangan masjid sekaligus membuat jamaah lain merasa nyaman.</p>
<ul><li>Mengucapkan salam saat masuk dan keluar masjid.</li><li>Menyenyapkan nada dering sebelum masuk ruang sholat.</li><li>Mendahulukan kaki kanan, lalu berdoa dengan tenang.</li><li>Menjaga kebersihan alas sholat dan membuang sampah pada tempatnya.</li><li>Menghindari percakapan keras ketika jamaah lain sedang sholat atau membaca Al-Qur'an.</li></ul>
<h2>Adab yang tumbuh dari kesadaran</h2>
<p>Adab juga mencakup cara kita menyikapi perbedaan. Masjid adalah tempat berkumpulnya warga dengan latar belakang yang beragam. Menyapa tamu, memberi ruang bagi jamaah lanjut usia, dan menahan diri dari perdebatan adalah bagian dari akhlak yang diajarkan Rasulullah SAW.</p>
<blockquote>Masjid yang nyaman lahir dari jamaah yang saling menjaga, bukan hanya dari bangunan yang megah.</blockquote>
<p>Mari mulai dari hal kecil: datang lebih awal, sholat dengan tenang, dan pulang dengan hati yang lebih lapang.</p>`
    },
    {
      id: "sholat-berjamaah",
      title: "Keutamaan Sholat Berjamaah bagi Kehidupan Sosial",
      category: "Ibadah",
      author: "Ust. Abdurrahman",
      date: "2026-10-14",
      read: 6,
      excerpt: "Satu shaf mengajarkan kedisiplinan, kesetaraan, dan kepedulian yang sulit ditemukan di tempat lain.",
      image: null,
      body: `<p>Sholat berjamaah bukan hanya ibadah yang lebih utama, tetapi juga latihan sosial yang membentuk karakter. Dalam satu shaf, kita berdiri sejajar tanpa membedakan jabatan, kekayaan, atau asal-usul.</p>
<h2>Lebih dari sekadar pahala</h2>
<p>Rasulullah SAW menganjurkan sholat berjamaah karena di dalamnya terdapat kedisiplinan waktu, kepatuhan pada imam, dan kepedulian pada jamaah di sekitar kita. Seseorang yang terbiasa datang tepat waktu akan membawa kebiasaan itu ke tempat kerja dan keluarganya.</p>
<ul><li>Melatih disiplin terhadap waktu dan komitmen.</li><li>Menumbuhkan rasa setara di hadapan Allah.</li><li>Membuka peluang silaturahmi antarwarga.</li><li>Menjadi sarana saling mengenal dan membantu.</li></ul>
<p>Bagi masjid, jamaah yang hidup adalah kekuatan utama. Semakin sering kita hadir, semakin besar peluang kebaikan yang bisa kita rawat bersama.</p>
<blockquote>Sholat berjamaah mengajarkan bahwa kebaikan tidak dilakukan sendirian.</blockquote>`
    },
    {
      id: "jumat-berkah",
      title: "Jumat Berkah: Ketika Sepiring Makan Siang Menjadi Jembatan",
      category: "Berita",
      author: "Seksi Sosial & Kemaslahatan",
      date: "2026-10-11",
      read: 4,
      excerpt: "Seusai sholat Jumat, dapur masjid bekerja untuk jamaah dan warga yang membutuhkan. Begitulah kepedulian dirawat.",
      image: IMG.jumat,
      body: `<p>Seusai sholat Jumat, aroma makanan dari dapur masjid menandakan program Jum'at Berkah dimulai. Porsi makan siang disiapkan oleh relawan, lalu dibagikan kepada jamaah, pekerja jalan, dan warga yang membutuhkan.</p>
<p>Program ini lahir dari kebiasaan sederhana warga: berbagi kepada siapa pun yang hadir, tanpa bertanya dari mana asalnya. Sebagian jamaah membawa lauk tambahan, sebagian lain membantu memasak dan membagikan.</p>
<blockquote>Yang dibagikan bukan hanya makanan, tetapi rasa bahwa tidak ada warga yang berjuang sendirian.</blockquote>
<p>Bagi yang ingin terlibat, kontribusi dapat disalurkan melalui program Donasi Umum atau langsung kepada koordinator kegiatan saat hari Jumat. Relawan selalu terbuka untuk membantu persiapan dan distribusi.</p>`
    },
    {
      id: "transparansi-donasi",
      title: "Menjaga Amanah Donasi: Transparansi sebagai Bagian dari Ibadah",
      category: "Berita",
      author: "Bendahara DKM",
      date: "2026-10-06",
      read: 4,
      excerpt: "Donasi yang dipercayakan jamaah bukan sekadar angka. Ada amanah yang harus dicatat, diverifikasi, dan dilaporkan.",
      image: IMG.bakti,
      body: `<p>Setiap donasi yang masuk ke masjid adalah amanah. Karena itu, pengurus mencatat setiap transaksi, memverifikasi bukti transfer, dan melaporkan penyalurannya kepada jamaah secara berkala.</p>
<h2>Alur yang dijaga</h2>
<ul><li>Donasi diterima melalui rekening resmi, QRIS, atau sekretariat masjid.</li><li>Admin mencatat nama, nominal, program, dan tanggal donasi.</li><li>Bukti transfer diverifikasi sebelum status diubah menjadi terverifikasi.</li><li>Laporan penyaluran disusun sesuai program dan dipublikasikan melalui halaman donasi.</li></ul>
<p>Donatur yang ingin tampil anonim tetap dapat memantau laporannya. Nama mereka akan ditampilkan sebagai "Hamba Allah" atau tidak dicantumkan sama sekali.</p>
<p>Transparansi bukan tanda ketidakpercayaan, melainkan bentuk saling menjaga. Dengan begitu, kepercayaan jamaah dapat terus tumbuh dan program kebaikan bisa berjalan lebih panjang.</p>`
    },
    {
      id: "tiga-amalan-ringan",
      title: "Tiga Amalan Ringan yang Berpahala Besar",
      category: "Hadis",
      author: "Ust. Fikri Haikal",
      date: "2026-09-28",
      read: 5,
      excerpt: "Kebaikan tidak selalu menuntut banyak biaya. Ada amalan sederhana yang dapat dilakukan setiap hari.",
      image: null,
      body: `<p>Kadang kita menunggu kesempatan besar untuk berbuat baik. Padahal, Rasulullah SAW mengajarkan bahwa amalan ringan yang dilakukan dengan konsisten memiliki nilai besar di sisi Allah.</p>
<h2>Tersenyum kepada saudara</h2>
<p>Senyum sederhana dapat mencairkan ketegangan dan menyampaikan rasa hormat. Di masjid, senyum kepada jamaah baru atau tamu bisa membuat mereka merasa diterima.</p>
<h2>Menyingkirkan gangguan di jalan</h2>
<p>Memindahkan batu, dahan, atau sampah dari jalan bukan perkara sepele. Tindakan kecil ini menjaga orang lain dari bahaya dan menunjukkan kepedulian terhadap ruang bersama.</p>
<h2>Membaca Al-Qur'an meski satu ayat</h2>
<p>Membaca satu ayat setiap hari lebih baik daripada menunggu waktu luang yang panjang. Kebiasaan kecil ini menjaga hubungan dengan kitab Allah dan menenangkan hati.</p>
<blockquote>Konsistensi lebih berharga daripada banyaknya amalan yang kemudian berhenti.</blockquote>
<p>Mari memilih satu amalan ringan untuk dimulai hari ini, lalu menjaganya agar tetap berjalan.</p>`
    },
    {
      id: "laporan-santunan",
      title: "Santunan Yatim & Dhuafa: Laporan Kegiatan bulan September",
      category: "Berita",
      author: "Panitia Sosial",
      date: "2026-09-21",
      read: 3,
      excerpt: "Penyaluran santunan bulanan berjalan bersama relawan warga. Terima kasih kepada seluruh donatur.",
      image: IMG.bakti,
      body: `<p>Program santunan yatim dan dhuafa bulan September telah dilaksanakan di halaman masjid. Paket kebutuhan pokok dan bantuan pendidikan diserahkan kepada keluarga binaan yang telah terdata oleh seksi sosial.</p>
<p>Kegiatan diawali dengan tausiyah singkat, lalu dilanjutkan dengan penyerahan santunan dan ramah tamah bersama warga. Relawan juga mendampingi keluarga yang membutuhkan pendampingan administrasi sekolah.</p>
<p>Laporan rinci penerimaan dan penyaluran dapat dilihat pada halaman donasi. Donatur yang ingin berpartisipasi pada penyaluran berikutnya dapat menghubungi admin melalui WhatsApp.</p>`
    }
  ];

export const CONTACT_ITEMS = [
    {
      label: "WhatsApp",
      value: "+62 812-9885-0904",
      href: "https://wa.me/6281298850904",
      icon: "whatsapp",
      hint: "Konfirmasi donasi & informasi kegiatan"
    },
    {
      label: "Instagram",
      value: "@jamialbarokahtangsel",
      href: "https://www.instagram.com/jamialbarokahtangsel",
      icon: "instagram",
      hint: "Kabar kegiatan harian"
    },
    {
      label: "Alamat masjid",
      value: "Jl. Ampera Poncol, Babakan, Kec. Setu, Kota Tangerang Selatan, Banten 15315",
      href: "https://maps.app.goo.gl/kzyHBUKtcq12koBo9",
      icon: "pin",
      hint: "Buka peta lokasi"
    }
  ];

export const PRAYERS = [
    { name: "Subuh", time: "04:32" },
    { name: "Dzuhur", time: "11:48" },
    { name: "Ashar", time: "15:07" },
    { name: "Maghrib", time: "17:52" },
    { name: "Isya", time: "19:03" }
  ];

export const PAGE_TITLES = {
    profil: "Profil — Masjid Jami' Al-Barokah",
    sholat: "Jadwal Sholat — Masjid Jami' Al-Barokah",
    beranda: "Masjid Jami' Al-Barokah — Tangerang Selatan",
    donasi: "Donasi — Masjid Jami' Al-Barokah",
    acara: "Jadwal & Acara — Masjid Jami' Al-Barokah",
    kegiatan: "Kegiatan — Masjid Jami' Al-Barokah",
    artikel: "Artikel & Berita — Masjid Jami' Al-Barokah",
    kontak: "Kontak — Masjid Jami' Al-Barokah"
  };

export function esc(value) {
    return String(value).replace(/[&<>"']/g, function (character) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character];
    });
  }

export function icon(name) {
    return '<svg class="icon" aria-hidden="true"><use href="#i-' + name + '"/></svg>';
  }

export const patternIcon = '<svg class="icon" style="--icon-size:46px" aria-hidden="true"><use href="#i-mosque"/></svg>';
export const readerPatternIcon = '<svg class="icon" style="--icon-size:54px" aria-hidden="true"><use href="#i-mosque"/></svg>';

export function parseISODate(iso) {
    const parts = iso.split("-").map(Number);
    return new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]));
  }

export function longDate(iso) {
    const date = parseISODate(iso);
    return date.getUTCDate() + " " + MONTHS_LONG[date.getUTCMonth()] + " " + date.getUTCFullYear();
  }

export function shortDate(iso) {
    const date = parseISODate(iso);
    return date.getUTCDate() + " " + MONTHS_SHORT[date.getUTCMonth()] + " " + date.getUTCFullYear();
  }

export function weekday(iso) {
    return DAYS_LONG[parseISODate(iso).getUTCDay()];
  }

export function programName(id) {
    const program = PROGRAMS.find((item) => item.id === id);
    return program ? program.name : id;
  }

export function mediaBlock(image, className) {
    if (image) {
      return '<div class="' + className + '"><img src="' + esc(image.src) + '" alt="' + esc(image.alt) + '" width="' + image.width + '" height="' + image.height + '" loading="lazy"></div>';
    }
    return '<div class="' + className + ' media-pattern" aria-hidden="true">' + patternIcon + "</div>";
  }


export function jakartaISO() {
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Jakarta', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date())
  const get = (t) => parts.find((p) => p.type === t).value
  return `${get('year')}-${get('month')}-${get('day')}`
}
export const TODAY_ISO = jakartaISO()

export const GALLERY = [
  { src: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1600&q=85', caption: 'Ruang sholat utama', alt: 'Ruang sholat utama' },
  { src: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1600&q=85', caption: 'Aula lantai 2', alt: 'Aula lantai 2' },
  { src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=85', caption: 'Tempat wudhu', alt: 'Tempat wudhu' },
  { src: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1600&q=85', caption: 'Toilet', alt: 'Toilet' },
  { src: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1600&q=85', caption: 'Area parkir', alt: 'Area parkir' },
  { src: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1600&q=85', caption: 'Serambi dan halaman masjid', alt: 'Serambi dan halaman masjid' },
  { src: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=1600&q=85', caption: 'Menara dan kubah', alt: 'Menara dan kubah' },
]

/** Info pembayaran; diisi dari Admin > Donasi > Pembayaran (lewat Supabase). */
export const PAYMENT = { bank: 'BSI', norek: '', pemilik: '', ewallet: '', wa: '6281298850904', auto: false, qris: [] }

/** Profil masjid; ditimpa dari Admin > Profil Masjid & Kontak (lewat Supabase). */
export const PROFILE = {
  alamat: 'Jl. Ampera Poncol, Babakan, Kec. Setu, Kota Tangerang Selatan, Banten 15315',
  tahun: 2021,
  kapasitas: 250,
  lantai: 2,
  fasilitas: ['Tempat wudhu', 'Toilet', 'Area parkir', 'Ruang sholat utama', 'Aula lantai 2'],
  visi: 'Menjadi pusat ibadah, ilmu, dan kepedulian sosial yang ramah dan amanah bagi seluruh warga.',
  misi: [
    'Menyelenggarakan ibadah dan kajian yang rutin dan terbuka.',
    'Mengelola donasi secara transparan dan akuntabel.',
    'Membina generasi muda dan keluarga dhuafa.',
  ],
  maps: 'https://maps.app.goo.gl/kzyHBUKtcq12koBo9',
  lat: -6.3405,
  lng: 106.6930,
  hasCoords: false, // true bila pengurus mengisi latitude & longitude di Admin > Kontak
}

/** Acara yang tanggalnya belum lewat (acara hari ini masih tampil) dan belum ditandai selesai di admin. */
export const upcomingEvents = () => {
  const today = jakartaISO()
  return EVENTS
    .filter((e) => e.date >= today && e.status !== 'selesai')
    .sort((a, b) => a.date.localeCompare(b.date))
}
