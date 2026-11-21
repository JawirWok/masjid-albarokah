<script setup>
import { patternIcon } from '../data/content'
defineProps({ image: Object, cls: String })
</script>

<template>
  <div v-if="image" :class="cls"><img :src="image.src" :alt="image.alt || ''" :width="image.width" :height="image.height" loading="lazy"></div>
  <div v-else :class="[cls, 'media-pattern']" aria-hidden="true" v-html="patternIcon"></div>
</template>
