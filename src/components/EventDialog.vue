<script setup>
import { computed } from 'vue'
import BaseDialog from './BaseDialog.vue'
import Media from './Media.vue'
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
      <Media v-if="ev.image" :image="{ ...ev.image, alt: ev.image.alt || ev.title }" cls="event-media event-media-lg" />
      <dl class="ev-meta">
        <div><dt>Tanggal</dt><dd>{{ longDate(ev.date) }}</dd></div>
        <div><dt>Waktu</dt><dd>{{ ev.time }}</dd></div>
        <div><dt>Kategori</dt><dd>{{ ev.category }}</dd></div>
        <div><dt>Pemateri</dt><dd>{{ ev.speaker }}</dd></div>
        <div class="full"><dt>Lokasi</dt><dd>{{ ev.location }}</dd></div>
      </dl>
      <p v-if="ev.bio" class="ev-bio">{{ ev.bio }}</p>
      <p v-if="ev.desc" class="ev-desc">{{ ev.desc }}</p>
      <div class="ev-actions">
        <button type="button" class="btn btn-secondary" @click="share">Bagikan</button>
        <button type="button" class="btn btn-primary" @click="close">Tutup</button>
      </div>
    </template>
  </BaseDialog>
</template>
