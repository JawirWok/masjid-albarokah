<script setup>
import { computed, ref } from 'vue'
import Media from '../components/Media.vue'
import { PROGRAMS, DONORS, rupiah, shortDate, longDate, programName } from '../data/content'
import { store } from '../store'
import { live } from '../admin/db'

// `live` naik tiap kali data donasi berubah (realtime), supaya angka ikut dihitung ulang
const programs = computed(() => (live.value, PROGRAMS.slice()))
const total = computed(() => ({
  collected: programs.value.reduce((s, p) => s + (p.collected || 0), 0),
  donors: programs.value.reduce((s, p) => s + (p.donors || 0), 0),
}))
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
        <p class="eyebrow eyebrow-light">Donasi</p>
        <h1>Menyalurkan kebaikan dengan amanah</h1>
        <p class="don-lead">Pilih program yang ingin Anda dukung, selesaikan pembayaran lewat transfer bank atau QRIS, dan pantau pembaruan donasi secara otomatis.</p>
      </div>
    </div>

    <div class="don-body">
      <div class="wrap">
        <div class="don-summary">
          <div v-for="p in programs" :key="p.id" class="don-sum">
            <span>Total {{ p.name }}</span>
            <strong>{{ rupiah(p.collected) }}</strong>
            <small>{{ p.donors }} donatur</small>
          </div>
          <div class="don-sum">
            <span>Total keseluruhan terkumpul</span>
            <strong>{{ rupiah(total.collected) }}</strong>
            <small>{{ total.donors }} donatur</small>
          </div>
        </div>

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
                  <p class="don-stat-note">Program berkelanjutan • Dapat berdonasi kapan saja</p>
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
            <div class="tab-row" role="group" aria-label="Filter program">
              <button type="button" class="tab" :class="{ 'is-active': filter === 'all' }" :aria-pressed="filter === 'all'" @click="filter = 'all'">Semua</button>
              <button v-for="p in programs" :key="p.id" type="button" class="tab" :class="{ 'is-active': filter === p.id }" :aria-pressed="filter === p.id" @click="filter = p.id">{{ p.name }}</button>
            </div>
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
