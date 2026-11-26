<script setup>
import { reactive, computed, watch, ref } from 'vue'
import { CheckCircleIcon, DocumentDuplicateIcon, CheckIcon, ArrowDownTrayIcon } from '@heroicons/vue/24/outline'
import BaseDialog from './BaseDialog.vue'
import { PROGRAMS, PAYMENT } from '../data/content'
import { supabase, submitDonation, refreshDonations } from '../admin/db'
import { store } from '../store'

const copied = ref(false)
let copyTimer
async function copyNo() {
  const text = String(chosen.value.nomor || '').replace(/\D/g, '') // angka saja, tanpa spasi/strip
  try { await navigator.clipboard.writeText(text) }
  catch {
    const t = document.createElement('textarea')
    t.value = text; t.style.cssText = 'position:fixed;opacity:0'
    document.body.appendChild(t); t.select()
    try { document.execCommand('copy') } catch { /* diabaikan */ }
    t.remove()
  }
  copied.value = true
  clearTimeout(copyTimer); copyTimer = setTimeout(() => (copied.value = false), 2000)
}

async function saveQris() {
  const src = chosen.value.gambar?.src
  if (!src) return
  const file = `QRIS-${String(chosen.value.nama || 'masjid').replace(/[^\w-]+/g, '-')}.jpg`
  try {
    const blob = await (await fetch(src)).blob()
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob); a.download = file
    document.body.appendChild(a); a.click(); a.remove()
    setTimeout(() => URL.revokeObjectURL(a.href), 2000)
  } catch { window.open(src, '_blank', 'noopener') } // fallback bila diblokir
}

const ANON = 'Hamba Allah'

// Metode pembayaran mengikuti Admin > Donasi > Pembayaran: yang kosong tidak ditampilkan.
const methods = ref([])
const buildMethods = () => PAYMENT.metode.map((m) => ({ ...m, label: m.tipe === 'bank' ? 'Transfer ' + m.nama : m.nama }))
const chosen = ref(null)

const form = reactive({ name: '', method: '', anon: false })
const errors = reactive({ name: '' })
const step = ref('form') // form | pay | sending | done
const draft = ref(null)
const failed = ref('')
const open = computed(() => store.donationProgram !== null)

// Program mengikuti kartu yang ditekan, tidak bisa diganti di dalam form.
const program = computed(() => PROGRAMS.find((p) => p.id === store.donationProgram) || PROGRAMS[0] || null)

let savedName = ''
watch(() => form.anon, (on) => {
  if (on) { savedName = form.name === ANON ? '' : form.name; form.name = ANON; errors.name = '' }
  else form.name = savedName
})

watch(() => store.donationProgram, (id) => {
  if (id === null) return
  methods.value = buildMethods()
  savedName = ''
  Object.assign(form, { name: '', method: methods.value[0]?.id || '', anon: false })
  errors.name = ''
  step.value = 'form'; failed.value = ''; draft.value = null
})

const adminWa = () => `https://wa.me/${PAYMENT.wa}`
const waLink = (d) => `https://wa.me/${PAYMENT.wa}?text=${encodeURIComponent(
  `Assalamu'alaikum, saya ${d.name} sudah melakukan donasi untuk program ${program.value?.name || ''} via ${d.method}. Mohon dicek ya, terima kasih.`)}`

