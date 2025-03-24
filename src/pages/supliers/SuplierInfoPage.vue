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
            isNotActive: activeIndex !== index
          }"
          @click="setActive(index)"
        >
          {{ item }}
        </span>
      </div>
      <infor v-if="activeIndex === 0" :info-array="infoList" ></infor>
<!--
      <template v-if="activeIndex === 1">
  <EstablishmentTable :id1="id1"/>
</template>
-->
      <InfoList v-if="activeIndex === 1" :info-array="limitInfo"></InfoList>
      <WithdrawalTable v-if="activeIndex === 2"/>
    </q-page>
  </q-layout>
</template>

<script setup lang="ts">
import InfoList from 'src/components/list/InfoList.vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
//import { User } from 'src/models/user'
import { NotifyError} from 'src/utils/utils'
//import EstablishmentTable from 'src/components/list/Establishment-table.vue';
import { useSuplierStore } from 'src/stores/useSuplierStore';
import { Formatter } from 'src/utils/formatter';
import WithdrawalTable from 'src/components/list/Withdrawal-table.vue';
// Recebe o ID da rota como propriedade
defineProps<{ id: string }>();

onMounted(() => {
  datas();
});

const infor = InfoList;

// Acessando o nome via query string
const route = useRoute();
const name = route.query.name || 'Nome não disponível';
const idEC = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
 console.log(idEC)
// Dados dos spans
const items1 = ['Credenciais', 'Limites', 'Splits'];
const id1 = Number(route.params.id) || 0;
const infoList = ref<Array<{ icon: string; label: string; value: any }>>([]);
const limitInfo = ref<Array<{ icon: string; label: string; value: any }>>([]);
// Índice do span ativo
const activeIndex = ref<number>(0);

// Função para definir o span ativo
const setActive = (index: number) => {
  activeIndex.value = index;
};


const loading = ref(false)
const suplierStore = useSuplierStore();
const datas = async () => {
  const hubId = Array.isArray(route.params.id) ? parseInt(route.params.id[0]) : parseInt(route.params.id as string);
  console.log('route.query.id:', id1);

    if (isNaN(hubId)) {
      throw new Error('ID inválido');
    }
  try {
    loading.value = true;
    const response = await suplierStore.fetchOneStore(hubId, true);
    console.log('Dados retornados:', response); // Debugging

    infoList.value = [
    { icon: 'badge', label: 'ID', value: response.id },
    { icon: 'person', label: 'Nome fantasia', value: response.tradeName },
    {
  icon: 'description',
  label: 'Documento',
  value: response.cnpj?.length === 14
    ? Formatter.strToCnpj(response.cnpj)
    : Formatter.strToCpf(response.cpf)
},
      { icon: 'phone', label: 'Celular', value: response.phone },
      { icon: 'check_circle', label: 'Status', value: response.status ? 'Ativo' : 'Inativo' },
      { icon: 'schedule', label: 'Criado em', value: Formatter.formatDateToBR(response.createdAt) },
    ];

    limitInfo.value = [
  { icon: 'monetization_on', label: 'Saldo disponível', value: Formatter.formatDoubleToCurrency(parseFloat(response.amountToReceive)) },
  {
    icon: 'schedule',
    label: 'Última atualização',
    value: Formatter.formatDateToBR(response.updatedAt),
  },
];
  } catch (error: any) {
    NotifyError.error(error.message);
  } finally {
    loading.value = false;
  }
};

</script>
