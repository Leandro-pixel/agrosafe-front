<template>
  <q-layout view="lHr lpr lFr">
    <q-header class="q-ma-sm rounded-borders">
      <q-toolbar>
        <PrimaryButton dense icon="menu" @click="leftDrawerOpen = !leftDrawerOpen" />
        <q-toolbar-title class="row flex-center">
        </q-toolbar-title>
        <div @click="logout">
          <PrimaryButton icon="logout" dense>
            <q-tooltip class="text-subtitle2">Sair</q-tooltip>
          </PrimaryButton>
        </div>
      </q-toolbar>
    </q-header>
    <q-drawer :breakpoint="100" :model-value="true" :mini="leftDrawerOpen" show-if-above bordered :width="150">
      <div class="column justify-between fit no-wrap">
        <q-tabs shrink indicator-color="secondary" class="text-primary" vertical switch-indicator
        active-color="secondary">
          <div class="row full-width flex-center q-ma-md">
            <q-img fit="fill" width="50%" height="50%" :src="config.getConfig.logoUrl" class="logo__img"/>
          </div>
          <q-route-tab name="home" icon=null :label="leftDrawerOpen ? ' ' : 'Dashboard'" to="/home" />
          <q-route-tab v-if="implementHierarchy('admin')" name="hub" icon="add_home" :label="leftDrawerOpen ? ' ' : 'Polos'" to="/polos" />
          <q-route-tab v-if="implementHierarchy('hub')" name="store" icon="shop" :label="leftDrawerOpen ? ' ' : 'Lojas'" to="/lojas" />
          <q-route-tab v-if="implementHierarchy('store')" name="users" icon="group" :label="leftDrawerOpen ? ' ' : 'Usuários'" to="/usuarios" />
          <q-route-tab name="sale" icon="price_check" :label="leftDrawerOpen ? ' ' : 'Produtos'" to="/produtos" />
          <q-route-tab name="salesHistory" icon="currency_exchange" :label="leftDrawerOpen ? ' ' : 'Movimentações'" to="/vendas" />
          <q-route-tab name="reports" icon="description" :label="leftDrawerOpen ? ' ' : 'Relatórios'" to="/relatorios" />
          <q-route-tab name="info" icon="info" :label="leftDrawerOpen ? ' ' : 'Conta'" to="/conta" />
          <q-route-tab name="code" icon="settings" :label="leftDrawerOpen ? ' ' : 'Sistema'" to="/sistema" />
        </q-tabs>
          <PrimaryButton flat @click="openMessageSender" class="full-width gt-sm">
            <div :class="!leftDrawerOpen ? 'column flex-center q-gutter-y-sm' : ''">
              <q-icon name="message" color="primary" />
              <span>{{ !leftDrawerOpen ? 'Convidar' : '' }}</span>
            </div>
          </PrimaryButton>
        </div>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import api from 'src/lib/api'
import { useConfigStore } from 'src/stores/useConfigStore'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import PrimaryButton from 'src/components/button/PrimaryButton.vue'
import { implementHierarchy, ShowDialog } from 'src/utils/utils'

const config = useConfigStore()
const leftDrawerOpen = ref(false)
const messageText = ref(config.getConfig.SmsMessage)
const router = useRouter()

const logout = () => {
	api.logout()
	router.push('/')
}

const openMessageSender = async () => {
	await ShowDialog.showSendMessagePopUp('Convide!', 'Insira um número de celular e a mensagem para convidar alguém a conferir nossos produtos!', messageText.value)
}
</script>
