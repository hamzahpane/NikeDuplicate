// src/main.js
import { createApp } from "vue";
import App from "./App.vue";
import router from "./route";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"; // Import plugin

// CSS
import "./style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

// Buat instance aplikasi terlebih dahulu
const app = createApp(App);

// Buat instance Pinia dan pasang plugin persisted state
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate); // Memasang plugin persisted state ke Pinia

// Menggunakan Pinia dan router
app.use(pinia); // Gunakan instance Pinia
app.use(router);

// Memasang aplikasi ke #app
app.mount("#app");
