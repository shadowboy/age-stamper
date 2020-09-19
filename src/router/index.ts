import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: () => import("../layouts/MainLayout.vue"),
    children: [
      {
        path: "/",
        name: "index",
        component: () => import("../views/Index.vue")
      },
      {
        path: "splash",
        component: () => import("../views/Splash.vue")
      },
      {
        path: "guidance",
        component: () => import("../views/Guidance.vue")
      },
      {
        path: "home",
        component: () => import("../views/Home.vue")
      },
      {
        path: "editor",
        component: () => import("../views/Editor.vue")
      },
      {
        path: "result",
        component: () => import("../views/Result.vue")
      },
      {
        path: "about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("../views/About.vue")
      }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("../views/404.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
