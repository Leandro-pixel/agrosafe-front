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



<PrimaryButton @click="onRequest" label="Pesquisar" :loading="loading"/>

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
            translateStatusToColor(props.props.row.statuses[0])
          "
          size="md"
          flat
        >
          {{ props.props.row.statuses[0]== 'pending'?  'Pendente' : 'Pago'}}
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
import { NotifyError} from 'src/utils/utils';
import PrimaryTable from 'src/components/list/PrimaryTable.vue';
import { QTableColumn } from 'quasar';
import { translateStatusToColor } from 'src/models/enums/activeStatusEnum';
//import { useRouter } from 'vue-router';
import PrimaryButton from 'src/components/button/PrimaryButton.vue';
import { useCachSflowStore } from 'src/stores/useCashFlowStore';
import { CashFlow } from 'src/models/cashFlow';
import { Validator } from 'src/utils/validator';

const selectedDate = ref('');
const showDatePicker = ref(false);
const dateRange = ref({ from: '', to: '' });

//const router = useRouter()
const searchValue = ref();
const selectedIdType = ref('');
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

const updateDateRange = () => {
  if (dateRange.value.from && dateRange.value.to) {
    selectedDate.value = `${dateRange.value.from} até ${dateRange.value.to}`;
  }
};

const pagination = ref(new Pagination());
const loading = ref(false);
const refresh = ref(false);
const searchByType = ref('')

console.log('propriedades:' + props)
// Índice do span ativo

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

  const columns: QTableColumn[] = [
{ name: 'hash', label: 'ID', field: (row:CashFlow) => row.hash, align: 'center' },
{ name: 'criado', required: true, label: 'data criação', field: (row:CashFlow) => row.createdAt, align: 'left' },
{ name: 'originalAmount', required: true, label: 'Valor', field: (row:CashFlow) => row.getFormattedOriginalAmount(), align: 'left' },
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

const onRequest = async () => {
  console.log('veio aquiaqui' + searchByType.value);

  await cashFlowStore
    .fetchCashFlow(
      searchByType.value,
      searchValueBy.value,
      selectedIdType.value,
      searchValue.value,
      undefined
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
