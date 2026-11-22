<script setup>
import { ClockIcon, UserIcon, MapPinIcon } from '@heroicons/vue/24/outline'
import { upcomingEvents, MONTHS_SHORT, parseISODate } from '../data/content'
import Media from '../components/Media.vue'
import { store } from '../store'

const sorted = upcomingEvents()
const d = (iso) => parseISODate(iso)
</script>

<template>
  <section class="view" aria-label="Kajian dan acara">
    <div class="page-intro"><div class="wrap">
      <p class="eyebrow">Kajian &amp; acara</p>
      <h1>Agenda masjid</h1>
    </div></div>
    <div class="wrap section-tight">
      <p v-if="!sorted.length" class="page-lead">Belum ada agenda mendatang. Pantau terus informasi terbaru dari pengurus.</p>
      <div v-else class="event-list">
        <article v-for="e in sorted" :key="e.id" class="event-row">
          <div class="event-date-lg">
            <span class="day">{{ d(e.date).getUTCDate() }}</span>
            <span class="mon">{{ MONTHS_SHORT[d(e.date).getUTCMonth()] }}</span>
            <span class="yr">{{ d(e.date).getUTCFullYear() }}</span>
          </div>
          <div class="event-row-body">
            <Media v-if="e.image" :image="{ ...e.image, alt: e.image.alt || e.title }" cls="event-media" />
            <div class="event-tags"><span class="tag">{{ e.tag }}</span><span class="tag tag-cat">{{ e.category }}</span></div>
            <h3>{{ e.title }}</h3>
            <div class="event-meta">
              <span><ClockIcon class="size-4 inline" />{{ e.time }}</span>
              <span><UserIcon class="size-4 inline" />{{ e.speaker }}</span>
              <span><MapPinIcon class="size-4 inline" />{{ e.location }}</span>
            </div>
          </div>
          <button type="button" class="btn btn-secondary btn-sm" @click="store.eventId = e.id">Detail acara</button>
        </article>
      </div>
    </div>
  </section>
</template>
