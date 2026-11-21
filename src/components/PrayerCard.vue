<script setup>
import { PRAYERS } from '../data/content'
import { usePrayer } from '../composables/usePrayer'
const { next, left, state, date } = usePrayer()
</script>

<template>
  <aside class="prayer-card" aria-labelledby="nextName">
    <div class="prayer-head">
      <div class="prayer-head-top">
        <span class="prayer-label">Sholat berikutnya</span>
        <span class="prayer-zone">WIB</span>
      </div>
      <div class="prayer-next">
        <h2 id="nextName">{{ next.name }}</h2>
        <span class="next-time">{{ next.time }}</span>
      </div>
      <div class="countdown" role="timer"
           :aria-label="`Hitung mundur ke ${next.name} pukul ${next.time}`">
        <span class="cd-unit"><b>{{ left.h }}</b><small>Jam</small></span>
        <span class="cd-unit"><b>{{ left.m }}</b><small>Menit</small></span>
        <span class="cd-unit"><b>{{ left.s }}</b><small>Detik</small></span>
      </div>
      <p class="prayer-date">{{ date }}</p>
    </div>
    <ul class="prayer-list" aria-label="Jadwal sholat hari ini">
      <li v-for="(p, i) in PRAYERS" :key="p.name" class="prayer-row" :class="state(i)"
          :aria-current="state(i)['is-next'] ? 'true' : undefined">
        <span class="p-name"><span class="dot"></span>{{ p.name }}</span>
        <time class="p-time">{{ p.time }}</time>
      </li>
    </ul>
    <p class="prayer-note">Zona waktu WIB. Jadwal dapat menyesuaikan pengumuman pengurus masjid.</p>
  </aside>
</template>
