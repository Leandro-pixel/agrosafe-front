<template>
  <q-layout>
    <q-page class="column">


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
          <template v-slot:body-cell-name="props">
            <q-td :props="props">
              <span
                class="text-primary hoverable"
                @click="onNameClick( props.row.id, props.row.name)"
              >
                {{ props.row.name }}
              </span>
            </q-td>
          </template>

          <template v-slot:body-cell-actions="props">
            <q-td :props="props" class="q-pa-xs">

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
import { useRouter } from 'vue-router';

const router = useRouter();
// Dados da tabela (mock)
const items = ref([
  { id: 1, name: 'Cliente nome 1', CPF: '47481542848', active: true },
  { id: 2, name: 'Cliente nome 2', CPF: '47481542848', active: false },
  { id: 3, name: 'Cliente nome 3', CPF: '47481542848', active: true },
  { id: 4, name: 'Cliente nome 4', CPF: '47481542848', active: false },
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


const onNameClick = (id: any, name: any) => {
  console.log('name:', id + name);
  router.push({ path: `/lojas/clientes/${id}`, query: {name}});

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
