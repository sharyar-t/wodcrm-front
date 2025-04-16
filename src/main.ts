import "./assets/main.css";

import { createApp } from "vue";
import { VueQueryPlugin } from "@tanstack/vue-query";

import App from "./App.vue";
import stores from "@/stores";
import router from "@/router";
import { useAuthStore } from "./stores/AuthStore";

const app = createApp(App);

app.use(stores);
app.use(router);
app.use(VueQueryPlugin);

const authStore = useAuthStore();
authStore.initialize();

app.mount("#app");