function toPayment() {
  if (!form.anon && form.name.trim().length < 3) { errors.name = 'Isi nama minimal 3 karakter.'; return document.getElementById('donorName')?.focus() }
  errors.name = ''
  chosen.value = methods.value.find((m) => m.id === form.method)
  draft.value = {
    id: `donasi-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    name: form.anon ? ANON : form.name.trim(), program: program.value.id, amount: 0, method: chosen.value.label, anon: form.anon,
  }
  failed.value = ''; step.value = 'pay'
}

async function paid() {
  if (!supabase) { window.open(waLink(draft.value), '_blank', 'noopener'); store.donationProgram = null; return }
  step.value = 'sending'; failed.value = ''
  try {
    await submitDonation(draft.value)
    await refreshDonations().catch(() => {})
    step.value = 'done'
  } catch (e) {
    step.value = 'pay'
    failed.value = /terlalu banyak/.test(e.message) ? e.message : 'Konfirmasi belum tercatat di sistem. Coba lagi, atau kabari pengurus lewat WhatsApp.'
  }
}

const stepIdx = computed(() => ({ form: 0, pay: 1, sending: 1, done: 2 }[step.value]))
const title = computed(() => ({ form: 'Donasi', pay: 'Selesaikan pembayaran', sending: 'Mencatat konfirmasi…', done: 'Konfirmasi diterima' }[step.value]))
</script>

<template>
  <BaseDialog :open="open" :title="title" eyebrow="Donasi" @close="store.donationProgram = null">
    <ol class="flex items-center gap-2 text-xs mb-5" aria-label="Langkah donasi">
      <li v-for="(l, i) in ['Data', 'Pembayaran', 'Selesai']" :key="l" class="flex items-center gap-2" :class="i <= stepIdx ? 'text-brand-700 font-semibold' : 'text-[#7f918b]'" :aria-current="i === stepIdx ? 'step' : undefined">
        <span class="grid size-6 place-items-center rounded-full text-[11px]" :class="i <= stepIdx ? 'bg-brand-700 text-white' : 'bg-brand-50'">{{ i + 1 }}</span>{{ l }}
        <span v-if="i < 2" class="mx-1 h-px w-6 bg-[#c9d9d1]" aria-hidden="true"></span>
      </li>
    </ol>

    <!-- 1. Isi data -->
    <form v-if="step === 'form'" novalidate @submit.prevent="toPayment">
      <p v-if="program" class="mb-4 text-sm">Donasi untuk <b>{{ program.name }}</b></p>

      <div class="field" :class="{ 'has-error': errors.name }">
        <label for="donorName">Nama</label>
        <input id="donorName" v-model="form.name" type="text" autocomplete="name" maxlength="80" placeholder="Nama lengkap" :disabled="form.anon" @input="errors.name = ''">
        <p class="err" role="alert">{{ errors.name }}</p>
      </div>
      <div class="field"><label class="flex items-center gap-2 font-medium" style="flex-direction:row"><input v-model="form.anon" type="checkbox" style="width:18px;height:18px;padding:0;flex:none"> Donasi sebagai “Hamba Allah”</label></div>

      <template v-if="methods.length">
        <div class="field">
          <label for="donorMethod">Metode pembayaran</label>
          <select id="donorMethod" v-model="form.method"><option v-for="m in methods" :key="m.id" :value="m.id">{{ m.label }}</option></select>
        </div>
        <button type="submit" class="btn btn-primary">Lanjut ke pembayaran</button>
      </template>
      <div v-else class="rounded-xl bg-brand-50 p-4 text-sm">
        <p class="mb-3">Metode pembayaran belum tersedia. Silakan hubungi pengurus untuk berdonasi.</p>
        <a class="btn btn-primary btn-sm" :href="adminWa()" target="_blank" rel="noopener">Hubungi pengurus (WhatsApp)</a>
      </div>
    </form>

    <!-- 2. Pembayaran -->
    <div v-else-if="step === 'pay' || step === 'sending'">
      <p class="mb-4">Donasi untuk <b>{{ program?.name }}</b> via <b>{{ draft.method }}</b>.</p>

      <div class="rounded-xl bg-brand-50 p-4 mb-4 text-sm">
        <template v-if="chosen.tipe === 'qris'">
          <p class="font-semibold mb-2">Scan {{ chosen.nama }}</p>
          <img :src="chosen.gambar?.src" :alt="chosen.nama" class="w-full max-w-xs mx-auto rounded-lg bg-white" loading="lazy">
          <button type="button" class="btn btn-secondary btn-sm mt-3" @click="saveQris">
            <ArrowDownTrayIcon class="size-4" /> Unduh QRIS
          </button>
        </template>
        <template v-else>
          <p class="font-semibold mb-1">{{ chosen.tipe === 'bank' ? 'Transfer ke rekening ' : 'Kirim ke ' }}{{ chosen.nama }}</p>
          <p class="text-lg font-bold">{{ chosen.nomor }}</p>
          <p v-if="chosen.pemilik">a.n. {{ chosen.pemilik }}</p>
          <button type="button" class="btn btn-secondary btn-sm mt-3" @click="copyNo">
            <CheckIcon v-if="copied" class="size-4" /><DocumentDuplicateIcon v-else class="size-4" />
            {{ copied ? 'Tersalin' : (chosen.tipe === 'bank' ? 'Salin nomor rekening' : 'Salin nomor') }}
          </button>
        </template>
      </div>

      <p class="text-xs mb-3 text-[#5f736d]">Setelah membayar, tekan “Saya sudah bayar”. Pengurus akan mengecek pembayaran Anda.</p>
      <p v-if="failed" class="mb-3 text-sm text-red-700" role="alert">{{ failed }}</p>
      <div class="flex gap-3 flex-wrap">
        <button type="button" class="btn btn-secondary" :disabled="step === 'sending'" @click="step = 'form'">Kembali</button>
        <button type="button" class="btn btn-primary" :disabled="step === 'sending'" @click="paid">{{ step === 'sending' ? 'Mencatat…' : 'Saya sudah bayar' }}</button>
      </div>
    </div>

    <!-- 3. Selesai -->
    <div v-else-if="step === 'done'">
      <div class="text-center mb-5">
        <CheckCircleIcon class="size-14 mx-auto text-brand-700" />
        <p class="mt-2">Terima kasih! Konfirmasi Anda sudah kami terima dan sedang dicek oleh pengurus.</p>
      </div>
      <p class="text-sm text-[#5f736d] mb-5 text-center">Ingin mempercepat? Anda bisa mengabari pengurus lewat WhatsApp (opsional).</p>
      <div class="flex gap-3 flex-wrap justify-center">
        <a class="btn btn-secondary" :href="waLink(draft)" target="_blank" rel="noopener">Kirim ke admin (WhatsApp)</a>
        <button type="button" class="btn btn-primary" @click="store.donationProgram = null">Tutup</button>
      </div>
    </div>
  </BaseDialog>
</template>
