import { db, rp, dt, today, slug, fmtBody } from './db'

const F = (k, l, t = 'text', o = {}) => ({ k, l, t, ...o })
const opts = (a) => a.map((x) => [x, x])
const STATUS = [['aktif', 'Aktif'], ['selesai', 'Selesai']]
const badge = (t, warn) => [t, !!warn]
// Donasi terverifikasi menambah total & jumlah donatur pada programnya
const eff = (d, s) => {
  if (!d || d.status === 'pending') return
  const p = db.PROGRAMS.find((x) => x.id === d.program)
  if (p) { p.collected = Math.max(0, (p.collected || 0) + s * d.amount); p.donors = Math.max(0, (p.donors || 0) + s) }
}

const GROUP_LABEL = { pendidikan: 'Pendidikan', sosial: 'Sosial & pemberdayaan', dakwah: 'Dakwah & kajian' }
const TIPE = { bank: 'Transfer bank', ewallet: 'E-wallet', qris: 'QRIS' }
export const metodeLabel = (m) => (m.tipe === 'bank' ? 'Transfer ' + m.nama : m.nama)

export const CFG = {
  profil: {
    t: 'Profil Masjid', single: 'profil', f: [
      F('alamat', 'Alamat', 'textarea', { req: 1, rows: 2 }),
      F('tahun', 'Tahun berdiri', 'number'), F('kapasitas', 'Kapasitas jamaah', 'number'), F('lantai', 'Jumlah lantai', 'number'),
      F('galeri', 'Fasilitas & foto masjid', 'images', { ph: 'Nama fasilitas', h: 'Satu foto = satu fasilitas. Isi nama di bawah foto (mis. Tempat wudhu). Tampil di slider halaman Profil.' })]
  },
  sholat: {
    t: 'Jadwal Sholat', single: 'sholat', tools: true, f: [
      F('lokasi', 'Lokasi masjid', 'text', { req: 1, full: 1 }), F('lat', 'Latitude', 'number', { req: 1 }), F('lng', 'Longitude', 'number', { req: 1 }),
      F('metode', 'Metode perhitungan', 'select', { o: [['20', 'Kemenag RI'], ['3', 'Muslim World League'], ['2', 'ISNA'], ['4', 'Umm al-Qura']] }),
      F('auto', 'Perbarui jadwal otomatis setiap hari', 'check', { h: 'Bila aktif, jadwal diambil ulang tiap hari dan menggantikan isian manual di bawah. Matikan bila ingin mengatur jam sendiri.' }),
      F('subuh', 'Subuh', 'time'), F('dzuhur', 'Dzuhur', 'time'), F('ashar', 'Ashar', 'time'), F('maghrib', 'Maghrib', 'time'), F('isya', 'Isya', 'time')]
  },
  program: {
    t: 'Program Donasi', key: 'PROGRAMS', item: 'program',
    cols: [['Program', (r) => r.name], ['Jenis', (r) => (r.type === 'target' ? 'Donasi Target' : 'Donasi Umum')],
    ['Terkumpul', (r) => rp(r.collected) + (r.target ? ' / ' + rp(r.target) : '')], ['Status', (r) => badge(r.status === 'selesai' ? 'Selesai' : 'Aktif', r.status === 'selesai'), 'badge']],
    def: () => ({ type: 'umum', status: 'aktif', collected: 0, donors: 0 }),
    f: [F('type', 'Jenis donasi', 'select', { o: [['umum', 'Donasi Umum (bebas nominal)'], ['target', 'Donasi Target (progress bar)']] }), F('status', 'Status program', 'select', { o: STATUS }),
    F('name', 'Nama program', 'text', { req: 1, full: 1 }), F('kicker', 'Label singkat', 'text', { h: 'Contoh: Ruang ibadah' }),
    F('desc', 'Deskripsi program', 'textarea', { req: 1 }), F('uses', 'Tujuan / penggunaan dana', 'lines', { h: 'Satu poin per baris.' }),
    F('target', 'Target nominal (Rp)', 'number', { show: (m) => m.type === 'target' }), F('deadline', 'Deadline', 'date', { show: (m) => m.type === 'target' }),
    F('collected', 'Total terkumpul (Rp)', 'number'), F('donors', 'Jumlah donatur', 'number', { h: 'Bertambah otomatis saat donasi diverifikasi; bisa diubah manual.' }),
    F('image', 'Gambar program (opsional)', 'image')],
    pre: (o) => { o.id ||= slug(o.name); if (o.image) o.image.alt = o.name; o.icon = o.type === 'target' ? 'building' : 'heart'; if (o.type !== 'target') { o.target = null; o.deadline = null } else o.deadline ||= null; o.collected ||= 0; o.donors ||= 0 }
  },
  donatur: {
    t: 'Pengelolaan Donatur', key: 'DONORS', item: 'donasi',
    cols: [['Donatur', (r) => (r.anon && r.name !== 'Hamba Allah' ? `Hamba Allah (${r.name})` : r.name)], ['Tanggal', (r) => dt(r.date)], ['Program', (r) => db.PROGRAMS.find((p) => p.id === r.program)?.name || '—'],
    ['Nominal', (r) => (r.amount > 0 ? rp(r.amount) : 'Belum diisi')], ['Status', (r) => (r.status === 'pending' ? badge('Menunggu', 1) : badge('Terverifikasi')), 'badge']],
    def: () => ({ date: today(), status: 'pending', method: db.METODE[0] ? metodeLabel(db.METODE[0]) : '' }),
    f: [F('name', 'Nama donatur', 'text', { req: 1 }), F('anon', 'Tampilkan sebagai “Hamba Allah” (anonim)', 'check'),
    F('amount', 'Nominal (Rp)', 'number', { h: 'Isi sesuai mutasi rekening/QRIS sebelum memverifikasi.' }), F('date', 'Tanggal', 'date', { req: 1 }),
    F('program', 'Program yang dipilih', 'select', { o: () => (db.PROGRAMS.length ? db.PROGRAMS.map((p) => [p.id, p.name]) : [['', '(belum ada program)']]) }),
    F('method', 'Metode', 'select', { o: () => { const l = db.METODE.map(metodeLabel); return (l.length ? l : ['—']).map((x) => [x, x]) } }),
    F('status', 'Status donasi', 'select', { o: [['pending', 'Menunggu verifikasi'], ['verified', 'Terverifikasi']] })],
    pre: (o) => { o.id ||= slug(o.name) },
    hook: (a, b) => { eff(a, -1); eff(b, 1) }
  },
  metode: {
    t: 'Metode Pembayaran', key: 'METODE', item: 'metode pembayaran',
    cols: [['Metode', (r) => r.nama], ['Jenis', (r) => TIPE[r.tipe] || '—'],
    ['Detail', (r) => (r.tipe === 'qris' ? (r.gambar ? 'Gambar QRIS' : '—') : [r.nomor, r.pemilik && 'a.n. ' + r.pemilik].filter(Boolean).join(' ') || '—')],
    ['Status', (r) => badge(r.aktif === false ? 'Nonaktif' : 'Tampil', r.aktif === false), 'badge']],
    def: () => ({ tipe: 'bank', aktif: true }),
    f: [F('tipe', 'Jenis', 'select', { o: [['bank', 'Transfer bank'], ['ewallet', 'E-wallet'], ['qris', 'QRIS']] }),
    F('nama', 'Nama metode', 'text', { req: 1, h: 'Contoh: BSI, DANA, QRIS Yayasan' }),
    F('nomor', 'Nomor rekening / e-wallet', 'text', { req: 1, show: (m) => m.tipe !== 'qris' }),
    F('pemilik', 'Atas nama', 'text', { show: (m) => m.tipe !== 'qris' }),
    F('gambar', 'Gambar QRIS', 'image', { show: (m) => m.tipe === 'qris' }),
    F('aktif', 'Tampilkan di form donasi', 'check')],
    pre: (o) => { o.id ||= slug(o.nama); if (o.tipe === 'qris') { o.nomor = ''; o.pemilik = '' } else o.gambar = null }
  },
  kegiatan: {
    t: 'Program Masjid', key: 'ACTIVITIES', item: 'program',
    cols: [['Program', (r) => r.title], ['Kelompok', (r) => GROUP_LABEL[r.group] || '—'], ['Jadwal mingguan', (r) => r.schedule || '—']],
    def: () => ({ group: 'dakwah' }),
    f: [F('title', 'Nama program', 'text', { req: 1, full: 1 }),
    F('group', 'Kelompok', 'select', { o: [['pendidikan', 'Pendidikan'], ['sosial', 'Sosial & pemberdayaan'], ['dakwah', 'Dakwah & kajian']] }),
    F('schedule', 'Jadwal mingguan', 'text', { h: "Khusus kajian. Contoh: Setiap Ahad · ba'da Subuh. Kosongkan bila tidak ada." }),
    F('desc', 'Deskripsi singkat', 'textarea', { req: 1, h: 'Tampil di kartu.' }),
    F('detail', 'Penjelasan lengkap (boleh HTML)', 'textarea', { rows: 12, h: 'Tampil di halaman detail. Boleh pakai tag seperti <h2>, <h3>, <p>, <ul><li>, <ol>, <strong>, <a href>, <img>. Tanpa tag, baris kosong jadi paragraf.' }),
    F('daftar', 'Tampilkan tombol "Daftar via WhatsApp"', 'check'),
    F('wa', 'Nomor WhatsApp pendaftaran', 'text', { h: 'Opsional, format 62812… atau 0812…. Kosong = pakai nomor admin dari menu Kontak.' }),
    F('image', 'Foto program', 'image')],
    pre: (o) => { o.id ||= slug(o.title); if (o.image) o.image.alt = o.title; delete o.date; delete o.pic; delete o.sub }
  },
  artikel: {
    t: 'Artikel / Berita', key: 'ARTICLES', item: 'artikel',
    cols: [['Judul', (r) => r.title], ['Penulis', (r) => r.author], ['Tanggal', (r) => dt(r.date)], ['Kategori', (r) => r.category], ['Status', (r) => (r.status === 'draft' ? badge('Draft', 1) : badge('Terbit')), 'badge']],
    def: () => ({ status: 'terbit', category: db.kategori?.[0] || 'Berita' }),
    f: [F('title', 'Judul artikel', 'text', { req: 1, full: 1 }), F('author', 'Nama penulis', 'text', { req: 1 }),
    F('category', 'Kategori', 'select', { o: () => db.kategori.map((c) => [c, c]) }),
    F('status', 'Status terbit', 'select', { o: [['terbit', 'Terbit (tampil di situs)'], ['draft', 'Draft (disimpan saja)']] }),
    F('excerpt', 'Ringkasan', 'textarea', { rows: 2, h: 'Kosongkan untuk dibuat otomatis dari isi artikel.' }),
    F('body', 'Konten', 'textarea', { req: 1, rows: 10, h: 'Pisahkan paragraf dengan baris kosong. Awali baris dengan "## " untuk subjudul.' }),
    F('image', 'Gambar sampul', 'image')],
    pre: (o) => { o.date ||= today(); o.id ||= slug(o.title); o.status ||= 'terbit'; if (o.image) o.image.alt ||= o.title; const raw = String(o.body).replace(/<[^>]+>/g, ' '); o.body = fmtBody(o.body); o.read = Math.max(1, Math.round(raw.split(/\s+/).filter(Boolean).length / 200)); o.excerpt ||= raw.replace(/^##\s*/gm, '').trim().slice(0, 140) + '…' }
  },
}
export const NAV = [['dashboard', 'Dashboard'], ['profil', 'Profil Masjid'], ['sholat', 'Jadwal Sholat'], ['donasi', 'Donasi'], ['kegiatan', 'Program Masjid'], ['artikel', 'Artikel / Berita'], ['kontak', 'Kontak'], ['akun', 'Pengaturan Akun']]
export const TABS = [['program', 'Program Donasi'], ['metode', 'Pembayaran'], ['donatur', 'Donatur']]

export const KONTAK = [
  { k: 'wa', label: 'WhatsApp pengurus', sub: 'Wajib · juga dipakai untuk konfirmasi donasi', req: 1, field: 'Nomor WhatsApp', ph: '0812 9885 0904', h: 'Satu nomor saja. Boleh diawali 0 atau 62.' },
  { k: 'instagram', label: 'Instagram', sub: 'Satu akun', field: 'Username atau link', ph: 'jamialbarokahtangsel', h: 'Tanpa @ juga boleh.' },
  { k: 'tiktok', label: 'TikTok', sub: 'Opsional', field: 'Username atau link', ph: 'namaakun', h: 'Tanpa @ juga boleh.' },
  { k: 'youtube', label: 'YouTube', sub: 'Opsional', field: 'Link channel', ph: 'https://www.youtube.com/@namachannel', h: 'Link channel atau @handle.' },
  { k: 'facebook', label: 'Facebook', sub: 'Opsional', field: 'Link halaman', ph: 'https://facebook.com/namahalaman', h: 'Link halaman atau nama halamannya.' },
  { k: 'maps', label: 'Google Maps', sub: 'Opsional · untuk tombol "Buka di Google Maps"', field: 'Link Google Maps', ph: 'https://maps.app.goo.gl/…', h: 'Kosong = tombol memakai pencarian alamat dari menu Profil Masjid.' },
]
export const pickKontak = (o) => Object.fromEntries(KONTAK.map((f) => [f.k, o?.[f.k] || '']))

/** Ubah isi form (string dari input) menjadi tipe data yang benar. */
export function normalize(fields, m) {
  const o = { ...m }
  fields.forEach((f) => {
    const v = m[f.k]
    if (f.t === 'number') o[f.k] = v === '' || v == null ? null : Number(v)
    else if (f.t === 'lines') o[f.k] = (v || []).map((s) => s.trim()).filter(Boolean)
    else if (f.t === 'images') o[f.k] = v || []
    else if (f.t === 'check') o[f.k] = !!v
    else o[f.k] = typeof v === 'string' ? v.trim() : v
  })
  return o
}