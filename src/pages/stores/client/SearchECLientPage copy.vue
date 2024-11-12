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
import { User } from 'src/models/user'
import { useUserStore } from 'src/stores/useUserStore'
import { ref } from 'vue'
import { QTableColumn } from 'quasar'
import { NotifyError} from 'src/utils/utils'
import PrimaryTable from 'src/components/list/PrimaryTable.vue'
import { Pagination } from 'src/models/pagination'
import { translateStatusToColor } from 'src/models/enums/activeStatusEnum'

const columns: QTableColumn[] = [
{ name: 'id', label: 'ID', field: (row:User) => row.id, align: 'center' },
{ name: 'email', required: true, label: 'E-mail', field: (row:User) => row.email, align: 'left' },
{ name: 'userType', label: 'Tipo de usuário', field: (row:User) => row.userType, align: 'left' },
{ name: 'status', label: 'Status', field: (row:User) => row.status, align: 'center' },
{ name: 'actions', label: 'Ações', field: 'actions', align: 'center' }
]

const pagination = ref(new Pagination())
const rows = ref([] as Array<User>)
const loading = ref(false)
const userStore = useUserStore()
const refresh = ref(false)


const onRequest = async (props:any) => {
loading.value = true
const { page, rowsPerPage } = props.pagination

const offset = page - 1
const limit = rowsPerPage

await userStore.fetchUsers(limit, offset, props.filter)
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
