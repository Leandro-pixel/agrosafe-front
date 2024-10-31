<template>
  <q-page class="q-pa-md q-mt-lg">
    <!-- Filtros por data -->
    <div class="flex-center row justify-evenly q-gutter-lg">
      <div>
  <label class="text-primary column">Data Inicial</label>
  <q-date
    v-model="startDate"
    mask="YYYY-MM-DD"
    format="YYYY-MM-DD"
    :view="'calendar'"
    class="q-mb-md"
  />
</div>

<div>
  <label class="text-primary column">Data Final</label>
  <q-date
    v-model="endDate"
    mask="YYYY-MM-DD"
    format="YYYY-MM-DD"
    :view="'calendar'"
    class="q-mb-md"
  />
</div>
    </div>

    <!-- Tabela com filtro aplicado -->
    <q-table
      :rows="filteredItems"
      :columns="columns"
      row-key="id"
      class="q-mt-md"
    >
      <template v-slot:body-cell-date="props">
        <q-td :props="props">
          {{ formatDate(props.row.date) }}
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, defineProps } from 'vue';
import { date } from 'quasar';

const props = defineProps<{
  items: Array<{ id: number; name: string; date: string }>;
  columns: Array<{
    name: string;
    label: string;
    align?: 'left' | 'right' | 'center';
    field: (row: any) => any;
  }>;
}>();

const startDate = ref('');
const endDate = ref('');

// Função para formatar a data
function formatDate(dateStr) {
  return date.formatDate(dateStr, 'DD/MM/YYYY');
}

// Filtra os itens com base nas datas selecionadas
const filteredItems = computed(() => {
  return props.items.filter(item => {
    const itemDate = new Date(item.date);
    const start = startDate.value ? new Date(startDate.value) : null;
    const end = endDate.value ? new Date(endDate.value) : null;

    return (!start || itemDate >= start) && (!end || itemDate <= end);
  });
});
</script>

<style scoped>
.date-filter-container {
  display: flex;
  gap: 10px;
  align-items: center;
}

.date-filter {
  max-width: 200px; /* Define a largura máxima dos seletores de data */
  width: 100%;
}
</style>
