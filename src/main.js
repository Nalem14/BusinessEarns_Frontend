import { createApp } from "vue";
import { createWebHistory } from "vue-router";
import App from "./App.vue";
import store from "./store";
import createRouter from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlusSquare, faChartLine, faEdit, faHome } from "@fortawesome/free-solid-svg-icons";
// import { faBrands } from '@fortawesome/free-brands-svg-icons'
// import { faRegular } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faPlusSquare, faChartLine, faEdit, faHome);

const app = createApp(App);
const router = createRouter(createWebHistory());

app.component("font-awesome-icon", FontAwesomeIcon);

app.use(router);
app.use(store);

// Routes auth guard
router.beforeEach(async (to) => {
  if (to.meta.requiresAuth && !store.getters["user/isAuthenticated"]) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    return {
      path: "/login",
      // save the location we were at to come back later
      query: { redirect: to.fullPath },
    };
  }
});

// Do animation
router.afterEach((to, from) => {
  const toDepth = to.path.split('/').length
  const fromDepth = from.path.split('/').length
  to.meta.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
})

// this assumes App.vue template root element has `id="app"`
router.isReady().then(() => {
  app.mount("#app");
});
