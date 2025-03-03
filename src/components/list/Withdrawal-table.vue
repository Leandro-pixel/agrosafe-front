<template>
  <q-layout>
    <q-page class="column">
      <Div class="row q-gutter-md items-center">
        <Span>Documento</Span>
        <q-input
  v-model="searchValueBy"
  placeholder="Digite CPF, CNPJ ou telefone"
  outlined
  dense
  filled
  @update:model-value="detectSearchType"
  />
  <Span>ID</Span>
  <q-select
  v-model="selectedIdType"
  filled
  dense
  :options ="[
    { label: 'Estabelecimento', value: 'establishmentId' },
    { label: 'Cliente', value: 'userId' },
    { label: 'Cartão', value: 'cardId' }
  ]"
  label="Selecione o tipo de ID"
  outlined
  emit-value
  map-options
/>
        <q-input   v-if="selectedIdType != ''" filled
        v-model="searchValue" dense placeholder="Digite o ID" outlined />

        <q-input
  v-model="selectedDate"
  filled
  dense
  readonly
  placeholder="Selecione uma data"
>
  <template v-slot:append>
    <q-icon name="event" class="cursor-pointer" @click="showDatePicker = true" />
  </template>

  <q-popup-proxy v-model="showDatePicker">
    <q-date
      mask="YYYY-MM-DD"
      v-model="dateRange"
      range
      @update:model-value="updateDateRange"
    />
  </q-popup-proxy>
</q-input>



<PrimaryButton @click="onRequest" label="Pesquisar"/>

      </Div>
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
import { Validator } from 'src/utils/validator';


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
const searchByType = ref('')
const selectedDate = ref('');
const showDatePicker = ref(false);
const dateRange = ref({ from: '', to: '' });
const searchValue = ref();
const selectedIdType = ref('');

const updateDateRange = () => {
  if (dateRange.value.from && dateRange.value.to) {
    selectedDate.value = `${dateRange.value.from} até ${dateRange.value.to}`;
  }
};


const searchValueBy = ref('')

const detectSearchType = () => {
  const value = searchValueBy.value.replace(/\D/g, '') // Remove caracteres não numéricos

  if (Validator.isValidCPF(value)) {
    searchByType.value = 'cpf'
  } else if (Validator.isValidCNPJ(value)) {
    searchByType.value = 'cnpj'
  } else if (Validator.isValidPhoneNumber(value)) {
    searchByType.value = 'phone'
  } else {
    searchByType.value = ''
  }
}

console.log('propriedades:' + props)
// Índice do span ativo
const rows = ref([] as Array<Withdrawal>);


  const columns: QTableColumn[] = [
{ name: 'id', label: 'ID', field: (row:Withdrawal) => row.id, align: 'center' },
{ name: 'createdAt', required: true, label: 'data criação', field: (row:Withdrawal) => row.createdAt, align: 'left' },
{ name: 'anticipationType', required: true, label: 'Tipo de antecipação', field: (row:Withdrawal) => row.anticipationType == 'punctualAdvance'? 'Pontual':'Automática', align: 'left' },
{ name: 'establishmentId', required: true, label: 'ID-EC', field: (row:Withdrawal) => row.establishmentId, align: 'left' },
{ name: 'amountToReceive', required: true, label: 'Valor a receber', field: (row:Withdrawal) => row.getFormattedAmountToReceive(), align: 'left' },
{ name: 'paidStatus', required: true, label: 'Status de pagamento', field: (row:Withdrawal) => row.paidStatus? 'Efetuado': 'Pendente', align: 'left' },
{ name: 'pixKey', required: true, label: 'Chave pix', field: (row:Withdrawal) => row.pixKey, align: 'left' },
{ name: 'actions', label: 'Ações', align: 'center', field: 'actions' }
]

const details = async (id: any, name: any, status: string) => {
  console.log(id, name, status)
}

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
  console.log('veio aquiaqui' + props);
  loading.value = true;

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
