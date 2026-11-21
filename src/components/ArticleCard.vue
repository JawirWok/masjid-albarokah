<script setup>
import { ArrowRightIcon } from '@heroicons/vue/24/outline'
import Media from './Media.vue'
import { shortDate } from '../data/content'
import { store } from '../store'
defineProps({ article: Object })
</script>

<template>
  <article class="article-card">
    <Media :image="article.image" cls="article-media" />
    <div class="article-body">
      <span class="chip-cat">{{ article.category }}</span>
      <h3 class="article-title">{{ article.title }}</h3>
      <p class="article-excerpt">{{ article.excerpt }}</p>
      <div class="article-foot">
        <span>{{ article.author }} · {{ shortDate(article.date) }}<template v-if="article.read"> · {{ article.read }} menit</template></span>
        <button type="button" class="text-link" :aria-label="'Baca berita: ' + article.title" @click="store.go('berita', article.id)">Detail selengkapnya <ArrowRightIcon class="size-4 inline" /></button>
      </div>
    </div>
  </article>
</template>
