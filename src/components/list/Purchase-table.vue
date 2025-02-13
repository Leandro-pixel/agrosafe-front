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
    <template v-slot:body-cell-userName="props">
            <q-td >
              <span
                class="text-primary hoverable"
                @click="onCashClick( props.props.row.id, props.props.row.name)"
              >
                {{ props.props.row.name }}
              </span>
            </q-td>
          </template>
    <template #body-cell-actions="props" >
      <q-btn-dropdown flat color="primary" dropdown-icon="settings">
        <q-list>
      <q-td class=" flex flex-row justify-center items-center gap-2">
        <PrimaryButton
                icon="add_business"
                flat
                @click="details(props.props.row.id, props.props.row.name, 'true')"
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
import { Formatter } from 'src/utils/formatter';
import { NotifyError} from 'src/utils/utils';
import PrimaryTable from 'src/components/list/PrimaryTable.vue';
import { QTableColumn } from 'quasar';
import { translateStatusToColor } from 'src/models/enums/activeStatusEnum';
//import { useRouter } from 'vue-router';
import PrimaryButton from 'src/components/button/PrimaryButton.vue';
import { useCachSflowStore } from 'src/stores/useCashFlowStore';
import { CashFlow } from 'src/models/cashFlow';


//const router = useRouter()
const rows = ref([] as Array<CashFlow>);
const cashFlowStore = useCachSflowStore();
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


  const columns: QTableColumn[] = [
{ name: 'hash', label: 'hash', field: (row:CashFlow) => row.hash, align: 'center' },
{ name: 'criado', required: true, label: 'data criação', field: (row:CashFlow) => Formatter.formatDateToBR(row.createdAt), align: 'left' },
{ name: 'originalAmount', required: true, label: 'Valor', field: (row:CashFlow) => row.getFormattedOriginalAmount, align: 'left' },
{ name: 'status', required: true, label: 'Status', field: (row:CashFlow) => row.statuses[0], align: 'left' },
{ name: 'transactionType', required: true, label: 'Forma de pagamento', field: (row:CashFlow) => row.transactionType, align: 'left' },
]


const onCashClick = (id: any, name: any) => {
  console.log('name:', id + name);
  //router.push({ path: `/representantes/ativacao/${id}`, query: {name}});
};


const details = async (id: any, name: any, status: string) => {
  console.log(id, name, status)
}

const onRequest = async (props: any) => {
  console.log('veio aquiaqui' + props);

  await cashFlowStore
    .fetchCashFlow(
      props.id,
      props.status
    )
    .then(() => {
      console.log('veio aquiaqui2' + cashFlowStore.getTransactions);

      rows.value = cashFlowStore.getTransactions;
      pagination.value.rowsNumber = cashFlowStore.totalItemsInDB;
    })
    .catch((error: any) => NotifyError.error(error.message))
    .finally(() => {
      loading.value = false;
    });
};

</script>
