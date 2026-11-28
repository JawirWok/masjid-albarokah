<script setup>
import { ref, computed } from 'vue'
import { uploadImage } from './db'
const props = defineProps({ fields: Array, model: Object })
const busy = ref('')
const uploadErr = ref({})
const guess = (n) => {
  const s = n.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ').trim()
  return /^(img|dsc|pxl|photo|whatsapp|screenshot)/i.test(s) || !/[a-z]{3,}/i.test(s) ? '' : s
}
async function pick(e, f) {
  const file = e.target.files[0]
  if (!file) return
  busy.value = f.k
  uploadErr.value[f.k] = ''
  try {
    const hint = guess(file.name)
    const img = await uploadImage(file, hint)
    if (f.t === 'image') props.model[f.k] = img
    else { img.alt = hint; (props.model[f.k] ||= []).push(img) }
  } catch (err) { uploadErr.value[f.k] = 'Gagal unggah gambar: ' + (err.message || err) } finally { busy.value = ''; e.target.value = '' }
}
function move(k, i, d) {
  const a = props.model[k], j = i + d
  if (j < 0 || j >= a.length) return
  ;[a[i], a[j]] = [a[j], a[i]]
}
const visible = computed(() => props.fields.filter((f) => !f.show || f.show(props.model)))
const options = (f) => (typeof f.o === 'function' ? f.o() : f.o)
const wide = (f) => f.full || ['textarea', 'lines', 'check', 'image', 'images'].includes(f.t)
</script>

<template>
  <div class="fgrid">
    <div v-for="f in visible" :key="f.k" class="fld" :class="{ full: wide(f) }">
      <label v-if="f.t === 'check'"><input v-model="model[f.k]" type="checkbox"> {{ f.l }}</label>
      <template v-else>
        <label :for="'f-' + f.k">{{ f.l }}</label>
        <textarea v-if="f.t === 'textarea'" :id="'f-' + f.k" v-model="model[f.k]" :required="!!f.req" :rows="f.rows || 3"></textarea>
        <textarea v-else-if="f.t === 'lines'" :id="'f-' + f.k" :rows="f.rows || 4" :value="(model[f.k] || []).join('\n')"
                  @input="model[f.k] = $event.target.value.split('\n')"></textarea>
        <div v-else-if="f.t === 'image'">
          <div v-if="model[f.k]" class="flex items-center gap-3 mb-2">
            <img :src="model[f.k].src" :alt="model[f.k].alt || 'Pratinjau gambar'" class="h-20 w-32 rounded-lg object-cover">
            <button type="button" class="a-btn a-btn-sm a-btn-d" @click="model[f.k] = null">Hapus gambar</button>
          </div>
          <div v-else-if="f.fallback" class="flex items-center gap-3 mb-2">
            <img :src="f.fallback" alt="Foto bawaan saat ini" class="h-20 w-32 rounded-lg object-cover">
            <span class="muted">Memakai foto bawaan</span>
          </div>
          <input :id="'f-' + f.k" type="file" accept="image/*" :disabled="busy === f.k" @change="pick($event, f)">
          <small v-if="busy === f.k" class="muted" aria-live="polite">Mengunggah…</small>
          <p v-if="uploadErr[f.k]" class="a-alert err" role="alert" style="margin:8px 0 0">{{ uploadErr[f.k] }}</p>
        </div>
        <div v-else-if="f.t === 'images'" class="gimgs">
        <p v-if="!(model[f.k] || []).length" class="muted">Belum ada foto. Unggah foto pertama di bawah.</p>
        <ul class="gimg-list">
          <li v-for="(g, i) in model[f.k] || []" :key="g.src" class="gimg">
            <img :src="g.src" :alt="g.alt || 'Foto tanpa nama'">
            <div class="gimg-body">
              <label :for="`gn-${f.k}-${i}`">Nama foto {{ i + 1 }}</label>
              <input :id="`gn-${f.k}-${i}`" v-model="g.alt" type="text" maxlength="60" required :placeholder="f.ph || 'mis. Tempat wudhu'">
              <small>{{ g.width }} × {{ g.height }} px</small>
            </div>
            <div class="gimg-tools">
              <button type="button" class="a-btn a-btn-sm" aria-label="Geser ke atas" :disabled="i === 0" @click="move(f.k, i, -1)">↑</button>
              <button type="button" class="a-btn a-btn-sm" aria-label="Geser ke bawah" :disabled="i === model[f.k].length - 1" @click="move(f.k, i, 1)">↓</button>
              <button type="button" class="a-btn a-btn-sm a-btn-d" aria-label="Hapus foto" @click="model[f.k].splice(i, 1)">Hapus</button>
            </div>
          </li>
        </ul>
        <input :id="'f-' + f.k" type="file" accept="image/*" :disabled="busy === f.k" @change="pick($event, f)">
        <small v-if="busy === f.k" class="muted" aria-live="polite">Mengunggah…</small>
        <p v-if="uploadErr[f.k]" class="a-alert err" role="alert" style="margin:8px 0 0">{{ uploadErr[f.k] }}</p>
      </div>
        <select v-else-if="f.t === 'select'" :id="'f-' + f.k" v-model="model[f.k]">
          <option v-for="[v, l] in options(f)" :key="v" :value="v">{{ l }}</option>
        </select>
        <input v-else :id="'f-' + f.k" v-model="model[f.k]" :type="f.t" :required="!!f.req" :step="f.t === 'number' ? 'any' : undefined">
        <small v-if="f.h" class="muted">{{ f.h }}</small>
      </template>
    </div>
  </div>
</template>
