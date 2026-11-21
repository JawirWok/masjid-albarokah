<script setup>
import { computed } from 'vue'
import { HeartIcon, BuildingLibraryIcon } from '@heroicons/vue/24/outline'
import ProgramChart from '../components/ProgramChart.vue'
import { PROGRAMS, DONORS, rupiah, shortDate, longDate, programName } from '../data/content'
import { store } from '../store'
import { live } from '../admin/db'

const programs = computed(() => (live.value, PROGRAMS.slice()))
// 10 donatur terakhir saja (riwayat transaksi lengkap hanya ada di admin)
const lastDonors = computed(() => (live.value, [...DONORS].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 10)))
const percent = (p) => Math.min(100, Math.round((p.collected / p.target) * 100))
</script>

<template>
  <section class="view" aria-label="Donasi">
    <div class="page-intro"><div class="wrap">
      <p class="eyebrow">Donasi</p>
      <h1>Menyalurkan kebaikan dengan amanah</h1>
      <p class="page-lead">Pilih program yang ingin Anda dukung, salurkan lewat transfer bank atau QRIS, lalu catat donasi Anda di sini.</p>
    </div></div>
    <div class="wrap section-tight">
      <div class="donation-summary">
        <div v-for="p in programs" :key="p.id" class="summary-card">
          <span class="summary-label">Total {{ p.name }}</span>
          <strong>{{ rupiah(p.collected) }}</strong>
          <small>{{ p.donors }} donatur</small>
        </div>
      </div>

      <div class="program-grid">
        <article v-for="p in programs" :key="p.id" class="program-card">
          <img v-if="p.image" :src="p.image.src" :alt="p.image.alt || p.name" class="w-full aspect-video object-cover rounded-xl mb-4" loading="lazy">
          <div class="program-head">
            <span class="program-icon"><HeartIcon v-if="p.icon === 'heart'" class="size-5" /><BuildingLibraryIcon v-else class="size-5" /></span>
            <span class="program-kicker">{{ p.kicker }}</span>
          </div>
          <h3>{{ p.name }}</h3>
          <p class="program-desc">{{ p.desc }}</p>
          <ul class="allocation-list"><li v-for="u in p.uses" :key="u">{{ u }}</li></ul>
          <div class="program-stats">
            <div><span>Terkumpul</span><strong>{{ rupiah(p.collected) }}</strong></div>
            <div v-if="p.target"><span>Target</span><strong>{{ rupiah(p.target) }}</strong></div>
            <div v-else><span>Jenis</span><strong>Bebas nominal</strong></div>
          </div>
          <p v-if="p.deadline" class="program-deadline">Batas donasi: {{ longDate(p.deadline) }}</p>
          <div v-if="p.target" class="progress" role="progressbar" :aria-valuenow="percent(p)" aria-valuemin="0" aria-valuemax="100">
            <span :style="{ width: percent(p) + '%' }"></span>
          </div>
          <p v-else class="program-deadline">Dapat berdonasi kapan saja</p>
          <ProgramChart :id="p.id" />
          <div class="program-foot">
            <span>{{ p.target ? percent(p) + '% · ' : '' }}{{ p.donors }} donatur</span>
            <button type="button" class="btn btn-primary btn-sm" @click="store.donationProgram = p.id">Donasi sekarang</button>
          </div>
        </article>
      </div>

      <h2 class="mt-12 mb-4">10 donatur terakhir</h2>
      <table class="data-table">
        <thead><tr><th>Donatur</th><th>Program</th><th>Tanggal</th><th class="num">Nominal</th></tr></thead>
        <tbody>
          <tr v-for="d in lastDonors" :key="d.id || d.date + d.name">
            <td data-label="Donatur"><strong>{{ d.name }}</strong></td><td data-label="Program">{{ programName(d.program) }}</td>
            <td data-label="Tanggal">{{ shortDate(d.date) }}</td><td data-label="Nominal" class="num">{{ rupiah(d.amount) }}</td>
          </tr>
          <tr v-if="!lastDonors.length"><td colspan="4">Belum ada donasi terverifikasi.</td></tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
