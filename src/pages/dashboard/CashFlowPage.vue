<template>
  <q-layout>
    <q-page class="q-pa-md">
      <div class="flex justify-between q-mb-lg">
        <span
          class="q-pt-sm flex items-center text-h6 text-weight-bold text-primary"
          style="border-top: 0.25rem solid #401a58"
        >
          Movimentações
        </span>
      </div>
      <div>
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
    <template #body-cell-actions="props"  v-if="implementHierarchy('sysAdmin')" >
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
      </div>
    </q-page>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { implementHierarchy, NotifyError } from 'src/utils/utils';
import { Formatter } from 'src/utils/formatter';
import { QTableColumn } from 'quasar'
import PrimaryTable from 'src/components/list/PrimaryTable.vue'
import { Pagination } from 'src/models/pagination';
import { CashFlow } from 'src/models/cashFlow';
import { useCachSflowStore } from 'src/stores/useCashFlowStore';
import { onMounted } from 'vue';
import { translateStatusToColor } from 'src/models/enums/activeStatusEnum';
import PrimaryButton from 'src/components/button/PrimaryButton.vue';

const columns: QTableColumn[] = [
{ name: 'hash', label: 'hash', field: (row:CashFlow) => row.hash, align: 'center' },
{ name: 'criado', required: true, label: 'data criação', field: (row:CashFlow) => Formatter.formatDateToBR(row.createdAt), align: 'left' },
{ name: 'originalAmount', required: true, label: 'Valor', field: (row:CashFlow) => row.getFormattedOriginalAmount, align: 'left' },
{ name: 'status', required: true, label: 'Status', field: (row:CashFlow) => row.statuses[0], align: 'left' },
{ name: 'transactionType', required: true, label: 'Forma de pagamento', field: (row:CashFlow) => row.transactionType, align: 'left' },
]

const onCashClick = (id: any, name: any) => {
  console.log(id,name)
};

const details = async (id: any, name: any, status: string) => {
  console.log(id, name, status)
}

onMounted(() => {
  console.log('foi montado');
  loading.value = true;
  onRequest({ pagination: pagination.value });
});


const pagination = ref(new Pagination());
//const filter = ref('');
const rows = ref([] as Array<CashFlow>);
const establishmentId = ref(0);
const cardId = ref(0);
const userId = ref(0);
const statuses = ref([]);
const cashFlowStore = useCachSflowStore();
const loading = ref(false);
const refresh = ref(false);
//const router = useRouter();

const onRequest = async (props: any) => {
  console.log('veio aquiaqui' + userId.value + props);

  await cashFlowStore
    .fetchCashFlow(
      establishmentId.value,
      cardId.value,
      userId.value,
      statuses.value
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

<style scoped>
.q-btn {
  min-width: 150px;
}
.transaction-item {
  border-bottom: 4px solid #ccc; /* Cor e espessura da linha de separação */
  padding-bottom: 10px; /* Espaço entre a transação e a linha de separação */
}

.transaction-item:last-child {
  border-bottom: none; /* Remove a linha de separação do último item */
}
.row {
  align-items: flex-start; /* Alinha os itens no topo */
}
</style>
