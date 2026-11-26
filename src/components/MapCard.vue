<script setup>
import { computed } from 'vue'
import { ArrowUpRightIcon } from '@heroicons/vue/24/outline'
import { PROFILE, mapsHref } from '../data/content'

const src = computed(() => `https://maps.google.com/maps?q=${encodeURIComponent(`Masjid Jami' Al-Barokah ${PROFILE.alamat}`)}&z=16&output=embed`)
// "Jl. X, Babakan, Kec. Setu, Kota Tangerang Selatan, Banten" -> "Babakan, Kec. Setu, Tangerang Selatan"
const area = computed(() => {
  const parts = PROFILE.alamat.split(',').map((s) => s.trim()).filter(Boolean)
  return parts.length > 3 ? parts.slice(1, 4).join(', ').replace('Kota ', '') : PROFILE.alamat
})
</script>

<template>
  <div class="map-card">
    <div class="map-frame">
      <iframe :src="src" title="Peta lokasi Masjid Jami' Al-Barokah" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
    </div>
    <div class="map-info">
      <div>
        <span class="map-label">Titik lokasi</span>
        <strong>{{ area }}</strong>
      </div>
      <a class="btn btn-primary btn-sm" :href="mapsHref()" target="_blank" rel="noopener">
        Buka di Google Maps <ArrowUpRightIcon class="size-4" />
      </a>
    </div>
  </div>
</template>