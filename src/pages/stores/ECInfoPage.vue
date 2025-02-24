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
      <PrimaryTable
  @request="onRequest"
  v-model:pagination="pagination"
  :rows="clients"
  :loading="loading"
  :columns="columnsClient"
  :refresh="refresh"
  v-if="activeIndex === 1"
  >
  <template #body-cell-status="props">
      <q-td >
        <q-chip
          :class="
            'non-selectable bg-' +
            translateStatusToColor(props.props.row.CCBStatus? 'Ativo' : 'Inativo')
          "
          size="md"
          flat
        >
          {{ props.props.row.CCBStatus ? 'Ativo' : 'Inativo' }}
        </q-chip>
      </q-td>
    </template>

  </PrimaryTable>

  <InfoList v-if="activeIndex === 2" :info-array="limitInfo"></InfoList>

<PrimaryTable
    @request="onRequestRep"
    v-model:pagination="pagination"
    :rows="reps"
    :loading="loading"
    :columns="columnsRep"
    :refresh="refresh"
    v-if="activeIndex === 1"
  >
    <template #top-left> </template>
    <template #body-cell-status="props">
      <q-td >
        <q-chip
          :class="
            'non-selectable bg-' +
            translateStatusToColor(props.props.row.active ? 'Ativo' : 'Inativo')
          "
          size="md"
          flat
        >
          {{ props.props.row.active ? 'Ativo' : 'Inativo' }}
        </q-chip>
      </q-td>
    </template>


  </PrimaryTable>

  <PrimaryTable
  @request="onRequestCash"
  v-model:pagination="pagination"
  :rows="cashs"
  :loading="loading"
  :columns="columnsCash"
  :refresh="refresh"
  v-if="activeIndex === 3"
  >
  <template #body-cell-status="props">
      <q-td >
        <q-chip
          :class="
            'non-selectable bg-' +
            translateStatusToColor(props.props.row.CCBStatus? 'Ativo' : 'Inativo')
          "
          size="md"
          flat
        >
          {{ props.props.row.CCBStatus ? 'Ativo' : 'Inativo' }}
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

  <PrimaryTable
  @request="onRequestWithdrawal"
  v-model:pagination="pagination"
  :rows="withdrawals"
  :loading="loading"
  :columns="columnsWithdrawal"
  :refresh="refresh"
  v-if="activeIndex === 4"
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
          {{ props.props.row.statuses[0] == 'pending' ? 'pendente' : 'liquidado' }}
        </q-chip>
      </q-td>
    </template>

  </PrimaryTable>

    </q-page>
  </q-layout>
</template>

<script setup lang="ts">
import InfoList from 'src/components/list/InfoList.vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { Pagination } from 'src/models/pagination';
import { useStoreStore } from 'src/stores/useStoreStore';
import { Formatter } from 'src/utils/formatter';
import { NotifyError} from 'src/utils/utils';
import PrimaryTable from 'src/components/list/PrimaryTable.vue';
import { QTableColumn } from 'quasar';
import { translateStatusToColor } from 'src/models/enums/activeStatusEnum';
import { useHubStore } from 'src/stores/useHubStore';
import { onMounted } from 'vue';
import { Hub, HubBrands } from 'src/models/hub';
import { CashFlow } from 'src/models/cashFlow';
import { useCachSflowStore } from 'src/stores/useCashFlowStore';
import { CustomerBrands } from 'src/models/customer';
import { useCustomerStore } from 'src/stores/useCustomerStore'
import { Withdrawal } from 'src/models/withdrawals';
import { useWithdrawalStore } from 'src/stores/useWithdrawalStore';

onMounted(() => {
  datas();
});

const hubStore = useHubStore();

// Recebe o ID da rota como propriedade
defineProps<{ id: string }>();

const pagination = ref(new Pagination());
  const cashs = ref([] as Array<CashFlow>);
const storeStore = useStoreStore();
const loading = ref(false);
const refresh = ref(false);
const infoList = ref<Array<{ icon: string; label: string; value: any }>>([]);
const limitInfo = ref<Array<{ icon: string; label: string; value: any }>>([]);
const cashFlowStore = useCachSflowStore();
const clients = ref([] as Array<CustomerBrands>)
const userStore = useCustomerStore()
const withdrawals = ref([] as Array<Withdrawal>);
  const withdralStore = useWithdrawalStore();

//const router = useRouter();

const infor = InfoList;
// Acessando o nome via query string
const route = useRoute();
//const router = useRouter();

const name = route.query.name || 'Nome não disponível';
const id1 = route.params.id || 'Nome não disponível';

// Dados dos spans
const items1 = ['Credenciais', 'Clientes', 'Limites', 'Movimentações', 'Antecipações'];

// Índice do span ativo
const activeIndex = ref<number>(0);
  const reps = ref([] as Array<Hub>)

// Função para definir o span ativo
const setActive = (index: number) => {
  activeIndex.value = index;
};

