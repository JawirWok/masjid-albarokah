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
    },
    galeri1: {
      src: "assets/stock/masjid-galeri-1.jpg",
      width: 1400,
      height: 933,
      alt: "Interior ruang sholat masjid dengan ornamen geometris."
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

export const DONORS = [];

export const TRANSACTIONS = [];

export const ACTIVITIES = [];

export const ARTICLES = [
    {
      id: "fikih-wudhu-batal-dan-sunnah",
      title: "Fikih Wudhu: Hal yang Membatalkan dan Sunnah Saat Bersuci",
      category: "Fikih",
      author: "Seksi Dakwah Masjid Jami' Al-Barokah",
      date: "2026-11-25",
      read: 4,
      excerpt: "Wudhu adalah syarat sah sholat. Memahami pembatal dan sunnahnya membantu jamaah menjaga kesucian ibadah sehari-hari.",
      image: IMG.kajian,
      body: `<p>Wudhu bukan sekadar membasuh anggota badan sebelum sholat, tetapi syarat sah ibadah yang diatur jelas dalam fikih thaharah. Karena dikerjakan minimal lima kali sehari, memahami batas antara hal yang wajib, sunnah, dan membatalkan wudhu sangat penting bagi setiap muslim.</p>
<h2>Hal yang membatalkan wudhu</h2>
<p>Mayoritas ulama merangkum beberapa sebab batalnya wudhu agar jamaah tidak ragu ketika sudah berada di dalam masjid:</p>
<ul><li>Keluarnya sesuatu dari dua jalan (qubul atau dubur), termasuk buang angin, buang air kecil, maupun buang air besar.</li><li>Tidur lelap dalam posisi berbaring atau tidak menapakkan tempat duduk dengan mantap sehingga kesadaran hilang.</li><li>Hilangnya akal karena pingsan, mabuk, atau sakit berat.</li><li>Menyentuh kemaluan secara langsung dengan telapak tangan tanpa penghalang menurut sebagian mazhab, termasuk mazhab Syafi'i.</li></ul>
<h2>Sunnah yang sering terlewat</h2>
<p>Selain enam rukun wudhu (niat, membasuh wajah, membasuh kedua tangan hingga siku, mengusap sebagian kepala, membasuh kedua kaki hingga mata kaki, serta tertib), ada sunnah yang menyempurnakan wudhu:</p>
<ul><li>Membaca basmalah sebelum mulai membasuh kedua telapak tangan.</li><li>Berkumur dan memasukkan air ke hidung (istinsyaq) lalu mengeluarkannya.</li><li>Mendahulukan anggota tubuh sebelah kanan sebelum sebelah kiri.</li><li>Menyela-nyela jari tangan dan kaki serta membaca doa setelah selesai berwudhu.</li></ul>
<blockquote>Jika muncul keraguan setelah berwudhu apakah sudah batal atau belum, pegang keyakinan yang lebih kuat: seseorang tetap dalam keadaan suci sampai ada tanda batal yang nyata.</blockquote>`
    },
    {
      id: "fikih-makmum-masbuk-sholat-berjamaah",
      title: "Fikih Sholat Berjamaah: Tata Cara Makmum Masbuk dan Shaf",
      category: "Fikih",
      author: "Seksi Dakwah Masjid Jami' Al-Barokah",
      date: "2026-11-22",
      read: 4,
      excerpt: "Datang terlambat saat imam sudah mulai sholat memiliki aturan tersendiri. Begini cara menyusul rakaat dengan tenang.",
      image: IMG.galeri1,
      body: `<p>Dalam sholat berjamaah, sering kali jamaah datang ketika imam sudah rukuk, sujud, atau bahkan berada di rakaat terakhir. Kondisi ini dalam fikih disebut makmum masbuk, dan syariat memberi panduan jelas agar jamaah tidak tergesa-gesa.</p>
<h2>Kapan satu rakaat dihitung sah</h2>
<p>Makmum masbuk dihitung mendapatkan rakaat bersama imam apabila ia sempat bertakbiratul ihram lalu mengikuti rukuk imam dengan tuma'ninah sebelum imam bangkit untuk iktidal. Jika imam sudah bangkit dari rukuk, maka makmum langsung mengikuti gerakan imam saat itu, tetapi rakaat tersebut belum terhitung.</p>
<h2>Langkah praktis saat menyusul imam</h2>
<ul><li>Berjalan tenang menuju shaf tanpa berlari, lalu berdiri tegak untuk takbiratul ihram.</li><li>Langsung mengikuti posisi imam saat itu, baik sedang berdiri, rukuk, sujud, maupun duduk tasyahud.</li><li>Setelah imam mengucapkan salam pertama dan kedua, makmum masbuk berdiri tanpa mengucap salam untuk menyempurnakan kekurangan rakaatnya.</li><li>Pada rakaat tambahan, bacaan Al-Fatihah dan tahiyat disesuaikan dengan urutan rakaat yang kurang.</li></ul>
<h2>Adab mengisi dan merapatkan shaf</h2>
<p>Jika shaf terdepan masih memiliki celah kosong, isilah bagian tersebut terlebih dahulu dari sisi tengah mendekat ke belakang imam. Apabila shaf penuh dan Anda datang seorang diri, cari jamaah lain jika ada agar tidak sholat sendirian di belakang shaf.</p>`
    },
    {
      id: "fikih-perbedaan-zakat-infaq-sedekah",
      title: "Fikih Harta: Perbedaan Zakat, Infaq, dan Sedekah",
      category: "Fikih",
      author: "Sekretariat Masjid Jami' Al-Barokah",
      date: "2026-11-18",
      read: 3,
      excerpt: "Ketiganya sama-sama bentuk berbagi harta, tetapi hukum, batas nominal, dan penerimanya berbeda menurut fikih.",
      image: IMG.bakti,
      body: `<p>Masyarakat sering menyamakan zakat, infaq, dan sedekah karena ketiganya berkaitan dengan pengeluaran harta di jalan kebaikan. Memahami perbedaannya membantu muzakki dan donatur menyalurkan dana sesuai tuntunan fikih.</p>
<h2>Zakat: kewajiban dengan syarat nishab</h2>
<p>Zakat adalah kewajiban bagi muslim yang hartanya mencapai batas minimal (nishab) dan tersimpan selama satu tahun hijriah (haul) untuk zakat mal, atau dikeluarkan pada bulan Ramadan untuk zakat fitrah. Penyalurannya terikat kepada delapan golongan penerima (asnaf) seperti fakir, miskin, amil, mualaf, hingga ibnu sabil.</p>
<h2>Infaq: pengeluaran harta tanpa batas nishab</h2>
<p>Infaq bersifat sukarela atau sesuai kebutuhan sosial dan kemaslahatan umat. Tidak ada syarat nishab maupun haul, dan pemanfaatannya lebih luas, mulai dari pembangunan fasilitas masjid, operasional pendidikan TPQ, hingga bantuan warga terdampak musibah.</p>
<h2>Sedekah: cakupan paling luas</h2>
<p>Sedekah mencakup pemberian harta maupun kebaikan non-materi seperti tenaga, ilmu, atau sikap ramah kepada sesama. Karena cakupannya luas, sedekah dapat dilakukan kapan saja tanpa menunggu jumlah tertentu.</p>
<ul><li>Zakat wajib ditunaikan bila syarat nishab dan haul terpenuhi, dengan penerima khusus delapan asnaf.</li><li>Infaq disalurkan dalam bentuk harta untuk kebutuhan masjid dan sosial masyarakat.</li><li>Sedekah meliputi pemberian materi dan amal kebaikan harian untuk siapa saja yang membutuhkan.</li></ul>`
    },
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
    { label: "Pengurus Masjid", value: "+62 812-9885-0904", href: "https://wa.me/6281298850904", icon: "whatsapp" },
    { label: "Instagram", value: "@jamialbarokahtangsel", href: "https://www.instagram.com/jamialbarokahtangsel", icon: "instagram" },
    { label: "Alamat masjid", value: "Jl. Ampera Poncol, Babakan, Kec. Setu, Kota Tangerang Selatan, Banten 15315", href: "https://maps.app.goo.gl/kzyHBUKtcq12koBo9", icon: "pin", hint: "Buka peta lokasi" }
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
    program: "Program — Masjid Jami' Al-Barokah",
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
export const PAYMENT = { wa: '6281298850904', metode: [] }

/** Profil masjid; ditimpa dari Admin > Profil Masjid & Kontak (lewat Supabase). */
export const PROFILE = {
  alamat: 'Jl. Ampera Poncol, Babakan, Kec. Setu, Kota Tangerang Selatan, Banten 15315',
  tahun: 2021,
  kapasitas: 180,
  lantai: 3,
  fasilitas: ['Tempat wudhu', 'Toilet', 'Area parkir', 'Ruang sholat utama', 'Aula lantai 2'],
  visi: 'Menjadi lembaga pendidikan dan dakwah yang melahirkan generasi berakhlak mulia, cinta Al-Quran, dan bermanfaat bagi masyarakat.',
  misi: [
    'Menyelenggarakan pendidikan anak usia dini Islami yang menyenangkan dan penuh kasih sayang.',
    'Membimbing anak membaca dan menghafal Al-Quran secara bertahap dan benar.',
    'Memakmurkan masjid sebagai pusat ibadah, kajian, dan kegiatan warga.',
    'Menjalankan kegiatan sosial untuk membantu anak yatim dan masyarakat yang membutuhkan.'
  ],
  maps: 'https://maps.app.goo.gl/kzyHBUKtcq12koBo9',
}

/** Tautan tombol "Buka di Google Maps": pakai link dari admin, kalau kosong cari lewat alamat. */
export const mapsHref = () => PROFILE.maps
  || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Masjid Jami' Al-Barokah " + PROFILE.alamat)}`

/** Kelompok halaman Program; `id` cocok dengan field "Kelompok" di admin. */
export const PROGRAM_GROUPS = [
  { id: 'pendidikan', title: 'Pendidikan', icon: 'book' },
  { id: 'sosial', title: 'Sosial & pemberdayaan', icon: 'heart' },
  { id: 'dakwah', title: 'Dakwah & kajian', icon: 'mosque' },
]

/** Tautan WhatsApp untuk mendaftar ke program. Nomor program dipakai bila diisi, kalau tidak pakai nomor admin dari Kontak. */
export function daftarLink(p) {
  let n = String(p.wa || '').replace(/\D/g, '')
  if (n.startsWith('0')) n = '62' + n.slice(1)
  if (!n) n = String(CONTACT_ITEMS.find((c) => c.icon === 'whatsapp')?.href || '').replace(/\D/g, '')
  const text = `Assalamu'alaikum, saya ingin mendaftar program ${p.title} di Masjid Jami' Al-Barokah.`
  return `https://wa.me/${n}?text=${encodeURIComponent(text)}`
}