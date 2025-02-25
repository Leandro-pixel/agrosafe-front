<template>
  <q-layout>
    <q-page class="column">
      <div class="flex justify-center text-primary text-subtitle1 q-mb-lg">
        {{ name }}
      </div>

      <div class="flex q-mb-md">
        <span
          v-for="(item, index) in items1"
          :key="index"
          class="flex items-center text-h6 q-mr-md"
          :class="{
            isActive: activeIndex === index,
            isNotActive: activeIndex !== index,
          }"
          @click="setActive(index)"
        >
          {{ item }}
        </span>
      </div>
      <infor v-if="activeIndex === 0" :info-array="infoList"></infor>
      <PrimaryTable
    @request="onRequest"
    v-model:pagination="pagination"
    :rows="rows"
    :loading="loading"
    :columns="columnsEC"
    :refresh="refresh"
    v-if="activeIndex === 2"
  >
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
</PrimaryTable>

<PrimaryTable
    @request="onRequestRep"
    v-model:pagination="pagination"
    :rows="reps"
    :loading="loading"
    :columns="columnsRep"
    :refresh="refresh"
    v-if="activeIndex === 1"
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


  </PrimaryTable>

<PurchaseTable v-if="activeIndex === 3" class="q-mt-md"/>


    </q-page>
  </q-layout>
</template>

<script setup lang="ts">
import InfoList from 'src/components/list/InfoList.vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { Pagination } from 'src/models/pagination';
import { EC, Store } from 'src/models/store';
import { useStoreStore } from 'src/stores/useStoreStore';
import { Formatter } from 'src/utils/formatter';
import { NotifyError} from 'src/utils/utils';
import PrimaryTable from 'src/components/list/PrimaryTable.vue';
import { QTableColumn } from 'quasar';
import { translateStatusToColor } from 'src/models/enums/activeStatusEnum';
import { useHubStore } from 'src/stores/useHubStore';
import { onMounted } from 'vue';
import { Hub, HubBrands } from 'src/models/hub';
import PurchaseTable from 'src/components/list/Purchase-table.vue';

onMounted(() => {
  datas();
});

const hubStore = useHubStore();

// Recebe o ID da rota como propriedade
defineProps<{ id: string }>();

const pagination = ref(new Pagination());
const filter = ref('');
const rows = ref([] as Array<Store>);
const storeStore = useStoreStore();
const loading = ref(false);
const refresh = ref(false);
const infoList = ref<Array<{ icon: string; label: string; value: any }>>([]);
//const router = useRouter();

const infor = InfoList;
// Acessando o nome via query string
const route = useRoute();
//const router = useRouter();

const name = route.query.name || 'Nome não disponível';
const id1 = route.params.id || 'Nome não disponível';

// Dados dos spans
const items1 = ['Credenciais', 'Representantes','Estabelecimentos', 'Movimentações'];

// Índice do span ativo
const activeIndex = ref<number>(0);
  const reps = ref([] as Array<Hub>)

// Função para definir o span ativo
const setActive = (index: number) => {
  activeIndex.value = index;
};


const columnsRep: QTableColumn[] = [
	//{ name: 'id', label: 'ID', align: 'center', field: (row:HubBrands) => row.id },
	{ name: 'name', label: 'Nome completo', align: 'left', field: (rep:HubBrands) => rep.name },
	{ name: 'email', label: 'E-mail', align: 'left', field: (rep:HubBrands) => rep.email },
	{ name: 'telefone', label: 'Telefone', align: 'left', field: (rep:HubBrands) => rep.phone },
	//{ name: 'address', label: 'Endereço', align: 'left', field: (row:HubBrands) => row.address.toString() },
	{ name: 'status', label: 'Status', field: (rep:HubBrands) => rep.status ? 'Ativo' : 'Inativo', align: 'center' },


]

const columnsEC: QTableColumn[] = [ //configura oque cada coluna mostra
  { name: 'id', label: 'ID', align: 'center', field: (row: Store) => row.id },
  {name: 'fullName',label: 'Nome da empresa',align: 'left',field: (row: EC) => row.businessName,},
  {name: 'document',label: 'Documento',align: 'left',
  field:
  (row: EC) =>
  (row.cnpj && row.cnpj.length > 0)
    ? Formatter.strToCnpj(row.cnpj)
    : (row.cpf ? Formatter.strToCpf(row.cpf) : ''),},
  //{name: 'address',label: 'Endereço',align: 'left',field: (row: Store) => row.address.toString(),},
  //{name: 'status',label: 'Status',field: (row: Store) => (row.active ? 'Ativo' : 'Inativo'),align: 'left',},
];

const datas = async () => {
  const hubId = Array.isArray(route.params.id) ? parseInt(route.params.id[0]) : parseInt(route.params.id as string);
  console.log('route.query.id:', id1);

    if (isNaN(hubId)) {
      throw new Error('ID inválido');
    }
  try {
    loading.value = true;
    const response = await hubStore.fetchOnePolo(hubId);
    console.log('Dados retornados:', response); // Debugging

    infoList.value = [
    { icon: 'badge', label: 'ID', value: response.id },
    { icon: 'person', label: 'Nome fantasia', value: response.name },
      { icon: 'description', label: 'Documento', value: Formatter.strToCpf(response.cpf) },
      { icon: 'phone', label: 'Celular', value: response.phone },
      { icon: 'check_circle', label: 'Status', value: response.status ? 'Ativo' : 'Inativo' },
      { icon: 'schedule', label: 'Criado em', value: Formatter.formatDateToBR(response.createdAt) },
    ];
  } catch (error: any) {
    NotifyError.error(error.message);
  } finally {
    loading.value = false;
  }
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

const onRequest = async (props: any) => {
  loading.value = true;
  const { page, rowsPerPage } = props.pagination;

  const offset = page - 1;
  const limit = rowsPerPage;
  const filterWithoutSymbols = Formatter.clearSymbols(filter.value);

  await storeStore
    .fetchStores(limit, offset, filterWithoutSymbols)
    .then(() => {
      rows.value = storeStore.getStores;
      pagination.value.rowsNumber = storeStore.totalItemsInDB;

      pagination.value.page = page;
      pagination.value.rowsPerPage = rowsPerPage;
    })
    .catch((error: any) => NotifyError.error(error.message))
    .finally(() => {
      loading.value = false;
    });
};
</script>
