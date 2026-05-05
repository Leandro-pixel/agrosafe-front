import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout2.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        component: () => import('pages/dashboard/DashboardPage.vue'),
        meta: { title: 'Dashboard' },
      },
      {
        path: 'stations',
        component: () => import('pages/stations/StationsPage.vue'),
        meta: { title: 'Estações' },
      },
      {
        path: 'charges',
        component: () => import('pages/charges/ChargesPage.vue'),
        meta: { title: 'Carregamentos' },
      },
      {
        path: 'users',
        component: () => import('pages/users/UsersPage.vue'),
        meta: { title: 'Usuários' },
      },
      {
        path: 'reports',
        component: () => import('pages/reports/ReportsPage.vue'),
        meta: { title: 'Relatórios' },
      },
      {
        path: 'finance',
        component: () => import('pages/finance/FinancePage.vue'),
        meta: { title: 'Financeiro' },
      },
      {
        path: 'settings',
        component: () => import('pages/settings/SettingsPage.vue'),
        meta: { title: 'Configurações' },
      },
      {
        path: 'support',
        component: () => import('pages/support/SupportPage.vue'),
        meta: { title: 'Suporte' },
      },
    ],
  },

  // login fora do layout
  {
    path: '/login',
    component: () => import('pages/auth/LoginPage.vue'),
  },

  // redirect padrão
  {
    path: '/',
    redirect: '/dashboard',
  },

  // fallback
  {
    path: '/:catchAll(.*)*',
    redirect: '/dashboard',
  },
];

export default routes;
