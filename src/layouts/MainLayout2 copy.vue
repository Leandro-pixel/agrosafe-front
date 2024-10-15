<template>
  <q-layout view="lHh Lpr lFr">
    <q-page-container class="flex" style="justify-content: space-evenly">
     <!-- Drawer sempre fixo e aberto -->
     <q-drawer show-if-above bordered :width="250" mini-to-overlay>
      <div class="column fit no-wrap bg-primary" style="padding-top: 2rem">
        <q-scroll-area style="flex: 1; ">
          <div class="row full-width flex-center q-ma-md">
            <q-img
              fit="fill"
              width="80%"
              height="auto"
              :src="config.getConfig.logoUrl"
              class="logo__img"
            />
          </div>
          <div class="row full-width flex-center q-ma-md">
            <q-separator
              style="width: 80%; background-color: white; height: 2px"
            />
          </div>
          <q-tabs
            shrink
            indicator-color="secondary"
            class="text-white"
            vertical
            switch-indicator
            active-color="accent"
          >
            <!-- Botão de Dashboard com opções expansíveis -->
            <q-expansion-item
              icon="query_stats"
              label="Dashboard"
              expand-icon="null"
              class="text-white custom-icon-size"
              style="padding-left: 5%"
              v-if="implementHierarchy('sysAdmin')"
            >

              <q-list style="padding-left: 5%">

                <q-item style="align-items: start; padding-left: 0">
                  <q-btn
                    flat
                    @click="handleButtonClick('/dashboard/segmentos', 'Seguimentos')"
                    class="full-width text-white no-wrap"
                    style="text-transform: none"
                  >
                    <div style="text-align: left; width: 100%">Segmentos</div>
                  </q-btn>
                </q-item>

                <q-item style="align-items: start; padding-left: 0">
                  <q-btn
                    flat
                    @click="handleButtonClick('/dashboard/opcao2', 'Saldo Geral')"
                    class="full-width text-white no-wrap"
                    style="text-transform: none"
                  >
                    <div style="text-align: left; width: 100%">Saldo Geral</div>
                  </q-btn>
                </q-item>
                <q-item style="align-items: start; padding-left: 0">
                  <q-btn
                    flat
                    @click="handleButtonClick('/dashboard/opcao3', 'Movimentações')"
                    class="full-width text-white no-wrap"
                    style="text-transform: none"
                  >
                    <div style="text-align: left; width: 100%">Movimentações</div>
                  </q-btn>
                </q-item>
              </q-list>
            </q-expansion-item>

            <div class="row full-width flex-center q-ma-md">
              <q-separator
                style="width: 80%; background-color: white; height: 2px"
              />
            </div>

            <!-- Item de menu com opções expansíveis para Polos -->
            <q-expansion-item
              icon="store"
              label="Lojas"
              expand-icon="null"
              class="text-white custom-icon-size"
              style="padding-left: 5%"
              v-if="implementHierarchy('sysAdmin')"
            >
              <q-list style="padding-left: 5%">
                <q-item style="align-items: start; padding-left: 0">
                  <q-btn
                    flat
                    @click="handleButtonClick('/lojas/estabelecimentos', 'Estabelecimentos')"
                    class="full-width text-white no-wrap"
                    style="text-transform: none"
                  >
                    <div style="text-align: left; width: 100%">Estabelecimentos</div>
                  </q-btn>
                </q-item>
                <q-item style="align-items: start; padding-left: 0">
                  <q-btn
                    flat
                    @click="$router.push('/polos/opcao2')"
                    class="full-width text-white no-wrap"
                    style="text-transform: none"
                  >
                    <div style="text-align: left; width: 100%">Clientes</div>
                  </q-btn>
                </q-item>
              </q-list>
            </q-expansion-item>

            <div class="row full-width flex-center q-ma-md">
              <q-separator
                style="width: 80%; background-color: white; height: 2px"
              />
            </div>

            <!-- Item de menu com opções expansíveis para Lojas -->
            <q-expansion-item
              icon="person"
              label="Conta"
              expand-icon="null"
              class="text-white custom-icon-size"
              style="padding-left: 5%"
              v-if="implementHierarchy('sysAdmin')"
            >
              <q-list style="padding-left: 5%">
                <q-item style="align-items: start; padding-left: 0">
                  <q-btn
                    flat
                    @click="$router.push('/lojas/opcao1')"
                    class="full-width text-white no-wrap"
                    style="text-transform: none"
                  >
                    <div style="text-align: left; width: 100%">Perfil</div>
                  </q-btn>
                </q-item>
                <q-item style="align-items: start; padding-left: 0">
                  <q-btn
                    flat
                    @click="$router.push('/lojas/opcao2')"
                    class="full-width text-white no-wrap"
                    style="text-transform: none"
                  >
                    <div style="text-align: left; width: 100%">Configurações</div>
                  </q-btn>
                </q-item>
              </q-list>
            </q-expansion-item>
            <div class="row full-width flex-center q-ma-md">
              <q-separator
                style="width: 80%; background-color: white; height: 2px"
              />
            </div>
          </q-tabs>
        </q-scroll-area>
      </div>
    </q-drawer>
<div class="flex column bg-red" style="width: 100%;">
    <div class="q-ma-sm rounded-borders bg-green">
      <q-toolbar class="row justify-space-between">
        <!-- Texto à esquerda -->
        <q-toolbar-title class="row flex-start text-primary">
          <span class="ml-large text-primary">{{ pageName }}</span>
        </q-toolbar-title>

        <!-- Container à direita com texto e botões -->
        <div class="row items-center">
          <!-- Texto no container à direita -->
           <div class="column">
            <span class="q-mr-md text-primary">{{ user.name }}</span>
          <span class="q-mr-md text-primary">{{ user.userType }}</span>
           </div>

          <!-- Botão de notificação -->
          <q-btn
            flat
            round
            dense
            icon="notifications"
            @click="openNotifications"
            class="text-primary"
          >
            <q-tooltip class="text-subtitle2">Notificações</q-tooltip>
          </q-btn>

          <!-- Botão de sair -->
          <q-btn
            flat
            round
            dense
            icon="logout"
            @click="logout"
            class="text-primary"
          >
            <q-tooltip class="text-subtitle2">Sair</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </div>

    <q-page-container>
      <router-view />
    </q-page-container>
  </div>

  </q-page-container>

  </q-layout>
</template>

<script setup lang="ts">
import api from 'src/lib/api';
import { useConfigStore } from 'src/stores/useConfigStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
//import PrimaryButton from 'src/components/button/PrimaryButton.vue';
//import { implementHierarchy, ShowDialog } from 'src/utils/utils';
import { implementHierarchy } from 'src/utils/utils';
import { UserData } from 'src/models/user';

const user = ref(new UserData());
const pageName = ref('home');
const config = useConfigStore();
//const leftDrawerOpen = ref(false)
//const messageText = ref(config.getConfig.SmsMessage);
const router = useRouter();

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
  router.push(route);
  updatePageName(name); // Call the function to update the page name
};

/*
const openMessageSender = async () => {
  await ShowDialog.showSendMessagePopUp(
    'Convide!',
    'Insira um número de celular e a mensagem para convidar alguém a conferir nossos produtos!',
    messageText.value
  );
};
*/
</script>
