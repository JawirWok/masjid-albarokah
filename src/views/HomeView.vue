<script setup>
import { ArrowRightIcon } from '@heroicons/vue/24/outline'
import PrayerCard from '../components/PrayerCard.vue'
import EventCard from '../components/EventCard.vue'
import ActivityCard from '../components/ActivityCard.vue'
import ArticleCard from '../components/ArticleCard.vue'
import ContactSection from '../components/ContactSection.vue'
import { EVENTS, ACTIVITIES, ARTICLES, TODAY_ISO } from '../data/content'
import { store } from '../store'

const byDateDesc = (a, b) => b.date.localeCompare(a.date)
const sorted = [...EVENTS].sort((a, b) => a.date.localeCompare(b.date))
const upcoming = sorted.filter((e) => e.date >= TODAY_ISO)
const events = (upcoming.length ? upcoming : sorted).slice(0, 3)
const activities = [...ACTIVITIES].sort(byDateDesc).slice(0, 3)
const articles = [...ARTICLES].sort(byDateDesc).slice(0, 3)
</script>

<template>
  <section class="view" aria-label="Beranda">
    <div class="hero">
      <div class="wrap hero-grid">
        <div class="hero-profile">
          <img class="hero-profile-img" src="/assets/stock/masjid-hero.jpg" width="1600" height="1067"
               alt="Masjid dengan kubah putih dan menara berkisi, tampak dari halaman luas.">
          <div class="hero-profile-scrim" aria-hidden="true"></div>
          <div class="hero-copy">
            <p class="eyebrow eyebrow-light">Profil singkat</p>
            <h1>Masjid Jami'<br>Al-Barokah</h1>
            <p class="hero-tagline">Pusat ibadah, ilmu, dan kepedulian warga Tangerang Selatan. Mari sholat berjamaah, menuntut ilmu, dan berbagi kebaikan bersama.</p>
            <div class="hero-actions">
              <button type="button" class="btn btn-light" @click="store.go('donasi')">Salurkan donasi <ArrowRightIcon class="size-4 inline" /></button>
              <button type="button" class="btn btn-outline-light" @click="store.go('acara')">Jadwal &amp; acara</button>
            </div>
          </div>
        </div>
        <div class="prayer-wrap"><PrayerCard /></div>
      </div>
    </div>

    <section class="section section-alt" aria-labelledby="h-acara">
      <div class="wrap">
        <div class="section-head">
          <div><p class="eyebrow">Kajian &amp; acara</p><h2 id="h-acara">Agenda yang menanti jamaah</h2></div>
          <button type="button" class="text-link" @click="store.go('acara')">Lihat semua agenda <ArrowRightIcon class="size-4 inline" /></button>
        </div>
        <div class="event-grid"><EventCard v-for="e in events" :key="e.id" :event="e" /></div>
      </div>
    </section>

    <section class="section" aria-labelledby="h-kegiatan">
      <div class="wrap">
        <div class="section-head">
          <div><p class="eyebrow">Kegiatan</p><h2 id="h-kegiatan">Kegiatan masjid terbaru</h2></div>
          <button type="button" class="text-link" @click="store.go('kegiatan')">Detail selengkapnya <ArrowRightIcon class="size-4 inline" /></button>
        </div>
        <div class="activity-grid"><ActivityCard v-for="a in activities" :key="a.id" :activity="a" /></div>
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
