<script setup>
import { GALLERY, PROFILE } from '../data/content'
</script>

<template>
  <section class="view" aria-label="Profil masjid">
    <div class="page-intro"><div class="wrap">
      <p class="eyebrow">Profil masjid</p>
      <h1>Masjid Jami' Al-Barokah</h1>
      <p class="page-lead">Mengenal sejarah, ukuran, kapasitas, dan fasilitas masjid kami.</p>
    </div></div>
    <div class="wrap section-tight">
      <div class="fact-grid">
        <div class="card fact"><span>Alamat</span><strong>{{ PROFILE.alamat }}</strong></div>
        <div class="card fact"><span>Tahun berdiri</span><strong>{{ PROFILE.tahun }}</strong></div>
        <div class="card fact"><span>Kapasitas jamaah</span><strong>{{ PROFILE.kapasitas }} orang</strong></div>
        <div class="card fact"><span>Jumlah lantai</span><strong>{{ PROFILE.lantai }} lantai</strong></div>
      </div>
      <div class="info-grid">
        <div class="card info-card">
          <p class="eyebrow">Visi</p>
          <p>{{ PROFILE.visi }}</p>
        </div>
        <div class="card info-card">
          <p class="eyebrow">Misi</p>
          <ul class="info-list vm-list"><li v-for="m in PROFILE.misi" :key="m">{{ m }}</li></ul>
        </div>
      </div>
      <div class="card info-card fasilitas">
        <p class="eyebrow">Fasilitas</p>
        <ul class="chip-list"><li v-for="f in PROFILE.fasilitas" :key="f">{{ f }}</li></ul>
      </div>
      <section class="mt-10" aria-labelledby="h-galeri">
        <p class="eyebrow">Galeri</p>
        <h2 id="h-galeri" class="mb-5">Ruang yang menyambut jamaah</h2>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <figure v-for="g in GALLERY" :key="g.src">
            <img class="w-full aspect-[4/3] object-cover rounded-2xl" :src="g.src" :alt="g.alt" loading="lazy">
            <figcaption class="mt-2 text-sm">{{ g.caption }}</figcaption>
          </figure>
        </div>
      </section>
      <p class="sample-note">Visi dan misi masih draf, mohon disesuaikan dengan pengurus.</p>
    </div>
  </section>
</template>
