import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import FeedView from "../views/FeedView.vue";
import ProfilUser from "../views/ProfilUser.vue";
import AllUsers from "../views/AllUsers.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "LoginView",
    component: LoginView,
  },
  {
    path: "/register",
    name: "RegisterView",
    component: RegisterView,
  },
  {
    path: "/feed",
    name: "FeedView",
    component: FeedView,
  },
  {
    path: "/profil",
    name: "ProfilUser",
    component: ProfilUser,
  },
  {
    path: "/members",
    name: "AllUsers",
    component: AllUsers,
  },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
