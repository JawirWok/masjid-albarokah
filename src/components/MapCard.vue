<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import L from 'leaflet'
import { ArrowRightIcon } from '@heroicons/vue/24/outline'

// Koordinat perkiraan area Babakan, Setu — sesuaikan dengan titik Google Maps masjid.
const POS = [-6.3405, 106.6930]
const el = ref(null)
let map

onMounted(() => {
  map = L.map(el.value, { scrollWheelZoom: false }).setView(POS, 16)
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19, attribution: '&copy; OpenStreetMap',
  }).addTo(map)
  L.circleMarker(POS, { radius: 10, color: '#0b4036', fillColor: '#146b58', fillOpacity: 0.9 })
    .addTo(map).bindPopup("Masjid Jami' Al-Barokah")
})
onBeforeUnmount(() => map?.remove())
</script>

<template>
  <div class="map-card">
    <div class="map-frame"><div ref="el" class="h-full w-full min-h-72" role="region" aria-label="Peta lokasi masjid"></div></div>
    <div class="map-info">
      <div>
        <span class="map-label">Alamat</span>
        <strong>Jl. Ampera Poncol, Babakan, Kec. Setu, Kota Tangerang Selatan, Banten 15315</strong>
      </div>
      <a class="text-link" href="https://maps.app.goo.gl/kzyHBUKtcq12koBo9" target="_blank" rel="noopener">
        Buka di Google Maps <ArrowRightIcon class="size-4 inline" />
      </a>
    </div>
  </div>
</template>
