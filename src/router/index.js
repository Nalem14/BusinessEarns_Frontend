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
    meta: {
      requiresAuth: true,
      title: "Tableau de bord",
      description: "Un résumé de votre activitée",
    },
    component: () => import("../views/Home.vue"),
  },

  {
    path: "/profile",
    name: "Profile",
    meta: {
      requiresAuth: true,
      title: "Mon profil",
      description: "Gestion de votre compte",
    },
    component: () => import("../views/Profile.vue"),
  },


  {
    path: "/companies",
    name: "Companies",
    meta: {
      requiresAuth: true,
      title: "Vos sociétés",
      description: "Gérez vos sociétés",
    },
    component: () => import("../views/Companies.vue"),
  },
  {
    path: "/company/:id",
    name: "Company",
    meta: {
      requiresAuth: true,
      title: "Modifier la société",
      description: "Gérez les informations et l'objectif de la société",
    },
    component: () => import("../views/Company.vue"),
  },
  {
    path: "/company/:id/earns",
    name: "CompanyEarns",
    meta: {
      requiresAuth: true,
      title: "Revenus de la société",
      description: "Accès à l'historique complet des revenus",
    },
    component: () => import("../views/CompanyEarns.vue"),
  },
  {
    path: "/company/:id/stats",
    name: "CompanyStats",
    meta: {
      requiresAuth: true,
      title: "Stats de la société",
      description: "Accès à des statistiques détaillé des revenus",
    },
    component: () => import("../views/CompanyStats.vue"),
  },

  {
    path: "/login",
    name: "Login",
    meta: {
      requiresAuth: false,
      title: "Connexion",
      description: "Accéder à l'application",
    },
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    meta: {
      requiresAuth: false,
      title: "Créer un compte",
      description: "Rejoignez-nous, c'est simple et rapide !",
    },
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
