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

export const CFG = {
  profil: { t: 'Profil Masjid', single: 'profil', f: [
    F('alamat', 'Alamat', 'textarea', { req: 1, rows: 2 }),
    F('tahun', 'Tahun berdiri', 'number'), F('kapasitas', 'Kapasitas jamaah', 'number'), F('lantai', 'Jumlah lantai', 'number'),
    F('fasilitas', 'Fasilitas masjid', 'lines', { h: 'Satu fasilitas per baris.' }), F('visi', 'Visi', 'textarea', { rows: 3 }), F('misi', 'Misi', 'lines', { h: 'Satu poin per baris.' }),
    F('galeri', 'Galeri foto masjid', 'images', { h: 'Tampil di halaman Profil. Foto dikecilkan otomatis saat diunggah.' })] },
  sholat: { t: 'Jadwal Sholat', single: 'sholat', tools: true, f: [
    F('lokasi', 'Lokasi masjid', 'text', { req: 1, full: 1 }), F('lat', 'Latitude', 'number', { req: 1 }), F('lng', 'Longitude', 'number', { req: 1 }),
    F('metode', 'Metode perhitungan', 'select', { o: [['20', 'Kemenag RI'], ['3', 'Muslim World League'], ['2', 'ISNA'], ['4', 'Umm al-Qura']] }),
    F('auto', 'Perbarui jadwal otomatis setiap hari', 'check'),
    F('subuh', 'Subuh', 'time'), F('dzuhur', 'Dzuhur', 'time'), F('ashar', 'Ashar', 'time'), F('maghrib', 'Maghrib', 'time'), F('isya', 'Isya', 'time')] },
  program: { t: 'Program Donasi', key: 'PROGRAMS', item: 'program',
    cols: [['Program', (r) => r.name], ['Jenis', (r) => (r.type === 'target' ? 'Donasi Target' : 'Donasi Umum')],
      ['Terkumpul', (r) => rp(r.collected) + (r.target ? ' / ' + rp(r.target) : '')], ['Status', (r) => badge(r.status === 'selesai' ? 'Selesai' : 'Aktif', r.status === 'selesai'), 'badge']],
    def: () => ({ type: 'umum', status: 'aktif', collected: 0, donors: 0 }),
    f: [F('type', 'Jenis donasi', 'select', { o: [['umum', 'Donasi Umum (bebas nominal)'], ['target', 'Donasi Target (progress bar)']] }), F('status', 'Status program', 'select', { o: STATUS }),
      F('name', 'Nama program', 'text', { req: 1, full: 1 }), F('kicker', 'Label singkat', 'text', { h: 'Contoh: Ruang ibadah' }),
      F('desc', 'Deskripsi program', 'textarea', { req: 1 }), F('uses', 'Tujuan / penggunaan dana', 'lines', { h: 'Satu poin per baris.' }),
      F('target', 'Target nominal (Rp)', 'number', { h: 'Hanya untuk Donasi Target.' }), F('deadline', 'Deadline', 'date'), F('collected', 'Total terkumpul (Rp)', 'number'),
      F('image', 'Gambar program (opsional)', 'image')],
    pre: (o) => { o.id ||= slug(o.name); if (o.image) o.image.alt = o.name; o.icon = o.type === 'target' ? 'building' : 'heart'; if (o.type !== 'target') { o.target = null; o.deadline = null } else o.deadline ||= null; o.collected ||= 0; o.donors ||= 0 } },
  bayar: { t: 'Pengelolaan Pembayaran', single: 'bayar', f: [
    F('bank', 'Bank transfer', 'text', { h: 'Contoh: BSI' }), F('norek', 'Nomor rekening'), F('pemilik', 'Nama pemilik rekening'), F('ewallet', 'E-wallet (nama & nomor)'),
    F('wa', 'WhatsApp admin untuk konfirmasi', 'text', { h: 'Format 62812…', full: 1 }),
    F('qris', 'QRIS (kode pembayaran)', 'images', { h: 'Unggah gambar QRIS dan isi keterangannya (mis. nama yayasan). Jika kosong, QRIS bawaan dipakai.' }),
    F('auto', 'MODE DEMO: donasi langsung terverifikasi & total naik otomatis', 'check', { h: 'Matikan sebelum dipakai sungguhan, agar donasi menunggu verifikasi pengurus.' })] },
  donatur: { t: 'Pengelolaan Donatur', key: 'DONORS', item: 'donasi',
    cols: [['Donatur', (r) => (r.anon ? `Hamba Allah (${r.name})` : r.name)], ['Tanggal', (r) => dt(r.date)], ['Program', (r) => db.PROGRAMS.find((p) => p.id === r.program)?.name || '—'],
      ['Nominal', (r) => rp(r.amount)], ['Status', (r) => (r.status === 'pending' ? badge('Menunggu', 1) : badge('Terverifikasi')), 'badge']],
    def: () => ({ date: today(), status: 'pending', method: 'BSI' }),
    f: [F('name', 'Nama donatur', 'text', { req: 1 }), F('anon', 'Tampilkan sebagai “Hamba Allah” (anonim)', 'check'),
      F('amount', 'Nominal (Rp)', 'number', { req: 1 }), F('date', 'Tanggal', 'date', { req: 1 }),
      F('program', 'Program yang dipilih', 'select', { o: () => (db.PROGRAMS.length ? db.PROGRAMS.map((p) => [p.id, p.name]) : [['', '(belum ada program)']]) }),
      F('method', 'Metode', 'select', { o: opts(['BSI', 'QRIS', 'E-wallet', 'Tunai', 'Lainnya']) }),
      F('status', 'Status donasi', 'select', { o: [['pending', 'Menunggu verifikasi'], ['verified', 'Terverifikasi']] })],
    pre: (o) => { o.id ||= slug(o.name) },
    hook: (a, b) => { eff(a, -1); eff(b, 1) } },
  kajian: { t: 'Jadwal Kajian / Acara', key: 'EVENTS', item: 'acara',
    cols: [['Judul', (r) => r.title], ['Tanggal', (r) => dt(r.date)], ['Pemateri', (r) => r.speaker], ['Kategori', (r) => r.category],
      ['Status', (r) => badge(r.status === 'selesai' ? 'Selesai' : 'Akan datang', r.status === 'selesai'), 'badge']],
    def: () => ({ date: today(), ts: '19:30', te: '21:00', category: 'Umum', status: 'akan' }),
    f: [F('title', 'Judul kajian / acara', 'text', { req: 1, full: 1 }), F('speaker', 'Nama pemateri', 'text', { req: 1 }), F('bio', 'Bio singkat pemateri', 'textarea', { rows: 2 }),
      F('date', 'Hari / tanggal', 'date', { req: 1 }), F('ts', 'Waktu mulai', 'time', { req: 1 }), F('te', 'Waktu selesai', 'time', { req: 1 }), F('location', 'Lokasi', 'text', { req: 1 }),
      F('category', 'Kategori', 'select', { o: opts(['Umum', 'Khusus Ikhwan', 'Khusus Akhwat']) }), F('status', 'Status', 'select', { o: [['akan', 'Akan datang'], ['selesai', 'Selesai']] }),
      F('tag', 'Label singkat', 'text', { h: 'Contoh: Kajian rutin' }), F('desc', 'Deskripsi', 'textarea'),
      F('image', 'Gambar acara (opsional)', 'image')],
    pre: (o) => { o.id ||= slug(o.title); if (o.image) o.image.alt = o.title; o.time = String(o.ts).replace(':', '.') + ' – ' + String(o.te).replace(':', '.') + ' WIB'; o.tag ||= 'Kajian' } },
  kegiatan: { t: 'Kegiatan', key: 'ACTIVITIES', item: 'kegiatan',
    cols: [['Kegiatan', (r) => r.title], ['Tanggal', (r) => dt(r.date)], ['Jadwal rutin', (r) => r.schedule || '—']],
    def: () => ({ date: today() }),
    f: [F('title', 'Nama kegiatan', 'text', { req: 1, full: 1 }), F('date', 'Tanggal pelaksanaan', 'date', { req: 1 }), F('schedule', 'Jadwal rutin', 'text', { h: 'Contoh: Setiap Jumat · 11.30 WIB' }),
      F('pic', 'Penanggung jawab'), F('desc', 'Deskripsi singkat', 'textarea', { req: 1 }),
      F('image', 'Foto dokumentasi', 'image')],
    pre: (o) => { o.id ||= slug(o.title); if (o.image) o.image.alt = o.title } },
  artikel: { t: 'Artikel / Berita', key: 'ARTICLES', item: 'artikel',
    cols: [['Judul', (r) => r.title], ['Penulis', (r) => r.author], ['Tanggal', (r) => dt(r.date)], ['Kategori', (r) => r.category], ['Status', (r) => (r.status === 'draft' ? badge('Draft', 1) : badge('Terbit')), 'badge']],
    def: () => ({ date: today(), status: 'draft', category: 'Berita' }),
    f: [F('title', 'Judul artikel', 'text', { req: 1, full: 1 }), F('author', 'Nama penulis', 'text', { req: 1 }), F('date', 'Tanggal publikasi', 'date', { req: 1 }),
      F('category', 'Kategori', 'select', { o: opts(['Akhlak', 'Ibadah', 'Berita', 'Hadis', 'Kajian']) }), F('status', 'Status', 'select', { o: [['draft', 'Draft'], ['terbit', 'Terbit']] }),
      F('excerpt', 'Ringkasan', 'textarea', { rows: 2, h: 'Kosongkan untuk dibuat otomatis dari isi artikel.' }),
      F('body', 'Konten', 'textarea', { req: 1, rows: 10, h: 'Pisahkan paragraf dengan baris kosong. Awali baris dengan “## ” untuk subjudul.' }),
      F('image', 'Gambar sampul (opsional)', 'image')],
    pre: (o) => { o.id ||= slug(o.title); if (o.image) o.image.alt = o.title; const raw = String(o.body).replace(/<[^>]+>/g, ' '); o.body = fmtBody(o.body); o.read = Math.max(1, Math.round(raw.split(/\s+/).filter(Boolean).length / 200)); o.excerpt ||= raw.replace(/^##\s*/gm, '').trim().slice(0, 140) + '…' } },
  kontak: { t: 'Kontak', single: 'kontak', f: [
    F('wa', 'Nomor WhatsApp admin', 'text', { req: 1, h: 'Format 62812…' }), F('email', 'Email', 'email'), F('alamat', 'Alamat lengkap', 'textarea', { rows: 2, req: 1 }),
    F('maps', 'Link Google Maps', 'url'), F('lat', 'Koordinat: latitude', 'number'), F('lng', 'Koordinat: longitude', 'number'),
    F('instagram', 'Instagram', 'text', { h: 'Tanpa @' }), F('facebook', 'Facebook (URL)', 'url'), F('youtube', 'YouTube (URL)', 'url')] },
}
export const NAV = [['dashboard', 'Dashboard'], ['profil', 'Profil Masjid'], ['sholat', 'Jadwal Sholat'], ['donasi', 'Donasi'], ['kajian', 'Jadwal Kajian/Acara'], ['kegiatan', 'Kegiatan'], ['artikel', 'Artikel / Berita'], ['kontak', 'Kontak'], ['akun', 'Pengaturan Akun']]
export const TABS = [['program', 'Program Donasi'], ['bayar', 'Pembayaran'], ['donatur', 'Donatur']]

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
