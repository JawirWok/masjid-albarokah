import { ref, computed, onMounted, onUnmounted } from 'vue'
import { PRAYERS } from '../data/content'

const minutesOf = (t) => t.split(':').reduce((h, m) => h * 60 + Number(m), 0)

function jakartaSeconds() {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
  }).formatToParts(new Date())
  const get = (t) => Number(parts.find((p) => p.type === t).value)
  return (get('hour') % 24) * 3600 + get('minute') * 60 + get('second')
}

export function dateText() {
  const opt = { timeZone: 'Asia/Jakarta', day: 'numeric', month: 'long', year: 'numeric' }
  let text = new Intl.DateTimeFormat('id-ID', { ...opt, weekday: 'long' }).format(new Date())
  try {
    const h = new Intl.DateTimeFormat('id-ID-u-ca-islamic-umalqura', opt).format(new Date())
    text += ' · ' + h.replace(/\s*H$/, '') + ' H'
  } catch { /* hijriah tidak didukung */ }
  return text
}

export function usePrayer() {
  const now = ref(jakartaSeconds())
  let timer
  onMounted(() => { timer = setInterval(() => (now.value = jakartaSeconds()), 1000) })
  onUnmounted(() => clearInterval(timer))

  const nextIndex = computed(() => PRAYERS.findIndex((p) => minutesOf(p.time) * 60 > now.value))
  const tomorrow = computed(() => nextIndex.value === -1)
  const next = computed(() => PRAYERS[tomorrow.value ? 0 : nextIndex.value])
  const left = computed(() => {
    const target = minutesOf(next.value.time) * 60 + (tomorrow.value ? 86400 : 0)
    const d = target - now.value
    const pad = (n) => String(n).padStart(2, '0')
    return { h: pad(Math.floor(d / 3600)), m: pad(Math.floor((d % 3600) / 60)), s: pad(d % 60) }
  })
  const state = (i) => {
    const n = tomorrow.value ? 0 : nextIndex.value
    return { 'is-next': i === n, 'is-past': tomorrow.value ? i !== n : i < n }
  }
  return { next, left, state, date: dateText() }
}
