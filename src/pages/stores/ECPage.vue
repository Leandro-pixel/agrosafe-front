<template>
  <q-layout>
    <q-page class="column" style="width: 100%; height: 100%">
      <!-- Campo de Busca -->
      <div style="display: flex; padding-top: 0.4rem;">
        <span  style="
          padding-top: 2rem;
          border-top: 0.25rem solid #401A58;
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 18px
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
