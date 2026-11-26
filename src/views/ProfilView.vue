<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon, ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/outline'
import { store } from '../store'
import BackHome from '../components/BackHome.vue'
import { GALLERY, PROFILE, mapsHref } from '../data/content'

const mapSrc = computed(() => `https://maps.google.com/maps?q=${encodeURIComponent(`Masjid Jami' Al-Barokah ${PROFILE.alamat}`)}&z=17&output=embed`)

const FALLBACK = '/assets/stock/masjid-hero.jpg'
const onErr = (e) => { e.target.onerror = null; e.target.src = FALLBACK }

const items = computed(() => GALLERY)
const total = computed(() => GALLERY.length)
const idx = ref(0)
const lb = ref(false)
const lbIdx = ref(0)
const wrap = (i) => (total.value ? ((i % total.value) + total.value) % total.value : 0)
const go = (i) => { idx.value = wrap(i) }
const openLb = (i) => { lbIdx.value = wrap(i); lb.value = true }

// Peta: koordinat dari Admin > Kontak bila ada, kalau tidak Google mencari lewat nama + alamat

// geser (swipe) di HP
let sx = 0, sy = 0, swiped = false
const onTouchStart = (e) => { sx = e.changedTouches[0].screenX; sy = e.changedTouches[0].screenY; swiped = false }
const onTouchEnd = (e) => {
  const dx = e.changedTouches[0].screenX - sx, dy = e.changedTouches[0].screenY - sy
  if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) { swiped = true; go(idx.value + (dx < 0 ? 1 : -1)) }
}
const onSliderClick = () => { if (swiped) { swiped = false; return } openLb(idx.value) }

