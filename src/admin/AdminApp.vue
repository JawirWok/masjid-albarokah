<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { Dialog, DialogPanel, TabGroup, TabList, Tab } from '@headlessui/vue'
import {
  Bars3Icon, PlusIcon, PencilSquareIcon, TrashIcon, ArrowTopRightOnSquareIcon, ArrowRightOnRectangleIcon, ArrowLeftIcon,
  EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon, CheckCircleIcon, ExclamationTriangleIcon, InboxIcon,
  Squares2X2Icon, BuildingLibraryIcon, ClockIcon, HeartIcon, CalendarDaysIcon, UserGroupIcon, NewspaperIcon, PhoneIcon,
  Cog6ToothIcon, DocumentTextIcon, BanknotesIcon, UserCircleIcon, KeyIcon, ShieldCheckIcon, AtSymbolIcon,
} from '@heroicons/vue/24/outline'
import BrandMark from '../components/BrandMark.vue'
import './admin.css'
import FieldGrid from './FieldGrid.vue'
import DonutChart from './DonutChart.vue'
import { db, supabase, loadDB, note, rp, dt, today, fetchTimes, upsert, removeRow, saveSetting, uploadImage } from './db'
import { CFG, NAV, TABS, normalize } from './schema'

const ready = ref(false)
const authed = ref(false)
const email = ref('')
const view = ref('dashboard')
const tab = ref(0)
const side = ref(false)
const busy = ref(false)
const msg = ref({ t: '', bad: false, show: false })
const login = ref({ u: '', p: '', err: '' })
const draft = ref({})
const dlg = ref(null) // { i, model }
const pass = ref({ cur: '', np: '', rp: '' })
const acct = ref({ name: '', avatar: null, newEmail: '', curE: '', since: '', last: '' })
const showPass = ref(false)
const loginBusy = ref(false)
const year = new Date().getFullYear()

const ICON = { dashboard: Squares2X2Icon, profil: BuildingLibraryIcon, sholat: ClockIcon, donasi: HeartIcon, kajian: CalendarDaysIcon,
  kegiatan: UserGroupIcon, artikel: NewspaperIcon, kontak: PhoneIcon, akun: Cog6ToothIcon }
const STAT_ICON = [DocumentTextIcon, UserGroupIcon, HeartIcon, BanknotesIcon]
const GROUPS = [['Utama', ['dashboard']], ['Konten situs', ['profil', 'kajian', 'kegiatan', 'artikel', 'kontak']], ['Donasi & ibadah', ['donasi', 'sholat']], ['Sistem', ['akun']]]
const LABEL = Object.fromEntries(NAV)
const SUB = {
  dashboard: 'Ringkasan aktivitas masjid dan donasi.', profil: 'Informasi dasar dan galeri foto masjid.',
  sholat: 'Lokasi dan waktu sholat yang tampil di beranda.', donasi: 'Program, pembayaran, dan riwayat donatur.',
  kajian: 'Jadwal kajian dan acara masjid.', kegiatan: 'Kegiatan rutin beserta dokumentasinya.',
  artikel: 'Berita dan artikel untuk jamaah.', kontak: 'Kontak dan media sosial pengurus.', akun: 'Keamanan akun admin.',
}
let timer

const cfg = computed(() => CFG[view.value === 'donasi' ? TABS[tab.value][0] : view.value])
const rows = computed(() => (cfg.value?.key ? db[cfg.value.key] : []))
const clone = (o) => JSON.parse(JSON.stringify(o ?? {}))

function toast(t, bad = false) {
  msg.value = { t, bad, show: true }
  clearTimeout(timer); timer = setTimeout(() => (msg.value.show = false), 3000)
}
const fail = (e) => toast('Gagal: ' + (e?.message || 'periksa koneksi'), true)
function go(v) { view.value = v; side.value = false }
watch([view, tab], () => { if (cfg.value?.single) draft.value = clone(db[cfg.value.single]) })

let channel
function listen() {
  if (channel || !supabase) return
  channel = supabase.channel('admin-donors')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'donors' }, (p) => {
      const row = p.new.data
      if (db.DONORS.some((d) => d.id === row.id)) return
      db.DONORS.push(row); toast(`Donasi baru masuk: ${row.name} ${rp(row.amount)}`)
    }).subscribe()
}
onBeforeUnmount(() => channel && supabase.removeChannel(channel))

