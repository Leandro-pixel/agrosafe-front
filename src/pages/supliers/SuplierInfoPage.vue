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
      <template v-if="activeIndex === 1">
  <PrimaryTable
  @request="onRequest"
  v-model:pagination="pagination"
  :rows="rows"
  :loading="loading"
  :columns="columns"
  :refresh="refresh"
  >
    <template #body-cell-status="props">
      <q-td style="align-items: center;" >
        <q-chip :class="'non-selectable bg-' + translateStatusToColor(props.props.row.CCBStatus? 'Ativo' : 'Inativo')" size="md" flat>
          {{props.props.row.CCBStatus? 'Ativo' : 'Inativo'}}
        </q-chip>
      </q-td>
    </template>

  </PrimaryTable>
</template>
      <InfoList v-if="activeIndex === 2" :info-array="limitInfo"></InfoList>
      <WithdrawalTable v-if="activeIndex === 3"/>
    </q-page>
  </q-layout>
</template>

<script setup lang="ts">
import InfoList from 'src/components/list/InfoList.vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
//import { User } from 'src/models/user'
import { QTableColumn } from 'quasar'
import { NotifyError} from 'src/utils/utils'
import PrimaryTable from 'src/components/list/PrimaryTable.vue'
import { Pagination } from 'src/models/pagination'
import { translateStatusToColor } from 'src/models/enums/activeStatusEnum'
import { CustomerBrands } from 'src/models/customer';
import { useCustomerStore } from 'src/stores/useCustomerStore';
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
const items1 = ['Credenciais', 'Estabelecimentos', 'Limites', 'Splits'];
const id1 = route.params.id || 'Nome não disponível';
const infoList = ref<Array<{ icon: string; label: string; value: any }>>([]);
const limitInfo = ref<Array<{ icon: string; label: string; value: any }>>([]);
// Índice do span ativo
const activeIndex = ref<number>(0);

// Função para definir o span ativo
const setActive = (index: number) => {
  activeIndex.value = index;
};

const columns: QTableColumn[] = [
{ name: 'id', label: 'ID', field: (row:CustomerBrands) => row.id, align: 'center' },
{ name: 'userName', required: true, label: 'Name', field: (row:CustomerBrands) => row.name, align: 'left' },
{ name: 'criado', required: true, label: 'data criação', field: (row:CustomerBrands) => Formatter.formatDateToBR(row.createdAt), align: 'left' },
{ name: 'cpf', required: true, label: 'CPF', field: (row:CustomerBrands) => row.cpf, align: 'left' },
{ name: 'email', required: true, label: 'E-mail', field: (row:CustomerBrands) => row.email, align: 'left' },
{ name: 'celular', required: true, label: 'Celular', field: (row:CustomerBrands) => row.phone, align: 'left' },
{ name: 'status', label: 'CCB', field: (row:CustomerBrands) => row.CCBStatus? 'Ativo' : 'Inativo', align: 'center' },
]

const pagination = ref(new Pagination())
const rows = ref([] as Array<CustomerBrands>)
const loading = ref(false)
const userStore = useCustomerStore()
const refresh = ref(false)
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
      { icon: 'description', label: 'Documento', value: Formatter.strToCpf(response.cnpj) },
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

const onRequest = async (props:any) => {
loading.value = true
const { page, rowsPerPage } = props.pagination

const offset = page - 1
const limit = rowsPerPage

await userStore.fetchBrandsUsers(limit, offset,idEC, props.filter)
  .then(() => {
    rows.value = userStore.getUsers
    pagination.value.rowsNumber = userStore.totalItemsInDB

    pagination.value.page = page
    pagination.value.rowsPerPage = rowsPerPage
  })
  .catch((error:any) => NotifyError.error(error.message))
  .finally(() => { loading.value = false })
}

</script>
