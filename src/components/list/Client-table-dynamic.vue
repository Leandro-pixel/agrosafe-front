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
    <template #body-cell-status="props">
      <q-td >
        <q-chip
          :class="
            'non-selectable bg-' +
            translateStatusToColor(props.props.row.CCBStatus ? 'Ativo' : 'Inativo')
          "
          size="md"
          flat
        >
          {{ props.props.row.CCBStatus ? 'Ativo' : 'Inativo' }}
        </q-chip>
      </q-td>
    </template>
    <template v-slot:body-cell-userName="props">
            <q-td >
              <span
                class="text-primary hoverable"
                @click="implementHierarchy('sysAdmin')? onNameClick( props.props.row.id, props.props.row.name): {}"
              >
                {{ props.props.row.name }}
              </span>
            </q-td>
          </template>
          <template #body-cell-actions="props"  v-if="implementHierarchy('sysAdmin')" >
      <q-btn-dropdown flat color="primary" dropdown-icon="settings">
        <q-list>
      <q-td class=" flex flex-row justify-center items-center gap-2">
        <PrimaryButton
                icon="add_business"
                flat
                @click="activateUser(props.props.row.id, props.props.row.name, 'true')"
                label="Ativar"
            />
            <PrimaryButton
                icon="key_off"
                flat
                @click="disableUser(props.props.row.id, props.props.row.name, 'false')"
                label="Desativar"
            />
            <PrimaryButton
                icon="notifications"
                flat
                @click="openMessageSender(props.props.row.phone)"
                label="Bureau"
            />
      </q-td>
        </q-list>
      </q-btn-dropdown>
    </template>

  </PrimaryTable>
    </q-page>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Pagination } from 'src/models/pagination';
import { implementHierarchy, NotifyError, ShowDialog} from 'src/utils/utils';
import PrimaryTable from 'src/components/list/PrimaryTable.vue';
import { QTableColumn } from 'quasar';
import { translateStatusToColor } from 'src/models/enums/activeStatusEnum';
import { useRouter } from 'vue-router';
import PrimaryButton from 'src/components/button/PrimaryButton.vue';
import { useCustomerStore } from 'src/stores/useCustomerStore';


const router = useRouter()

// Recebe o ID da rota como propriedade
const props = defineProps<{
  searchBy?: Array<{
    id?: number;
    cpf?: string;
    status?: boolean;
  }>;
}>();


const pagination = ref(new Pagination())
  const rows = ref([] as Array<any>) // Agora `rows` aceita qualquer objeto dinâmico
const loading = ref(false)
const userStore = useCustomerStore()
const refresh = ref(false)
console.log('propriedades:' + props)
// Índice do span ativo


  const columns: QTableColumn[] = [
{ name: 'id', label: 'ID', field: (row:any) => row.id, align: 'center' },
{ name: 'userName', required: true, label: 'Name', field: (row:any) => row.name, align: 'left' },

]

const onNameClick = (id: any, name: any) => {
  console.log('name:', id + name);
  router.push({ path: `/clientes/${id}`, query: {name}});

};

const onRequest = async (props:any) => {
loading.value = true
const { page, rowsPerPage } = props.pagination

const offset = page - 1
const limit = rowsPerPage

await userStore.fetchBrandsUsers(limit, offset, props.filter)
  .then(() => {
    console.log('Dados recebidos:', userStore.getUsers) // Verifica os objetos recebidos

    rows.value = [...userStore.getUsers]
    pagination.value.rowsNumber = userStore.totalItemsInDB

    pagination.value.page = page
    pagination.value.rowsPerPage = rowsPerPage
  })
  .catch((error:any) => NotifyError.error(error.message))
  .finally(() => { loading.value = false })
}

const openMessageSender = async (phone : string) => {
  loading.value = true
  await userStore.sendBureauMessage(phone)
  .then(() => {
    console.log('chegou aqui1')

  })
  .catch((error:any) => NotifyError.error(error.message))
  .finally(() => { loading.value = false })}

const activateUser = async (id: any, name: any, status: string) => {
  if (!await ShowDialog.showConfirm('Ativar usuário', `Deseja realmente ATIVAR o usuário "${name}"?`, 'primary')) return
  loading.value = true
  console.log(id)
  await userStore.activateCustomer(id, status)
  .then(() => {
      refresh.value = !refresh.value;
    })
  .catch((error:any) => NotifyError.error(error.message))
  .finally(() => { loading.value = false })
}

const disableUser = async (id: any, name: any, status: string) => {
  if (!await ShowDialog.showConfirm('Desativar usuário', `Deseja realmente DESATIVAR o usuário "${name}"?`, 'negative')) return
  loading.value = true
    await userStore.activateCustomer(id, status)
    .then(() => {
      refresh.value = !refresh.value;
    })
  .catch((error:any) => NotifyError.error(error.message))
  .finally(() => { loading.value = false })
}

</script>
