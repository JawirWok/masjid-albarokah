<script setup>
import { ClockIcon, UserIcon, MapPinIcon } from '@heroicons/vue/24/outline'
import { EVENTS, MONTHS_SHORT, parseISODate } from '../data/content'
import { store } from '../store'

const sorted = [...EVENTS].sort((a, b) => a.date.localeCompare(b.date))
const d = (iso) => parseISODate(iso)
</script>

<template>
  <section class="view" aria-label="Kajian dan acara">
    <div class="page-intro"><div class="wrap">
      <p class="eyebrow">Kajian &amp; acara</p>
      <h1>Agenda masjid</h1>
    </div></div>
    <div class="wrap section-tight">
      <div class="event-list">
        <article v-for="e in sorted" :key="e.id" class="event-row">
          <div class="event-date-lg">
            <span class="day">{{ d(e.date).getUTCDate() }}</span>
            <span class="mon">{{ MONTHS_SHORT[d(e.date).getUTCMonth()] }}</span>
            <span class="yr">{{ d(e.date).getUTCFullYear() }}</span>
          </div>
          <div class="event-row-body">
            <img v-if="e.image" :src="e.image.src" :alt="e.image.alt || e.title" class="w-full max-w-sm aspect-video object-cover rounded-xl mb-3" loading="lazy">
            <span class="tag">{{ e.tag }}</span> <span class="tag tag-cat">{{ e.category }}</span>
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
