import { createRouter, createWebHashHistory } from "vue-router";
import Composts from "../views/Composts.vue";
import AddCompost from "../views/AddCompost.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/composts/:filter",
    name: "Compost",
    component: Composts,
  },
  {
    path: "/add-compost",
    name: "AddCompost",
    component: AddCompost,
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("../views/Registration.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../components/LoginComponent.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