async function boot() {
  try {
    await loadDB(); listen()
    const h = db.sholat
    if (h.auto && h.lat && h.lng && h.updated !== today()) {
      try { Object.assign(h, await fetchTimes(h), { updated: today() }); await saveSetting('sholat') } catch { /* offline */ }
    }
  } catch (e) { fail(e) }
}
async function doLogin() {
  login.value.err = ''; loginBusy.value = true
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email: login.value.u.trim(), password: login.value.p })
    if (error) {
      const m = (error.message || '').toLowerCase()
      login.value.err = m.includes('not confirmed') ? 'Email belum dikonfirmasi. Buka Supabase > Authentication > Users dan konfirmasi akun ini.'
        : error.status === 429 || m.includes('rate limit') ? 'Terlalu banyak percobaan. Coba lagi beberapa menit lagi.'
        : error.status === 0 || m.includes('fetch') ? 'Tidak dapat terhubung ke server. Periksa koneksi internet.'
        : m.includes('invalid login credentials') ? 'Email atau password salah.'
        : 'Gagal masuk: ' + (error.message || 'kesalahan tidak diketahui') + '. Periksa VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY di file .env.'
      return
    }
    applyUser(data.user); authed.value = true; await boot()
  } catch { login.value.err = 'Tidak dapat terhubung ke server. Periksa koneksi internet.' } finally { loginBusy.value = false }
}
async function logout() { if (channel) { supabase.removeChannel(channel); channel = null } await supabase.auth.signOut(); authed.value = false; login.value = { u: '', p: '', err: '' } }

async function saveSingle() {
  const c = cfg.value, n = normalize(c.f, draft.value)
  if (c.single === 'sholat') n.updated = today()
  busy.value = true
  try { db[c.single] = n; await saveSetting(c.single); note(c.t + ' diperbarui'); toast('Tersimpan.') } catch (e) { fail(e) } finally { busy.value = false }
}
async function autoTimes() {
  const d = draft.value
  if (!d.lat || !d.lng) return toast('Isi latitude dan longitude dulu.', true)
  try { Object.assign(d, await fetchTimes(d)); toast('Jadwal terisi. Klik Simpan untuk menerapkan.') }
  catch { toast('Gagal mengambil jadwal. Cek koneksi atau isi manual.', true) }
}
function openForm(i) {
  const c = cfg.value
  dlg.value = { i, model: clone(i == null ? (c.def ? c.def() : {}) : rows.value[i]) }
}
async function submitForm() {
  const c = cfg.value, { i, model } = dlg.value
  const o = normalize(c.f, model); c.pre?.(o, model)
  if (c.key === 'DONORS' && !o.program) return toast('Buat program donasi dulu.', true)
  const prev = i == null ? null : { ...rows.value[i] }
  busy.value = true
  try {
    c.hook?.(prev, o) // donasi terverifikasi memperbarui total program
    await upsert(c.key, o)
    if (c.key === 'DONORS') await Promise.all(db.PROGRAMS.map((p) => upsert('PROGRAMS', p)))
    if (i == null) rows.value.push(o); else rows.value[i] = o
    note((i == null ? 'Menambah ' : 'Mengubah ') + c.item + ': ' + (o.title || o.name))
    dlg.value = null; toast('Tersimpan.')
  } catch (e) { await loadDB(); fail(e) } finally { busy.value = false }
}
async function remove(i) {
  const c = cfg.value, old = rows.value[i]
  if (!confirm(`Hapus ${c.item} ini? Tindakan tidak bisa dibatalkan.`)) return
  try {
    c.hook?.(old, null)
    await removeRow(c.key, old.id)
    if (c.key === 'DONORS') await Promise.all(db.PROGRAMS.map((p) => upsert('PROGRAMS', p)))
    rows.value.splice(i, 1)
    note('Menghapus ' + c.item + ': ' + (old.title || old.name)); toast('Terhapus.')
  } catch (e) { await loadDB(); fail(e) }
}
async function verify(i) {
  const c = cfg.value, prev = { ...rows.value[i] }, o = { ...prev, status: 'verified' }
  try {
    c.hook(prev, o)
    await upsert('DONORS', o)
    await Promise.all(db.PROGRAMS.map((p) => upsert('PROGRAMS', p)))
    rows.value[i] = o; note('Verifikasi donasi: ' + o.name); toast('Donasi diverifikasi, total program bertambah.')
  } catch (e) { await loadDB(); fail(e) }
}
function quickAdd(v, t = 0) { view.value = v; tab.value = t; openForm(null) }

