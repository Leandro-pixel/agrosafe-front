<template>
  <q-layout>
    <q-page class="q-pa-md">
      <div class="flex justify-between q-mb-lg">
        <span
          class="q-pt-sm flex items-center text-h6 text-weight-bold text-primary"
          style="border-top: 0.25rem solid #401a58"
        >
          Pagamentos
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
                @click="pay(props.props.row.id, true)"
                label="Efetual agamentoP"
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
import { Withdrawal } from 'src/models/withdrawals';
import { useWithdrawalStore } from 'src/stores/useWithdrawalStore';
import { onMounted } from 'vue';
import { translateStatusToColor } from 'src/models/enums/activeStatusEnum';
import PrimaryButton from 'src/components/button/PrimaryButton.vue';

const columns: QTableColumn[] = [
{ name: 'id', label: 'ID', field: (row:Withdrawal) => row.id, align: 'center' },
{ name: 'createdAt', required: true, label: 'data criação', field: (row:Withdrawal) => Formatter.formatDateToBR(row.createdAt), align: 'left' },
{ name: 'anticipationType', required: true, label: 'Tipo de antecipação', field: (row:Withdrawal) => row.anticipationType, align: 'left' },
{ name: 'establishmentId', required: true, label: 'ID-EC', field: (row:Withdrawal) => row.establishmentId, align: 'left' },
{ name: 'amountToReceive', required: true, label: 'Valor a receber', field: (row:Withdrawal) => row.getFormattedAmountToReceive, align: 'left' },
{ name: 'paidStatus', required: true, label: 'Status de pagamento', field: (row:Withdrawal) => row.paidStatus, align: 'left' },
{ name: 'pixKey', required: true, label: 'Chave pix', field: (row:Withdrawal) => row.pixKey, align: 'left' },

]

onMounted(() => {
  console.log('foi montado');
  loading.value = true;
  onRequest({ pagination: pagination.value });
});

const pagination = ref(new Pagination());
//const filter = ref('');
const rows = ref([] as Array<Withdrawal>);
//const establishmentId = ref(0);
const userId = ref(0);
const withdralStore = useWithdrawalStore();
const loading = ref(false);
const refresh = ref(false);
//const router = useRouter();

const pay = async (props: any, status: boolean) => {
  console.log('veio aquiaqui' + props);

  await withdralStore
    .payWithdrawal(props, status)
    .then(() => {
      console.log('veio aquiaqui2' + withdralStore.getWithdrawals);
    })
    .catch((error: any) => NotifyError.error(error.message))
    .finally(() => {
      loading.value = false;
    });
};

const onRequest = async (props: any) => {
  console.log('veio aquiaqui' + userId.value + props);

  await withdralStore
    .fetchWithdrawal()
    .then(() => {
      console.log('veio aquiaqui2' + withdralStore.getWithdrawals);

      rows.value = withdralStore.getWithdrawals;
      pagination.value.rowsNumber = withdralStore.totalItemsInDB;
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
