<template>
  <q-layout>
    <q-page class="column">
      <div class="flex justify-center text-primary text-subtitle1 q-mb-lg">
        {{ name }}
      </div>

      <div class="flex">
        <span
          v-for="(item, index) in items1"
          :key="index"
          class="flex items-center text-h6 q-mr-md"
          :class="{
            isActive: activeIndex === index,
            isNotActive: activeIndex !== index,
          }"
          @click="setActive(index)"
        >
          {{ item }}
        </span>
      </div>

      <!-- Exibindo conteúdo de acordo com o índice ativo -->
      <InfoList v-if="activeIndex === 0" :info-array="infoList"></InfoList>
      <InfoList v-if="activeIndex === 1" :info-array="fundingList"></InfoList>

      <SearchableTransactionTable
        :items="transactions"
        :columns="columns"
        @onNameClick="onNameClick"
        v-if="activeIndex === 2"
      />

      <!-- Botão Editar para a aba Funding -->
      <div v-if="activeIndex === 1" class="flex column">
        <q-btn
          flat
          icon="edit"
          @click="onToggle(edit)"
          label="Editar"
          class="bg-primary text-white items-center"
          style="width: 8rem"
        ></q-btn>

        <!-- Edição Habilitada -->
        <div v-if="edit">
          <span>Habilitou para editar valores</span>
          <q-btn
            flat
            @click="onToggle(edit)"
            label="Alterar valor"
            class="bg-primary text-white items-center"
            style="width: 8rem"
          ></q-btn>
        </div>
      </div>
    </q-page>
  </q-layout>
</template>

<script setup lang="ts">
import InfoList from 'src/components/list/InfoList.vue'; // Correção no import
import { ref } from 'vue';
import { useRoute } from 'vue-router';

// Recebe o ID da rota como propriedade
defineProps<{ id: string }>();

// Estado local para controle
const edit = ref(false);
const activeIndex = ref<number>(0);

// Acessando o nome via query string
const route = useRoute();
const name = (route.query.name as string) || 'Nome não disponível';

// Dados dos spans
const items1 = ['Informações', 'Funding', 'Movimentações'];

// Função para definir o span ativo
const setActive = (index: number) => {
  activeIndex.value = index;
};

// Função para alternar estado de edição
const onToggle = (value: boolean) => {
  edit.value = !value; // Inverte o valor de edição
};

// Mock de transações
const transactions = [
  { id: 1, loja: 'Loja A', quantidade: 5, data: '2024-10-29', cartao: 'Visa' },
  {
    id: 2,
    loja: 'Loja B',
    quantidade: 2,
    data: '2024-10-28',
    cartao: 'Mastercard',
  },
];

// Mock de informações de usuário
const infoList = [
  { icon: 'badge', label: 'Nome', value: 'Jackeline Amaral' },
  { icon: 'description', label: 'CPF', value: '4742894288' },
  { icon: 'monetization_on', label: 'Saldo total', value: 'R$200,00' },
  {
    icon: 'place',
    label: 'Endereço',
    value: 'Belo Horizonte, MG, Centro, Rua Rio de Janeiro, 30160-911',
  },
  {
    icon: 'sentiment_very_dissatisfied',
    label: 'Status',
    value: 'Inadimplente',
  },
  { icon: 'schedule', label: 'Criado em', value: '01/10/2024, 16:12:13' },
];

// Mock de informações financeiras
const fundingList = [
  { icon: 'monetization_on', label: 'Saldo disponível', value: 'R$150,00' },
  { icon: 'money_off', label: 'Saldo usado', value: 'R$50,00' },
  {
    icon: 'schedule',
    label: 'Última atualização',
    value: '01/10/2024, 16:12:13',
  },
];

// Definição das colunas da tabela
const columns = [
  { name: 'loja', label: 'Loja', align: 'left', field: 'loja' },
  {
    name: 'quantidade',
    label: 'Quantidade',
    align: 'right',
    field: 'quantidade',
  },
  { name: 'data', label: 'Data', align: 'center', field: 'data' },
  { name: 'cartao', label: 'Cartão', align: 'center', field: 'cartao' },
  { name: 'actions', label: 'Ações', align: 'center', field: 'actions' },
];

// Funções de eventos
const onNameClick = (id: number, loja: string) => {
  console.log(`Loja clicada: ${loja} (ID: ${id})`);
};
</script>
