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
      <q-page-container>
      <router-view class="q-pa-md" />
      </q-page-container>

    </q-page>
  </q-layout>
</template>

<script setup lang="ts">

</script>
