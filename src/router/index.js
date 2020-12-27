import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store/";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/dash",
    name: "Dashboard",
    component: () => import("../views/Dash.vue"),
    beforeEnter: (to, from, next) => {
      if (!store.state.signedIn) {
        next("/");
      } else {
        next();
      }
    },
    children: [
      {
        path: "admin/clients",
        name: "clients",
        component: () => import("../components/admin/Clients.vue"),
        beforeEnter: (to, from, next) => {
          if (store.getters.isAdmin) {
            next();
          } else {
            next("/");
          }
        }
      },
      {
        path: "admin/exercises",
        name: "exercises",
        component: () => import("../components/admin/Exercises.vue"),
        beforeEnter: (to, from, next) => {
          if (store.getters.isAdmin) {
            next();
          } else {
            next("/");
          }
        }
      },
      {
        path: "admin/meals",
        name: "meals",
        component: () => import("../components/admin/Meals.vue"),
        beforeEnter: (to, from, next) => {
          if (store.getters.isAdmin) {
            next();
          } else {
            next("/");
          }
        }
      },
      {
        path: "admin/presets",
        name: "presets",
        component: () => import("../components/admin/Presets.vue"),
        beforeEnter: (to, from, next) => {
          if (store.getters.isAdmin) {
            next();
          } else {
            next("/");
          }
        }
      },
      {
        path: "admin/settings",
        name: "adminSettings",
        component: () => import("../components/admin/AdminSettings.vue"),
        beforeEnter: (to, from, next) => {
          if (store.getters.isAdmin) {
            next();
          } else {
            next("/");
          }
        }
      },
      {
        path: "client/schedule",
        name: "schudule",
        component: () => import("../components/client/Schedule.vue"),
        beforeEnter: (to, from, next) => {
          if (store.state.signedIn) {
            next();
          } else {
            next("/");
          }
        }
      },
      {
        path: "client/payments",
        name: "payments",
        component: () => import("../components/client/Payments.vue"),
        beforeEnter: (to, from, next) => {
          if (store.state.signedIn) {
            next();
          } else {
            next("/");
          }
        }
      },
      {
        path: "client/progress",
        name: "Progress",
        component: () => import("../components/client/Progress.vue"),
        beforeEnter: (to, from, next) => {
          if (store.state.signedIn) {
            next();
          } else {
            next("/");
          }
        }
      },
      {
        path: "client/settings",
        name: "clientSettings",
        component: () => import("../components/client/ClientSettings.vue"),
        beforeEnter: (to, from, next) => {
          if (store.state.signedIn) {
            next();
          } else {
            next("/");
          }
        }
      }
    ],
  },
  {
    path: "/authenticate",
    name: "Sign-up/Sign-in",
    component: () => import("../views/Auth.vue"),
    beforeEnter: (to, from, next) => {
      if (store.state.signedIn) {
        next("/");
      } else {
        next();
      }
    },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
