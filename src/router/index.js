import { route } from 'quasar/wrappers'
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory
} from 'vue-router'

import routes from './routes'
import { useAuthStore } from 'src/stores/auth.store';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })
  const authStore = useAuthStore()
  Router.beforeEach((to, from, next) => {
    const isAuthenticated = authStore.isAuthenticated;
    const tokenExists = localStorage.getItem('token');

    if (to.meta.requiredAuthorization) {
      if (isAuthenticated || tokenExists) {
        // Si el usuario está autenticado o hay un token en localStorage,
        // permitir el acceso a la ruta solicitada
        next();
      } else {
        // Si no hay un token en localStorage, redirigir al usuario al login
        next('/');
      }
    } else {
      // Si la ruta no requiere autorización, permitir el acceso sin verificar el token
      next();
    }
  });



  return Router
})
