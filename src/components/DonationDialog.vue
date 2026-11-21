<script setup>
import { reactive, computed, watch, ref } from 'vue'
import { CheckCircleIcon, ArrowDownTrayIcon } from '@heroicons/vue/24/outline'
import BaseDialog from './BaseDialog.vue'
import { PROGRAMS, PAYMENT, rupiah, longDate } from '../data/content'
import { supabase, submitDonation, refreshDonations } from '../admin/db'
import { downloadReceipt } from '../utils/receipt'
import { store } from '../store'

const METHODS = ['BSI', 'QRIS', 'E-wallet', 'Tunai', 'Lainnya']
const QRIS = [['Yayasan Jami Al Barokah', '/assets/qris-yayasan.jpg'], ['Sahabat Baik Al Barokah', '/assets/qris-sahabat.jpg'], ['Al Barokah Infaq', '/assets/qris-infaq.jpg']]
const qrisList = computed(() => (PAYMENT.qris?.length ? PAYMENT.qris.map((g) => [g.alt || 'QRIS', g.src]) : QRIS))
const form = reactive({ name: '', amount: '', program: 'umum', method: 'BSI', anon: false })
const errors = reactive({ name: '', amount: '' })
const step = ref('form') // form | pay | sending | done
const draft = ref(null)
const receipt = ref(null)
const failed = ref('')
const open = computed(() => store.donationProgram !== null)

watch(() => store.donationProgram, (id) => {
  if (id === null) return
  Object.assign(form, { name: '', amount: '', program: id || PROGRAMS[0]?.id || 'umum', method: 'BSI', anon: false })
  Object.assign(errors, { name: '', amount: '' })
  step.value = 'form'; failed.value = ''; draft.value = null; receipt.value = null
})

const programName = (id) => PROGRAMS.find((p) => p.id === id)?.name || id
const waLink = (d) => `https://wa.me/${PAYMENT.wa}?text=${encodeURIComponent(
  `Assalamu'alaikum, saya ${d.name} sudah donasi ${rupiah(d.amount)} untuk program ${programName(d.program)} (${d.method}). No. bukti: ${d.id.replace('donasi-', '').toUpperCase()}.`)}`

