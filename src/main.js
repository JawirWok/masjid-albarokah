import { createApp } from 'vue'
import 'leaflet/dist/leaflet.css'
import './assets/main.css'
import App from './App.vue'
import { syncPublic, watchPublic } from './admin/db'

// data publik dibaca dari Supabase dulu (jatuh ke data bawaan bila gagal), baru tampil
syncPublic().finally(() => { createApp(App).mount('#app'); watchPublic() })
