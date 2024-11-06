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
        path: '/dashboard/saque',
        component: () => import('pages/dashboard/WithdrawPage.vue'),
      },
      {
        path: '/lojas',
        component: () => import('pages/stores/ECPage.vue'),
        children: [
          {
            path: 'estabelecimentos',
            component: () => import('pages/stores/SearchECPage.vue'),
          },
          {
            path: 'estabelecimentos/:id',
            component: () => import('pages/stores/ECInfoPage.vue'),
            props: true,
          },
        ],
      },
      {
        path: '/lojas/cadastroEC',
        component: () => import('pages/stores/CreateEC.vue'),
      },
      {
        path: '/polos/cadastroPolo',
        component: () => import('pages/polos/CreatePolo.vue'),
      },
      {
        path: '/lojas/clientes',
        component: () => import('pages/stores/client/ClientsPage.vue'),
        children: [
          {
            path: '',
            component: () =>
              import('pages/stores/client/SearchECLientPage.vue'),
          },
          {
            path: ':id',
            component: () => import('pages/stores/client/ClientInfoPage.vue'),
            props: true,
          },
        ],
      },
      {
        path: '/lojas/estabelecimentos',
        component: () => import('pages/stores/ECPage.vue'),
        children: [
          {
            path: '',
            component: () => import('pages/stores/SearchECPage.vue'),
          },
          {
            path: ':id',
            component: () => import('pages/stores/ECInfoPage.vue'),
            props: true,
          },
        ],
      },
      {
        path: '/polos',
        component: () => import('pages/polos/PoloPage.vue'),
        children: [
          {
            path: 'ativacao',
            component: () => import('pages/polos/SearchPoloPage.vue'),
          },
          {
            path: 'ativacao/:id', // Rota com parâmetro de ID
            component: () => import('pages/polos/PoloInfoPage.vue'),
            props: true, // Passar o ID como propriedade para o componente
          },
        ],
      },
      {
        path: '/conta/perfil',
        component: () => import('pages/account/ProfilePage.vue'),
      },
      {
        path: '/conta/configuracoes',
        component: () => import('pages/account/ConfigPage.vue'),
      },
      {
        path: '/conta/suporte',
        component: () => import('pages/account/SuportPage.vue'),
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
