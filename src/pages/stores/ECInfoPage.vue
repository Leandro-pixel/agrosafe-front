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
      <ClientTable v-if="activeIndex === 1"/>
      <RepresentativeTable v-if="activeIndex === 2"/>
      <InfoList v-if="activeIndex === 3" :info-array="limitInfo"></InfoList>
      <PurchaseTable v-if="activeIndex === 4" class="q-mt-md"/>

  <WithdrawalTable v-if="activeIndex === 5"></WithdrawalTable>

    </q-page>
  </q-layout>
</template>

<script setup lang="ts">
import InfoList from 'src/components/list/InfoList.vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStoreStore } from 'src/stores/useStoreStore';
import { Formatter } from 'src/utils/formatter';
import { implementHierarchy, NotifyError} from 'src/utils/utils';
import { onMounted } from 'vue';
import PurchaseTable from 'src/components/list/Purchase-table.vue';
import WithdrawalTable from 'src/components/list/Withdrawal-table.vue';
import ClientTable from 'src/components/list/Client-table.vue'
import RepresentativeTable from 'src/components/list/Representative-table.vue';

onMounted(() => {
  datas();
});


// Recebe o ID da rota como propriedade
defineProps<{ id: string }>();
const storeStore = useStoreStore();
const loading = ref(false);
const infoList = ref<Array<{ icon: string; label: string; value: any }>>([]);
const limitInfo = ref<Array<{ icon: string; label: string; value: any }>>([]);

//const router = useRouter();

const infor = InfoList;
// Acessando o nome via query string
const route = useRoute();
//const router = useRouter();

const name = route.query.name || 'Nome não disponível';
const id1 = route.params.id || 'Nome não disponível';

// Dados dos spans
const items1 = ['Credenciais', 'Clientes', (implementHierarchy('representative') ?'Representantes': ''),'Limites', 'Movimentações',(implementHierarchy('sysAdmin') ?'Antecipações': '')];

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
    const response = await storeStore.fetchOneStore(hubId, false);
    console.log('Dados retornados:', response); // Debugging

    infoList.value = [
    { icon: 'badge', label: 'ID', value: response.id },
    { icon: 'person', label: 'Nome fantasia', value: response.tradeName },
      { icon: 'description', label: 'Documento', value: Formatter.strToCpf(response.cpf) },
      { icon: 'phone', label: 'Celular', value: response.phone },
      { icon: 'check_circle', label: 'Status', value: response.status ? 'Ativo' : 'Inativo' },
      { icon: 'schedule', label: 'Criado em', value: Formatter.formatDateToBR(response.createdAt) },
    ];

    limitInfo.value = [
  { icon: 'monetization_on', label: 'Saldo disponível', value: Formatter.formatDoubleToCurrency(parseFloat(response.availableCreditBalance)) },
  { icon: 'money_off', label: 'Saldo não usado', value: Formatter.formatDoubleToCurrency(parseFloat(response.outstandingCredit)) },
  ...(implementHierarchy('sysAdmin') ? [{
    icon: 'redeem',
    label: 'Saldo splitado',
    value: Formatter.formatDoubleToCurrency(parseFloat(response.splitDiscount))
  }] : []),

  { icon: 'group', label: 'Limite de clientes', value: response.customerLimit },
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
