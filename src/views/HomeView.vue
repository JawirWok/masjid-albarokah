<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
import PrayerCard from '../components/PrayerCard.vue'
import ArticleCard from '../components/ArticleCard.vue'
import ContactSection from '../components/ContactSection.vue'
import Media from '../components/Media.vue'
import { ACTIVITIES, ARTICLES, HERO_DEFAULT, PROFILE } from '../data/content'
import { live } from '../admin/db'
import { store } from '../store'

const heroImg = computed(() => (live.value, PROFILE.hero?.src ? PROFILE.hero : HERO_DEFAULT))
const articles = computed(() => (live.value, ARTICLES.toSorted((a, b) => b.date.localeCompare(a.date)).slice(0, 3)))
const programs = computed(() => (live.value, [...ACTIVITIES]))

const track = ref(null)
const pages = ref(1)
const active = ref(0)
const status = ref('')
let stops = [0]
let pending = null
let startLeft = null
let settled = 0
let rafId = 0
let settleTimer = 0
let ro = null
const anims = new Map()
const hasScrollEnd = typeof window !== 'undefined' && 'onscrollend' in window
const hasViewTimeline = typeof CSS !== 'undefined' && CSS.supports('(animation-timeline: view()) and (animation-range: entry)')
const motionOk = () => typeof matchMedia !== 'function' || matchMedia('(prefers-reduced-motion: no-preference)').matches

function tickFallback(t) {
  if (!anims.size || !t) return
  const r = t.getBoundingClientRect()
  for (const card of t.children) {
    const anim = anims.get(card)
    if (!anim) continue
    const cr = card.getBoundingClientRect()
    anim.currentTime = Math.min(1, Math.max(0, (r.right - cr.left) / (r.width + cr.width)))
  }
}

function syncFallback(t) {
  if (!t || hasViewTimeline || !motionOk()) {
    anims.forEach((a) => a.cancel())
    anims.clear()
    return
  }
  const kids = new Set(t.children)
  for (const [el, anim] of anims) {
    if (!kids.has(el)) { anim.cancel(); anims.delete(el) }
  }
  for (const card of t.children) {
    if (anims.has(card)) continue
    const anim = card.animate(
      [
        { opacity: 0.55, scale: 0.94, offset: 0 },
        { opacity: 1, scale: 1, offset: 0.22 },
        { opacity: 1, scale: 1, offset: 0.78 },
        { opacity: 0.55, scale: 0.94, offset: 1 },
      ],
      { duration: 1, fill: 'both' },
    )
    anim.pause()
    anims.set(card, anim)
  }
  tickFallback(t)
}

function nearestStop(left) {
  let best = 0
  let dist = Infinity
  stops.forEach((s, i) => {
    const d = Math.abs(left - s)
    if (d < dist) { dist = d; best = i }
  })
  return best
}

function measure() {
  const t = track.value
  if (!t) return
  const cards = [...t.children]
  const max = Math.max(0, t.scrollWidth - t.clientWidth)
  if (max <= 4 || cards.length < 2) {
    stops = [0]
    pages.value = 1
    active.value = 0
    settled = 0
    syncFallback(t)
    return
  }
  const base = cards[0].offsetLeft
  const step = Math.max(1, cards[1].offsetLeft - base)
  const perView = Math.max(1, Math.floor((t.clientWidth + 20) / step))
  const nextStops = []
  for (let i = 0; i < cards.length; i += perView) {
    const left = Math.min(max, Math.max(0, cards[i].offsetLeft - base))
    if (nextStops.length && left - nextStops[nextStops.length - 1] <= 4) break
    nextStops.push(left)
    if (left >= max - 4) break
  }
  if (nextStops[nextStops.length - 1] < max - 4) nextStops.push(max)
  stops = nextStops
  pages.value = stops.length
  if (pending === null) active.value = nearestStop(t.scrollLeft)
  syncFallback(t)
}

function finishScroll() {
  const t = track.value
  if (!t) return
  pending = null
  startLeft = null
  const next = nearestStop(t.scrollLeft)
  active.value = next
  if (next !== settled) {
    settled = next
    if (pages.value > 1) status.value = `Halaman program ${next + 1} dari ${pages.value}`
  }
}

function goStop(i) {
  const t = track.value
  if (!t || pages.value <= 1) return
  const target = ((i % pages.value) + pages.value) % pages.value
  const left = stops[target]
  const smooth = motionOk()
  pending = target
  active.value = target
  startLeft = t.scrollLeft
  t.scrollTo({ left, behavior: smooth ? 'smooth' : 'auto' })
  if (!smooth || Math.abs(left - t.scrollLeft) < 2) finishScroll()
}

function slide(dir) { goStop((pending ?? active.value) + dir) }
function toPage(i) { goStop(i) }

