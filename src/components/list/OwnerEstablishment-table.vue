<template>
  <q-layout>
    <q-page class="column q-gutter-md">
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
    :columns="columnsRep"
    :refresh="refresh"
  >
<!--
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
-->
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
import PrimaryButton from '../button/PrimaryButton.vue';
import { useEstablishmentOwnerStore } from 'src/stores/useEstablishmentOwnerStore';
import { EstablishmentOwner } from 'src/models/establishmentOwner';

const ECOwnerStore = useEstablishmentOwnerStore();
//const router = useRouter()

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
const reps = ref([] as Array<EstablishmentOwner>)


const columnsRep: QTableColumn[] = [
	{ name: 'id', label: 'ID', align: 'center', field: (row:EstablishmentOwner) => row.id },
	{ name: 'name', label: 'Nome completo', align: 'left', field: (row:EstablishmentOwner) => row.name },
  { name: 'EC', label: 'proprietário do EC', align: 'center', field: (row:EstablishmentOwner) => row.establishmentId },
	{ name: 'email', label: 'E-mail', align: 'left', field: (row:EstablishmentOwner) => row.email },
	{ name: 'telefone', label: 'Telefone', align: 'left', field: (rep:EstablishmentOwner) => rep.phone },
  { name: 'status', required: true, label: 'Status', field: (row:EstablishmentOwner) => row.status? 'Ativo':'Inativo', align: 'left' },
]
/*
const onNameClick = (id: any, name: any) => {
  console.log('name:', id + name);
  router.push({ path: `/lojas/proprietarios/${id}`, query: {name}});
};
*/

const onRequest = async () => {
	loading.value = true


	await ECOwnerStore.fetchECOwner(null, null,selectedSearchType.value, searchValueBy.value, props1.id1)
		.then(() => {
			reps.value = ECOwnerStore.ECOwner
			pagination.value.rowsNumber = ECOwnerStore.totalItemsInDB

		})
		.catch((error:any) => NotifyError.error(error.message))
		.finally(() => { loading.value = false })
}
</script>
