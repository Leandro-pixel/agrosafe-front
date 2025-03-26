import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/home',
    component: () => import('layouts/MainLayout2.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', component: () => import('pages/IndexPage2.vue') },
      {
        path: '/notifications',
        component: () => import('pages/account/NotificationsPage.vue'),
      },
      {
        path: '/dashboard/segmentos',
        component: () => import('pages/dashboard/SegmentsPage.vue'),
      },
      {
        path: '/dashboard/movimentacoes',
        component: () => import('pages/dashboard/CashFlowPage.vue'),
      },
      {
        path: '/dashboard/movimentacoes/split',
        component: () => import('pages/dashboard/SplitPage.vue'),
      },
      {
        path: '/dashboard/cobrancas',
        component: () => import('pages/dashboard/ChargePage.vue'),
      },
      {
        path: '/dashboard/antecipacoes',
        component: () => import('pages/dashboard/WithdrawalsPage.vue'),
      },
      {
        path: '/dashboard/faturas',
        component: () => import('pages/dashboard/InvoicePage.vue'),
      },
      {
        path: '/fornecedor',
        component: () => import('pages/supliers/SuplierPage.vue'),
        children: [
          {
            path: 'fornecedores',
            component: () => import('pages/supliers/SearchSuplierPage.vue'),
          },
          {
            path: 'fornecedores/:id',
            component: () => import('pages/supliers/SuplierInfoPage.vue'),
            props: true,
          },
        ],
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
          {
            path: 'proprietarios',
            component: () => import('pages/stores/SearchECOwnerPage.vue'),
            props: true,
          },
          {
            path: 'proprietarios/:id',
            component: () => import('pages/stores/ECOwnerInfoPage.vue'),
            props: true,
          },
        ],
      },
      {
        path: '/fornecedor/cadastroFornecedor',
        component: () => import('pages/supliers/CreateSuplier.vue'),
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
        path: '/representantes/cadastroRepresentante',
        component: () =>
          import('pages/representatives/CreateRepresentative.vue'),
      },
/*
      {
        path: '/fornecedor',
        component: () => import('pages/supliers/client/ClientsPage.vue'),
        children: [
          {
            path: 'clientes',
            component: () =>
              import('pages/supliers/client/SearchSuplierClientPage.vue'),
          },
          {
            path: 'clientes/:id',
            component: () => import('pages/supliers/client/ClientInfoPage.vue'),
            props: true,
          },
        ],
      },
*/
      {
        path: '/clientes',
        component: () => import('pages/client/ClientsPage.vue'),
        children: [
          {
            path: '',
            component: () =>
              import('pages/client/SearchClientPage.vue'),
          },
          {
            path: ':id',
            component: () => import('pages/client/ClientInfoPage.vue'),
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
        path: '/representantes',
        component: () => import('pages/representatives/RepresentativePage.vue'),
        children: [
          {
            path: 'ativacao',
            component: () =>
              import('pages/representatives/SearchRepresentativePage.vue'),
          },
          {
            path: 'ativacao/:id', // Rota com parâmetro de ID
            component: () =>
              import('pages/representatives/RepresentativeInfoPage.vue'),
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
        component: () => import('pages/auth/ChangePasswordPage.vue'),
      },
      {
        path: '/conta/suporte',
        component: () => import('pages/account/SuportPage.vue'),
      },
    ],
  },
  {
    path: '',
    component: () => import('pages/auth/LoginPage.vue'),
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
