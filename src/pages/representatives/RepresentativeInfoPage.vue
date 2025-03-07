<template>
  <q-layout>
    <q-page class="column">
      <div class="flex justify-center text-primary text-subtitle1 q-mb-lg">
        {{ name }}
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
      <infor v-if="activeIndex === 0" :info-array="infoList"></infor>
      <EstablishmentTable v-if="activeIndex === 1"/>
      <PurchaseTable v-if="activeIndex === 2" class="q-mt-md"/>


    </q-page>
  </q-layout>
</template>

<script setup lang="ts">
import InfoList from 'src/components/list/InfoList.vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { Formatter } from 'src/utils/formatter';
import { NotifyError} from 'src/utils/utils';
import { useHubStore } from 'src/stores/useHubStore';
import { onMounted } from 'vue';
import PurchaseTable from 'src/components/list/Purchase-table.vue';
import EstablishmentTable from 'src/components/list/Establishment-table.vue';

onMounted(() => {
  datas();
});

const hubStore = useHubStore();

// Recebe o ID da rota como propriedade
defineProps<{ id: string }>();

const loading = ref(false);
const infoList = ref<Array<{ icon: string; label: string; value: any }>>([]);

const infor = InfoList;
// Acessando o nome via query string
const route = useRoute();
//const router = useRouter();

const name = route.query.name || 'Nome não disponível';
const id1 = route.params.id || 'Nome não disponível';

// Dados dos spans
const items1 = ['Credenciais','Estabelecimentos', 'Movimentações'];

// Índice do span ativo
const activeIndex = ref<number>(0);

// Função para definir o span ativo
const setActive = (index: number) => {
  activeIndex.value = index;
};

const datas = async () => {
  const hubId = Array.isArray(route.params.id) ? parseInt(route.params.id[0]) : parseInt(route.params.id as string);
  console.log('route.query.id:', id1);

    if (isNaN(hubId)) {
      throw new Error('ID inválido');
    }
  try {
    loading.value = true;
    const response = await hubStore.fetchOneRep(hubId);
    console.log('Dados retornados:', response); // Debugging

    infoList.value = [
    { icon: 'badge', label: 'ID', value: response.id },
    { icon: 'person', label: 'Nome fantasia', value: response.name },
    { icon: 'mail', label: 'E-mail', value: response.email },
    { icon: 'phone', label: 'Celular', value: response.phone },
    { icon: 'check_circle', label: 'Status', value: response.status ? 'Ativo' : 'Inativo' },
    { icon: 'schedule', label: 'Data de criação', value: Formatter.formatDateToBR(response.createdAt) },
    ];
  } catch (error: any) {
    NotifyError.error(error.message);
  } finally {
    loading.value = false;
  }
};

</script>
