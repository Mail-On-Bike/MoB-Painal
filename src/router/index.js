import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomeView.vue";
import Login from "../views/LoginView.vue";
import NuevoPedido from "../views/Pedidos/NuevoPedido.vue";
import MisPedidos from "../views/Pedidos/MisPedidos.vue";
import Configuracion from "../views/Perfil/Configuracion.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/nuevoPedido",
    name: "NuevoPedido",
    component: NuevoPedido,
  },
  {
    path: "/misPedidos",
    name: "MisPedidos",
    component: MisPedidos,
  },
  {
    path: "/configuracion",
    name: "Configuracion",
    component: Configuracion,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user_mob_painal");

  if (authRequired && !loggedIn) {
    next("/login");
  } else {
    next();
  }
});

export default router;
