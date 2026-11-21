<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip } from 'chart.js'
import { DONORS, rupiah } from '../data/content'
import { live } from '../admin/db'

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip)
const props = defineProps({ id: String })
const el = ref(null)
const empty = ref(false)
let chart

// Total donasi terverifikasi per bulan (6 bulan terakhir) untuk SATU program saja
function monthly() {
  const m = {}
  DONORS.filter((d) => d.program === props.id).forEach((d) => { const k = d.date.slice(0, 7); m[k] = (m[k] || 0) + d.amount })
  const keys = Object.keys(m).sort().slice(-6)
  return {
    labels: keys.map((k) => new Date(k + '-01T00:00:00Z').toLocaleDateString('id-ID', { month: 'short', year: '2-digit', timeZone: 'UTC' })),
    data: keys.map((k) => m[k]),
  }
}
onMounted(() => {
  const { labels, data } = monthly(); empty.value = !data.length
  chart = new Chart(el.value, {
    type: 'bar',
    data: { labels, datasets: [{ data, backgroundColor: '#146b58', borderRadius: 6 }] },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { callbacks: { label: (c) => rupiah(c.parsed.y) } } },
      scales: { y: { beginAtZero: true, suggestedMax: 100000, ticks: { maxTicksLimit: 5, callback: (v) => (v >= 1e6 ? v / 1e6 + ' jt' : v >= 1e3 ? v / 1e3 + ' rb' : v) } } },
    },
  })
})
watch(live, () => {
  if (!chart) return
  const { labels, data } = monthly(); empty.value = !data.length
  chart.data.labels = labels; chart.data.datasets[0].data = data; chart.update()
})
onBeforeUnmount(() => chart?.destroy())
</script>

<template>
  <div class="relative h-40 mt-4">
    <canvas ref="el" role="img" aria-label="Donasi terverifikasi per bulan untuk program ini"></canvas>
    <p v-if="empty" class="absolute inset-0 grid place-items-center text-sm text-[#5f736d]">Belum ada donasi terverifikasi.</p>
  </div>
</template>
