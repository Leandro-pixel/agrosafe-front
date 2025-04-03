<template>
  <q-layout>
    <q-page class="column">
      <!-- Campo de Busca -->
      <div class="flex justify-between">
        <span
          class="q-pt-sm flex items-center text-h6 text-weight-bold text-primary"
          style="border-top: 0.25rem solid #401A58;"
        >
          Fornecedores
        </span>
        <q-btn
          flat
          class="q-pt-sm q-pr-xl text-h6 text-primary"
          :onclick="onClick"
          style="margin-top: 0.25rem; text-transform: none;"
        >
          +Cadastrar Fornecedor
        </q-btn>
      </div>

      <q-page-container>
      <router-view class="q-pa-md" />
      </q-page-container>
    </q-page>
  </q-layout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';


const router = useRouter();

const onClick = () => {
  //console.log('name:', id + name);
  router.push( {path: '/fornecedor/cadastroFornecedor' });
};
</script>
