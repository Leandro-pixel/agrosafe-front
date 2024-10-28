<template>
  <q-layout>
    <q-page class="column">
      <!-- Campo de Busca -->
      <div class="flex justify-between">
        <span
          class="q-pt-sm flex items-center text-h6 text-weight-bold text-primary"
          style="border-top: 0.25rem solid #401a58;"
        >
          Clientes
        </span>
        <q-btn
          flat
          class="q-pt-sm q-pr-xl text-h6 text-primary"
          style="margin-top: 0.25rem; text-transform: none;"
        >
          +Convidar clientes
        </q-btn>
      </div>

      <div class="flex column q-pa-md q-pt-lg">
        <q-input
          outlined
          v-model="searchTerm"
          placeholder="Digite para buscar..."
          clearable
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>

        <!-- Tabela Filtrada -->
        <q-table
          :rows="filteredItems"
          :columns="columns"
          row-key="id"
          class="q-mt-md justify-between width-full"
        >
          <template v-slot:body-cell-actions="props">
            <q-td :props="props" class="q-pa-xs">
              <q-btn
                color="primary"
                icon="info"
                label="Info"
                @click="onInfoClick(props.row)"
                class="q-mr-sm"
              />
              <q-btn
                color="green"
                icon="payments"
                label="Funding"
                @click="onFundingClick(props.row)"
                class="q-mr-sm"
              />
              <q-btn
                color="red"
                icon="toggle_off"
                :label="props.row.active ? 'Desativar' : 'Ativar'"
                @click="onToggleActive(props.row)"
              />
            </q-td>
          </template>
        </q-table>
      </div>
    </q-page>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// Dados da tabela (mock)
const items = ref([
  { id: 1, name: 'Leandro Soares', CPF: '47481542848', active: true },
  { id: 2, name: 'Murilo', CPF: '47481542848', active: false },
  { id: 3, name: 'Isabela', CPF: '47481542848', active: true },
  { id: 4, name: 'Gabriel', CPF: '47481542848', active: false },
]);

// Configuração das colunas da tabela
const columns = [
  {
    name: 'name',
    required: true,
    label: 'Nome',
    align: 'left' as const,
    field: (row: any) => row.name,
  },
  {
    name: 'CPF',
    label: 'CPF',
    align: 'left' as const,
    field: (row: any) => row.CPF,
  },
  {
    name: 'actions',
    label: 'Ações',
    align: 'left' as const,
    field: () => '', // Campo obrigatório para evitar erro de tipagem
  },
];

// Funções de evento para os botões
const onInfoClick = (row: any) => {
  console.log('Info:', row);
};

const onFundingClick = (row: any) => {
  console.log('Funding para:', row);
};

const onToggleActive = (row: any) => {
  row.active = !row.active;
  console.log(`${row.name} agora está ${row.active ? 'Ativo' : 'Inativo'}`);
};

// Termo de busca e filtro dinâmico
const searchTerm = ref('');
const filteredItems = computed(() => {
  const term = searchTerm.value.toLowerCase();
  return items.value.filter((item) => item.name.toLowerCase().includes(term));
});
</script>
