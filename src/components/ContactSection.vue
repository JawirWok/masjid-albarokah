<script setup>
import { ChatBubbleLeftRightIcon, CameraIcon, MapPinIcon, EnvelopeIcon } from '@heroicons/vue/24/outline'
import MapCard from './MapCard.vue'
import { CONTACT_ITEMS } from '../data/content'
const icons = { whatsapp: ChatBubbleLeftRightIcon, instagram: CameraIcon, pin: MapPinIcon, mail: EnvelopeIcon }
</script>

<template>
  <section id="kontak" class="section section-alt" aria-labelledby="h-kontak">
    <div class="wrap">
      <div class="section-head"><div><p class="eyebrow">Kontak</p><h2 id="h-kontak">Hubungi pengurus masjid</h2></div></div>
      <div class="contact-layout">
        <div class="contact-cards">
          <a v-for="c in CONTACT_ITEMS" :key="c.label" class="contact-card" :href="c.href" target="_blank" rel="noopener">
            <component :is="icons[c.icon] || MapPinIcon" class="size-6" />
            <span><small>{{ c.label }}</small><strong>{{ c.value }}</strong><em>{{ c.hint }}</em></span>
          </a>
        </div>
        <MapCard />
      </div>
    </div>
  </section>
</template>
