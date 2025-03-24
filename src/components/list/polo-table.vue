<template>
  <q-layout>
    <q-page class="column">
      <div class="q-gutter-md items-start">
        <span>Selecione um tipo de busca</span>

        <div class="row q-gutter-md items-center">
          <q-select
            v-model="selectedSearchType"
            filled
            dense
            :options="[
              { label: 'CPF', value: 'cpf' },
              { label: 'CNPJ', value: 'cnpj' },
              { label: 'celular', value: 'phone' },
              { label: 'E-mail', value: 'email' },
              { label: 'Nome', value: 'name' },
              { label: 'RG', value: 'rg' },
            ]"
            label="Buscar por..."
            outlined
            map-options
            emit-value
          />
          <q-input
            v-if="selectedSearchType != ''"
            v-model="searchValueBy"
            placeholder="Digite aqui..."
            outlined
            dense
            filled
          />
          <PrimaryButton @click="onRequest" label="Pesquisar" />
        </div>
      </div>
      <PrimaryTable
    @request="onRequest"
    v-model:pagination="pagination"
    :rows="reps"
    :loading="loading"
    :columns="columns"
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
//import { Formatter } from 'src/utils/formatter';
import { NotifyError} from 'src/utils/utils';
import PrimaryTable from 'src/components/list/PrimaryTable.vue';
import { QTableColumn } from 'quasar';
import { useHubStore } from 'src/stores/useHubStore';
import { Hub, HubBrands } from 'src/models/hub';
import { useRouter } from 'vue-router';
import PrimaryButton from '../button/PrimaryButton.vue';

const hubStore = useHubStore();
const router = useRouter()

// Recebe o ID da rota como propriedade
const props1 = defineProps<{
  searchBy?: Array<{
    cpf?: string;
    status?: boolean;
  }>;
  id1?: number;
}>();

const selectedSearchType = ref('');
const searchValueBy = ref('');
const pagination = ref(new Pagination());
const loading = ref(false);
const refresh = ref(false);

console.log('propriedades:' + props1.id1)
// Índice do span ativo
const reps = ref([] as Array<Hub>)


  const columns: QTableColumn[] = [
	{ name: 'id', label: 'ID', align: 'center', field: (row:HubBrands) => row.id },
	{ name: 'name', label: 'Nome completo', align: 'left', field: (row:HubBrands) => row.name },
	{ name: 'email', label: 'E-mail', align: 'left', field: 'email' },
	{ name: 'telefone', label: 'Telefone', align: 'left', field: (row:HubBrands) => row.phone },
	{ name: 'status', label: 'Status', field: (row:HubBrands) => row.status ? 'Ativo' : 'Inativo', align: 'center' },
]

const onNameClick = (id: any, name: any) => {
  console.log('name:', id + name);
  router.push({ path: `/polos/ativacao/${id}`, query: {name}});
};


const onRequest = async () => {
	loading.value = true


	await hubStore.fetchHubsBrands(null, null,'polo',selectedSearchType.value, searchValueBy.value, props1.id1)
		.then(() => {
			reps.value = hubStore.hubs
			pagination.value.rowsNumber = hubStore.totalItemsInDB

		})
		.catch((error:any) => NotifyError.error(error.message))
		.finally(() => { loading.value = false })
}
</script>
