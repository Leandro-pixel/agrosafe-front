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
    <template #body-cell-actions="props">
      <q-td style="align-items: center;">
        <PrimaryButton v-if="showVisualization(props.props.row.userType)" icon="visibility" flat @click="viewFunction(props.props.row.detail.id, props.props.row.userType)">
          <q-tooltip class="bg-primary text-subtitle2">Visualizar</q-tooltip>
        </PrimaryButton>
        <q-btn-dropdown flat color="primary" dropdown-icon="settings">
          <q-list>
            <PrimaryButton label="Ativar usuário" v-if="props.props.row.status !== 'Ativo'" :loading="activationLoading" icon="key" flat />
          <!--  <PrimaryButton label="Ativar usuário" v-if="props.props.row.status !== 'Ativo'" :loading="activationLoading" icon="key" flat @click="activateUser(props.props.row.id)"/> -->
          <PrimaryButton label="Desativar usuário" v-if="props.props.row.status === 'Ativo' && implementHierarchy('admin')" :loading="inactivationLoading" icon="person_off" flat />

         <!--<PrimaryButton label="Desativar usuário" v-if="props.props.row.status === 'Ativo' && implementHierarchy('admin')" :loading="inactivationLoading" icon="person_off" flat @click="disableUser(props.props.row.id)"/>-->
          </q-list>
        </q-btn-dropdown>
      </q-td>
    </template>
    <!--
    <template #top-right v-if="showInviteSellerAsStore() || implementHierarchy('sysAdmin')">
      <PrimaryButton icon="add" v-if="showInviteSellerAsStore()" @click="inviteSellerAsStore()">Adicionar vendedor</PrimaryButton>
      <PrimaryButton icon="add" v-if="implementHierarchy('sysAdmin')" @click="inviteAdmin()">Adicionar administrador</PrimaryButton>
    </template> -->
  </PrimaryTable>
</template>

<script setup lang="ts">
import { User } from 'src/models/user'
import { useUserStore } from 'src/stores/useUserStore'
import { ref } from 'vue'
import { QTableColumn } from 'quasar'
import { HashIds, NotifyError, implementHierarchy } from 'src/utils/utils'
//import { useAuthStore } from 'src/stores/useAuthStore'
import { useRouter } from 'vue-router'
import PrimaryButton from 'src/components/button/PrimaryButton.vue'
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
//const authenticationStore = useAuthStore()
const router = useRouter()
const activationLoading = ref(false)
const inactivationLoading = ref(false)
const refresh = ref(false)

const viewFunction = (id:string, userType: string) => router.push(`${userType}/${HashIds.encryptId(id)}`)
//const showInviteSellerAsStore = () => atob(localStorage.getItem('userType') as string) === 'store'
const showVisualization = (userType:string) => String(userType).toLowerCase() === 'vendedor'
//const inviteAdmin = () => router.push('usuarios/criar/admin/0')
/*const activateUser = async (userId:string) => {
activationLoading.value = true
await authenticationStore.activateUser(userId)
  .then(() => { refresh.value = !refresh.value })
  .catch((error:any) => NotifyError.error(error.message))
  .finally(() => { activationLoading.value = false })
}*/
/*
const inviteSellerAsStore = async () =>
await userStore.fetchUserData()
  .then((response: any) => router.push(`usuarios/criar/seller/${HashIds.encryptId(response.detailId)}`))
  .catch((error:any) => NotifyError.error(error.message))
*/
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
/*
const disableUser = async (userId:string) => {
if (!await ShowDialog.showConfirm('Desativar usuário', 'Deseja realmente DESATIVAR este usuário?', 'negative')) return
inactivationLoading.value = true
await authenticationStore.disableUser(userId)
  .then(() => { refresh.value = !refresh.value })
  .catch((error:any) => NotifyError.error(error.message))
  .finally(() => { inactivationLoading.value = false })
}*/
</script>
