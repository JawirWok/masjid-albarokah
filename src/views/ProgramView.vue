<script setup>
import { computed } from 'vue'
import DOMPurify from 'dompurify'
import { ClockIcon, ArrowRightIcon, ArrowLeftIcon } from '@heroicons/vue/24/outline'
import BackHome from '../components/BackHome.vue'
import Media from '../components/Media.vue'
import { ACTIVITIES, PROGRAM_GROUPS, daftarLink } from '../data/content'
import { fmtBody } from '../admin/db'
import { store } from '../store'

const groups = PROGRAM_GROUPS
  .map((g) => ({ ...g, items: ACTIVITIES.filter((a) => a.group === g.id) }))
  .filter((g) => g.items.length)

const item = computed(() => (store.detail ? ACTIVITIES.find((a) => a.id === store.detail) : null))
const groupLabel = computed(() => PROGRAM_GROUPS.find((g) => g.id === item.value?.group)?.eyebrow || 'Program')
const html = computed(() => (item.value ? DOMPurify.sanitize(fmtBody(item.value.detail || item.value.desc || '')) : ''))
</script>

<template>
  <section class="view" aria-label="Program">
    <template v-if="item">
      <div class="wrap section-tight">
        <article class="reader">
          <button type="button" class="text-link reader-back" @click="store.go('program')"><ArrowLeftIcon class="size-4 inline" /> Kembali ke program</button>
          <p class="eyebrow">{{ groupLabel }}</p>
          <h1>{{ item.title }}</h1>
          <p v-if="item.schedule" class="reader-meta">Jadwal: {{ item.schedule }}</p>
          <Media :image="item.image" cls="reader-media" />
          <div class="prose" v-html="html"></div>
          <div v-if="item.daftar" class="prg-cta">
            <a class="btn btn-primary" :href="daftarLink(item)" target="_blank" rel="noopener">
              <svg class="icon" aria-hidden="true"><use href="#i-whatsapp" /></svg> Daftar via WhatsApp
            </a>
          </div>
        </article>
      </div>
    </template>

    <template v-else>
      <div class="page-intro"><div class="wrap">
        <BackHome />
        <h1>Program masjid</h1>
        <p class="page-lead">Beragam kegiatan untuk belajar, berbagi, dan beribadah bersama.</p>
      </div></div>

      <div class="wrap section-tight prg">
        <p v-if="!groups.length" class="page-lead">Program akan segera ditampilkan.</p>
        <section v-for="g in groups" :key="g.id" class="prg-group" :aria-labelledby="'prg-' + g.id">
          <div class="prg-head">
            <p class="eyebrow">{{ g.eyebrow }}</p>
            <h2 :id="'prg-' + g.id">{{ g.title }}</h2>
          </div>
          <div class="prg-grid">
            <article v-for="p in g.items" :key="p.id" class="prg-card">
              <Media :image="p.image" cls="prg-media" />
              <div class="prg-body">
                <h3>{{ p.title }}</h3>
                <p v-if="p.schedule" class="prg-sched"><ClockIcon class="size-4 inline" /> {{ p.schedule }}</p>
                <p>{{ p.desc }}</p>
                <div class="prg-actions">
                  <a v-if="p.daftar" class="btn btn-primary btn-sm" :href="daftarLink(p)" target="_blank" rel="noopener">
                    <svg class="icon" aria-hidden="true"><use href="#i-whatsapp" /></svg> Daftar
                  </a>
                  <button type="button" class="text-link" :aria-label="'Lihat selengkapnya: ' + p.title" @click="store.go('program', p.id)">
                    Lihat selengkapnya <ArrowRightIcon class="size-4 inline" />
                  </button>
                </div>
              </div>
            </article>
          </div>
        </section>
      </div>
    </template>
  </section>
</template>