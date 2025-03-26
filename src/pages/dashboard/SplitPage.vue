<template>
    <q-layout>
  <q-page class="q-pa-md">
    <WithdrawalTable/>
  </q-page>
    </q-layout>
</template>

<script setup lang="ts">
import WithdrawalTable from 'src/components/list/Withdrawal-table.vue';

</script>

<style scoped>

.q-btn {
  min-width: 150px;
}

.row {
  align-items: flex-start; /* Alinha os itens no topo */
}
</style>
