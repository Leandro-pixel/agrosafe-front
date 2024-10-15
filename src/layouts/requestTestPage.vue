<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label header>Essential Links</q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <q-page>
        <!-- Botão para fazer requisição GET -->
        <q-btn
          label="Fazer Requisição GET"
          color="primary"
          @click="makeApiGetRequest"
        />

        <!-- Botão para fazer requisição POST -->
        <q-btn
          label="Fazer Requisição POST"
          color="secondary"
          class="q-ml-md"
          @click="makeApiPostRequest"
        />

        <!-- Exibir os dados retornados pela requisição -->
        <q-card v-if="responseData" class="q-mt-md">
          <q-card-section>
            <div>Dados retornados:</div>
            <div>{{ responseData }}</div>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import EssentialLink, { EssentialLinkProps } from 'components/EssentialLink.vue';

defineOptions({
  name: 'MainLayout'
});

// Links para o drawer
const linksList: EssentialLinkProps[] = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
];

const leftDrawerOpen = ref(false);
const responseData = ref(null); // Variável para armazenar os dados retornados

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

// Função para fazer a requisição GET
async function makeApiGetRequest() {
  try {
    const response = await axios.get('https://58308y9z06.execute-api.sa-east-1.amazonaws.com/signup/progress/123457'); // Substitua pela URL da sua API
    responseData.value = response.data; // Armazena os dados da resposta
  } catch (error) {
    console.error('Erro ao fazer a requisição GET:', error);
  }
}

// Função para fazer a requisição POST
async function makeApiPostRequest() {
  const payload = {
    phone: '15981104092',
    type: 'codeGeneration',
    deviceId: '123457'
  };

  try {
    const response = await axios.post('https://58308y9z06.execute-api.sa-east-1.amazonaws.com/sms', payload); // Substitua pela URL da sua API
    responseData.value = response.data; // Armazena os dados da resposta
  } catch (error) {
    console.error('Erro ao fazer a requisição POST:', error);
  }
}
</script>
