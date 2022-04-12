import { createRouter, createWebHashHistory } from "vue-router";
import Composts from "../views/Composts.vue";
import AddCompost from "../views/AddCompost.vue";
import UpdateCompost from "../views/UpdateCompost.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
    props: true,
  },
  {
    path: "/composts/:filter",
    name: "Compost",
    component: Composts,
    props: true,
  },
  {
    path: "/add-compost",
    name: "AddCompost",
    component: AddCompost,
  },
  {
    path: "/update-compost/:id",
    name: "UpdateCompost",
    component: UpdateCompost,
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("../views/Registration.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/account",
    name: "account",
    component: () => import("../views/Account.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
