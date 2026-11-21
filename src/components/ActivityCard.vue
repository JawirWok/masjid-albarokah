<script setup>
import { ClockIcon, CalendarDaysIcon, ArrowRightIcon } from '@heroicons/vue/24/outline'
import Media from './Media.vue'
import { longDate } from '../data/content'
import { store } from '../store'
defineProps({ activity: Object })
</script>

<template>
  <article class="activity-card">
    <Media :image="activity.image" cls="activity-media" />
    <div class="activity-body">
      <p class="activity-schedule"><ClockIcon class="size-4 inline" /> {{ activity.schedule }}</p>
      <p class="activity-date"><CalendarDaysIcon class="size-4 inline" /> Terakhir dilaksanakan: {{ longDate(activity.date) }}</p>
      <h3 class="activity-title">{{ activity.title }}</h3>
      <p class="activity-desc">{{ activity.desc }}</p>
      <div class="activity-foot">
        <span>{{ activity.pic }}</span>
        <button type="button" class="text-link" @click="store.go('kegiatan', activity.id)">Detail selengkapnya <ArrowRightIcon class="size-4 inline" /></button>
      </div>
    </div>
  </article>
</template>
