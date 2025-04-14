<template>
  <q-layout>
    <q-page class="column">

      <PrimaryTable
        @request="onRequest()"
        v-model:pagination="pagination"
        :rows="rows"
        :loading="loading"
        :columns="columns"
        :refresh="refresh"
      >
      <template #body-cell-status="props">
  <q-td>
    <q-chip
      :class="{
        'non-selectable': true,
        ['bg-' + translateStatusToColor(
          props.props.row.status === 'completed' ? 'completed' : 'pending'
        )]: true
      }"
      size="md"
      flat
    >
      {{
        props.props.row.status === 'completed'
          ? 'Pago'
          : 'Pendente'
      }}
    </q-chip>
  </q-td>
</template>

        <template v-slot:body-cell-userName="props">
          <q-td>
            <span
              class="text-primary hoverable"
              @click="onCashClick(props.props.row.id, props.props.row.userName)"
            >
              {{ props.props.row.userName }}
            </span>
          </q-td>
        </template>
        <template #body-cell-actions="props">
          <q-btn-dropdown flat color="primary" dropdown-icon="settings">
            <q-list>
              <q-td class="flex flex-row justify-center items-center gap-2">
                <PrimaryButton
                  icon="add_business"
                  flat
                  @click="
                    details(props.props.row.id, props.props.row.userName, 'true')
                  "
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
import { NotifyError } from 'src/utils/utils';
import PrimaryTable from 'src/components/list/PrimaryTable.vue';
import { QTableColumn } from 'quasar';
import { translateStatusToColor } from 'src/models/enums/activeStatusEnum';
//import { useRouter } from 'vue-router';
import PrimaryButton from 'src/components/button/PrimaryButton.vue';
import { Transaction } from 'src/models/cashFlow_Transactions';
import { useTransactionStore } from 'src/stores/useTransactionStore';
import { Formatter } from 'src/utils/formatter';
const rows = ref([] as Array<Transaction>);
const transactionStore = useTransactionStore();
const props = defineProps<{
  hash?: string
}>();
const pagination = ref(new Pagination());
const loading = ref(false);
const refresh = ref(false);
const searchByType = ref('');
//const ECId = ref<number | null>(null);


console.log('propriedades:' + props);
// Índice do span ativo


const columns: QTableColumn[] = [
  {
    name: 'EC',
    label: 'EC',
    field: (row: Transaction) => row.businessName,
    align: 'center',
  },
  {
    name: 'user',
    label: 'cliente',
    field: (row: Transaction) => row.userName,
    align: 'center',
  },
  {
    name: 'criado',
    required: true,
    label: 'data criação',
    field: (row: Transaction) => row.createdAt,
    align: 'left',
  },
  {
    name: 'originalAmount',
    required: true,
    label: 'Valor',
    field: (row: Transaction) => Formatter.formatDoubleToCurrency(row.billingFeeAmountToPay),
    align: 'left',
  },
  {
    name: 'status',
    required: true,
    label: 'Status',
    field: (row: Transaction) => row.status === 'completed' ? 'completed' : 'pending',
    align: 'left',
  },
  {
    name: 'transactionType',
    required: true,
    label: 'Parcelas',
    field: (row: Transaction) => row.installmentCount,
    align: 'left',
  },
];

const onCashClick = (id: any, name: any) => {
  console.log('name:', id + name);
  //router.push({ path: `/representantes/ativacao/${id}`, query: {name}});
};


const details = async (id: any, name: any, status: string) => {
  console.log(id, name, status);
};

const onRequest = async () => {

  console.log('veio aquiaqui' + searchByType.value);
  loading.value = true;
  await transactionStore
    .fetchTransaction(
      props.hash
    )
    .then(() => {

      rows.value = transactionStore.getTransactions;
      pagination.value.rowsNumber = transactionStore.totalItemsInDB;
      console.log('veio aquiaqui2' + rows.value);
    })
    .catch((error: any) => NotifyError.error(error.message))
    .finally(() => {
      loading.value = false;
    });
};

</script>
