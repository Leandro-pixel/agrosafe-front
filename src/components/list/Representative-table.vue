<template>
  <q-layout>
    <q-page class="column">
      <PrimaryTable
    @request="onRequestRep"
    v-model:pagination="pagination"
    :rows="reps"
    :loading="loading"
    :columns="columnsRep"
    :refresh="refresh"
  >
    <template #top-left> </template>
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
  </PrimaryTable>
    </q-page>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Pagination } from 'src/models/pagination';
import { Formatter } from 'src/utils/formatter';
import { NotifyError} from 'src/utils/utils';
import PrimaryTable from 'src/components/list/PrimaryTable.vue';
import { QTableColumn } from 'quasar';
import { useHubStore } from 'src/stores/useHubStore';
import { Hub, HubBrands } from 'src/models/hub';
import { useRouter } from 'vue-router';


const hubStore = useHubStore();
const router = useRouter()

// Recebe o ID da rota como propriedade
const props = defineProps<{
  searchBy?: Array<{
    id?: number;
    cpf?: string;
    status?: boolean;
  }>;
}>();


const pagination = ref(new Pagination());
const loading = ref(false);
const refresh = ref(false);

console.log('propriedades:' + props)
// Índice do span ativo
const reps = ref([] as Array<Hub>)


const columnsRep: QTableColumn[] = [
	{ name: 'id', label: 'ID', align: 'center', field: (row:HubBrands) => row.id },
	{ name: 'name', label: 'Nome completo', align: 'left', field: (rep:HubBrands) => rep.name },
	{ name: 'email', label: 'E-mail', align: 'left', field: (rep:HubBrands) => rep.email },
	{ name: 'telefone', label: 'Telefone', align: 'left', field: (rep:HubBrands) => rep.phone },
]

const onNameClick = (id: any, name: any) => {
  console.log('name:', id + name);
  router.push({ path: `/representantes/ativacao/${id}`, query: {name}});
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
/*
const activateHub = async (hub:Hub) => {
	if (!await ShowDialog.showConfirm('Ativar representante', `Deseja realmente ATIVAR o representante "${hub.fantasyName}"?`, 'warning')) return
	loading.value = true
	await hubStore.activateHub(hub.id)
		.then(() => { refresh.value = !refresh.value })
		.catch((error:any) => NotifyError.error(error.message))
		.finally(() => { loading.value = false })
}

const disableHub = async (hub:Hub) => {
	if (!await ShowDialog.showConfirm('Desativar representante', `Deseja realmente DESATIVAR o representante "${hub.fantasyName}"?`, 'negative')) return
	loading.value = true
	await hubStore.disableHub(hub.id)
		.then(() => { refresh.value = !refresh.value })
		.catch((error:any) => NotifyError.error(error.message))
		.finally(() => { loading.value = false })
}
*/
</script>