const onKey = (e) => {
  if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return
  const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
  if (!d) return
  if (lb.value) lbIdx.value = wrap(lbIdx.value + d)
  else if (store.donationProgram === null) go(idx.value + d)
}
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <div class="pf">
    <!-- Hero -->
    <section class="pf-hero">
      <div class="pf-wrap pf-hero-body">
        <BackHome />
        <h1 class="pf-title">Profil Masjid Jami' Al-Barokah</h1>
        <p class="pf-lead">Gambaran mengenai fasilitas, visi, dan lingkungan Masjid Jami' Al-Barokah.</p>
      </div>
    </section>

    <!-- Statistik -->
    <section class="pf-stats" aria-label="Statistik masjid">
      <div class="pf-wrap">
        <div class="pf-statgrid">
          <div class="pf-card"><p class="pf-statlabel">Tahun Berdiri</p><p class="pf-statvalue">{{ PROFILE.tahun }}</p></div>
          <div class="pf-card"><p class="pf-statlabel">Kapasitas Jamaah</p><p class="pf-statvalue">{{ PROFILE.kapasitas }} Orang</p></div>
          <div class="pf-card"><p class="pf-statlabel">Jumlah Lantai</p><p class="pf-statvalue">{{ PROFILE.lantai }} Lantai</p></div>
        </div>
      </div>
    </section>

    <!-- Visi & Misi -->
    <section class="pf-section" aria-labelledby="pf-vm-h">
      <div class="pf-wrap">
        <h2 id="pf-vm-h" class="pf-sr">Visi dan Misi Masjid</h2>
        <div class="pf-vm">
          <div class="pf-visi">
            <p class="pf-eyebrow pf-eyebrow-mint">VISI</p>
            <blockquote class="pf-quote">“{{ PROFILE.visi }}”</blockquote>
          </div>
          <div class="pf-card pf-misi">
            <h3 class="pf-eyebrow pf-eyebrow-green">MISI</h3>
            <ul class="pf-misi-list">
              <li v-for="(m, i) in PROFILE.misi" :key="m">
                <span class="pf-num">{{ String(i + 1).padStart(2, '0') }}</span>
                <p>{{ m }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Galeri & fasilitas -->
    <section v-if="total" class="pf-section" aria-labelledby="pf-gal-h">
      <div class="pf-wrap">
        <div class="pf-head">
          <p class="pf-eyebrow pf-eyebrow-green">GALERI &amp; FASILITAS</p>
          <h2 id="pf-gal-h" class="pf-h2">Fasilitas &amp; Area Masjid</h2>
        </div>

        <div class="pf-slider" role="region" aria-roledescription="carousel" aria-label="Galeri fasilitas dan area masjid"
             @touchstart.passive="onTouchStart" @touchend.passive="onTouchEnd" @click="onSliderClick">
          <div class="pf-track" :style="{ transform: `translateX(-${idx * 100}%)` }">
            <div v-for="g in items" :key="g.src" class="pf-slide"><img :src="g.src" :alt="g.alt || g.caption" loading="lazy" @error="onErr"></div>
          </div>
          <div class="pf-caption">
            <h3>{{ items[idx]?.caption }}</h3>
            <span class="pf-counter">{{ idx + 1 }} / {{ total }}</span>
          </div>
          <button type="button" class="pf-arrow pf-prev" aria-label="Foto sebelumnya" @click.stop="go(idx - 1)"><ChevronLeftIcon /></button>
          <button type="button" class="pf-arrow pf-next" aria-label="Foto berikutnya" @click.stop="go(idx + 1)"><ChevronRightIcon /></button>
        </div>

        <div class="pf-dots" aria-label="Pilih slide galeri">
          <button v-for="(g, i) in items" :key="g.src" type="button" :aria-label="`Tampilkan ${g.caption} (${i + 1} dari ${total})`" :class="{ on: i === idx }" @click="go(i)"></button>
        </div>
      </div>
    </section>

    <!-- Lokasi -->
    <section class="pf-section pf-last" aria-labelledby="pf-loc-h">
      <div class="pf-wrap">
        <div class="pf-card pf-loccard">
          <div class="pf-loc">
            <div class="pf-locinfo">
              <div>
                <p class="pf-eyebrow pf-eyebrow-green">LOKASI MASJID</p>
                <h2 id="pf-loc-h" class="pf-h2">Alamat Masjid</h2>
                <p class="pf-addr">{{ PROFILE.alamat }}</p>
              </div>
              <a class="pf-btn-outline" :href="mapsHref()" target="_blank" rel="noopener noreferrer"><span>Buka di Google Maps</span><ArrowTopRightOnSquareIcon /></a>
            </div>
            <div class="pf-map"><iframe title="Peta lokasi Masjid Jami' Al-Barokah" :src="mapSrc" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Lightbox -->
    <Dialog :open="lb" class="pf-lb-root" @close="lb = false">
      <div class="pf-lb-backdrop" aria-hidden="true"></div>
      <div class="pf-lb-wrap">
        <DialogPanel class="pf-lb-panel">
          <button type="button" class="pf-lb-close" aria-label="Tutup galeri" @click="lb = false"><XMarkIcon /></button>
          <div class="pf-lb-stage">
            <img :src="items[lbIdx]?.src" :alt="items[lbIdx]?.alt" @error="onErr">
            <button type="button" class="pf-arrow pf-prev" aria-label="Foto sebelumnya" @click="lbIdx = wrap(lbIdx - 1)"><ChevronLeftIcon /></button>
            <button type="button" class="pf-arrow pf-next" aria-label="Foto berikutnya" @click="lbIdx = wrap(lbIdx + 1)"><ChevronRightIcon /></button>
          </div>
          <div class="pf-lb-foot">
            <DialogTitle as="h3">{{ items[lbIdx]?.caption }}</DialogTitle>
            <span>{{ lbIdx + 1 }} / {{ total }}</span>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  </div>
</template>

<style>
/* Gaya halaman Profil: semua diawali "pf-" agar tidak bentrok dengan CSS lama situs */
.pf{background:#F2F8F5;color:#1e293b;min-height:60vh;overflow-x:hidden;font-family:"Plus Jakarta Sans","Segoe UI",system-ui,sans-serif;line-height:1.5}
.pf,.pf *,.pf *::before,.pf *::after{box-sizing:border-box}
.pf h1,.pf h2,.pf h3,.pf p,.pf ul,.pf blockquote{margin:0;padding:0;font-family:inherit;letter-spacing:normal}
.pf ul{list-style:none}
.pf img{display:block;max-width:100%}
.pf button{font:inherit;cursor:pointer}
.pf .pf-wrap{max-width:1140px;margin:0 auto;padding:0 16px}
.pf .pf-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap}

/* hero */
.pf .pf-hero{position:relative;overflow:hidden;background:linear-gradient(100deg,rgba(6,46,39,.97) 0%,rgba(6,46,39,.88) 55%,rgba(6,46,39,.62) 100%),url("/assets/donasi-hero.jpg") center/cover no-repeat,#062e27}
.pf .pf-hero::before{content:"";position:absolute;inset:0;pointer-events:none;opacity:.12;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='88' height='88'%3E%3Cpath d='M44 6l8.5 22.5L75 38l-22.5 8.5L44 69l-8.5-22.5L13 38l22.5-9.5z' fill='none' stroke='%23a8d6c6' stroke-width='1'/%3E%3C/svg%3E")}
.pf .pf-hero-body{position:relative;z-index:10;padding-top:64px;padding-bottom:80px}
.pf .pf-eyebrow{font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase}
.pf .pf-eyebrow-light{color:#a7f3d0;letter-spacing:.1em;font-weight:600}
.pf .pf-eyebrow-mint{color:#6ee7b7}
.pf .pf-eyebrow-green{color:#0B4F3B}
.pf .pf-title{margin-top:8px;font-size:30px;line-height:1.15;font-weight:700;color:#fff;letter-spacing:-.02em}
.pf .pf-lead{margin-top:12px;max-width:42rem;font-size:16px;line-height:1.65;color:rgba(236,253,245,.92)}

/* statistik */
.pf .pf-stats{position:relative;z-index:20;margin-top:-32px;padding-bottom:40px}
.pf .pf-statgrid{display:grid;grid-template-columns:1fr;gap:16px}
.pf .pf-card{background:#fff;border:1px solid rgba(226,232,240,.85);border-radius:16px;padding:24px;box-shadow:0 1px 2px rgba(15,23,42,.06)}
.pf .pf-statlabel{font-size:12px;font-weight:500;color:#64748b}
.pf .pf-statvalue{margin-top:6px;font-size:24px;font-weight:700;color:#063B2C;letter-spacing:-.02em}

/* sections */
.pf .pf-section{padding-bottom:48px}
.pf .pf-last{padding-bottom:64px}
.pf .pf-head{margin-bottom:20px}
.pf .pf-h2{margin-top:6px;font-size:24px;line-height:1.2;font-weight:700;color:#063B2C;letter-spacing:-.02em}

/* visi & misi */
.pf .pf-vm{display:grid;grid-template-columns:1fr;gap:24px;align-items:stretch}
.pf .pf-visi{background:#063B2C;color:#fff;border-radius:16px;padding:32px;display:flex;flex-direction:column;justify-content:center}
.pf .pf-quote{margin-top:16px;font-size:20px;line-height:1.6;font-weight:600;color:#fff}
.pf .pf-misi{padding:32px;display:flex;flex-direction:column;justify-content:center}
.pf .pf-misi-list{margin-top:20px;display:grid;gap:16px}
.pf .pf-misi-list li{display:flex;align-items:flex-start;gap:16px}
.pf .pf-misi-list li+li{padding-top:16px;border-top:1px solid #f1f5f9}
.pf .pf-num{flex:none;width:28px;height:28px;margin-top:2px;border-radius:8px;background:#F2F8F5;color:#063B2C;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center}
.pf .pf-misi-list p{font-size:14px;line-height:1.65;color:#334155}

/* galeri */
.pf .pf-slider{position:relative;width:100%;aspect-ratio:16/9;max-height:540px;border-radius:16px;overflow:hidden;background:#0f172a;border:1px solid rgba(226,232,240,.85);box-shadow:0 1px 2px rgba(15,23,42,.06);user-select:none;cursor:pointer}
.pf .pf-track{display:flex;width:100%;height:100%;transition:transform .5s ease-out}
.pf .pf-slide{flex:0 0 100%;width:100%;height:100%}
.pf .pf-slide img{width:100%;height:100%;object-fit:cover}
.pf .pf-caption{position:absolute;left:0;right:0;bottom:0;height:112px;padding:16px;display:flex;align-items:flex-end;justify-content:space-between;gap:16px;pointer-events:none;background:linear-gradient(to top,rgba(0,0,0,.8),rgba(0,0,0,.35),transparent)}
.pf .pf-caption h3{font-size:16px;font-weight:600;color:#fff}
.pf .pf-counter{flex:none;padding:4px 12px;border-radius:999px;background:rgba(0,0,0,.5);border:1px solid rgba(255,255,255,.15);color:rgba(255,255,255,.95);font-size:12px;font-weight:500}
.pf .pf-arrow{position:absolute;top:50%;transform:translateY(-50%);z-index:20;width:40px;height:40px;border:0;border-radius:999px;background:rgba(255,255,255,.92);color:#063B2C;box-shadow:0 4px 10px rgba(0,0,0,.18);display:flex;align-items:center;justify-content:center;padding:0;transition:background .15s,color .15s}
.pf .pf-arrow:hover{background:#063B2C;color:#fff}
.pf .pf-arrow svg{width:20px;height:20px}
.pf .pf-prev{left:16px}.pf .pf-next{right:16px}
.pf .pf-dots{display:flex;justify-content:center;align-items:center;gap:8px;margin-top:16px}
.pf .pf-dots button{width:10px;height:10px;padding:0;border:0;border-radius:999px;background:#cbd5e1;transition:all .3s}
.pf .pf-dots button:hover{background:#94a3b8}
.pf .pf-dots button.on{width:28px;background:#063B2C}

/* lokasi */
.pf .pf-loccard{padding:24px}
.pf .pf-loc{display:grid;grid-template-columns:1fr;gap:24px}
.pf .pf-locinfo{display:flex;flex-direction:column;justify-content:space-between;gap:24px}
.pf .pf-addr{margin-top:16px;font-size:14px;line-height:1.65;color:#334155}
.pf .pf-btn-outline{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:12px 20px;border:1px solid #063B2C;border-radius:12px;color:#063B2C;font-size:14px;font-weight:600;text-decoration:none;transition:background .15s,color .15s}
.pf .pf-btn-outline:hover{background:#063B2C;color:#fff}
.pf .pf-btn-outline svg{width:16px;height:16px}
.pf .pf-map{height:260px;width:100%;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;background:#F2F8F5}
.pf .pf-map iframe{width:100%;height:100%;border:0}

@media(min-width:640px){
  .pf .pf-wrap{padding:0 24px}
  .pf .pf-hero-body{padding-top:96px;padding-bottom:112px}
  .pf .pf-title{font-size:36px}.pf .pf-lead{font-size:18px}
  .pf .pf-stats{margin-top:-40px;padding-bottom:48px}
  .pf .pf-statgrid{grid-template-columns:repeat(3,minmax(0,1fr));gap:24px}
  .pf .pf-statvalue{font-size:28px}
  .pf .pf-section{padding-bottom:64px}.pf .pf-last{padding-bottom:80px}
  .pf .pf-h2{font-size:30px}.pf .pf-quote{font-size:24px}.pf .pf-misi-list p{font-size:16px}
  .pf .pf-caption{height:128px;padding:24px}.pf .pf-caption h3{font-size:20px}.pf .pf-counter{font-size:14px}
  .pf .pf-arrow{width:44px;height:44px}
  .pf .pf-loccard{padding:32px}.pf .pf-map{height:300px}
}
@media(min-width:1024px){
  .pf .pf-title{font-size:48px}
  .pf .pf-loc{grid-template-columns:5fr 7fr;gap:32px}
}

/* lightbox (dirender di luar .pf, jadi memakai kelas sendiri) */
.pf-lb-root{position:relative;z-index:70;font-family:"Plus Jakarta Sans","Segoe UI",system-ui,sans-serif}
.pf-lb-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.9)}
.pf-lb-wrap{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;padding:16px}
.pf-lb-root .pf-lb-panel{position:relative;width:100%;max-width:1024px;background:#063B2C;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,.15);box-shadow:0 25px 50px rgba(0,0,0,.5)}
.pf-lb-root .pf-lb-stage{position:relative;aspect-ratio:16/9;max-height:75vh;background:#000;display:flex;align-items:center;justify-content:center}
.pf-lb-root .pf-lb-stage img{width:100%;height:100%;object-fit:contain;display:block}
.pf-lb-root .pf-lb-close{position:absolute;top:12px;right:12px;z-index:20;width:40px;height:40px;border:0;border-radius:999px;background:rgba(0,0,0,.6);color:#fff;display:flex;align-items:center;justify-content:center;padding:0;cursor:pointer}
.pf-lb-root .pf-lb-close:hover{background:rgba(0,0,0,.85)}
.pf-lb-root .pf-lb-close svg{width:20px;height:20px}
.pf-lb-root .pf-arrow{position:absolute;top:50%;transform:translateY(-50%);width:44px;height:44px;border:0;border-radius:999px;background:rgba(255,255,255,.92);color:#063B2C;display:flex;align-items:center;justify-content:center;padding:0;cursor:pointer;box-shadow:0 4px 10px rgba(0,0,0,.25)}
.pf-lb-root .pf-arrow:hover{background:#063B2C;color:#fff}
.pf-lb-root .pf-arrow svg{width:20px;height:20px}
.pf-lb-root .pf-prev{left:14px}.pf-lb-root .pf-next{right:14px}
.pf-lb-root .pf-lb-foot{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:16px 20px;color:#fff}
.pf-lb-root .pf-lb-foot h3{margin:0;font-size:16px;font-weight:600}
.pf-lb-root .pf-lb-foot span{flex:none;font-size:13px;color:rgba(167,243,208,.9);font-weight:500}

/* font judul sama seperti halaman lain (Marcellus) */
.pf .pf-title,.pf .pf-h2,.pf .pf-quote,.pf .pf-statvalue,.pf .pf-caption h3{font-family:var(--font-display);font-weight:400}
.pf-lb-root .pf-lb-foot h3{font-family:var(--font-display);font-weight:400}
</style>
