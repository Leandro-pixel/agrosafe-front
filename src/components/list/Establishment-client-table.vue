<template>
  <q-layout>
    <q-page class="column">
      <PrimaryTable
    @request="onRequest"
    v-model:pagination="pagination"
    :rows="rows"
    :loading="loading"
    :columns="columns"
    :refresh="refresh"
  >
    <template #top-left> </template>

    <template v-slot:body-cell-userName="props">
            <q-td >
              <span
                class="text-primary hoverable"
                @click="implementHierarchy('sysAdmin')? onNameClick( props.props.row.userId, props.props.row.userName): {}"
              >
                {{ props.props.row.userName }}
              </span>
            </q-td>
          </template>


  </PrimaryTable>
    </q-page>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Pagination } from 'src/models/pagination';
import { implementHierarchy, NotifyError} from 'src/utils/utils';
import PrimaryTable from 'src/components/list/PrimaryTable.vue';
import { QTableColumn } from 'quasar';
import { useRouter } from 'vue-router';
import { useCustomerStore } from 'src/stores/useCustomerStore';
import { CustomerBrands, ECCustomer } from 'src/models/customer';
import { Formatter } from 'src/utils/formatter';


const router = useRouter()

// Recebe o ID da rota como propriedade
const prop = defineProps<{
  searchBy?: {
    cpf?: string;
    status?: boolean;
  };
  id?: number;
}>();



const pagination = ref(new Pagination())
const rows = ref([] as Array<CustomerBrands>)
const loading = ref(false)
const userStore = useCustomerStore()
const refresh = ref(false)
console.log('propriedades:' + prop)
// Índice do span ativo


  const columns: QTableColumn[] = [
{ name: 'id', label: 'ID', field: (row:ECCustomer) => row.userId, align: 'center' },
{ name: 'userName', required: true, label: 'Name', field: (row:ECCustomer) => row.userName, align: 'left' },
{ name: 'criado', required: true, label: 'data criação', field: (row:ECCustomer) => Formatter.formatDateToBR(row.createdAt), align: 'left' },
{ name: 'email', required: true, label: 'Créditos', field: (row:ECCustomer) => Formatter.strToCurrency(row.creditBalance), align: 'left' },
]

const onNameClick = (id: any, name: any) => {
  console.log('name:', id + name);
  router.push({ path: `/clientes/${id}`, query: {name}});

};

const onRequest = async (props:any) => {
  console.log('Propriedades searchBy:', prop.id);
  console.log('Propriedades:', prop);


loading.value = true
const { page, rowsPerPage } = props.pagination

const offset = page - 1
const limit = rowsPerPage
console.log('#######',props.id)
await userStore.fetchECUsers(limit, offset, prop.id)
  .then(() => {
    console.log('chegou aqui1')

    rows.value = userStore.getUsers
    pagination.value.rowsNumber = userStore.totalItemsInDB

    pagination.value.page = page
    pagination.value.rowsPerPage = rowsPerPage
  })
  .catch((error:any) => NotifyError.error(error.message))
  .finally(() => { loading.value = false })
}

</script>
