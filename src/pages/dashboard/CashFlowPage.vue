<template>
  <q-layout>
    <q-page class="q-pa-md">
      <div class="flex justify-between q-mb-lg">
        <span
          class="q-pt-sm flex items-center text-h6 text-weight-bold text-primary"
          style="border-top: 0.25rem solid #401a58"
        >
          Movimentações
        </span>
      </div>
      <div>
        <PurchaseTable/>
      </div>
    </q-page>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onMounted } from 'vue';
import PurchaseTable from 'src/components/list/Purchase-table.vue';



onMounted(() => {
  console.log('foi montado');
  loading.value = true;
});


//const filter = ref('');
const loading = ref(false);
//const router = useRouter();

</script>

<style scoped>
.q-btn {
  min-width: 150px;
}
.transaction-item {
  border-bottom: 4px solid #ccc; /* Cor e espessura da linha de separação */
  padding-bottom: 10px; /* Espaço entre a transação e a linha de separação */
}

.transaction-item:last-child {
  border-bottom: none; /* Remove a linha de separação do último item */
}
.row {
  align-items: flex-start; /* Alinha os itens no topo */
}
</style>
