<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js'
Chart.register(DoughnutController, ArcElement, Tooltip, Legend)
const props = defineProps({ labels: Array, data: Array })
const el = ref(null)
let chart
onMounted(() => {
  chart = new Chart(el.value, {
    type: 'doughnut',
    data: { labels: props.labels, datasets: [{ data: props.data, backgroundColor: ['#146b58', '#1f6f97', '#a8d6c6', '#c4d8ce', '#0b4036'] }] },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } },
  })
})
onBeforeUnmount(() => chart?.destroy())
</script>

<template><div class="h-64"><canvas ref="el" role="img" aria-label="Donasi terverifikasi per program"></canvas></div></template>
