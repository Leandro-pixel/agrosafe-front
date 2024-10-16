<template>
  <q-layout>
    <q-page class="column">
      <!-- Campo de Busca -->
      <div class="flex">
        <span class="q-pt-sm flex items-center text-h6 text-weight-bold text-primary"
        style="
          border-top: 0.25rem solid #401A58;
        ">Estabelecimentos</span>
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
          class="q-mt-md"
        />
      </div>
    </q-page>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// Dados da tabela
const items = ref([
  { id: 1, name: 'Alice', userType: 'Admin' },
  { id: 2, name: 'Bob', userType: 'User' },
  { id: 3, name: 'Charlie', userType: 'Admin' },
  { id: 4, name: 'Dave', userType: 'User' },
  // ...mais itens
]);

// Configurações das colunas da tabela
const columns = [
  {
    name: 'name',
    required: true,
    label: 'Nome',
    align: 'left' as const,
    field: (row: any) => row.name,
  },
  {
    name: 'userType',
    label: 'Tipo de Usuário',
    align: 'left' as const,
    field: (row: any) => row.userType,
  },
];

// Termo de busca e itens filtrados dinamicamente
const searchTerm = ref('');
const filteredItems = computed(() => {
  const term = searchTerm.value.toLowerCase();
  return items.value.filter((item) => item.name.toLowerCase().includes(term));
});
</script>
