<template>
  <q-layout view="lHh Lpr lFr">
    <q-page-container>
      <!-- Drawer sempre fixo e aberto -->
      <q-drawer
        show-if-above
        bordered
        :width="220"
        :breakpoint="100"
        :model-value="true"
        :mini="leftDrawerOpen"
      >
        <div class="column fit bg-primary q-pt-md">
          <div class="desktop-hide flex justify-end q-pr-md width-full">
            <PrimaryButton
              dense
              icon="menu"
              @click="leftDrawerOpen = !leftDrawerOpen"
              class="lt-md"
            />
          </div>
          <q-scroll-area style="flex: 1">
            <div class="row full-width flex-center q-ma-md q-pb-md">
              <q-img
                fit="fill"
                :src="leftDrawerOpen ? 'logos/icone_brands.png' : 'logos/logo_brands.png'"
                class="logo__img"
              />
            </div>
            <div class="row full-width flex-center q-ma-md">
              <q-separator class="separators" />
            </div>

            <!-- Botão de Dashboard com opções expansíveis -->
            <q-expansion-item
              icon="query_stats"
              label="Dashboard"
              indicator-color="secondary"
              expand-icon="null"
              :class="{
                'text-accent custom-icon-size': selectedItem === 'Dashboard',
                'text-white custom-icon-size': selectedItem !== 'Dashboard',
              }"
              style="padding-left: 5%"
            >
              <q-list style="padding-left: 5%">
                <q-item class="q-pl-xs" >
                  <q-btn
                    flat
                    @click="
                      handleButtonClick('/dashboard/segmentos', 'Dashboard')
                    "
                    class="full-width text-white no-wrap"
                    style="text-transform: none"
                  >
                    <div class="items-start flex width-full">Relatórios</div>
                  </q-btn>
                </q-item>

                <q-item class="q-pl-xs" >
                  <q-btn
                    flat
                    @click="
                      handleButtonClick('/dashboard/movimentacoes/split', 'Dashboard')
                    "
                    class="full-width text-white no-wrap"
                    style="text-transform: none"
                  >
                    <div class="items-start flex width-full">Previsões</div>
                  </q-btn>
                </q-item>

              </q-list>
            </q-expansion-item>
            <div class="row full-width flex-center q-ma-md">
              <q-separator class="separators" />
            </div>
          </q-scroll-area>
        </div>
      </q-drawer>
      <q-page-container
        class="flex column q-pa-md items-center no-wrap q-pl-md"
        style="padding-left: 12px"
      >
        <div class="q-ma-md rounded-borders width-full">
          <q-toolbar class="row justify-space-between">
            <!-- Texto à esquerda -->
            <q-toolbar-title class="row flex-start text-primary">
              <span class="text-primary text-h4">{{ pageName }}</span>
            </q-toolbar-title>

            <!-- Container à direita com texto e botões -->
            <div class="row items-center">
              <!-- Texto no container à direita -->
              <div class="column gt-xs items-end">
                <span
                  class="q-mr-md text-primary text-subtitle1"
                  style="line-height: 1"
                >
                  {{ name }}
                </span>
                <span
                  class="q-mr-md text-accent text-subtitle2"
                  style="line-height: 1"
                >
                  {{ type }}
                </span>
              </div>

              <!-- Botão de notificação -->
              <q-btn
                flat
                round
                dense
                size="1.2rem"
                icon="notifications"
                class="text-primary"
              >
                <q-badge class="q-mt-sm" color="red" rounded floating
                  >9+</q-badge
                >
                <q-tooltip class="text-subtitle2">Notificações</q-tooltip>
              </q-btn>

              <!-- Botão de sair -->
              <q-btn
                flat
                round
                dense
                size="1.2rem"
                icon="logout"
                @click="logout"
                class="text-primary"
              >
                <q-tooltip class="text-subtitle2">Sair</q-tooltip>
              </q-btn>
            </div>
          </q-toolbar>
        </div>

        <router-view class="q-pa-md" />
      </q-page-container>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import api from 'src/lib/api';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import PrimaryButton from 'src/components/button/PrimaryButton.vue';
//import { implementHierarchy, ShowDialog } from 'src/utils/utils';

const pageName = ref('Dashboard');
const leftDrawerOpen = ref(false);
const selectedItem = ref<string | null>(null);
const router = useRouter();
const name = ref('');
const type = ref('');

onMounted(() => {
  console.log('foi montado');
  name.value = localStorage.getItem('userName');
});


const logout = () => {
  api.logout();
  router.push('/');
};


// Update button click handlers
const handleButtonClick = (route: string, name: string) => {
  console.log('polo');
  router.push(route);
  selectedItem.value = name; // Atualiza o item selecionado
};

</script>
