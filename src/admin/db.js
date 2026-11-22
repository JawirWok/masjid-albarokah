import { reactive, ref } from 'vue'
import { createClient } from '@supabase/supabase-js'
import * as C from '../data/content'

// Hanya alamat dasarnya yang dipakai (mis. https://xxxx.supabase.co), walau .env terisi dengan tambahan /rest/v1/
let SB_URL = import.meta.env.VITE_SUPABASE_URL
try { SB_URL = new URL(SB_URL).origin } catch { /* biarkan apa adanya */ }
const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY
/** null bila .env belum diisi: situs publik tetap jalan dengan data bawaan. */
export const supabase = SB_URL && KEY ? createClient(SB_URL, KEY) : null

const TABLE = { PROGRAMS: 'programs', DONORS: 'donors', EVENTS: 'events', ACTIVITIES: 'activities', ARTICLES: 'articles' }

export const rp = (n) => 'Rp' + new Intl.NumberFormat('id-ID').format(n || 0)
export const today = () => new Date().toLocaleDateString('sv', { timeZone: 'Asia/Jakarta' })
export const dt = (iso) => (iso ? new Date(iso + 'T00:00:00Z').toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }) : '—')
export const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
export const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40) + '-' + Date.now().toString(36).slice(-4)
export const fmtBody = (t) => (/<\w+[^>]*>/.test(t) ? t : t.split(/\n{2,}/).filter(Boolean).map((b) => (b.startsWith('## ') ? `<h2>${esc(b.slice(3))}</h2>` : `<p>${esc(b).replace(/\n/g, '<br>')}</p>`)).join(''))

const must = ({ data, error }) => { if (error) throw error; return data }
const put = (arr, items) => arr.splice(0, arr.length, ...items)

/** Unggah gambar ke Supabase Storage (bucket "media"), dikecilkan dulu agar hemat kuota. */
export async function uploadImage(file) {
  if (!supabase) throw new Error('Supabase belum dikonfigurasi')
  if (!file.type.startsWith('image/')) throw new Error('File harus berupa gambar')
  const bmp = await createImageBitmap(file)
  const r = Math.min(1, 1600 / Math.max(bmp.width, bmp.height))
  const c = document.createElement('canvas')
  c.width = Math.round(bmp.width * r); c.height = Math.round(bmp.height * r)
  c.getContext('2d').drawImage(bmp, 0, 0, c.width, c.height)
  const blob = await new Promise((ok, no) => c.toBlob((b) => (b ? ok(b) : no(new Error('Gagal memproses gambar'))), 'image/jpeg', 0.82))
  const path = `${new Date().getFullYear()}/${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}.jpg`
  const { error } = await supabase.storage.from('media').upload(path, blob, { contentType: 'image/jpeg', cacheControl: '31536000' })
  if (error) throw error
  return { src: supabase.storage.from('media').getPublicUrl(path).data.publicUrl, width: c.width, height: c.height, alt: '' }
}

export async function fetchTimes(h) {
  const r = await fetch(`https://api.aladhan.com/v1/timings?latitude=${h.lat}&longitude=${h.lng}&method=${h.metode || 20}`)
  const t = (await r.json()).data.timings, c = (x) => x.slice(0, 5)
  return { subuh: c(t.Fajr), dzuhur: c(t.Dhuhr), ashar: c(t.Asr), maghrib: c(t.Maghrib), isya: c(t.Isha) }
}

/* ---------------- Situs publik: baca data dari Supabase ---------------- */
/** Naik setiap kali data donasi berubah, supaya halaman yang memakainya menghitung ulang. */
export const live = ref(0)
const getRows = async (table) => must(await supabase.from(table).select('data').order('pos')).map((r) => r.data)

/** Daftar donatur publik lewat fungsi database; jatuh ke view lama bila fungsinya belum dibuat. */
async function getDonors() {
  const r = await supabase.rpc('public_donor_list')
  if (!r.error) return r.data || []
  return getRows('public_donors')
}

/** Program + donatur: dipakai saat start dan setiap ada perubahan realtime. */
async function loadDonations() {
  const [programs, donors] = await Promise.all([getRows('programs'), getDonors()])
  if (programs.length) put(C.PROGRAMS, programs.filter((p) => p.status !== 'selesai'))
  put(C.DONORS, donors)
  put(C.TRANSACTIONS, donors.slice().sort((a, b) => b.date.localeCompare(a.date)).slice(0, 10)
    .map((d) => ({ date: d.date, program: d.program, amount: d.amount, status: 'Terverifikasi' })))
}

/** Situs publik ikut berubah saat pengurus memverifikasi donasi (tanpa refresh). */
export function watchPublic() {
  if (!supabase) return
  let t
  supabase.channel('public-live')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'programs' }, () => {
      clearTimeout(t)
      t = setTimeout(() => loadDonations().then(() => live.value++).catch(() => {}), 600)
    })
    .subscribe()
}

/** Catat donasi lewat fungsi database. Mode demo: langsung terverifikasi dan total program naik. */
export async function submitDonation(row) {
  const { data, error } = await supabase.rpc('submit_donation', { p: row })
  if (error) throw error
  return data
}

