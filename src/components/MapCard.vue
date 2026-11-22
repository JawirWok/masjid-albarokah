<script setup>
import { computed } from 'vue'
import { ArrowUpRightIcon } from '@heroicons/vue/24/outline'
import { PROFILE } from '../data/content'

// Pakai koordinat dari Admin > Kontak bila diisi; kalau belum, Google mencari lewat nama + alamat masjid.
const src = computed(() => {
  const q = PROFILE.hasCoords ? `${PROFILE.lat},${PROFILE.lng}` : `Masjid Jami' Al-Barokah ${PROFILE.alamat}`
  return `https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=16&output=embed`
})
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
      <a class="btn btn-primary btn-sm" :href="PROFILE.maps" target="_blank" rel="noopener">
        Buka di Google Maps <ArrowUpRightIcon class="size-4" />
      </a>
    </div>
  </div>
</template>
