import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import NuevoPedido from '../views/Pedidos/NuevoPedido.vue'
import MisPedidos from '../views/Pedidos/MisPedidos.vue'
import Configuracion from '../views/Perfil/Configuracion.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/nuevoPedido',
    name: 'NuevoPedido',
    component: NuevoPedido
  },
  {
    path: '/misPedidos',
    name: 'MisPedidos',
    component: MisPedidos
  },
  {
    path: '/configuracion',
    name: 'Configuracion',
    component: Configuracion
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");

  if (authRequired && !loggedIn) {
    next("/login");
  } else {
    next();
  }
});

export default router
