<script setup>
import { computed, ref, watch } from 'vue'
import DOMPurify from 'dompurify'
import { ArrowLeftIcon, MagnifyingGlassIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
import ArticleCard from '../components/ArticleCard.vue'
import BackHome from '../components/BackHome.vue'
import Media from '../components/Media.vue'
import { ARTICLES, longDate } from '../data/content'
import { live } from '../admin/db'
import { store } from '../store'

const PER_PAGE = 6
const sorted = computed(() => (live.value, ARTICLES.toSorted((a, b) => b.date.localeCompare(a.date))))
const categories = computed(() => (live.value, [...new Set(ARTICLES.map((a) => a.category).filter(Boolean))].sort()))
const item = computed(() => (live.value, store.detail ? ARTICLES.find((a) => a.id === store.detail) : null))
const body = computed(() => (item.value ? DOMPurify.sanitize(item.value.body || '') : ''))

const q = ref('')
const cat = ref('')
const page = ref(1)
const filtered = computed(() => {
  const s = q.value.trim().toLowerCase()
  return sorted.value.filter((a) => (!cat.value || a.category === cat.value)
    && (!s || [a.title, a.excerpt, a.author, a.category].some((t) => String(t || '').toLowerCase().includes(s))))
})
const pages = computed(() => Math.max(1, Math.ceil(filtered.value.length / PER_PAGE)))
const shown = computed(() => filtered.value.slice((page.value - 1) * PER_PAGE, page.value * PER_PAGE))
watch([q, cat], () => { page.value = 1 })

const listEl = ref(null)
function setPage(n) {
  page.value = Math.min(pages.value, Math.max(1, n))
  listEl.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
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
          <Media :key="item.id" :image="item.image" cls="reader-media" eager />
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
        <BackHome />
        <h1>Berita &amp; artikel</h1>
        <p class="page-lead">Kabar terbaru dan berbagai informasi dari Masjid Jami' Al-Barokah.</p>
      </div></div>
      <div class="wrap section-tight">
        <search ref="listEl" class="news-tools" aria-label="Cari dan filter berita">
          <label class="news-search">
            <span class="sr-only">Cari berita</span>
            <MagnifyingGlassIcon aria-hidden="true" />
            <input v-model="q" type="search" autocorrect="off" autocapitalize="none" spellcheck="false"
                   placeholder="Cari judul, kategori, ringkasan, atau penulis…">
          </label>
          <label>
            <span class="sr-only">Kategori</span>
            <select v-model="cat" class="news-select">
              <option value="">Semua kategori</option>
              <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
            </select>
          </label>
        </search>

        <div v-if="!filtered.length" class="news-empty">
          <p class="page-lead">{{ sorted.length ? 'Tidak ada berita yang cocok dengan pencarian Anda.' : 'Belum ada berita atau artikel yang terbit.' }}</p>
          <button v-if="q || cat" type="button" class="btn btn-secondary" @click="q = ''; cat = ''">Reset pencarian</button>
        </div>
        <div v-else class="article-grid"><ArticleCard v-for="a in shown" :key="a.id" :article="a" /></div>

        <nav v-if="pages > 1" class="pager" aria-label="Halaman berita">
          <button type="button" aria-label="Halaman sebelumnya" :disabled="page === 1" @click="setPage(page - 1)"><ChevronLeftIcon class="size-4" /></button>
          <button v-for="n in pages" :key="n" type="button" :class="{ 'is-active': n === page }" :aria-current="n === page ? 'page' : undefined" @click="setPage(n)">{{ n }}</button>
          <button type="button" aria-label="Halaman berikutnya" :disabled="page === pages" @click="setPage(page + 1)"><ChevronRightIcon class="size-4" /></button>
        </nav>
      </div>
    </template>
  </section>
</template>