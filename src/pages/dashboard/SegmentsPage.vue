<template>
  <q-layout>
	<q-page class="column q-pa-md">

    <div class="flex justify-between q-mb-lg">
        <span
          class="q-pt-sm flex items-center text-h6 text-weight-bold text-primary"
          style="border-top: 0.25rem solid #401a58"
        >
          Seguimentos
        </span>
        </div>
    <div class="flex">
      <div class="row flex-center q-mb-lg q-gutter-md">
              <q-img
              src="src/assets/cards/cartao_brands.png"
                fit="fill"
                class="logo__img"
                style="width: 15rem; height: 10rem;"
              />
              <q-img
              src="src/assets/cards/cartao_brands.png"
                fit="fill"
                class="logo__img"
                style="width: 15rem; height: 10rem;"
              />
            </div>
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

      <SearchableDateTable v-if="activeIndex === 0" :items="tableData" :columns="tableColumns" />

      <searchableTable
        :items="items"
        :columns="columns"
        :onToggleActive="onToggleActive"
        v-if="activeIndex === 1"
      />
      <searchableTable
        :items="items2"
        :columns="columns"
        :onToggleActive="onToggleActive"
        v-if="activeIndex === 2"
      />
	</q-page>
</q-layout>
</template>

<script setup lang="ts">
import SearchableTable from 'src/components/list/Searchable-table.vue';
import { ref } from 'vue';
import SearchableDateTable from 'src/components/list/Searchable-date-table.vue';

const searchableTable = SearchableTable;
const activeIndex = ref<number>(0);
// Dados dos spans
const items1 = ['Movimentações', 'ECs', 'Clientes'];

// Função para definir o span ativo
const setActive = (index: number) => {
  activeIndex.value = index;
};

const items = ref([
  { id: 1, name: 'bueaty life', CNPJ: '12345678000199', active: true },
  { id: 2, name: 'fashion hair', CNPJ: '98765432000188', active: false },
  { id: 3, name: 'natura', CNPJ: '13579246000144', active: true },
  { id: 4, name: 'body care', CNPJ: '86420973000133', active: false },
]);

const items2 = ref([
  { id: 1, name: 'Cliente nome 1', CNPJ: '47481542848', active: true },
  { id: 2, name: 'Cliente nome 2', CNPJ: '47481542848', active: false },
  { id: 3, name: 'Cliente nome 3', CNPJ: '47481542848', active: true },
  { id: 4, name: 'Cliente nome 4', CNPJ: '47481542848', active: false },
]);

const tableData = [
  { id: 1000, name: 'Natura', date: '2024-10-10' },
  { id: 2500, name: 'Beauty hair', date: '2024-10-15' },
  { id: 3000, name: 'Boticário', date: '2024-11-01' },
  { id: 4000, name: 'Avon', date: '2024-11-05' },
];

const tableColumns = [
  { name: 'id', label: 'Quantia', align: 'left' as const, field: (row: any) => row.id },
  { name: 'name', label: 'Nome EC', align: 'left' as const, field: (row: any) => row.name },
  { name: 'date', label: 'Data', align: 'left' as const, field: (row: any) => row.date },
];

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
    label: 'CNPJ',
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

const onToggleActive = (row: any) => {
  row.active = !row.active;
  console.log(`${row.name} agora está ${row.active ? 'Ativo' : 'Inativo'}`);
};

</script>
