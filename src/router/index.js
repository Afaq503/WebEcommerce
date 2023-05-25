import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import Dashborad from "../views/Dashborad.vue";
import CategoryView from "../views/CategoryView.vue";
import SingleProduct from "../views/SingleProduct.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { requiresAuth: true },
  },

  {
    path: "/login",
    name: "LoginView",
    component: LoginView,
  },
  {
    path: "/dashborad",
    name: "Dashborad",
    component: Dashborad,
    meta: { requiresAuth: true },
  },
  {
    path: "/category",
    name: "CategoryView",
    component: CategoryView,
  },
  {
    path: "/singleproduct",
    name: "SingleProduct",
    component: SingleProduct,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
