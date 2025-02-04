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
            translateStatusToColor(props.props.row.active ? 'Ativo' : 'Inativo')
          "
          size="md"
          flat
        >
          {{ props.props.row.active ? 'Ativo' : 'Inativo' }}
        </q-chip>
      </q-td>
    </template>
    <template v-slot:body-cell-name="props">
            <q-td >
              <span
                class="text-primary hoverable"
                @click="onNameClick( props.props.row.id, props.props.row.name)"
              >
                {{ props.props.row.name }}
              </span>
            </q-td>
          </template>
          <!--aqui são as ações-->
    <template v-slot:body-cell-actions="props">
      <q-td class=" flex justify-center items-center">
        <PrimaryButton
                icon="add_business"
                flat
                @click="activateHub(props.props.row)"
                label="Ativar Polo"
            />
            <PrimaryButton
                icon="key_off"
                flat
                @click="disableHub(props.props.row)"
                label="Desativar Polo"
            />
      </q-td>
    </template>
  </PrimaryTable>
    </q-page>
  </q-layout>
</template>

<script setup lang="ts">
import { Hub, HubBrands } from 'src/models/hub';
import { Pagination } from 'src/models/pagination';
import { useHubStore } from 'src/stores/useHubStore';
import { Formatter } from 'src/utils/formatter';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { QTableColumn } from 'quasar';
import PrimaryButton from 'src/components/button/PrimaryButton.vue';
import { translateStatusToColor } from 'src/models/enums/activeStatusEnum';
import PrimaryTable from 'src/components/list/PrimaryTable.vue';
import { NotifyError, ShowDialog } from 'src/utils/utils';

const pagination = ref(new Pagination())
const rows = ref([] as Array<Hub>)
const loading = ref(false)
const refresh = ref(false)
const router = useRouter()
//const route = useRoute()
const hubStore = useHubStore()

const onNameClick = (id: any, name: any) => {
  console.log('name:', id + name);
  router.push({ path: `/polos/ativacao/${id}`, query: {name}});
};

const columns: QTableColumn[] = [
	{ name: 'id', label: 'ID', align: 'center', field: (row:HubBrands) => row.id },
	{ name: 'name', label: 'Nome completo', align: 'left', field: (row:HubBrands) => row.name },
	{ name: 'email', label: 'E-mail', align: 'left', field: 'email' },
	{ name: 'telefone', label: 'Telefone', align: 'left', field: (row:HubBrands) => row.phone },
	//{ name: 'address', label: 'Endereço', align: 'left', field: (row:HubBrands) => row.address.toString() },
	{ name: 'status', label: 'Status', field: (row:HubBrands) => row.status ? 'Ativo' : 'Inativo', align: 'center' },
	{ name: 'actions', label: 'Ações', align: 'center', field: 'actions' }

]
/*
const addFunction = (id:string) => router.push(`usuarios/criar/hub/${HashIds.encryptId(id)}`)
const createStore = (id:string) => router.push(`lojas/criar/${HashIds.encryptId(id)}`)
const view = (id:string) => router.push(`${route.path}/${HashIds.encryptId(id)}`)
const viewUsers = (id:string) => router.push(`usuarios/hub/${HashIds.encryptId(id)}`)
*/
const onRequest = async (props:any) => {
	loading.value = true

	const { page, rowsPerPage } = props.pagination
	const offset = page - 1
	const limit = rowsPerPage
	const filterWithoutSymbols = Formatter.clearSymbols(props.filter)

	await hubStore.fetchHubsBrands(limit, offset,'polo', filterWithoutSymbols)
		.then(() => {
			rows.value = hubStore.hubs
			pagination.value.rowsNumber = hubStore.totalItemsInDB

			pagination.value.page = page
			pagination.value.rowsPerPage = rowsPerPage
		})
		.catch((error:any) => NotifyError.error(error.message))
		.finally(() => { loading.value = false })
}

const activateHub = async (hub:Hub) => {
	if (!await ShowDialog.showConfirm('Ativar polo', `Deseja realmente ATIVAR o polo "${hub.fantasyName}"?`, 'warning')) return
	loading.value = true
	await hubStore.activateHub(hub.id)
		.then(() => { refresh.value = !refresh.value })
		.catch((error:any) => NotifyError.error(error.message))
		.finally(() => { loading.value = false })
}

const disableHub = async (hub:Hub) => {
	if (!await ShowDialog.showConfirm('Desativar polo', `Deseja realmente DESATIVAR o polo "${hub.fantasyName}"?`, 'negative')) return
	loading.value = true
	await hubStore.disableHub(hub.id)
		.then(() => { refresh.value = !refresh.value })
		.catch((error:any) => NotifyError.error(error.message))
		.finally(() => { loading.value = false })
}
</script>