const columnsWithdrawal: QTableColumn[] = [
{ name: 'id', label: 'ID', field: (row:Withdrawal) => row.id, align: 'center' },
{ name: 'createdAt', required: true, label: 'data criação', field: (row:Withdrawal) => row.createdAt, align: 'left' },
{ name: 'anticipationType', required: true, label: 'Tipo de antecipação', field: (row:Withdrawal) => row.anticipationType == 'punctualAdvance'? 'Pontual':'Automática', align: 'left' },
{ name: 'establishmentId', required: true, label: 'ID-EC', field: (row:Withdrawal) => row.establishmentId, align: 'left' },
{ name: 'amountToReceive', required: true, label: 'Valor a receber', field: (row:Withdrawal) => row.getFormattedAmountToReceive(), align: 'left' },
{ name: 'paidStatus', required: true, label: 'Status de pagamento', field: (row:Withdrawal) => row.paidStatus? 'Efetuado': 'Pendente', align: 'left' },
{ name: 'pixKey', required: true, label: 'Chave pix', field: (row:Withdrawal) => row.pixKey, align: 'left' },
{ name: 'actions', label: 'Ações', align: 'center', field: 'actions' }
]

const columnsCash: QTableColumn[] = [
{ name: 'hash', label: 'hash', field: (row:CashFlow) => row.hash, align: 'center' },
{ name: 'criado', required: true, label: 'data criação', field: (row:CashFlow) => row.createdAt, align: 'left' },
{ name: 'originalAmount', required: true, label: 'Valor', field: (row:CashFlow) => row.getFormattedOriginalAmount(), align: 'left' },
{ name: 'status', required: true, label: 'Status', field: (row:CashFlow) => row.statuses[0], align: 'left' },
{ name: 'transactionType', required: true, label: 'Forma de pagamento', field: (row:CashFlow) => row.transactionType, align: 'left' },
]

const columnsRep: QTableColumn[] = [
	//{ name: 'id', label: 'ID', align: 'center', field: (row:HubBrands) => row.id },
	{ name: 'name', label: 'Nome completo', align: 'left', field: (rep:HubBrands) => rep.name },
	{ name: 'email', label: 'E-mail', align: 'left', field: (rep:HubBrands) => rep.email },
	{ name: 'telefone', label: 'Telefone', align: 'left', field: (rep:HubBrands) => rep.phone },
	//{ name: 'address', label: 'Endereço', align: 'left', field: (row:HubBrands) => row.address.toString() },
	{ name: 'status', label: 'Status', field: (rep:HubBrands) => rep.status ? 'Ativo' : 'Inativo', align: 'center' },


]

const columnsClient: QTableColumn[] = [
{ name: 'id', label: 'ID', field: (row:CustomerBrands) => row.id, align: 'center' },
{ name: 'userName', required: true, label: 'Name', field: (row:CustomerBrands) => row.name, align: 'left' },
{ name: 'criado', required: true, label: 'data criação', field: (row:CustomerBrands) => Formatter.formatDateToBR(row.createdAt), align: 'left' },
{ name: 'cpf', required: true, label: 'CPF', field: (row:CustomerBrands) => row.cpf, align: 'left' },
{ name: 'email', required: true, label: 'E-mail', field: (row:CustomerBrands) => row.email, align: 'left' },
{ name: 'celular', required: true, label: 'Celular', field: (row:CustomerBrands) => row.phone, align: 'left' },
{ name: 'status', label: 'Status', field: (row:CustomerBrands) => row.CCBStatus? 'Ativo' : 'Inativo', align: 'center' },
]

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
  { icon: 'redeem', label: 'Saldo splitado', value: Formatter.formatDoubleToCurrency(parseFloat(response.splitDiscount)) },
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

const details = async (id: any, name: any, status: string) => {
  console.log(id, name, status)
}

const onRequestWithdrawal = async (props: any) => {
  console.log('veio aquiaqui' + props);

  await withdralStore
    .fetchWithdrawal()
    .then(() => {
      console.log('veio aquiaqui2' + withdralStore.getWithdrawals);

      withdrawals.value = withdralStore.getWithdrawals;
      pagination.value.rowsNumber = withdralStore.totalItemsInDB;
    })
    .catch((error: any) => NotifyError.error(error.message))
    .finally(() => {
      loading.value = false;
    });
};

const onRequestRep = async (props:any) => {
	loading.value = true

	const { page, rowsPerPage } = props.pagination
	const offset = page - 1
	const limit = rowsPerPage
	const filterWithoutSymbols = Formatter.clearSymbols(props.filter)

	await hubStore.fetchHubsBrands(limit, offset,'representative', filterWithoutSymbols)
		.then(() => {
			reps.value = hubStore.hubs
			pagination.value.rowsNumber = hubStore.totalItemsInDB

			pagination.value.page = page
			pagination.value.rowsPerPage = rowsPerPage
		})
		.catch((error:any) => NotifyError.error(error.message))
		.finally(() => { loading.value = false })
}

const onRequest = async (props:any) => {
loading.value = true
const { page, rowsPerPage } = props.pagination

const offset = page - 1
const limit = rowsPerPage

await userStore.fetchBrandsUsers(limit, offset, props.filter)
  .then(() => {
    console.log('chegou aqui1')

    clients.value = userStore.getUsers
    pagination.value.rowsNumber = userStore.totalItemsInDB

    pagination.value.page = page
    pagination.value.rowsPerPage = rowsPerPage
  })
  .catch((error:any) => NotifyError.error(error.message))
  .finally(() => { loading.value = false })
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
