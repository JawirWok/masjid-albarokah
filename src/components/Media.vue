<script setup>
import { patternIcon } from '../data/content'
defineProps({ image: Object, cls: String, eager: Boolean })
</script>

<template>
  <!-- Gambar ditampilkan utuh (tidak dipotong). Sisa ruang diisi salinan gambar yang diburamkan. -->
  <div v-if="image" :class="[cls, 'media-fit']">
    <img class="media-bg" :src="image.src" alt="" aria-hidden="true" :loading="eager ? 'eager' : 'lazy'">
    <img class="media-fg" :src="image.src" :alt="image.alt || ''" :width="image.width" :height="image.height"
         :loading="eager ? 'eager' : 'lazy'" :fetchpriority="eager ? 'high' : undefined">
  </div>
  <div v-else :class="[cls, 'media-pattern']" aria-hidden="true" v-html="patternIcon"></div>
</template>
