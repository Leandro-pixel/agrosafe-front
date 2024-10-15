import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/home',
    component: () => import('layouts/MainLayout2.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', component: () => import('pages/IndexPage2.vue') },
      {
        path: '/dashboard/segmentos',
        component: () => import('pages/dashboard/SegmentsPage.vue'),
      },
      {
        path: '/lojas/estabelecimentos',
        component: () => import('pages/stores/ECPage.vue'),
      },
      {
        path: '/polos',
        children: [
          {
            path: '',
            component: () => import('pages/hub/HubPage.vue'),
          },

          {
            path: ':id',
            component: () => import('pages/hub/HubDescriptionPage.vue'),
          },
          {
            path: 'criar',
            component: () => import('pages/hub/CreateHubPage.vue'),
          },
        ],
      },
      {
        path: '/lojas',
        children: [
          {
            path: '',
            component: () => import('pages/store/StorePage.vue'),
          },
          {
            path: ':id',
            component: () => import('pages/store/StoreDescriptionPage.vue'),
          },
          {
            path: 'criar/:hubId',
            component: () => import('pages/store/CreateStorePage.vue'),
          },
        ],
      },
      {
        path: '/usuarios',
        children: [
          {
            path: '',
            component: () => import('pages/user/UserPage.vue'),
          },
          {
            path: 'criar/:tipoDeUsuario/:id',
            component: () => import('pages/auth/InvitePage.vue'),
          },
          {
            path: ':tipoDeUsuario/:id',
            component: () => import('pages/user/UserPerEntityPage.vue'),
          },
        ],
      },
      {
        path: '/vendedor',
        children: [
          {
            path: ':id',
            component: () => import('pages/seller/SellerDescriptionPage.vue'),
          },
        ],
      },
      {
        path: '/produtos',
        children: [
          {
            path: '',
            component: () => import('pages/products/ProductsPage.vue'),
          },
          {
            path: 'pixCap',
            component: () => import('src/pages/products/pix/PixCapPage.vue'),
          },
          {
            path: 'consultarLimite',
            component: () =>
              import('src/pages/products/limit/LimitCheckPage.vue'),
          },
          {
            path: 'seguros',
            children: [
              {
                path: '',
                component: () =>
                  import('pages/products/insurances/InsurancesPage.vue'),
              },
              {
                path: ':id',
                component: () =>
                  import('pages/products/insurances/CreateInsurancePage.vue'),
              },
            ],
          },
        ],
      },
      {
        path: '/vendas',
        children: [
          {
            path: '',
            component: () => import('pages/sale/SalesHistoryPage.vue'),
          },
          {
            path: ':id',
            component: () => import('pages/sale/SaleDetailsPage.vue'),
          },
        ],
      },
      {
        path: '/conta',
        children: [
          {
            path: '',
            component: () => import('pages/account/AccountInfoPage.vue'),
          },
          {
            path: 'alterar-senha',
            component: () => import('pages/auth/ChangePasswordPage.vue'),
          },
        ],
      },
      {
        path: '/relatorios',
        children: [
          {
            path: '',
            component: () => import('pages/reports/ReportsPage.vue'),
          },
          {
            path: 'pixcap',
            component: () => import('pages/reports/PixCapReportPage.vue'),
          },
          {
            path: 'seguros',
            component: () => import('pages/reports/InsuranceReportPage.vue'),
          },
          {
            path: 'exportacoes',
            component: () => import('pages/reports/ExportsPage.vue'),
          },
          {
            path: 'exportar',
            component: () => import('pages/reports/CreateReportPage.vue'),
          },
        ],
      },
      {
        path: '/sistema',
        children: [
          {
            path: '',
            component: () => import('pages/admin/SystemPage.vue'),
          },
          {
            path: 'convites',
            component: () => import('pages/admin/SignupInviteListPage.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '',
    component: () => import('pages/auth/LoginPage.vue'),
  },
  {
    path: '/cadastrar',
    component: () => import('pages/auth/SignUpPage.vue'),
  },
  {
    path: '/recuperar-senha',
    component: () => import('pages/auth/ForgotPasswordPage.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
