<script setup>
import { ref, defineAsyncComponent } from 'vue'
import { Disclosure, DisclosureButton } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon, ArrowRightIcon } from '@heroicons/vue/24/outline'
import BrandMark from './components/BrandMark.vue'
import HomeView from './views/HomeView.vue'
import ProfilView from './views/ProfilView.vue'
import DonationView from './views/DonationView.vue'
import EventsView from './views/EventsView.vue'
import ActivitiesView from './views/ActivitiesView.vue'
import NewsView from './views/NewsView.vue'
import EventDialog from './components/EventDialog.vue'
import DonationDialog from './components/DonationDialog.vue'
import { CONTACT_ITEMS } from './data/content'
import { store } from './store'

const NAV = [
  ['beranda', 'Beranda'], ['profil', 'Profil'], ['acara', 'Kajian & Acara'],
  ['kegiatan', 'Kegiatan'], ['berita', 'Berita'], ['donasi', 'Donasi'],
]
const VIEWS = { beranda: HomeView, profil: ProfilView, donasi: DonationView, acara: EventsView, kegiatan: ActivitiesView, berita: NewsView }
const AdminApp = defineAsyncComponent(() => import('./admin/AdminApp.vue'))
const year = ref(new Date().getFullYear())
</script>

<template>
  <AdminApp v-if="store.view === 'admin'" />
  <template v-else>
    <a class="skip-link" href="#main">Lewati ke konten utama</a>

    <Disclosure as="header" class="site-header" v-slot="{ open, close }">
      <div class="wrap header-inner">
        <a class="brand" href="#beranda" aria-label="Masjid Jami' Al-Barokah — Beranda" @click.prevent="store.go('beranda')">
          <BrandMark />
          <span class="brand-text">
            <span class="brand-name">Masjid Jami' Al-Barokah</span>
            <span class="brand-sub">Tangerang Selatan</span>
          </span>
        </a>
        <nav class="main-nav" :class="{ 'is-open': open }" aria-label="Navigasi utama">
          <button v-for="[id, label] in NAV" :key="id" type="button" class="nav-link"
                  :aria-current="store.view === id ? 'page' : undefined" @click="store.go(id); close()">{{ label }}</button>
          <button type="button" class="nav-link" @click="store.goContact(); close()">Kontak</button>
        </nav>
        <div class="header-actions">
          <button type="button" class="btn btn-primary btn-sm header-cta" @click="store.go('donasi')">Donasi</button>
          <DisclosureButton class="nav-toggle" :aria-label="open ? 'Tutup menu' : 'Buka menu'">
            <XMarkIcon v-if="open" class="size-6" /><Bars3Icon v-else class="size-6" />
          </DisclosureButton>
        </div>
      </div>
    </Disclosure>

    <main id="main" tabindex="-1"><component :is="VIEWS[store.view]" /></main>

    <footer class="site-footer">
      <div class="wrap footer-grid">
        <div class="footer-brand">
          <div class="brand brand-footer">
            <BrandMark />
            <span class="brand-text"><span class="brand-name">Masjid Jami' Al-Barokah</span><span class="brand-sub">Tangerang Selatan</span></span>
          </div>
          <p class="footer-desc">Rumah ibadah, majelis ilmu, dan simpul kepedulian warga. Mari bersama merawat masjid dan lingkungan.</p>
        </div>
        <nav class="footer-nav" aria-label="Navigasi footer">
          <span class="footer-heading">Jelajahi</span>
          <button v-for="[id, label] in NAV" :key="id" type="button" @click="store.go(id)">{{ label }}</button>
        </nav>
        <div class="footer-contact">
          <span class="footer-heading">Hubungi</span>
          <a v-for="c in CONTACT_ITEMS" :key="c.label" :href="c.href" target="_blank" rel="noopener">{{ c.label }}: {{ c.value }}</a>
        </div>
      </div>
      <div class="wrap footer-bottom">
        <p>© {{ year }} Masjid Jami' Al-Barokah. <a href="#admin" @click.prevent="store.go('admin')">Admin</a></p>
        <button type="button" class="text-link" @click="store.goContact()">Kontak pengurus <ArrowRightIcon class="size-4 inline" /></button>
      </div>
    </footer>

    <EventDialog />
    <DonationDialog />
  </template>
</template>
