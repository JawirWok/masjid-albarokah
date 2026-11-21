<script setup>
import { computed } from 'vue'
import BaseDialog from './BaseDialog.vue'
import { EVENTS, longDate } from '../data/content'
import { store } from '../store'

const ev = computed(() => EVENTS.find((e) => e.id === store.eventId))
const close = () => (store.eventId = null)

async function share() {
  const text = `${ev.value.title} — ${longDate(ev.value.date)}, ${ev.value.time}`
  if (navigator.share) return navigator.share({ title: ev.value.title, text, url: location.href }).catch(() => {})
  await navigator.clipboard?.writeText(text + ' ' + location.href)
}
</script>

<template>
  <BaseDialog :open="!!ev" :title="ev?.title" :eyebrow="ev?.tag" @close="close">
    <template v-if="ev">
      <img v-if="ev.image" :src="ev.image.src" :alt="ev.image.alt || ev.title" class="w-full aspect-video object-cover rounded-xl mb-4">
      <dl class="grid grid-cols-2 gap-3 text-sm mb-4">
        <div><dt class="text-[#5f736d]">Tanggal</dt><dd class="font-semibold">{{ longDate(ev.date) }}</dd></div>
        <div><dt class="text-[#5f736d]">Waktu</dt><dd class="font-semibold">{{ ev.time }}</dd></div>
        <div><dt class="text-[#5f736d]">Kategori</dt><dd class="font-semibold">{{ ev.category }}</dd></div>
        <div><dt class="text-[#5f736d]">Pemateri</dt><dd class="font-semibold">{{ ev.speaker }}</dd></div>
        <div class="col-span-2"><dt class="text-[#5f736d]">Lokasi</dt><dd class="font-semibold">{{ ev.location }}</dd></div>
      </dl>
      <p class="text-sm italic mb-3">{{ ev.bio }}</p>
      <p class="mb-5">{{ ev.desc }}</p>
      <div class="flex gap-3">
        <button type="button" class="btn btn-secondary" @click="share">Bagikan</button>
        <button type="button" class="btn btn-primary" @click="close">Tutup</button>
      </div>
    </template>
  </BaseDialog>
</template>
