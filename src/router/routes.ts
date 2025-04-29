import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/home',
    component: () => import('layouts/MainLayout2.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '/dashboard/segmentos',
        component: () => import('pages/dashboard/SegmentsPage.vue'),
      },
      {
        path: '/dashboard/movimentacoes/split',
        component: () => import('pages/dashboard/SplitPage.vue'),
      },

]
  },
  {
    path: '',
    component: () => import('pages/auth/LoginPage.vue'),
  },
]

export default routes;