function applyUser(u) {
  email.value = u.email
  const m = u.user_metadata || {}
  Object.assign(acct.value, { name: m.name || '', avatar: m.avatar_url ? { src: m.avatar_url } : null, since: u.created_at || '', last: u.last_sign_in_at || '' })
}
const when = (iso) => (iso ? new Date(iso).toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' }) : '—')
async function verifyCurrent(pw) {
  const { error } = await supabase.auth.signInWithPassword({ email: email.value, password: pw })
  if (error) toast('Password saat ini salah.', true)
  return !error
}
async function pickAvatar(e) {
  const file = e.target.files[0]
  if (!file) return
  try { acct.value.avatar = await uploadImage(file); toast('Foto dipilih. Klik Simpan profil.') } catch (err) { fail(err) } finally { e.target.value = '' }
}
async function saveProfile() {
  const { data, error } = await supabase.auth.updateUser({ data: { name: acct.value.name.trim(), avatar_url: acct.value.avatar?.src || null } })
  if (error) return fail(error)
  applyUser(data.user); toast('Profil diperbarui.')
}
async function saveEmail() {
  const ne = acct.value.newEmail.trim()
  if (!ne || ne === email.value) return toast('Isi email baru yang berbeda.', true)
  if (!(await verifyCurrent(acct.value.curE))) return
  const { error } = await supabase.auth.updateUser({ email: ne })
  if (error) return fail(error)
  acct.value.curE = ''; acct.value.newEmail = ''
  toast('Tautan konfirmasi dikirim ke email. Email baru aktif setelah dikonfirmasi.')
}
async function savePassword() {
  const p = pass.value
  if (p.np.length < 8 || p.np !== p.rp) return toast('Password baru minimal 8 karakter dan harus sama.', true)
  if (!(await verifyCurrent(p.cur))) return
  const { error } = await supabase.auth.updateUser({ password: p.np })
  if (error) return fail(error)
  pass.value = { cur: '', np: '', rp: '' }; toast('Password diperbarui.')
}
async function signOutAll() {
  if (!confirm('Keluar dari semua perangkat, termasuk perangkat ini?')) return
  await supabase.auth.signOut({ scope: 'global' }); authed.value = false; login.value = { u: '', p: '', err: '' }
}

const pageTitle = computed(() => LABEL[view.value] || '')
const initial = computed(() => ((acct.value.name || email.value)[0] || 'A').toUpperCase())
const pendingCount = computed(() => db.DONORS.filter((d) => d.status === 'pending').length)
const todayLabel = new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
const stats = computed(() => [
  [db.ARTICLES.filter((a) => a.status !== 'draft').length, 'Total artikel terbit'],
  [db.ACTIVITIES.length, 'Total kegiatan masjid'],
  [db.PROGRAMS.filter((p) => p.status !== 'selesai').length, 'Program donasi aktif'],
  [rp(db.DONORS.filter((d) => d.status !== 'pending').reduce((s, d) => s + (d.amount || 0), 0)), 'Total donasi tercatat'],
])
const upcoming = computed(() => db.EVENTS.filter((e) => e.status !== 'selesai' && e.date >= today()).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 4))
const perProgram = computed(() => db.PROGRAMS.map((p) => [p.name, db.DONORS.filter((d) => d.program === p.id && d.status !== 'pending').reduce((s, d) => s + (d.amount || 0), 0)]))

onMounted(async () => {
  if (supabase) {
    const { data } = await supabase.auth.getSession()
    if (data.session) { applyUser(data.session.user); authed.value = true; await boot() }
  }
  ready.value = true
})
</script>

