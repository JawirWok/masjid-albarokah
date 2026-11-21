<script setup>
import { Dialog, DialogPanel, DialogTitle, TransitionRoot, TransitionChild } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
defineProps({ open: Boolean, title: String, eyebrow: String })
defineEmits(['close'])
</script>

<template>
  <TransitionRoot :show="open" as="template">
    <Dialog class="relative z-50" @close="$emit('close')">
      <TransitionChild enter="duration-200 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                       leave="duration-150 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-ink/60" aria-hidden="true" />
      </TransitionChild>
      <div class="fixed inset-0 overflow-y-auto p-4 grid place-items-center">
        <DialogPanel class="relative w-full max-w-xl rounded-[22px] bg-white p-6 sm:p-8 shadow-2xl">
          <button type="button" class="absolute right-4 top-4 rounded-full p-2 hover:bg-brand-50"
                  aria-label="Tutup" @click="$emit('close')"><XMarkIcon class="size-5" /></button>
          <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
          <DialogTitle as="h2" class="font-display text-2xl mb-4 pr-8">{{ title }}</DialogTitle>
          <slot />
        </DialogPanel>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
