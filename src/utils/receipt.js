import { rupiah, longDate } from '../data/content'

function round(g, x, y, w, h, r) {
  g.beginPath(); g.moveTo(x + r, y)
  g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r)
  g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath()
}
function fit(g, text, max) {
  let t = String(text)
  while (t.length > 1 && g.measureText(t).width > max) t = t.slice(0, -2)
  return t === String(text) ? t : t.trimEnd() + '…'
}

/** Buat bukti donasi sebagai gambar PNG dan unduh. d = baris donasi dari server. */
export function downloadReceipt(d, programName) {
  const W = 760, H = 960, font = "'Plus Jakarta Sans', system-ui, sans-serif"
  const c = document.createElement('canvas'); c.width = W; c.height = H
  const g = c.getContext('2d')
  g.fillStyle = '#e2f1ea'; g.fillRect(0, 0, W, H)
  g.fillStyle = '#fff'; round(g, 40, 40, W - 80, H - 80, 28); g.fill()
  g.fillStyle = '#146b58'; round(g, 40, 40, W - 80, 170, 28); g.fill(); g.fillRect(40, 150, W - 80, 60)
  g.textAlign = 'center'
  g.fillStyle = '#fff'; g.font = `700 30px ${font}`; g.fillText("Masjid Jami' Al-Barokah", W / 2, 110)
  g.fillStyle = '#a8d6c6'; g.font = `600 22px ${font}`; g.fillText('BUKTI DONASI', W / 2, 152)

  g.fillStyle = '#0b4036'; g.font = `700 56px ${font}`; g.fillText(rupiah(d.amount), W / 2, 295)
  const ok = d.status === 'verified'
  g.fillStyle = ok ? '#146b58' : '#b45309'; g.font = `700 20px ${font}`
  g.fillText(ok ? '✓ TERVERIFIKASI' : 'MENUNGGU VERIFIKASI PENGURUS', W / 2, 340)

  const rows = [['No. bukti', d.id.replace('donasi-', '').toUpperCase()], ['Tanggal', longDate(d.date)], ['Nama', d.name],
    ['Program', programName], ['Metode', d.method]]
  rows.forEach(([k, v], i) => {
    const y = 420 + i * 66
    g.strokeStyle = '#dce8e2'; g.beginPath(); g.moveTo(90, y - 34); g.lineTo(W - 90, y - 34); g.stroke()
    g.textAlign = 'left'; g.fillStyle = '#5f736d'; g.font = `500 20px ${font}`; g.fillText(k, 90, y)
    g.textAlign = 'right'; g.fillStyle = '#0e2b25'; g.font = `600 22px ${font}`; g.fillText(fit(g, v, 400), W - 90, y)
  })
  g.textAlign = 'center'; g.fillStyle = '#0e2b25'; g.font = `600 22px ${font}`
  g.fillText('Terima kasih atas donasi Anda.', W / 2, 810)
  g.fillStyle = '#5f736d'; g.font = `500 19px ${font}`
  g.fillText('Semoga menjadi amal jariyah dan keberkahan bagi keluarga.', W / 2, 846)
  g.font = `500 16px ${font}`; g.fillText('Bukti ini dibuat otomatis oleh sistem donasi masjid.', W / 2, 890)

  c.toBlob((b) => {
    const a = document.createElement('a')
    a.href = URL.createObjectURL(b); a.download = `bukti-donasi-${d.id.replace('donasi-', '')}.png`
    a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 2000)
  }, 'image/png')
}