function toPayment() {
  errors.name = form.name.trim().length < 3 ? 'Isi nama minimal 3 karakter.' : ''
  const amount = Number(form.amount)
  errors.amount = !(amount >= 10000 && amount <= 100000000) ? 'Nominal antara Rp10.000 dan Rp100.000.000.' : ''
  if (errors.name || errors.amount) return
  draft.value = {
    id: `donasi-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    name: form.name.trim(), program: form.program, amount, method: form.method, anon: form.anon,
  }
  failed.value = ''; step.value = 'pay'
}

async function paid() {
  if (!supabase) { window.open(waLink(draft.value), '_blank', 'noopener'); store.donationProgram = null; return }
  step.value = 'sending'; failed.value = ''
  try {
    receipt.value = await submitDonation(draft.value)
    await refreshDonations().catch(() => {}) // angka di situs langsung diperbarui
    step.value = 'done'
  } catch (e) {
    step.value = 'pay'
    failed.value = /terlalu banyak/.test(e.message) ? e.message : 'Donasi belum tercatat di sistem. Coba lagi, atau konfirmasi lewat WhatsApp.'
  }
}

const title = computed(() => ({ form: 'Donasi', pay: 'Selesaikan pembayaran', sending: 'Mencatat donasi…', done: 'Donasi Anda tercatat' }[step.value]))
</script>

<template>
  <BaseDialog :open="open" :title="title" eyebrow="Donasi" @close="store.donationProgram = null">
    <!-- 1. Isi data -->
    <form v-if="step === 'form'" novalidate @submit.prevent="toPayment">
      <div class="field">
        <label for="donorName">Nama</label>
        <input id="donorName" v-model="form.name" type="text" autocomplete="name" maxlength="80" placeholder="Nama lengkap">
        <p class="err" role="alert">{{ errors.name }}</p>
      </div>
      <div class="field"><label><input v-model="form.anon" type="checkbox"> Tampilkan sebagai “Hamba Allah” di daftar donatur</label></div>
      <div class="field">
        <label for="donorProgram">Program</label>
        <select id="donorProgram" v-model="form.program"><option v-for="p in PROGRAMS" :key="p.id" :value="p.id">{{ p.name }}</option></select>
      </div>
      <div class="field">
        <label for="donorMethod">Metode pembayaran</label>
        <select id="donorMethod" v-model="form.method"><option v-for="m in METHODS" :key="m" :value="m">{{ m }}</option></select>
      </div>
      <div class="field">
        <label for="donorAmount">Nominal (Rp)</label>
        <input id="donorAmount" v-model="form.amount" type="number" min="10000" step="1000" inputmode="numeric" placeholder="100000">
        <p class="err" role="alert">{{ errors.amount }}</p>
      </div>
      <button type="submit" class="btn btn-primary">Lanjut ke pembayaran</button>
    </form>

    <!-- 2. Pembayaran -->
    <div v-else-if="step === 'pay' || step === 'sending'">
      <p class="mb-4">Donasi <b>{{ rupiah(draft.amount) }}</b> untuk <b>{{ programName(draft.program) }}</b> via <b>{{ draft.method }}</b>.</p>

      <div class="rounded-xl bg-brand-50 p-4 mb-4 text-sm">
        <template v-if="draft.method === 'BSI'">
          <p class="font-semibold mb-1">Transfer ke rekening {{ PAYMENT.bank || 'BSI' }}</p>
          <p v-if="PAYMENT.norek" class="text-lg font-bold">{{ PAYMENT.norek }}</p>
          <p v-else>Nomor rekening belum diisi pengurus (Admin &gt; Donasi &gt; Pembayaran).</p>
          <p v-if="PAYMENT.pemilik">a.n. {{ PAYMENT.pemilik }}</p>
        </template>
        <template v-else-if="draft.method === 'QRIS'">
          <p class="font-semibold mb-2">Scan salah satu QRIS</p>
          <div class="grid grid-cols-3 gap-2">
            <figure v-for="[n, src] in qrisList" :key="src"><img :src="src" :alt="'QRIS ' + n" class="w-full rounded-lg bg-white" loading="lazy"><figcaption class="text-xs mt-1">{{ n }}</figcaption></figure>
          </div>
        </template>
        <template v-else-if="draft.method === 'E-wallet'">
          <p class="font-semibold mb-1">E-wallet</p><p>{{ PAYMENT.ewallet || 'Hubungi admin via WhatsApp untuk nomor e-wallet.' }}</p>
        </template>
        <p v-else>Hubungi admin pengurus via WhatsApp untuk menyerahkan donasi.</p>
      </div>

      <p v-if="PAYMENT.auto" class="text-xs mb-3 text-[#5f736d]">Mode demo: pembayaran tidak diperiksa, donasi langsung dicatat.</p>
      <p v-if="failed" class="err" role="alert">{{ failed }}</p>
      <div class="flex gap-3 flex-wrap">
        <button type="button" class="btn btn-secondary" :disabled="step === 'sending'" @click="step = 'form'">Kembali</button>
        <button type="button" class="btn btn-primary" :disabled="step === 'sending'" @click="paid">{{ step === 'sending' ? 'Mencatat…' : 'Saya sudah bayar' }}</button>
      </div>
    </div>

    <!-- 3. Bukti donasi -->
    <div v-else-if="step === 'done'">
      <div class="text-center mb-4">
        <CheckCircleIcon class="size-14 mx-auto text-brand-700" />
        <p class="mt-2">
          <template v-if="receipt.status === 'verified'">Terima kasih! Donasi Anda sudah terverifikasi dan total program ikut bertambah.</template>
          <template v-else>Terima kasih! Donasi Anda menunggu verifikasi pengurus. Total program bertambah setelah itu.</template>
        </p>
      </div>
      <dl class="rounded-xl border border-[#dce8e2] p-4 text-sm grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 mb-5">
        <dt class="text-[#5f736d]">No. bukti</dt><dd class="font-semibold text-right">{{ receipt.id.replace('donasi-', '').toUpperCase() }}</dd>
        <dt class="text-[#5f736d]">Tanggal</dt><dd class="font-semibold text-right">{{ longDate(receipt.date) }}</dd>
        <dt class="text-[#5f736d]">Nama</dt><dd class="font-semibold text-right">{{ receipt.name }}</dd>
        <dt class="text-[#5f736d]">Program</dt><dd class="font-semibold text-right">{{ programName(receipt.program) }}</dd>
        <dt class="text-[#5f736d]">Metode</dt><dd class="font-semibold text-right">{{ receipt.method }}</dd>
        <dt class="text-[#5f736d]">Nominal</dt><dd class="font-bold text-right">{{ rupiah(receipt.amount) }}</dd>
        <dt class="text-[#5f736d]">Status</dt><dd class="font-semibold text-right">{{ receipt.status === 'verified' ? 'Terverifikasi' : 'Menunggu verifikasi' }}</dd>
      </dl>
      <div class="flex gap-3 flex-wrap">
        <button type="button" class="btn btn-primary" @click="downloadReceipt(receipt, programName(receipt.program))"><ArrowDownTrayIcon class="size-4 inline" /> Unduh bukti (PNG)</button>
        <a class="btn btn-secondary" :href="waLink(receipt)" target="_blank" rel="noopener">Kirim ke admin (WhatsApp)</a>
        <button type="button" class="btn btn-secondary" @click="store.donationProgram = null">Tutup</button>
      </div>
    </div>
  </BaseDialog>
</template>