function onScroll() {
  if (rafId) cancelAnimationFrame(rafId)
  rafId = requestAnimationFrame(() => {
    rafId = 0
    const t = track.value
    if (!t) return
    if (startLeft !== null && Math.abs(t.scrollLeft - startLeft) > 2) startLeft = null
    if (pending === null) {
      const near = nearestStop(t.scrollLeft)
      if (active.value !== near) active.value = near
    }
    tickFallback(t)
  })
  if (!hasScrollEnd) {
    clearTimeout(settleTimer)
    settleTimer = setTimeout(finishScroll, 120)
  }
}

function onScrollEnd() {
  const t = track.value
  if (!t) return
  if (pending !== null && startLeft !== null && Math.abs(t.scrollLeft - startLeft) <= 2 && Math.abs(stops[pending] - t.scrollLeft) > 2) {
    startLeft = null
    return
  }
  finishScroll()
}

function observeTrack() {
  ro?.disconnect()
  if (!track.value) return
  measure()
  ro = new ResizeObserver(measure)
  ro.observe(track.value)
}

onMounted(observeTrack)
watch(programs, observeTrack, { flush: 'post' })
onBeforeUnmount(() => {
  ro?.disconnect()
  if (rafId) cancelAnimationFrame(rafId)
  clearTimeout(settleTimer)
  anims.forEach((a) => a.cancel())
  anims.clear()
})
</script>

<template>
  <section class="view" aria-label="Beranda">
    <div class="hero">
      <div class="wrap hero-grid">
        <div class="hero-profile">
          <img class="hero-profile-img" :src="heroImg.src" :width="heroImg.width || HERO_DEFAULT.width"
               :height="heroImg.height || HERO_DEFAULT.height" fetchpriority="high"
               :alt="heroImg.alt || HERO_DEFAULT.alt">
          <div class="hero-profile-scrim" aria-hidden="true"></div>
          <div class="hero-copy">
            <p class="eyebrow eyebrow-light">Profil singkat</p>
            <h1>Masjid Jami'<br>Al-Barokah</h1>
            <p class="hero-tagline">Tempat beribadah, belajar Al-Quran, membangun akhlak, dan berbagi kebaikan bersama masyarakat.</p>
            <div class="hero-actions">
              <button type="button" class="btn btn-light" @click="store.go('profil')">Lihat profil <ArrowRightIcon class="size-4 inline" /></button>
            </div>
          </div>
        </div>
        <div class="prayer-wrap"><PrayerCard /></div>
      </div>
    </div>

    <section v-if="programs.length" class="section" aria-labelledby="h-program">
      <div class="wrap">
        <div class="section-head">
          <div><p class="eyebrow">Program</p><h2 id="h-program">Program masjid untuk jamaah</h2></div>
          <button type="button" class="text-link" @click="store.go('program')">Lihat semua program <ArrowRightIcon class="size-4 inline" /></button>
        </div>
        <div class="pcar" role="region" aria-roledescription="carousel" aria-label="Program masjid">
          <button v-if="pages > 1" type="button" class="pcar-btn pcar-prev" aria-label="Program sebelumnya" @click="slide(-1)"><ChevronLeftIcon class="size-5" /></button>
          <button v-if="pages > 1" type="button" class="pcar-btn pcar-next" aria-label="Program berikutnya" @click="slide(1)"><ChevronRightIcon class="size-5" /></button>
          <div ref="track" class="pcar-track" role="group" aria-label="Daftar program"
               @scroll.passive="onScroll" @scrollend="onScrollEnd">
            <a v-for="p in programs" :key="p.id" class="pcar-card" :href="'#program/' + p.id" @click.prevent="store.go('program', p.id)">
              <Media :image="p.image" cls="pcar-media" />
              <div class="pcar-body"><strong>{{ p.title }}</strong><span>{{ p.desc }}</span></div>
            </a>
          </div>
          <p class="sr-only" role="status" aria-live="polite">{{ status }}</p>
          <div v-if="pages > 1" class="pcar-dots" role="group" aria-label="Indikator slide program">
            <button v-for="n in pages" :key="n" type="button" :class="{ on: n - 1 === active }"
                    :aria-label="`Halaman program ${n} dari ${pages}`" :aria-current="n - 1 === active ? 'true' : undefined" @click="toPage(n - 1)"></button>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-alt" aria-labelledby="h-berita">
      <div class="wrap">
        <div class="section-head">
          <div><p class="eyebrow">Berita</p><h2 id="h-berita">Kabar dan artikel terbaru</h2></div>
          <button type="button" class="text-link" @click="store.go('berita')">Detail selengkapnya <ArrowRightIcon class="size-4 inline" /></button>
        </div>
        <div class="article-grid"><ArticleCard v-for="a in articles" :key="a.id" :article="a" /></div>
      </div>
    </section>

    <ContactSection />
  </section>
</template>