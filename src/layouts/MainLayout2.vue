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
                :src="
                  leftDrawerOpen
                    ? config.getConfig.secondaryLogoUrl
                    : config.getConfig.logoUrl
                "
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
              v-if="implementHierarchy('store')"
            >
              <q-list style="padding-left: 5%">
                <q-item class="q-pl-xs" v-if="implementHierarchy('polo')">
                  <q-btn
                    flat
                    @click="
                      handleButtonClick('/dashboard/segmentos', 'Dashboard')
                    "
                    class="full-width text-white no-wrap"
                    style="text-transform: none"
                  >
                    <div class="items-start flex width-full">Segmentos</div>
                  </q-btn>
                </q-item>

                <q-item class="q-pl-xs" v-if="implementHierarchy('justEC')">
                  <q-btn
                    flat
                    @click="
                      handleButtonClick('/dashboard/cobrancas', 'Dashboard')
                    "
                    class="full-width text-white no-wrap"
                    style="text-transform: none"
                  >
                    <div class="items-start flex width-full">Cobranças</div>
                  </q-btn>
                </q-item>

                <q-item class="q-pl-xs" v-if="implementHierarchy('store')">
                  <q-btn
                    flat
                    @click="
                      handleButtonClick('/dashboard/movimentacoes', 'Dashboard')
                    "
                    class="full-width text-white no-wrap"
                    style="text-transform: none"
                  >
                    <div class="items-start flex width-full">Movimentações</div>
                  </q-btn>
                </q-item>

                <q-item class="q-pl-xs" v-if="implementHierarchy('sysAdmin')">
                  <q-btn
                    flat
                    @click="handleButtonClick('/dashboard/antecipacoes', 'Dashboard')"
                    class="full-width text-white no-wrap"
                    style="text-transform: none"
                  >
                    <div class="items-start flex width-full">Pagamentos</div>
                  </q-btn>
                </q-item>

                <q-item class="q-pl-xs" v-if="implementHierarchy('justEC')">
                  <q-btn
                    flat
                    @click="handleButtonClick('/dashboard/saque', 'Dashboard')"
                    class="full-width text-white no-wrap"
                    style="text-transform: none"
                  >
                    <div class="items-start flex width-full">Sacar Saldo</div>
                  </q-btn>
                </q-item>
              </q-list>
            </q-expansion-item>

            <div
              class="row full-width flex-center q-ma-md"
              v-if="implementHierarchy('sysAdmin')"
            >
              <q-separator class="separators" />
            </div>

            <q-expansion-item
              icon="work"
              label="Polos"
              indicator-color="secondary"
              expand-icon="null"
              :class="{
                'text-accent custom-icon-size': selectedItem === 'Polos',
                'text-white custom-icon-size': selectedItem !== 'Polos',
              }"
              style="padding-left: 5%"
              v-if="implementHierarchy('sysAdmin')"
            >
              <q-list style="padding-left: 5%">
                <q-item class="q-pl-xs">
                  <q-btn
                    flat
                    @click="handleButtonClick('/polos/ativacao', 'Polos')"
                    class="full-width text-white no-wrap"
                    style="text-transform: none"
                  >
                    <div class="items-start flex width-full">
                      Ativação / Desativação
                    </div>
                  </q-btn>
                </q-item>
              </q-list>
            </q-expansion-item>

            <div
              class="row full-width flex-center q-ma-md"
              v-if="implementHierarchy('polo')"
            >
              <q-separator class="separators" />
            </div>

            <q-expansion-item
              icon="handshake"
              label="Representantes"
              indicator-color="secondary"
              expand-icon="null"
              :class="{
                'text-accent': selectedItem === 'Representative',
                'text-white ': selectedItem !== 'Representative',
              }"
              style="padding-left: 5%"
              v-if="implementHierarchy('polo')"
            >
              <q-list style="padding-left: 5%">
                <q-item class="q-pl-xs">
                  <q-btn
                    flat
                    @click="handleButtonClick('/representantes/ativacao', 'Representative')"
                    class="full-width text-white no-wrap"
                    style="text-transform: none"
                  >
                    <div class="items-start flex width-full">
                      Ativação / Desativação
                    </div>
                  </q-btn>
                </q-item>
              </q-list>
            </q-expansion-item>

            <div class="row full-width flex-center q-ma-md"
             v-if="implementHierarchy('sysAdmin')"
            >
              <q-separator class="separators" />
            </div>

            <q-expansion-item
              icon="shopping_bag"
              label="Fornecedores"
              expand-icon="null"
              :class="{
                'text-accent custom-icon-size': selectedItem === 'Fornecedores',
                'text-white custom-icon-size': selectedItem !== 'Fornecedores',
              }"
              style="padding-left: 5%"
              v-if="implementHierarchy('sysAdmin')"
            >
              <q-list style="padding-left: 5%">
                <q-item class="q-pl-xs" v-if="implementHierarchy('sysAdmin')">
                  <q-btn
                    flat
                    @click="
                      handleButtonClick('/fornecedor/fornecedores', 'Fornecedores')
                    "
                    class="full-width text-white no-wrap"
                    style="text-transform: none"
                  >
                    <div class="items-start flex width-full">
                      Fornecedores
                    </div>
                  </q-btn>
                </q-item>
              </q-list>
            </q-expansion-item>

            <div class="row full-width flex-center q-ma-md">
              <q-separator class="separators" />
            </div>
            <!-- Item de menu com opções expansíveis para Polos -->
            <q-expansion-item
              icon="store"
              label="Lojas"
              expand-icon="null"
              :class="{
                'text-accent custom-icon-size': selectedItem === 'Lojas',
                'text-white custom-icon-size': selectedItem !== 'Lojas',
              }"
              style="padding-left: 5%"
              v-if="implementHierarchy('store')"
            >
              <q-list style="padding-left: 5%">
                <q-item class="q-pl-xs" v-if="implementHierarchy('representative')">
                  <q-btn
                    flat
                    @click="
                      handleButtonClick('/lojas/estabelecimentos', 'Lojas')
                    "
                    class="full-width text-white no-wrap"
                    style="text-transform: none"
                  >
                    <div class="items-start flex width-full">
                      Estabelecimentos
                    </div>
                  </q-btn>
                </q-item>
              </q-list>
            </q-expansion-item>

            <div class="row full-width flex-center q-ma-md">
              <q-separator class="separators" />
            </div>
            <!-- Item de menu com opções expansíveis para Polos -->
            <q-expansion-item
              icon="group"
              label="Clientes"
              expand-icon="null"
              :class="{
                'text-accent custom-icon-size': selectedItem === 'Clientes',
                'text-white custom-icon-size': selectedItem !== 'Clientes',
              }"
              style="padding-left: 5%"
              v-if="implementHierarchy('store')"
            >
              <q-list style="padding-left: 5%">
                <q-item class="q-pl-xs" v-if="implementHierarchy('representative')">
                  <q-btn
                    flat
                    @click="
                      handleButtonClick('/clientes', 'Clientes')
                    "
                    class="full-width text-white no-wrap"
                    style="text-transform: none"
                  >
                    <div class="items-start flex width-full">
                      Clientes
                    </div>
                  </q-btn>
                </q-item>
              </q-list>
            </q-expansion-item>

            <div class="row full-width flex-center q-ma-md">
              <q-separator class="separators" />
            </div>

            <!-- Item de menu com opções expansíveis para Lojas -->
            <q-expansion-item
              icon="person"
              label="Conta"
              expand-icon="null"
              :class="{
                'text-accent custom-icon-size': selectedItem === 'Conta',
                'text-white custom-icon-size': selectedItem !== 'Conta',
              }"
              style="padding-left: 5%"
              v-if="implementHierarchy('store')"
            >
              <q-list style="padding-left: 5%">
                <q-item class="q-pl-xs">
                  <q-btn
                    flat
                    @click="handleButtonClick('/conta/perfil', 'Conta')"
                    class="full-width text-white no-wrap"
                    style="text-transform: none"
                  >
                    <div class="items-start flex width-full">Perfil</div>
                  </q-btn>
                </q-item>
                <q-item class="q-pl-xs">
                  <q-btn
                    flat
                    @click="handleButtonClick('/conta/configuracoes', 'Conta')"
                    class="full-width text-white no-wrap"
                    style="text-transform: none"
                  >
                    <div class="items-start flex width-full">Configurações</div>
                  </q-btn>
                </q-item>
                <q-item class="q-pl-xs">
                  <q-btn
                    flat
                    @click="handleButtonClick('/conta/suporte', 'Conta')"
                    class="full-width text-white no-wrap"
                    style="text-transform: none"
                  >
                    <div class="items-start flex width-full">Suporte</div>
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
                @click="openNotifications"
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
import { useConfigStore } from 'src/stores/useConfigStore';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import PrimaryButton from 'src/components/button/PrimaryButton.vue';
//import { implementHierarchy, ShowDialog } from 'src/utils/utils';
import { implementHierarchy } from 'src/utils/utils';
import { SupStore } from 'src/models/supUserData';
import { PoloDataStore } from 'src/models/poloUserData';
import { EmployeeEstablishmentStore } from 'src/models/ecUserData';
import { RepDataStore } from 'src/models/repUserData';

