<script setup>
import { ArrowLeftIcon } from '@heroicons/vue/24/outline'
import { store } from '../store'
</script>

<template>
  <button type="button" class="back-home" @click="store.go('beranda')">
    <ArrowLeftIcon class="size-4" /> Beranda
  </button>
</template>