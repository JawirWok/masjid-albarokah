<script setup>
import { ClockIcon, UserIcon, ArrowRightIcon } from '@heroicons/vue/24/outline'
import { MONTHS_SHORT, parseISODate, weekday } from '../data/content'
import { store } from '../store'
const props = defineProps({ event: Object })
const d = parseISODate(props.event.date)
</script>

<template>
  <article class="event-card">
    <img v-if="event.image" :src="event.image.src" :alt="event.image.alt || event.title" class="w-full aspect-video object-cover rounded-xl mb-3" loading="lazy">
    <div class="event-date">
      <span class="event-day">{{ d.getUTCDate() }}</span>
      <span class="event-month">
        <span>{{ MONTHS_SHORT[d.getUTCMonth()] }} {{ d.getUTCFullYear() }}</span>
        <span>{{ weekday(event.date) }}</span>
      </span>
    </div>
    <span class="tag">{{ event.tag }}</span> <span class="tag tag-cat">{{ event.category }}</span>
    <h3 class="event-title">{{ event.title }}</h3>
    <div class="event-meta">
      <span><ClockIcon class="size-4 inline" />{{ event.time }}</span>
      <span><UserIcon class="size-4 inline" />{{ event.speaker }}</span>
    </div>
    <button type="button" class="text-link" @click="store.eventId = event.id">
      Detail acara <ArrowRightIcon class="size-4 inline" />
    </button>
  </article>
</template>
