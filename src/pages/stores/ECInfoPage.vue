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
            isNotActive: activeIndex !== index
          }"
          @click="setActive(index)"
        >
          {{ item }}
        </span>
      </div>
      <infor v-if="activeIndex === 0" :info-array="infoList" ></infor>
      <searchableTable
        :items="items"
        :columns="columns"
        :onNameClick="onNameClick"
        :onToggleActive="onToggleActive"
        v-if="activeIndex === 1"
      />
      <InfoList v-if="activeIndex === 2" :info-array="fundingList"></InfoList>

       <!-- Botão Editar para a aba Funding -->
       <div v-if="activeIndex === 2" class="flex column">
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
import InfoList from 'src/components/list/InfoList.vue';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import SearchableTable from 'src/components/list/Searchable-table.vue';

// Recebe o ID da rota como propriedade
defineProps<{ id: string }>();
const searchableTable = SearchableTable;

const infor = InfoList;

// Acessando o nome via query string
const route = useRoute();
const router = useRouter();const name = route.query.name || 'Nome não disponível';

const edit = ref(false);
// Dados dos spans
const items1 = ['Credenciais', 'Clientes', 'Funding'];

// Índice do span ativo
const activeIndex = ref<number>(0);

// Função para definir o span ativo
const setActive = (index: number) => {
  activeIndex.value = index;
};

// Função para alternar estado de edição
const onToggle = (value: boolean) => {
  edit.value = !value; // Inverte o valor de edição
};

const fundingList = [
  { icon: 'monetization_on', label: 'Saldo disponível', value: 'R$2.000,00' },
  { icon: 'money_off', label: 'Saldo usado', value: 'R$3.000,00' },
  {
    icon: 'schedule',
    label: 'Última atualização',
    value: '01/10/2024, 16:12:13',
  },
];

const infoList = [
  { icon: 'badge', label: 'Nome fantasia', value: 'PG DISTRIBUIDORA LTDA' },
  { icon: 'description', label: 'CNPJ', value: '14.163.708/0001-78' },
  { icon: 'place', label: 'Endereço', value: 'Belo Horizonte, MG, Centro, Rua Rio de Janeiro, 30160-911' },
  { icon: 'check_circle', label: 'Status', value: 'Ativo' },
  { icon: 'schedule', label: 'Criado em', value: '01/10/2024, 16:12:13' },
];

const items = ref([
  { id: 1, name: 'nome cliente 1', CNPJ: '12345678000199', active: true },
  { id: 2, name: 'nome cliente 2', CNPJ: '98765432000188', active: false },
  { id: 3, name: 'nome cliente 3', CNPJ: '13579246000144', active: true },
  { id: 4, name: 'nome cliente 4', CNPJ: '86420973000133', active: false },
]);

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Nome',
    align: 'left' as const,
    field: (row: any) => row.name,
  },
  {
    name: 'CNPJ',
    label: 'CPF',
    align: 'left' as const,
    field: (row: any) => row.CNPJ,
  },
  {
    name: 'actions',
    label: 'Ações',
    align: 'left' as const,
    field: () => '', // Campo obrigatório para evitar erro de tipagem
  },
];

const onNameClick = (id: number, name: string) => {
  console.log('name:', id + name);
  router.push({ path: `/lojas/clientes/${id}`, query: { name } });
};

const onToggleActive = (row: any) => {
  row.active = !row.active;
  console.log(`${row.name} agora está ${row.active ? 'Ativo' : 'Inativo'}`);
};

</script>
