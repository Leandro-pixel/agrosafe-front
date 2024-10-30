<template>
  <q-layout>
	<q-page class="column q-pa-md">
    <div class="flex justify-between q-mb-lg">
        <span
          class="q-pt-sm flex items-center text-h6 text-weight-bold text-primary"
          style="border-top: 0.25rem solid #401a58"
        >
          Seguimentos
        </span>
        </div>
    <div class="flex">
      <div class="row flex-center q-mb-lg q-gutter-md">
              <q-img
              src="src/assets/cards/cartao_brands.png"
                fit="fill"
                class="logo__img"
                style="width: 15rem; height: 10rem;"
              />
              <q-img
              src="src/assets/cards/cartao_brands.png"
                fit="fill"
                class="logo__img"
                style="width: 15rem; height: 10rem;"
              />
            </div>
    </div>
		<div class="flex">
        <span
          v-for="(item, index) in items1"
          :key="index"
          class="flex items-center text-h6 q-mr-md"
          :class="{
            isActive: activeIndex === index,
            isNotActive: activeIndex !== index,
          }"
          @click="setActive(index)"
        >
          {{ item }}
        </span>
      </div>
	</q-page>
</q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';


const activeIndex = ref<number>(0);
// Dados dos spans
const items1 = ['Movimentações', 'ECs', 'Clientes'];

// Função para definir o span ativo
const setActive = (index: number) => {
  activeIndex.value = index;
};


</script>
