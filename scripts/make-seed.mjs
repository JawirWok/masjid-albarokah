// Membuat supabase/seed.sql dari data bawaan (src/data/content.js).
import { writeFileSync } from 'node:fs'
import * as C from '../src/data/content.js'

const q = (v) => "'" + JSON.stringify(v).replace(/'/g, "''") + "'::jsonb"
const t = (s) => "'" + String(s).replace(/'/g, "''") + "'"
const out = ['-- Data awal. Jalankan SETELAH schema.sql.']
const add = (table, rows, prefix) => rows.forEach((r, i) => {
  const row = { ...r, id: r.id ?? `${prefix}-${i + 1}` }
  out.push(`insert into ${table} (id, data) values (${t(row.id)}, ${q(row)}) on conflict (id) do update set data = excluded.data;`)
})
add('programs', C.PROGRAMS.map((p) => ({ ...p, type: p.target ? 'target' : 'umum', status: 'aktif' })), 'program')
add('events', C.EVENTS.map((e) => ({ ...e, status: 'akan' })), 'acara')
add('activities', C.ACTIVITIES, 'kegiatan')
add('articles', C.ARTICLES.map((a) => ({ ...a, status: 'terbit' })), 'artikel')
add('donors', C.DONORS.map((d) => ({ ...d, status: 'verified' })), 'donasi')
const times = Object.fromEntries(C.PRAYERS.map((p) => [p.name.toLowerCase(), p.time]))
const settings = {
  sholat: { lokasi: 'Tangerang Selatan', lat: -6.33, lng: 106.69, metode: '20', auto: true, ...times },
  bayar: { bank: 'BSI', norek: '', pemilik: '', ewallet: '', wa: '6281298850904' },
  kontak: { wa: '6281298850904', email: '', alamat: 'Jl. Ampera Poncol, Babakan, Kec. Setu, Kota Tangerang Selatan, Banten 15315', maps: 'https://maps.app.goo.gl/kzyHBUKtcq12koBo9', lat: '', lng: '', instagram: 'jamialbarokahtangsel', facebook: '', youtube: '' },
}
for (const [k, v] of Object.entries(settings)) out.push(`insert into settings (key, data) values (${t(k)}, ${q(v)}) on conflict (key) do update set data = excluded.data;`)
writeFileSync(new URL('../supabase/seed.sql', import.meta.url), out.join('\n') + '\n')
console.log('seed.sql:', out.length - 1, 'baris')
