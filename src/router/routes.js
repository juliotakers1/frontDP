import { createRouter, createWebHashHistory } from 'vue-router';
import { useAuthStore } from 'src/stores/auth.store';
const routes = [
  {
    path: '/',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: '', component: () => import('pages/LoginPages/LoginPage.vue') },
      { path: '/recovery', component: () => import('pages/RecuperarPages/RecuperarPage.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/home', component: () => import('pages/IndexPage.vue'),
      meta: { requiredAuthorization: true,
        roles: ['ADMIN','USER']
      },
      
       },
       { path: '/compras', component: () => import('pages/CompraPages/CompraPage.vue'),
       meta: { requiredAuthorization: true,
        roles: ['ADMIN','USER']
      },
        },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
