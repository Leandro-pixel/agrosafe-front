<template>
  <q-layout>
    <q-page class="column">
      <div class="flex justify-center text-primary text-subtitle1 q-mb-lg">
        {{ name }}
      </div>

      <div class="flex">
        <span
          v-for="(item, index) in items"
          :key="index"
          class="flex items-center text-h6 q-mr-md"
          :class="{
            isActive: activeIndex === index,
            isNotActive: activeIndex !== index
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
import { useRoute } from 'vue-router';

// Recebe o ID da rota como propriedade
defineProps<{ id: string }>();

// Acessando o nome via query string
const route = useRoute();
const name = route.query.name || 'Nome não disponível';

// Dados dos spans
const items = ['Credenciais', 'Estabelecimentos'];

// Índice do span ativo
const activeIndex = ref<number>(0);

// Função para definir o span ativo
const setActive = (index: number) => {
  activeIndex.value = index;
};

</script>
