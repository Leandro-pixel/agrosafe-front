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
              { label: 'Nome', value: 'tradeName' },
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
          <PrimaryButton @click="searchEC" label="Pesquisar" />
        </div>
      </div>
      <PrimaryTable
  @request="onRequest"
  v-model:pagination="pagination"
  :rows="rows"
  :loading="loading"
  :columns="columns"
  :refresh="refresh"
  >
  <template #body-cell-status="props">
      <q-td >
        <q-chip
          :class="
            'non-selectable bg-' +
            translateStatusToColor(props.props.row.CCBStatus? 'Ativo' : 'Inativo')
          "
          size="md"
          flat
        >
          {{ props.props.row.CCBStatus ? 'Ativo' : 'Inativo' }}
        </q-chip>
      </q-td>
    </template>
    <template #body-cell-actions="props"  v-if="implementHierarchy('sysAdmin')" >
      <q-btn-dropdown flat color="primary" dropdown-icon="settings">
        <q-list>
      <q-td class=" flex flex-row justify-center items-center gap-2">
        <PrimaryButton
                icon="payment"
                flat
                @click="pay(props.props.row.id, true)"
                label="Efetuar Pagamento"
            />
            <PrimaryButton
                icon="details"
                flat
                @click="details"
                label="Detalhes"
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
import { implementHierarchy, NotifyError} from 'src/utils/utils';
import PrimaryTable from 'src/components/list/PrimaryTable.vue';
import { QTableColumn } from 'quasar';
import { translateStatusToColor } from 'src/models/enums/activeStatusEnum';
import PrimaryButton from 'src/components/button/PrimaryButton.vue';
import { Withdrawal } from 'src/models/withdrawals';
import { useWithdrawalStore } from 'src/stores/useWithdrawalStore';
//import { Validator } from 'src/utils/validator';
import { Store } from 'src/models/store';
import { useStoreStore } from 'src/stores/useStoreStore';


const withdralStore = useWithdrawalStore();

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

const selectedSearchType = ref('');
const searchValueBy = ref('');

const ecs = ref([] as Array<Store>);
const storeStore = useStoreStore();
const ecId = ref(null)





console.log('propriedades:' + props)
// Índice do span ativo
const rows = ref([] as Array<Withdrawal>);


  const columns: QTableColumn[] = [
{ name: 'id', label: 'ID', field: (row:Withdrawal) => row.id, align: 'center' },
{ name: 'createdAt', required: true, label: 'data criação', field: (row:Withdrawal) => row.createdAt, align: 'left' },
{ name: 'anticipationType', required: true, label: 'Tipo', field: (row:Withdrawal) => row.anticipationType == 'punctualAdvance'? 'Pontual':row.anticipationType == 'split'? 'Split': 'Automática', align: 'left' },
{ name: 'establishmentId', required: true, label: 'ID-EC', field: (row:Withdrawal) => row.establishmentId, align: 'left' },
{ name: 'amountToReceive', required: true, label: 'Valor a receber', field: (row:Withdrawal) => row.getFormattedAmountToReceiveWithFee(), align: 'left' },
{ name: 'paidStatus', required: true, label: 'Status de pagamento', field: (row:Withdrawal) => row.paidStatus? 'Efetuado': 'Pendente', align: 'left' },
{ name: 'pixKey', required: true, label: 'Chave pix', field: (row:Withdrawal) => row.pixKey, align: 'left' },
{ name: 'actions', label: 'Ações', align: 'center', field: 'actions' }
]

const details = async (id: any, name: any, status: string) => {
  console.log(id, name, status)
}

const pay = async (props: any, status: boolean) => {
      loading.value = true;

  await withdralStore
    .payWithdrawal(props, status)
    .then(() => {
      refresh.value = !refresh.value;
    })
    .catch((error: any) => NotifyError.error(error.message))
    .finally(() => {
      loading.value = false;
    });
};

const onRequest = async (props: any) => {
  loading.value = true;
  if (!props.pagination) {
    await withdralStore
    .fetchWithdrawal(null,null,ecId.value)
    .then(() => {
      console.log('veio aquiaqui2' + withdralStore.getWithdrawals);

      rows.value = withdralStore.getWithdrawals;
      pagination.value.rowsNumber = withdralStore.totalItemsInDB;
    })
    .catch((error: any) => NotifyError.error(error.message))
    .finally(() => {
      loading.value = false;
    });
  } else{
    const { page, rowsPerPage } = props.pagination;
  console.log('Página atual:', page);
  console.log('Linhas por página:', rowsPerPage);
  const offset = page - 1;
  const limit = rowsPerPage;
  console.log('offset e limit', offset, limit);
  await withdralStore
    .fetchWithdrawal(limit, offset, ecId.value)
    .then(() => {
      console.log('veio aquiaqui2' + withdralStore.getWithdrawals);

      rows.value = withdralStore.getWithdrawals;
      pagination.value.rowsNumber = withdralStore.totalItemsInDB;
      pagination.value.page = page;
      pagination.value.rowsPerPage = rowsPerPage;
    })
    .catch((error: any) => NotifyError.error(error.message))
    .finally(() => {
      loading.value = false;
    });
  }
};

const searchEC = async () => {
  loading.value = true;

  await storeStore
    .fetchStores(null, null, selectedSearchType.value, searchValueBy.value)
    .then(() => {
      ecs.value = storeStore.getStores;
      pagination.value.rowsNumber = storeStore.totalItemsInDB;
      if(storeStore.totalItemsInDB > 0){
        ecId.value = ecs.value[0].id;
        onRequest(pagination)
      } else {
        () => NotifyError.error('Estabelecimento não encontrado')
        onRequest(pagination)
      }

    })
    .catch((error: any) => NotifyError.error(error.message))
    .finally(() => {
      loading.value = false;
    });
};

</script>