const pageName = ref('Dashboard');
const config = useConfigStore();
const leftDrawerOpen = ref(false);
const selectedItem = ref<string | null>(null);
const router = useRouter();
const name = ref('');
const type = ref('');

onMounted(() => {
  console.log('foi montado');
  name.value = localStorage.getItem('userName');
  userData();
});

const userData = async () => {
  const userType = atob(localStorage.getItem('userType'));
  if (userType == 'establishmentOwner') {
    const ecStore = new EmployeeEstablishmentStore();
    await ecStore.loadFromLocalStorage();
    type.value = 'Estabelecimento';

  } else if (userType == 'polo') {
    const poloStore = new PoloDataStore();
    await poloStore.loadFromLocalStorage();
    type.value = 'Polo'
  } else if (userType == 'representative') {
    const repStore = new RepDataStore();
    await repStore.loadFromLocalStorage();
    type.value = 'Representante'
  } else {
    const supStore = new SupStore();
    await supStore.loadFromLocalStorage();
    type.value = 'Suporte'
  }
};

const openNotifications = () => {
  //api.logout();
  router.push('/notifications');
};

const logout = () => {
  api.logout();
  router.push('/');
};

// Function to update page name
const updatePageName = (name: string) => {
  pageName.value = name; // Set the value of pageName
};

// Update button click handlers
const handleButtonClick = (route: string, name: string) => {
  console.log('polo');
  router.push(route);
  updatePageName(name); // Call the function to update the page name
  selectedItem.value = name; // Atualiza o item selecionado
};

/*
const openMessageSender = async () => { ❤😒👌
  await ShowDialog.showSendMessagePopUp(
    'Convide!',
    'Insira um número de celular e a mensagem para convidar alguém a conferir nossos produtos!',
    messageText.value
  );
};
*/
</script>
