<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
import PrayerCard from '../components/PrayerCard.vue'
import ArticleCard from '../components/ArticleCard.vue'
import ContactSection from '../components/ContactSection.vue'
import Media from '../components/Media.vue'
import { ACTIVITIES, ARTICLES } from '../data/content'
import { live } from '../admin/db'
import { store } from '../store'

const pages = ref(1)
const active = ref(0)
function measure() {
  const t = track.value
  if (!t) return
  const max = t.scrollWidth - t.clientWidth
  pages.value = max > 4 ? Math.ceil(t.scrollWidth / t.clientWidth - 0.01) : 1
  active.value = max > 4 ? Math.round((t.scrollLeft / max) * (pages.value - 1)) : 0
}
function toPage(i) {
  const t = track.value
  const max = t.scrollWidth - t.clientWidth
  t.scrollTo({ left: pages.value > 1 ? (max * i) / (pages.value - 1) : 0, behavior: 'smooth' })
}
let ro
onMounted(() => { measure(); ro = new ResizeObserver(measure); ro.observe(track.value) })
onBeforeUnmount(() => ro?.disconnect())

const articles = computed(() => (live.value, ARTICLES.toSorted((a, b) => b.date.localeCompare(a.date)).slice(0, 3)))
const programs = computed(() => (live.value, [...ACTIVITIES]))

const track = ref(null)
function slide(dir) {
  const t = track.value
  if (!t) return
  const max = t.scrollWidth - t.clientWidth
  if (dir > 0 && t.scrollLeft >= max - 4) t.scrollTo({ left: 0, behavior: 'smooth' })
  else if (dir < 0 && t.scrollLeft <= 4) t.scrollTo({ left: max, behavior: 'smooth' })
  else t.scrollBy({ left: dir * t.clientWidth * 0.8, behavior: 'smooth' })
}
</script>

<template>
  <section class="view" aria-label="Beranda">
    <div class="hero">
      <div class="wrap hero-grid">
        <div class="hero-profile">
          <img class="hero-profile-img" src="/assets/stock/masjid-hero.jpg" width="1600" height="1067" fetchpriority="high"
               alt="Masjid dengan kubah putih dan menara berkisi, tampak dari halaman luas.">
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
        <div class="pcar">
          <button type="button" class="pcar-btn pcar-prev" aria-label="Program sebelumnya" @click="slide(-1)"><ChevronLeftIcon class="size-5" /></button>
          <div ref="track" class="pcar-track" role="region" aria-label="Daftar program">
            <a v-for="p in programs" :key="p.id" class="pcar-card" :href="'#program/' + p.id" @click.prevent="store.go('program', p.id)">
              <Media :image="p.image" cls="pcar-media" />
              <div class="pcar-body"><strong>{{ p.title }}</strong><span>{{ p.desc }}</span></div>
            </a>
          </div>
          <div v-if="pages > 1" class="pcar-dots" role="group" aria-label="Indikator slide program">
            <button v-for="n in pages" :key="n" type="button" :class="{ on: n - 1 === active }"
                    :aria-label="`Slide ${n} dari ${pages}`" :aria-current="n - 1 === active ? 'true' : undefined" @click="toPage(n - 1)"></button>
          </div>
          <button type="button" class="pcar-btn pcar-next" aria-label="Program berikutnya" @click="slide(1)"><ChevronRightIcon class="size-5" /></button>
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