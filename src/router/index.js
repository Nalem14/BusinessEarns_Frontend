import { createRouter } from "vue-router";

const routes = [
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    meta: {
      title: "Page introuvable"
    },
    component: () => import("../views/NotFound.vue"),
  },
  { path: "/", name: "Home", meta: { requiresAuth: false, title: "Tableau de bord" }, component: () => import("../views/Home.vue") },
];

export default function (history) {
  return createRouter({
    history,
    routes,
    scrollBehavior() {
      // always scroll to top
      return { top: 0 }
    },
  });
}
