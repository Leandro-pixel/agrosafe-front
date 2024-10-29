<template>
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
            @click="onNameClick(props.row.id, props.row.name)"
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
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps<{
  items: Array<{ id: number; name: string; CNPJ: string; active: boolean }>;
  columns: Array<{
        name: string;
        required?: boolean;
        label: string;
        align?: 'left' | 'right' | 'center';
        field: (row: any) => any
      }>;
  onNameClick: (id: number, name: string) => void;
  onToggleActive: (row: any) => void;
}>();

const searchTerm = ref('');
const filteredItems = computed(() => {
  const term = searchTerm.value.toLowerCase();
  return props.items.filter(item => item.name.toLowerCase().includes(term));
});
</script>
