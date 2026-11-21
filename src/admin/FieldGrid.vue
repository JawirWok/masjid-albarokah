<script setup>
import { ref } from 'vue'
import { uploadImage } from './db'
const props = defineProps({ fields: Array, model: Object })
const busy = ref('')
async function pick(e, f) {
  const file = e.target.files[0]
  if (!file) return
  busy.value = f.k
  try {
    const img = await uploadImage(file)
    if (f.t === 'image') props.model[f.k] = img
    else (props.model[f.k] ||= []).push(img)
  } catch (err) { alert('Gagal unggah gambar: ' + (err.message || err)) } finally { busy.value = ''; e.target.value = '' }
}
const options = (f) => (typeof f.o === 'function' ? f.o() : f.o)
const wide = (f) => f.full || ['textarea', 'lines', 'check', 'image', 'images'].includes(f.t)
</script>

<template>
  <div class="fgrid">
    <div v-for="f in fields" :key="f.k" class="fld" :class="{ full: wide(f) }">
      <label v-if="f.t === 'check'"><input v-model="model[f.k]" type="checkbox"> {{ f.l }}</label>
      <template v-else>
        <label :for="'f-' + f.k">{{ f.l }}</label>
        <textarea v-if="f.t === 'textarea'" :id="'f-' + f.k" v-model="model[f.k]" :required="!!f.req" :rows="f.rows || 3"></textarea>
        <textarea v-else-if="f.t === 'lines'" :id="'f-' + f.k" :rows="f.rows || 4" :value="(model[f.k] || []).join('\n')"
                  @input="model[f.k] = $event.target.value.split('\n')"></textarea>
        <div v-else-if="f.t === 'image'">
          <div v-if="model[f.k]" class="flex items-center gap-3 mb-2">
            <img :src="model[f.k].src" alt="" class="h-20 w-32 rounded-lg object-cover">
            <button type="button" class="a-btn a-btn-sm a-btn-d" @click="model[f.k] = null">Hapus gambar</button>
          </div>
          <input :id="'f-' + f.k" type="file" accept="image/*" @change="pick($event, f)">
          <small v-if="busy === f.k" class="muted">Mengunggah…</small>
        </div>
        <div v-else-if="f.t === 'images'">
          <div class="flex flex-wrap gap-3 mb-2">
            <div v-for="(g, i) in model[f.k] || []" :key="g.src" class="relative w-32">
              <img :src="g.src" alt="" class="h-20 w-32 rounded-lg object-cover">
              <input v-model="g.alt" type="text" placeholder="Keterangan" aria-label="Keterangan foto" style="margin-top:4px;min-height:32px;padding:4px 8px;font-size:12px">
              <button type="button" class="a-btn a-btn-sm a-btn-d absolute -top-2 -right-2" aria-label="Hapus foto" @click="model[f.k].splice(i, 1)">×</button>
            </div>
          </div>
          <input :id="'f-' + f.k" type="file" accept="image/*" @change="pick($event, f)">
          <small v-if="busy === f.k" class="muted">Mengunggah…</small>
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
