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
      <InfoList v-if="activeIndex === 1" :info-array="limitInfo"></InfoList>

  <PrimaryTable
  @request="onRequestCash"
  v-model:pagination="pagination"
  :rows="cashs"
  :loading="loading"
  :columns="columnsCash"
  :refresh="refresh"
  v-if="activeIndex === 2"
  >
  <template #body-cell-status="props">
      <q-td >
        <q-chip
          :class="
            'non-selectable bg-' +
            translateStatusToColor(props.props.row.statuses[0])
          "
          size="md"
          flat
        >
          {{ props.props.row.statuses[0] ? 'Pendente' : 'Pago' }}
        </q-chip>
      </q-td>
    </template>
    <template #body-cell-actions="props"  >
      <q-btn-dropdown flat color="primary" dropdown-icon="settings">
        <q-list>
      <q-td class=" flex flex-row justify-center items-center gap-2">
        <PrimaryButton
                icon="add_business"
                flat
                @click="details(props.props.row.id, props.props.row.name, 'true')"
                label="Detalhes"
            />
      </q-td>
        </q-list>
      </q-btn-dropdown>
    </template>

  </PrimaryTable>

  <InvoiceTable v-if="activeIndex === 3"/>

    </q-page>
  </q-layout>
</template>

<script setup lang="ts">
import InfoList from 'src/components/list/InfoList.vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { Pagination } from 'src/models/pagination';
import { Formatter } from 'src/utils/formatter';
import { NotifyError} from 'src/utils/utils';
import PrimaryTable from 'src/components/list/PrimaryTable.vue';
import { QTableColumn } from 'quasar';
import { translateStatusToColor } from 'src/models/enums/activeStatusEnum';
import { useHubStore } from 'src/stores/useHubStore';
import { onMounted } from 'vue';
import { CashFlow } from 'src/models/cashFlow';
import { useCachSflowStore } from 'src/stores/useCashFlowStore';
import InvoiceTable from 'src/components/list/Invoice-table.vue';

onMounted(() => {
  datas();
});

const hubStore = useHubStore();

// Recebe o ID da rota como propriedade
defineProps<{ id: string }>();

const pagination = ref(new Pagination());
  const cashs = ref([] as Array<CashFlow>);
const loading = ref(false);
const refresh = ref(false);
const infoList = ref<Array<{ icon: string; label: string; value: any }>>([]);
const limitInfo = ref<Array<{ icon: string; label: string; value: any }>>([]);
const cashFlowStore = useCachSflowStore();
//const router = useRouter();
const infor = InfoList;
// Acessando o nome via query string
const route = useRoute();
//const router = useRouter();

const name = route.query.name || 'Nome não disponível';
const id1 = route.params.id || 'Nome não disponível';

// Dados dos spans
const items1 = ['Informações', 'Limites', 'Movimentações', 'Faturas'];

// Índice do span ativo
const activeIndex = ref<number>(0);

// Função para definir o span ativo
const setActive = (index: number) => {
  activeIndex.value = index;
};


const columnsCash: QTableColumn[] = [
{ name: 'hash', label: 'hash', field: (row:CashFlow) => row.hash, align: 'center' },
{ name: 'criado', required: true, label: 'data criação', field: (row:CashFlow) => row.createdAt, align: 'left' },
{ name: 'originalAmount', required: true, label: 'Valor', field: (row:CashFlow) => row.getFormattedOriginalAmount(), align: 'left' },
{ name: 'status', required: true, label: 'Status', field: (row:CashFlow) => row.statuses[0], align: 'left' },
{ name: 'transactionType', required: true, label: 'Forma de pagamento', field: (row:CashFlow) => row.transactionType, align: 'left' },
]

const datas = async () => {
  const hubId = Array.isArray(route.params.id) ? parseInt(route.params.id[0]) : parseInt(route.params.id as string);
  console.log('route.query.id:', id1);

    if (isNaN(hubId)) {
      throw new Error('ID inválido');
    }
  try {
    loading.value = true;
    const response = await hubStore.fetchOneUser(hubId);
    console.log('Dados retornados:', response); // Debugging

    infoList.value = [
    { icon: 'badge', label: 'ID', value: response.id },
    { icon: 'person', label: 'Nome fantasia', value: response.name },
      { icon: 'description', label: 'Documento', value: Formatter.strToCpf(response.cpf) },
      { icon: 'phone', label: 'Celular', value: response.phone },
      { icon: 'check_circle', label: 'Status', value: response.status ? 'Ativo' : 'Inativo' },
      { icon: 'schedule', label: 'Criado em', value: Formatter.formatDateToBR(response.createdAt) },
    ];
    limitInfo.value = [
  { icon: 'monetization_on', label: 'Saldo atual', value: Formatter.formatDoubleToCurrency(parseFloat(response.currentBalance)) },
  { icon: 'money_off', label: 'Status do CCB', value: response.CCBStatus? 'Aprovado': 'Pendente' },
  { icon: 'inbox', label: 'E-mail', value: response.email},
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

const details = async (id: any, name: any, status: string) => {
  console.log(id, name, status)
}

const onRequestCash = async (props: any) => {
  console.log('veio aquiaqui' + props);

  await cashFlowStore
    .fetchCashFlow(
    )
    .then(() => {
      console.log('veio aquiaqui2' + cashFlowStore.getTransactions);

      cashs.value = cashFlowStore.getTransactions;
      pagination.value.rowsNumber = cashFlowStore.totalItemsInDB;
    })
    .catch((error: any) => NotifyError.error(error.message))
    .finally(() => {
      loading.value = false;
    });
};
</script>
