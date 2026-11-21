<script setup>
import { computed } from 'vue'
import DOMPurify from 'dompurify'
import { ArrowLeftIcon } from '@heroicons/vue/24/outline'
import ArticleCard from '../components/ArticleCard.vue'
import Media from '../components/Media.vue'
import { ARTICLES, longDate } from '../data/content'
import { store } from '../store'

const list = [...ARTICLES].sort((a, b) => b.date.localeCompare(a.date))
const item = computed(() => (store.detail ? ARTICLES.find((a) => a.id === store.detail) : null))
const body = computed(() => (item.value ? DOMPurify.sanitize(item.value.body || '') : ''))
</script>

<template>
  <section class="view" aria-label="Berita">
    <template v-if="item">
      <div class="wrap section-tight">
        <article class="reader">
          <button type="button" class="text-link reader-back" @click="store.go('berita')"><ArrowLeftIcon class="size-4 inline" /> Kembali ke berita</button>
          <p class="eyebrow">{{ item.category }}</p>
          <h1>{{ item.title }}</h1>
          <p class="reader-meta">{{ longDate(item.date) }}<template v-if="item.read"> · {{ item.read }} menit baca</template> · Penulis: {{ item.author }}</p>
          <Media :image="item.image" cls="reader-media" />
          <div class="prose" v-html="body"></div>
          <div class="reader-footer">
            <p>Disusun oleh <strong>Sekretariat Masjid Jami' Al-Barokah</strong> untuk jamaah dan warga sekitar.</p>
            <button type="button" class="btn btn-secondary" @click="store.go('berita')">Lihat berita lain</button>
          </div>
        </article>
      </div>
    </template>
    <template v-else>
      <div class="page-intro"><div class="wrap">
        <p class="eyebrow">Berita</p>
        <h1>Berita &amp; artikel</h1>
        <p class="page-lead">Kabar kegiatan, kajian singkat, dan tulisan untuk jamaah.</p>
      </div></div>
      <div class="wrap section-tight"><div class="article-grid"><ArticleCard v-for="a in list" :key="a.id" :article="a" /></div></div>
    </template>
  </section>
</template>
