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
      <template v-slot:body-cell-loja="props">
        <q-td :props="props">
          <span
            class="text-primary hoverable"
            @click="onNameClick(props.row.id, props.row.loja)"
          >
            {{ props.row.loja }}
          </span>
        </q-td>
      </template>

      <template v-slot:body-cell-quantidade="props">
        <q-td :props="props">
          {{ props.row.quantidade }}
        </q-td>
      </template>

      <template v-slot:body-cell-data="props">
        <q-td :props="props">
          {{ props.row.data }}
        </q-td>
      </template>

      <template v-slot:body-cell-cartao="props">
        <q-td :props="props">
          {{ props.row.cartao }}
        </q-td>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-pa-xs">
          <q-btn
            color="green"
            icon="receipt"
            label="Recibo"
            @click="onGenerateReceipt(props.row)"
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';

// Definição de propriedades recebidas pelo componente
const props = defineProps<{
  items: Array<{
    id: number;
    loja: string;
    quantidade: number;
    data: string;
    cartao: string;
  }>;
  columns: Array<{
    name: string;
    required?: boolean;
    label: string;
    align?: 'left' | 'right' | 'center';
    field: (row: any) => any;
  }>;
  onNameClick: (id: number, loja: string) => void;
}>();

// Função para gerar o recibo
const onGenerateReceipt = (row: any) => {
  console.log(`Gerando recibo para ${row.loja}`);
  // Lógica para geração de recibo aqui...
};

// Estado para o termo de busca
const searchTerm = ref('');

// Computed para filtrar os itens com base no termo de busca
const filteredItems = computed(() => {
  const term = searchTerm.value.toLowerCase();
  return props.items.filter(item =>
    item.loja.toLowerCase().includes(term)
  );
});
</script>
