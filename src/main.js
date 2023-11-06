/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from "./App.vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import store from "./store/store";
// Composables
import { createApp } from "vue";

// Plugins
import { registerPlugins } from "@/plugins";

const app = createApp(App);
registerPlugins(app);
app.use(Toast);
app.use(store);
app.mount("#app");