<template>
  <div v-if="ready" class="adm">
    <!-- ===== Login ===== -->
    <section v-if="!authed" class="a-login">
      <form class="a-login-card" @submit.prevent="doLogin">
        <div class="a-login-head">
          <BrandMark />
          <div><strong>Masjid Jami' Al-Barokah</strong><small>Panel Pengurus</small></div>
        </div>
        <h1 class="sr-only">Masuk admin</h1>

        <p v-if="!supabase" class="a-alert err" role="alert"><ExclamationTriangleIcon class="size-5" /><span>Supabase belum dikonfigurasi. Isi <b>VITE_SUPABASE_URL</b> dan <b>VITE_SUPABASE_ANON_KEY</b> di file .env, lalu jalankan ulang.</span></p>
        <p v-if="login.err" class="a-alert err" role="alert"><ExclamationTriangleIcon class="size-5" /><span>{{ login.err }}</span></p>

        <div class="fgrid" style="grid-template-columns:1fr">
          <div class="fld">
            <label for="lu">Email</label>
            <div class="a-inp"><EnvelopeIcon /><input id="lu" v-model="login.u" type="email" autocomplete="username" placeholder="nama@email.com" required></div>
          </div>
          <div class="fld">
            <label for="lp">Password</label>
            <div class="a-inp">
              <LockClosedIcon />
              <input id="lp" v-model="login.p" :type="showPass ? 'text' : 'password'" autocomplete="current-password" placeholder="Masukkan password" required>
              <button type="button" class="a-eye" :aria-label="showPass ? 'Sembunyikan password' : 'Tampilkan password'" @click="showPass = !showPass">
                <EyeSlashIcon v-if="showPass" class="size-5" /><EyeIcon v-else class="size-5" />
              </button>
            </div>
          </div>
        </div>
        <button class="a-btn a-btn-p a-btn-block" style="margin-top:24px" type="submit" :disabled="loginBusy || !supabase">{{ loginBusy ? 'Memproses…' : 'Masuk' }}</button>
        <a class="a-back" href="#beranda">← Kembali ke website</a>
      </form>
      <small class="a-login-foot">© {{ year }} Masjid Jami' Al-Barokah</small>
    </section>

    <!-- ===== Dashboard admin ===== -->
    <div v-else class="a-app">
      <div v-if="side" class="a-scrim" @click="side = false"></div>
      <aside class="a-side" :class="{ open: side }">
        <div class="a-brandrow"><BrandMark /><div><strong>Masjid Al-Barokah</strong><small>Panel Pengurus</small></div></div>
        <nav class="a-nav" aria-label="Menu admin">
          <template v-for="[label, keys] in GROUPS" :key="label">
            <div class="a-navlabel">{{ label }}</div>
            <button v-for="k in keys" :key="k" type="button" class="a-navbtn" :class="{ on: view === k }" :aria-current="view === k ? 'page' : undefined" @click="go(k)">
              <component :is="ICON[k]" class="size-5" />{{ LABEL[k] }}
            </button>
          </template>
        </nav>
        <div class="a-user">
          <div class="a-userrow"><span class="a-avatar" aria-hidden="true"><img v-if="acct.avatar" :src="acct.avatar.src" alt=""><span v-else>{{ initial }}</span></span><div><b>{{ acct.name || 'Admin' }}</b><span>{{ email }}</span></div></div>
          <button type="button" class="a-logout" @click="logout"><ArrowRightOnRectangleIcon class="size-4" /> Keluar</button>
        </div>
      </aside>

      <div>
        <header class="a-top">
          <button class="a-btn a-btn-sm a-menubtn" aria-label="Buka menu" @click="side = !side"><Bars3Icon class="size-5" /></button>
          <span class="a-crumb">Admin / <b>{{ pageTitle }}</b></span>
          <a class="a-btn a-btn-sm" style="margin-left:auto" href="#beranda" target="_blank" rel="noopener">Lihat website <ArrowTopRightOnSquareIcon class="size-4" /></a>
        </header>

        <main id="main" class="a-main" tabindex="-1">
          <!-- Dashboard -->
          <template v-if="view === 'dashboard'">
            <div class="a-pagehead"><div><h2>Assalamu'alaikum</h2><p>{{ todayLabel }} · {{ SUB.dashboard }}</p></div></div>
            <p v-if="pendingCount" class="a-alert warn" role="status"><ExclamationTriangleIcon class="size-5" /><span><b>{{ pendingCount }} donasi menunggu verifikasi.</b> <a href="#admin" style="color:inherit;text-decoration:underline" @click.prevent="view = 'donasi'; tab = 2">Tinjau sekarang</a></span></p>

            <div class="a-stats">
              <div v-for="([n, l], i) in stats" :key="l" class="a-card a-stat"><span class="a-statico"><component :is="STAT_ICON[i]" class="size-6" /></span><div><b>{{ n }}</b><span>{{ l }}</span></div></div>
            </div>
            <div class="a-grid">
              <div class="a-card"><h3>Kajian / acara mendatang</h3>
                <ul v-if="upcoming.length" class="a-list"><li v-for="e in upcoming" :key="e.id"><b>{{ e.title }}</b><br><span class="muted">{{ dt(e.date) }} · {{ e.time }}</span></li></ul>
                <p v-else class="muted">Belum ada acara mendatang.</p></div>
              <div class="a-card"><h3>Donasi terverifikasi per program</h3>
                <DonutChart :key="perProgram.length + rp(stats[3][0])" :labels="perProgram.map((x) => x[0])" :data="perProgram.map((x) => x[1])" /></div>
              <div class="a-card" style="grid-column:1/-1"><h3>Aktivitas terbaru</h3>
                <ul v-if="db.log.length" class="a-list"><li v-for="l in db.log" :key="l.at">{{ l.t }} <span class="muted">· {{ new Date(l.at).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }) }}</span></li></ul>
                <p v-else class="muted">Belum ada aktivitas.</p></div>
            </div>
            <div class="a-quick">
              <button class="a-btn a-btn-p" @click="quickAdd('artikel')"><PlusIcon class="size-4" /> Tambah artikel</button>
              <button class="a-btn a-btn-p" @click="quickAdd('kegiatan')"><PlusIcon class="size-4" /> Tambah kegiatan</button>
              <button class="a-btn a-btn-p" @click="quickAdd('donasi', 0)"><PlusIcon class="size-4" /> Tambah program donasi</button>
            </div>
          </template>

          <!-- Akun -->
          <template v-else-if="view === 'akun'">
            <div class="a-pagehead"><div><h2>Pengaturan Akun</h2><p>{{ SUB.akun }}</p></div></div>
            <div class="a-stack">
              <form class="a-card" @submit.prevent="saveProfile">
                <h3><UserCircleIcon class="size-5" /> Profil</h3>
                <div class="a-profile">
                  <span class="a-avatar a-avatar-lg" aria-hidden="true"><img v-if="acct.avatar" :src="acct.avatar.src" alt=""><span v-else>{{ initial }}</span></span>
                  <div class="fld">
                    <label for="avf">Foto profil</label>
                    <input id="avf" type="file" accept="image/*" @change="pickAvatar">
                    <button v-if="acct.avatar" type="button" class="a-btn a-btn-sm a-btn-d" style="justify-self:start" @click="acct.avatar = null">Hapus foto</button>
                  </div>
                </div>
                <div class="fgrid">
                  <div class="fld"><label for="an">Nama tampilan</label><input id="an" v-model="acct.name" maxlength="60" placeholder="mis. Pengurus DKM"></div>
                  <div class="fld"><label for="ae0">Email saat ini</label><input id="ae0" :value="email" disabled></div>
                </div>
                <div class="a-foot"><button class="a-btn a-btn-p" type="submit">Simpan profil</button></div>
              </form>

              <form class="a-card" @submit.prevent="saveEmail">
                <h3><AtSymbolIcon class="size-5" /> Ganti email</h3>
                <div class="fgrid">
                  <div class="fld"><label for="ae1">Email baru</label><input id="ae1" v-model="acct.newEmail" type="email" required autocomplete="email"></div>
                  <div class="fld"><label for="ae2">Password saat ini</label><input id="ae2" v-model="acct.curE" type="password" required autocomplete="current-password"></div>
                </div>
                <p class="muted" style="margin:12px 0 0;font-size:13px">Supabase mengirim tautan konfirmasi ke email. Email baru baru aktif setelah tautan diklik, jadi pastikan alamatnya benar.</p>
                <div class="a-foot"><button class="a-btn a-btn-p" type="submit">Ganti email</button></div>
              </form>

              <form class="a-card" @submit.prevent="savePassword">
                <h3><KeyIcon class="size-5" /> Ganti password</h3>
                <div class="fgrid">
                  <div class="fld full"><label for="ap0">Password saat ini</label><input id="ap0" v-model="pass.cur" type="password" required autocomplete="current-password"></div>
                  <div class="fld"><label for="ap">Password baru</label><input id="ap" v-model="pass.np" type="password" minlength="8" required autocomplete="new-password"><small>Minimal 8 karakter.</small></div>
                  <div class="fld"><label for="ar">Ulangi password baru</label><input id="ar" v-model="pass.rp" type="password" required autocomplete="new-password"></div>
                </div>
                <div class="a-foot"><button class="a-btn a-btn-p" type="submit">Simpan password</button></div>
              </form>

              <div class="a-card">
                <h3><ShieldCheckIcon class="size-5" /> Keamanan &amp; sesi</h3>
                <dl class="a-info">
                  <dt>Akun dibuat</dt><dd>{{ when(acct.since) }}</dd>
                  <dt>Login terakhir</dt><dd>{{ when(acct.last) }}</dd>
                </dl>
                <p class="muted" style="margin:14px 0 0;font-size:13px">Jika Anda login di perangkat lain atau curiga akun diakses orang lain, keluarkan semua sesi lalu ganti password.</p>
                <div class="a-foot"><button type="button" class="a-btn a-btn-d" @click="signOutAll"><ArrowRightOnRectangleIcon class="size-4" /> Keluar dari semua perangkat</button></div>
              </div>
            </div>
          </template>

          <!-- Modul data (daftar / form tunggal) -->
          <template v-else>
            <div class="a-pagehead">
              <div><h2>{{ pageTitle }}</h2><p>{{ SUB[view] }}</p></div>
              <button v-if="!cfg.single" class="a-btn a-btn-p" @click="openForm(null)"><PlusIcon class="size-4" /> Tambah {{ cfg.item }}</button>
            </div>

            <TabGroup v-if="view === 'donasi'" :selected-index="tab" @change="tab = $event">
              <TabList class="a-tabs"><Tab v-for="[k, l] in TABS" :key="k" v-slot="{ selected }" as="template"><button type="button" :class="{ on: selected }">{{ l }}</button></Tab></TabList>
            </TabGroup>

            <template v-if="cfg.single">
              <form :key="cfg.single" class="a-card" @submit.prevent="saveSingle">
                <h3>{{ cfg.t }}</h3>
                <FieldGrid :fields="cfg.f" :model="draft" />
                <div class="a-foot">
                  <button v-if="cfg.tools" type="button" class="a-btn" @click="autoTimes">Ambil jadwal otomatis</button>
                  <button class="a-btn a-btn-p" type="submit" :disabled="busy">{{ busy ? 'Menyimpan…' : 'Simpan perubahan' }}</button>
                </div>
              </form>
            </template>

            <div v-else class="a-card a-tw">
              <table v-if="rows.length">
                <thead><tr><th v-for="c in cfg.cols" :key="c[0]">{{ c[0] }}</th><th></th></tr></thead>
                <tbody><tr v-for="(r, i) in rows" :key="r.id || i">
                  <td v-for="c in cfg.cols" :key="c[0]">
                    <span v-if="c[2] === 'badge'" class="a-badge" :class="{ w: c[1](r)[1] }">{{ c[1](r)[0] }}</span>
                    <template v-else>{{ c[1](r) }}</template>
                  </td>
                  <td class="a-act">
                    <button v-if="cfg.key === 'DONORS' && r.status === 'pending'" class="a-btn a-btn-sm a-btn-p" @click="verify(i)">Verifikasi</button>
                    <button class="a-btn a-btn-sm" aria-label="Ubah" @click="openForm(i)"><PencilSquareIcon class="size-4" /></button>
                    <button class="a-btn a-btn-sm a-btn-d" aria-label="Hapus" @click="remove(i)"><TrashIcon class="size-4" /></button>
                  </td>
                </tr></tbody>
              </table>
              <div v-else class="a-empty">
                <InboxIcon class="size-10" /><b style="color:var(--ink)">Belum ada data</b><span>Mulai dengan menambahkan {{ cfg.item }} pertama.</span>
                <button class="a-btn a-btn-p" @click="openForm(null)"><PlusIcon class="size-4" /> Tambah {{ cfg.item }}</button>
              </div>
            </div>
          </template>
        </main>
      </div>
    </div>

    <div class="a-toast" :class="{ show: msg.show, bad: msg.bad }" role="status">{{ msg.t }}</div>
  </div>

  <Dialog :open="!!dlg" class="adm relative z-50" @close="dlg = null">
    <div class="fixed inset-0 bg-ink/60" aria-hidden="true" />
    <div class="fixed inset-0 overflow-y-auto p-3 grid place-items-start sm:place-items-center">
      <DialogPanel v-if="dlg" class="a-card a-dlg w-full max-w-3xl">
        <form @submit.prevent="submitForm">
          <h3>{{ dlg.i == null ? 'Tambah' : 'Ubah' }} {{ cfg.item }}</h3>
          <FieldGrid :fields="cfg.f" :model="dlg.model" />
          <div class="a-foot"><button type="button" class="a-btn" @click="dlg = null">Batal</button><button class="a-btn a-btn-p" type="submit" :disabled="busy">{{ busy ? 'Menyimpan…' : 'Simpan' }}</button></div>
        </form>
      </DialogPanel>
    </div>
  </Dialog>
</template>
