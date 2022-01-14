import { createApp } from 'vue'
import { createWebHistory } from "vue-router";
import App from './App.vue'
import store from './store'
import createRouter from "./router";

const app = createApp(App)
const router = createRouter(createWebHistory());

app.use(router);
app.use(store);

// Routes auth guard
router.beforeEach(async (to) => {
    if (to.meta.requiresAuth && !store.getters['user/isAuthenticated']) {
      // this route requires auth, check if logged in
      // if not, redirect to login page.
      return {
        path: '/login',
        // save the location we were at to come back later
        query: { redirect: to.fullPath },
      }
    }
  })
  
  // this assumes App.vue template root element has `id="app"`
  router.isReady().then(() => {
    app.mount("#app");
  });

