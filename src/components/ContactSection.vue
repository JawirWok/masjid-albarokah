<script setup>
import { ref } from 'vue'
import { ArrowUpRightIcon, DocumentDuplicateIcon, CheckIcon } from '@heroicons/vue/24/outline'
import MapCard from './MapCard.vue'
import { CONTACT_ITEMS } from '../data/content'

const items = CONTACT_ITEMS.filter((c) => c.icon !== 'pin')
const canCopy = (c) => c.icon === 'whatsapp' || c.icon === 'mail'
const openText = (c) => ({ whatsapp: 'Chat WhatsApp', instagram: 'Buka Instagram', facebook: 'Buka Facebook', youtube: 'Buka YouTube', mail: 'Kirim email' }[c.icon] || 'Buka')

const digits = (v) => String(v).replace(/\D/g, '')
// +6281298850904 -> +62 812-9885-0904 (hanya tampilan)
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
  copied.value = c.href
  clearTimeout(timer); timer = setTimeout(() => (copied.value = ''), 2000)
}
</script>

<template>
  <section id="kontak" class="section ct" aria-labelledby="h-kontak">
    <div class="wrap">
      <div class="ct-head">
        <p class="eyebrow">Kontak</p>
        <h2 id="h-kontak">Hubungi pengurus masjid</h2>
        <p class="ct-lead">Silakan hubungi pengurus atau koordinator program sesuai keperluan Anda.</p>
      </div>
      <div class="ct-layout">
        <ul class="ct-list">
          <li v-for="c in items" :key="c.href + c.label" class="ct-row">
            <span class="ct-icon"><svg class="icon" aria-hidden="true"><use :href="'#i-' + c.icon" /></svg></span>
            <div class="ct-text">
              <span class="ct-label">{{ c.label }}</span>
              <strong class="ct-value">{{ display(c) }}</strong>
            </div>
            <div class="ct-tools">
              <a class="ct-tool" :href="c.href" target="_blank" rel="noopener" :title="openText(c)" :aria-label="openText(c) + ': ' + c.label">
                <ArrowUpRightIcon class="size-4" />
              </a>
              <button v-if="canCopy(c)" type="button" class="ct-tool" :class="{ 'is-done': copied === c.href }"
                      :title="copied === c.href ? 'Tersalin' : 'Salin'" :aria-label="'Salin ' + c.label" @click="copy(c)">
                <CheckIcon v-if="copied === c.href" class="size-4" /><DocumentDuplicateIcon v-else class="size-4" />
              </button>
            </div>
          </li>
        </ul>
        <MapCard />
      </div>
    </div>
  </section>
</template>