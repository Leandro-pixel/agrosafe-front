<template>
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
        <q-chip :class="'non-selectable bg-' + translateStatusToColor(props.props.row.status)" size="md" flat>
          {{props.props.row.status}}
        </q-chip>
      </q-td>
    </template>

  </PrimaryTable>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QTableColumn } from 'quasar'
import { NotifyError} from 'src/utils/utils'
import PrimaryTable from 'src/components/list/PrimaryTable.vue'
import { Pagination } from 'src/models/pagination'
import { translateStatusToColor } from 'src/models/enums/activeStatusEnum'
import { useCustomerStore } from 'src/stores/useCustomerStore'
import { CustomerBrands } from 'src/models/customer'
//import { Formatter } from 'src/utils/formatter'

const columns: QTableColumn[] = [
//{ name: 'id', label: 'ID', field: (row:User) => row.id, align: 'center' },
{ name: 'userName', required: true, label: 'Name', field: (row:CustomerBrands) => row.name, align: 'left' },
//{ name: 'criado', required: true, label: 'data criação', field: (row:CustomerBrands) => Formatter.formatDateToBR(row.createdAt), align: 'left' },
//{ name: 'userType', label: 'Status', field: (row:User) => row.userType, align: 'left' },
{ name: 'userType', label: 'Status', field: (row:CustomerBrands) => row.userType, align: 'center' },
{ name: 'actions', label: 'Ações', field: 'actions', align: 'center' }
]

const pagination = ref(new Pagination())
const rows = ref([] as Array<CustomerBrands>)
const loading = ref(false)
const userStore = useCustomerStore()
const refresh = ref(false)
//const formattedDate = Formatter.timestampToDateBR(timestamp);

const onRequest = async (props:any) => {
loading.value = true
const { page, rowsPerPage } = props.pagination

const offset = page - 1
const limit = rowsPerPage

await userStore.fetchBrandsUsers(limit, offset, props.filter)
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
