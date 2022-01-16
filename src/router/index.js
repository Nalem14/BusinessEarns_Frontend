import { createRouter } from "vue-router";

const routes = [
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    meta: {
      title: "Page introuvable",
    },
    component: () => import("../views/NotFound.vue"),
  },
  {
    path: "/",
    name: "Home",
    meta: { requiresAuth: false, title: "Tableau de bord" },
    component: () => import("../views/Home.vue"),
  },
];

export default function (history) {
  return createRouter({
    history,
    routes,
    scrollBehavior(to, from) {
      if (to.hash) {
        return {
          el: to.hash,
          behavior: "smooth",
        };
      }
      
      // always scroll to top
      return { top: 0, left: 0 };
    },
  });
}