/** Muat ulang angka donasi sekarang juga (tanpa menunggu realtime). */
export async function refreshDonations() { await loadDonations(); live.value++ }

export async function syncPublic() {
  if (!supabase) return
  try {
    const [events, activities, articles, settings] = await Promise.all([
      getRows('events'), getRows('activities'), getRows('articles'),
      supabase.from('settings').select('key,data').then(must),
      loadDonations(),
    ])
    if (events.length) put(C.EVENTS, events)
    if (activities.length) put(C.ACTIVITIES, activities)
    if (articles.length) put(C.ARTICLES, articles.filter((a) => a.status !== 'draft'))

    const s = Object.fromEntries(settings.map((r) => [r.key, r.data]))
    if (s.bayar) Object.assign(C.PAYMENT, s.bayar)
    const pr = s.profil
    if (pr) {
      for (const k of ['alamat', 'tahun', 'kapasitas', 'lantai', 'visi']) {
        if (pr[k] !== '' && pr[k] != null) C.PROFILE[k] = pr[k]
      }
      if (pr.fasilitas?.length) C.PROFILE.fasilitas = pr.fasilitas
      if (pr.misi?.length) C.PROFILE.misi = pr.misi
    }
    const galeri = s.profil?.galeri
    if (galeri?.length) put(C.GALLERY, galeri.map((g) => ({ src: g.src, alt: g.alt || 'Foto masjid', caption: g.caption || g.alt || '' })))
    const h = s.sholat || {}
    const apply = () => C.PRAYERS.forEach((p) => { const v = h[p.name.toLowerCase()]; if (v) p.time = v })
    apply()
    if (h.auto && h.lat && h.lng && h.updated !== today()) fetchTimes(h).then((t) => { Object.assign(h, t); apply() }).catch(() => {})

    const k = s.kontak
    if (k) {
      if (k.alamat) C.PROFILE.alamat = k.alamat
      if (k.maps) C.PROFILE.maps = k.maps
      const num = (v) => (v === '' || v == null || !Number.isFinite(Number(v)) ? null : Number(v))
      if (num(k.lat) !== null && num(k.lng) !== null) { C.PROFILE.lat = num(k.lat); C.PROFILE.lng = num(k.lng); C.PROFILE.hasCoords = true }
    }
    if (k?.wa) {
      const items = [{ label: 'WhatsApp', value: '+' + k.wa, href: 'https://wa.me/' + k.wa, icon: 'whatsapp', hint: 'Konfirmasi donasi & informasi kegiatan' }]
      if (k.instagram) items.push({ label: 'Instagram', value: '@' + k.instagram, href: 'https://www.instagram.com/' + k.instagram, icon: 'instagram', hint: 'Kabar kegiatan harian' })
      if (k.email) items.push({ label: 'Email', value: k.email, href: 'mailto:' + k.email, icon: 'mail', hint: 'Surat resmi & kerja sama' })
      if (k.alamat) items.push({ label: 'Alamat masjid', value: k.alamat, href: k.maps || '#', icon: 'pin', hint: 'Buka peta lokasi' })
      put(C.CONTACT_ITEMS, items)
    }
  } catch (e) {
    console.warn('Supabase tidak terjangkau, memakai data bawaan:', e.message)
  }
}

/* ---------------- Admin: baca & tulis (perlu login) ---------------- */
export const db = reactive({})

export async function loadDB() {
  const alamat = 'Jl. Ampera Poncol, Babakan, Kec. Setu, Kota Tangerang Selatan, Banten 15315'
  const next = {
    PROGRAMS: [], DONORS: [], EVENTS: [], ACTIVITIES: [], ARTICLES: [], log: [],
    profil: { nama: "Masjid Jami' Al-Barokah", alamat, tahun: 2021, luas: '500 m²', kapasitas: 250, lantai: 2, fasilitas: [], visi: '', misi: [], galeri: [] },
    sholat: { lokasi: 'Tangerang Selatan', lat: -6.33, lng: 106.69, metode: '20', auto: true },
    bayar: { bank: 'BSI', norek: '', pemilik: '', ewallet: '', wa: '6281298850904', auto: false, qris: [] },
    kontak: { wa: '6281298850904', email: '', alamat, maps: '', lat: '', lng: '', instagram: '', facebook: '', youtube: '' },
  }
  for (const [key, table] of Object.entries(TABLE)) {
    next[key] = must(await supabase.from(table).select('data').order('pos')).map((r) => r.data)
  }
  for (const r of must(await supabase.from('settings').select('key,data'))) {
    next[r.key] = Array.isArray(next[r.key]) ? r.data : { ...next[r.key], ...r.data }
  }
  next.PROGRAMS.forEach((p) => { p.type ||= p.target ? 'target' : 'umum'; p.status ||= 'aktif' })
  Object.assign(db, next)
}

export const upsert = async (key, row) => must(await supabase.from(TABLE[key]).upsert({ id: row.id, data: row }))
export const removeRow = async (key, id) => must(await supabase.from(TABLE[key]).delete().eq('id', id))
export const saveSetting = async (key) => must(await supabase.from('settings').upsert({ key, data: db[key] }))

export function note(t) {
  db.log.unshift({ t, at: Date.now() }); db.log = db.log.slice(0, 8)
  saveSetting('log').catch(() => {})
}
