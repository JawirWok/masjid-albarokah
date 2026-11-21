<script setup>
import { computed } from 'vue'
import { ArrowLeftIcon } from '@heroicons/vue/24/outline'
import ActivityCard from '../components/ActivityCard.vue'
import Media from '../components/Media.vue'
import { ACTIVITIES, longDate } from '../data/content'
import { store } from '../store'

const list = [...ACTIVITIES].sort((a, b) => b.date.localeCompare(a.date))
const item = computed(() => (store.detail ? ACTIVITIES.find((a) => a.id === store.detail) : null))
</script>

<template>
  <section class="view" aria-label="Kegiatan">
    <template v-if="item">
      <div class="wrap section-tight">
        <article class="reader">
          <button type="button" class="text-link reader-back" @click="store.go('kegiatan')"><ArrowLeftIcon class="size-4 inline" /> Kembali ke kegiatan</button>
          <p class="eyebrow">Kegiatan</p>
          <h1>{{ item.title }}</h1>
          <p class="reader-meta">{{ item.schedule }} · Terakhir dilaksanakan {{ longDate(item.date) }} · Penanggung jawab: {{ item.pic }}</p>
          <Media :image="item.image" cls="reader-media" />
          <div class="prose"><p>{{ item.desc }}</p></div>
        </article>
      </div>
    </template>
    <template v-else>
      <div class="page-intro"><div class="wrap">
        <p class="eyebrow">Kegiatan</p>
        <h1>Kegiatan masjid</h1>
        <p class="page-lead">Pengajian rutin, bakti sosial, dan kegiatan jamaah lainnya.</p>
      </div></div>
      <div class="wrap section-tight"><div class="activity-grid"><ActivityCard v-for="a in list" :key="a.id" :activity="a" /></div></div>
    </template>
  </section>
</template>
