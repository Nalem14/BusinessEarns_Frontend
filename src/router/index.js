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
    meta: { requiresAuth: true, title: "Tableau de bord", description: "Un résumé de votre activitée" },
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/login",
    name: "Login",
    meta: { requiresAuth: false, title: "Connexion", description: "Accéder à l'application" },
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    meta: { requiresAuth: false, title: "Créer un compte", description: "Rejoignez-nous, c'est simple et rapide !" },
    component: () => import("../views/Register.vue"),
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
