import { reactive, watch, nextTick } from 'vue'
import { PAGE_TITLES } from './data/content'

const VIEWS = ['beranda', 'profil', 'donasi', 'acara', 'kegiatan', 'berita', 'admin']
// Hash: #beranda, #berita, #berita/<id-artikel>, #kegiatan/<id-kegiatan>
function parse() {
  const [v, id] = location.hash.slice(1).split('/')
  return { view: VIEWS.includes(v) ? v : 'beranda', detail: id || null }
}

export const store = reactive({
  ...parse(),
  eventId: null,          // id acara yang dibuka di dialog
  donationProgram: null,  // null = tertutup, '' = terbuka tanpa program
  go(name, detail = null) { this.view = name; this.detail = detail; window.scrollTo({ top: 0 }) },
  goContact() {
    this.go('beranda')
    nextTick(() => document.getElementById('kontak')?.scrollIntoView({ behavior: 'smooth' }))
  },
})

watch(() => [store.view, store.detail], ([v, d]) => {
  history.replaceState(null, '', '#' + v + (d ? '/' + d : ''))
  document.title = PAGE_TITLES[v === 'berita' ? 'artikel' : v] || "Masjid Jami' Al-Barokah"
}, { immediate: true })
window.addEventListener('hashchange', () => Object.assign(store, parse()))
