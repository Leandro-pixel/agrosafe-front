<template>
  <q-layout>
    <q-page class="column">
      <div class="flex justify-center text-primary text-subtitle1 q-mb-lg">
        {{ name }}
      </div>

      <div class="flex">
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
    :columns="columns"
    :refresh="refresh"
    v-if="activeIndex === 1"
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

// Recebe o ID da rota como propriedade
defineProps<{ id: string }>();

const pagination = ref(new Pagination());
const filter = ref('');
const rows = ref([] as Array<Store>);
const storeStore = useStoreStore();
const loading = ref(false);
const refresh = ref(false);
//const router = useRouter();

const infor = InfoList;
// Acessando o nome via query string
const route = useRoute();
//const router = useRouter();

const name = route.query.name || 'Nome não disponível';

// Dados dos spans
const items1 = ['Credenciais', 'Estabelecimentos'];

// Índice do span ativo
const activeIndex = ref<number>(0);

// Função para definir o span ativo
const setActive = (index: number) => {
  activeIndex.value = index;
};

const infoList = [
  { icon: 'home', label: 'Polo', value: 'CEDIBRA PROMOTORA DE CREDITO LTDA' },
  { icon: 'badge', label: 'Nome fantasia', value: 'CEDIBRA PROMOTORA DE CREDITO LTDA' },
  { icon: 'description', label: 'Documento', value: '14.163.708/0001-78' },
  { icon: 'place', label: 'Endereço', value: 'Belo Horizonte, MG, Centro, Rua Rio de Janeiro, 30160-911' },
  { icon: 'check_circle', label: 'Status', value: 'Ativo' },
  { icon: 'schedule', label: 'Criado em', value: '01/10/2024, 16:12:13' },
];

const columns: QTableColumn[] = [ //configura oque cada coluna mostra
  //{ name: 'id', label: 'ID', align: 'center', field: (row: Store) => row.id },
  {name: 'fullName',label: 'Nome completo',align: 'left',field: (row: EC) => row.businessName,},
  //{name: 'fantasyName',label: 'Nome Fantasia',align: 'left',field: 'fantasyName',},
  {name: 'document',label: 'Documento',align: 'left',
  field:
  (row: EC) =>
  (row.cnpj && row.cnpj.length > 0)
    ? Formatter.strToCnpj(row.cnpj)
    : (row.cpf ? Formatter.strToCpf(row.cpf) : ''),},
  //{name: 'address',label: 'Endereço',align: 'left',field: (row: Store) => row.address.toString(),},
  {name: 'status',label: 'Status',field: (row: Store) => (row.active ? 'Ativo' : 'Inativo'),align: 'left',},
  //{ name: 'actions', label: 'Ações', align: 'center', field: 'actions' },
];

/*
const onNameClick = (id: number, name: string) => {
  console.log('name:', id + name);
  router.push({ path: `/lojas/estabelecimentos/${id}`, query: { name } });
};

const onToggleActive = (row: any) => {
  row.active = !row.active;
  console.log(`${row.name} agora está ${row.active ? 'Ativo' : 'Inativo'}`);
}; */

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
}; /*
const activateStore = async (store: Store) => {
  if (
    !(await ShowDialog.showConfirm(
      'Ativar loja',
      `Deseja realmente ATIVAR a loja ${store.fantasyName}?`,
      'warning'
    ))
  )
    return;
  loading.value = true;
  await storeStore
    .activateStore(store.id)
    .then(() => {
      refresh.value = !refresh.value;
    })
    .catch((error: any) => NotifyError.error(error.message))
    .finally(() => {
      loading.value = false;
    });
};
const disableStore = async (store: Store) => {
  if (
    !(await ShowDialog.showConfirm(
      'Desativar loja',
      `Deseja realmente DESATIVAR a loja ${store.fantasyName}?`,
      'negative'
    ))
  )
    return;
  loading.value = true;
  await storeStore
    .disableStore(store.id)
    .then(() => {
      refresh.value = !refresh.value;
    })
    .catch((error: any) => NotifyError.error(error.message))
    .finally(() => {
      loading.value = false;
    });
};
*/
</script>
