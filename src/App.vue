<script setup>
import { ref, computed, defineAsyncComponent } from 'vue'
import { Disclosure, DisclosureButton } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import BrandMark from './components/BrandMark.vue'
import HomeView from './views/HomeView.vue'
import ProfilView from './views/ProfilView.vue'
import DonationView from './views/DonationView.vue'
import NewsView from './views/NewsView.vue'
import DonationDialog from './components/DonationDialog.vue'
import { CONTACT_ITEMS } from './data/content'
import { live } from './admin/db'
import { store } from './store'
import ProgramView from './views/ProgramView.vue'

// Donasi tidak ada di NAV: di header cukup satu tombol "Donasi".
const NAV = [
  ['beranda', 'Beranda'], ['profil', 'Profil'], ['program', 'Program'], ['berita', 'Berita'],
]
const FOOTER_NAV = [...NAV, ['donasi', 'Donasi']]
const VIEWS = { beranda: HomeView, profil: ProfilView, donasi: DonationView, program: ProgramView, berita: NewsView }
const AdminApp = defineAsyncComponent(() => import('./admin/AdminApp.vue'))
const year = ref(new Date().getFullYear())

// Footer ikut daftar kontak dari Admin > Kontak: semua WhatsApp, Instagram, email, lalu peta.
const waText = (label) => (/pengurus/i.test(label) ? 'WhatsApp pengurus' : 'WhatsApp ' + label)
const FOOTER_CONTACT = computed(() => {
  live.value // hitung ulang saat admin mengubah kontak
  const out = []
  for (const c of CONTACT_ITEMS) if (c.icon === 'whatsapp') out.push({ text: waText(c.label), href: c.href })
  for (const c of CONTACT_ITEMS) {
    if (c.icon === 'instagram') out.push({ text: 'Instagram', href: c.href })
    if (c.icon === 'tiktok') out.push({ text: 'TikTok', href: c.href })
    if (c.icon === 'facebook') out.push({ text: 'Facebook', href: c.href })
    if (c.icon === 'youtube') out.push({ text: 'YouTube', href: c.href })
  }
  const pin = CONTACT_ITEMS.find((c) => c.icon === 'pin')
  if (pin) out.push({ text: 'Lihat lokasi di Google Maps', href: pin.href })
  return out
})
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
          <!-- hanya tampil di layar kecil (tombol header disembunyikan di sana) -->
          <button type="button" class="nav-link nav-donasi" :aria-current="store.view === 'donasi' ? 'page' : undefined"
                  @click="store.go('donasi'); close()">Donasi</button>
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
          <p class="footer-desc">Tempat beribadah, belajar Al-Quran, membangun akhlak, dan berbagi kebaikan bersama masyarakat.</p>
        </div>
        <nav class="footer-nav" aria-label="Navigasi footer">
          <span class="footer-heading">Jelajahi</span>
          <button v-for="[id, label] in FOOTER_NAV" :key="id" type="button" @click="store.go(id)">{{ label }}</button>
        </nav>
        <div class="footer-contact">
          <span class="footer-heading">Hubungi</span>
          <a v-for="c in FOOTER_CONTACT" :key="c.text" :href="c.href" target="_blank" rel="noopener">{{ c.text }}</a>
        </div>
      </div>
      <div class="wrap footer-bottom">
        <p>© {{ year }} Masjid Jami' Al-Barokah.</p>
      </div>
    </footer>

    <DonationDialog />
  </template>
</template>