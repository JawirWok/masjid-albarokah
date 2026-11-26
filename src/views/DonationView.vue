<script setup>
import { computed, ref } from 'vue'
import Media from '../components/Media.vue'
import { PROGRAMS, DONORS, rupiah, shortDate, longDate, programName } from '../data/content'
import { store } from '../store'
import { live } from '../admin/db'
import BackHome from '../components/BackHome.vue'

// `live` naik tiap kali data donasi berubah (realtime), supaya angka ikut dihitung ulang
const programs = computed(() => (live.value, PROGRAMS.slice()))
const percent = (p) => Math.min(100, Math.round((p.collected / p.target) * 100))

// 10 donatur terakhir (riwayat transaksi lengkap hanya ada di admin), bisa difilter per program
const filter = ref('all')
const lastDonors = computed(() => (live.value, [...DONORS]
  .filter((d) => filter.value === 'all' || d.program === filter.value)
  .sort((a, b) => b.date.localeCompare(a.date))
  .slice(0, 10)))
</script>

<template>
  <section class="view don" aria-label="Donasi">
    <div class="don-hero">
      <div class="wrap">
        <BackHome />
        <h1>Donasi</h1>
        <p class="don-lead">Salurkan donasi Anda untuk mendukung berbagai program Masjid Jami' Al-Barokah.</p>
      </div>
    </div>

    <div class="don-body">
      <div class="wrap">
        <p v-if="!programs.length" class="page-lead" style="margin-top:32px">Belum ada program donasi yang aktif.</p>
        <div v-else class="don-programs">
          <article v-for="p in programs" :key="p.id" class="don-card">
            <Media :image="p.image" cls="don-media" />
            <div class="don-card-body">
              <span class="don-kicker">{{ p.kicker }}</span>
              <h3>{{ p.name }}</h3>
              <p class="program-desc">{{ p.desc }}</p>
              <ul class="allocation-list"><li v-for="u in p.uses" :key="u">{{ u }}</li></ul>

              <div class="don-stat">
                <template v-if="p.target">
                  <div class="don-stat-row">
                    <div><span class="don-lbl">Terkumpul</span><strong>{{ rupiah(p.collected) }}</strong></div>
                    <div class="right"><span class="don-lbl">Target</span><strong>{{ rupiah(p.target) }}</strong></div>
                  </div>
                  <div class="progress" role="progressbar" :aria-valuenow="percent(p)" aria-valuemin="0" aria-valuemax="100" :aria-label="'Progres ' + p.name">
                    <span :style="{ width: percent(p) + '%' }"></span>
                  </div>
                  <div class="don-stat-foot">
                    <b>{{ percent(p) }}% tercapai</b>
                    <span v-if="p.deadline">Batas donasi: {{ longDate(p.deadline) }}</span>
                  </div>
                </template>
                <template v-else>
                  <span class="don-lbl">Terkumpul</span><strong>{{ rupiah(p.collected) }}</strong>
                </template>
              </div>
            </div>
            <div class="don-foot">
              <span>{{ p.donors }} donatur</span>
              <button type="button" class="btn btn-primary btn-sm" @click="store.donationProgram = p.id">Donasi sekarang</button>
            </div>
          </article>
        </div>

        <section class="don-recent" aria-labelledby="h-donatur">
          <div class="don-recent-head">
            <div>
              <h2 id="h-donatur">10 donatur terakhir</h2>
              <p>Catatan donasi terbaru yang masuk dan terverifikasi secara berkala.</p>
            </div>
            <select v-model="filter" class="rounded-xl border border-[#c9d9d1] bg-white px-3 py-2 text-sm font-medium" aria-label="Filter program">
              <option value="all">Semua program</option>
              <option v-for="p in programs" :key="p.id" :value="p.id">{{ p.name }}</option>
            </select>
          </div>
          <div class="table-card">
            <table class="data-table">
              <thead><tr><th>Donatur</th><th>Program</th><th>Tanggal</th><th class="num">Nominal</th></tr></thead>
              <tbody>
                <tr v-for="(d, i) in lastDonors" :key="d.id || i">
                  <td data-label="Donatur"><strong>{{ d.name }}</strong></td>
                  <td data-label="Program"><span class="don-pill">{{ programName(d.program) }}</span></td>
                  <td data-label="Tanggal">{{ shortDate(d.date) }}</td>
                  <td data-label="Nominal" class="num">{{ rupiah(d.amount) }}</td>
                </tr>
                <tr v-if="!lastDonors.length"><td colspan="4">Belum ada donasi terverifikasi.</td></tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>
