<script setup>
import { ref } from 'vue'
import { ArrowUpRightIcon, DocumentDuplicateIcon, CheckIcon } from '@heroicons/vue/24/outline'
import MapCard from './MapCard.vue'
import { CONTACT_ITEMS } from '../data/content'

// Aksi tiap kartu: tautan utama (open) dan/atau tombol salin (copy)
const ACTIONS = {
  whatsapp: { open: 'Chat WhatsApp', copy: 'Salin nomor' },
  instagram: { open: 'Buka Instagram' },
  mail: { open: 'Kirim email', copy: 'Salin email' },
  pin: { copy: 'Salin alamat' },
}
const actions = (c) => ACTIONS[c.icon] || { open: 'Buka' }

const digits = (v) => String(v).replace(/\D/g, '')
// +6281298850904 -> +62 812-9885-0904 (hanya tampilan; footer tetap memakai nilai asli)
function display(c) {
  if (c.icon !== 'whatsapp') return c.value
  const d = digits(c.value)
  return d.startsWith('62') && d.length >= 10 ? `+62 ${d.slice(2, 5)}-${d.slice(5, 9)}-${d.slice(9)}` : c.value
}
const copyText = (c) => (c.icon === 'whatsapp' ? '+' + digits(c.value) : c.value)

const copied = ref('')
let timer
async function copy(c) {
  const text = copyText(c)
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    const t = document.createElement('textarea')
    t.value = text; t.style.cssText = 'position:fixed;opacity:0'
    document.body.appendChild(t); t.select()
    try { document.execCommand('copy') } catch { /* diabaikan */ }
    t.remove()
  }
  copied.value = c.label
  clearTimeout(timer); timer = setTimeout(() => (copied.value = ''), 2000)
}
</script>

<template>
  <section id="kontak" class="section ct" aria-labelledby="h-kontak">
    <div class="wrap">
      <div class="ct-head">
        <p class="eyebrow">Kontak</p>
        <h2 id="h-kontak">Hubungi pengurus masjid</h2>
        <p class="ct-lead">Silakan hubungi pengurus untuk informasi kajian, konfirmasi donasi, maupun keperluan kegiatan warga.</p>
      </div>
      <div class="ct-layout">
        <div class="ct-cards">
          <article v-for="c in CONTACT_ITEMS" :key="c.label" class="ct-card">
            <div class="ct-main">
              <span class="ct-icon"><svg class="icon" aria-hidden="true"><use :href="'#i-' + c.icon" /></svg></span>
              <div class="ct-text">
                <span class="ct-label">{{ c.label }}</span>
                <strong class="ct-value">{{ display(c) }}</strong>
                <span v-if="c.hint && c.icon !== 'pin'" class="ct-hint">{{ c.hint }}</span>
              </div>
            </div>
            <div class="ct-actions">
              <a v-if="actions(c).open" class="ct-act" :href="c.href" target="_blank" rel="noopener">
                {{ actions(c).open }} <ArrowUpRightIcon class="size-4" />
              </a>
              <span v-if="actions(c).open && actions(c).copy" class="ct-sep" aria-hidden="true"></span>
              <button v-if="actions(c).copy" type="button" class="ct-act is-copy" :class="{ 'is-done': copied === c.label }" @click="copy(c)">
                <CheckIcon v-if="copied === c.label" class="size-4" /><DocumentDuplicateIcon v-else class="size-4" />
                {{ copied === c.label ? 'Tersalin' : actions(c).copy }}
              </button>
            </div>
          </article>
        </div>
        <MapCard />
      </div>
    </div>
  </section>
</template>
