<template>
  <q-layout>
    <q-page class="column">
      <RepresentativeTable/>
    </q-page>
  </q-layout>
</template>

<script setup lang="ts">
import RepresentativeTable from 'src/components/list/Representative-table.vue';


/*
const addFunction = (id:string) => router.push(`usuarios/criar/hub/${HashIds.encryptId(id)}`)
const createStore = (id:string) => router.push(`lojas/criar/${HashIds.encryptId(id)}`)
const view = (id:string) => router.push(`${route.path}/${HashIds.encryptId(id)}`)
const viewUsers = (id:string) => router.push(`usuarios/hub/${HashIds.encryptId(id)}`)
*/
</script>
