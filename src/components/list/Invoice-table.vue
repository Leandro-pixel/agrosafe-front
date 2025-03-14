<template>
  <q-layout>
    <q-page class="column">
      <div class="row q-gutter-md items-center">
      <q-select
          v-model="searchValueBy"
          filled
          dense
          :options="[
            { label: 'CPF', value: 'cpf' },
            { label: 'celular', value: 'phone' },
            { label: 'E-mail', value: 'email' },
            { label: 'Nome', value: 'name' },
          ]"
          label="Buscar por..."
          outlined
          map-options
          emit-value
        />
        <q-input
          v-if="searchValueBy != ''"
          v-model="searchValue"
          placeholder="Digite aqui..."
          @update:model-value="validateSearchType"
          outlined
          dense
          filled
          emit-value
        />
        <PrimaryButton
          @click="searchUser"
          label="Pesquisar"
          v-if="enable == true"
        />
      </div>
      <q-select
  v-if="cards.length > 0"
  v-model="cardId"
  :options="cards.map(card => ({ label: getCardType(card.cardId), value: card.cardId }))"
  label="Escolha um cartão"
  outlined
  emit-value
  map-options
  @update:model-value="searchUser"
/>
      <PrimaryTable
  @request="onRequest"
  v-model:pagination="pagination"
  :rows="invoice"
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
import { NotifyError} from 'src/utils/utils';
import PrimaryTable from 'src/components/list/PrimaryTable.vue';
import { QTableColumn } from 'quasar';
import { translateStatusToColor } from 'src/models/enums/activeStatusEnum';
//import { useRouter } from 'vue-router';
import PrimaryButton from 'src/components/button/PrimaryButton.vue';
import { Invoice } from 'src/models/invoices';
import { useInvoiceStore } from 'src/stores/useInvoiceStore';
import { Validator } from 'src/utils/validator';
import { CustomerBrands } from 'src/models/customer';
import { UserCard } from 'src/models/userCard';
import { useUserCardsStore } from 'src/stores/useUserCardsStore';
import { useCustomerStore } from 'src/stores/useCustomerStore';

//const router = useRouter()
const invoice = ref([] as Array<Invoice>);
const invoiceStore = useInvoiceStore();
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
//const selectedDate = ref('');
//const dateRange = ref({ from: '', to: '' });
const searchValue = ref();

//const searchByType = ref('');
//const userType = ref('');
const enable = ref(false);
const userStore = useCustomerStore()
const cardStore = useUserCardsStore()
const client = ref([] as Array<CustomerBrands>)
const cards = ref([] as Array<UserCard>)
const cardId = ref<number | null>(null);
const clientId = ref<number | null>(null);
/*
const updateDateRange = () => {
  if (dateRange.value.from && dateRange.value.to) {
    selectedDate.value = `${dateRange.value.from} até ${dateRange.value.to}`;
  }
};
*/

const searchValueBy = ref('')

console.log('propriedades:' + props)
// Índice do span ativo


const columns: QTableColumn[] = [
{ name: 'id', label: 'ID', field: (row:Invoice) => row.id, align: 'center' },
{ name: 'createdAt', required: true, label: 'data criação', field: (row:Invoice) => row.createdAt, align: 'left' },
{ name: 'paymentDate', required: true, label: 'Data de pagamento', field: (row:Invoice) => row.paymentDate, align: 'left' },
{ name: 'balanceWithFee', required: true, label: 'Valor com Taxa', field: (row:Invoice) => row.getFormattedBalanceWithFee(), align: 'left' }
]


const onCashClick = (id: any, name: any) => {
  console.log('name:', id + name);
  //router.push({ path: `/representantes/ativacao/${id}`, query: {name}});
};


const details = async (id: any, name: any, status: string) => {
  console.log(id, name, status)
}


const validateSearchType = () => {
  if (searchValueBy.value == 'cpf') {
    enable.value = Validator.isValidCPF(searchValue.value);
    console.log('Valid CPF:', enable.value);
  } else if (searchValueBy.value == 'phone') {
    enable.value = Validator.isValidPhoneNumber(searchValue.value);
  } else if (searchValueBy.value == 'cnpj') {
    enable.value = Validator.isValidCNPJ(searchValue.value);
  } else if (searchValueBy.value == 'email') {
    enable.value = Validator.isValidEmail(searchValue.value);
  } else {
    enable.value = false;
  }
};

const onRequest = async () => {
  console.log('veio aquiaqui' + props);
  loading.value = true;
  await invoiceStore
    .fetchInvoice(clientId.value, cardId.value)
    .then(() => {

      invoice.value = invoiceStore.getinvoices;
      //pagination.value.rowsNumber = invoiceStore.totalItemsInDB;
    })
    .catch((error: any) => NotifyError.error(error.message))
    .finally(() => {
      loading.value = false;
    });
};
const searchCards = async () => {
  loading.value = true;
  await cardStore
    .fetchUserCards(
      client.value[0].id
    )
    .then(() => {
      cards.value = cardStore.getCards;
      cardId.value = cards.value[0].cardId
      clientId.value = client.value[0].id
      onRequest()
    })
    .catch((error: any) => NotifyError.error(error.message))
    .finally(() => {
      loading.value = false;
    });
};

const searchUser = async () => {
 await userStore.fetchBrandsUsers(
  null,
  null,
  searchValueBy.value,
  searchValue.value,
)
  .then(() => {
    client.value = userStore.getUsers
    searchCards()
  })
  .catch((error:any) => NotifyError.error(error.message))
  .finally(() => { loading.value = false })
}
const getCardType = (id: number): string => {
  switch (id) {
    case 1:
      return 'Beautycard';
    case 2:
      return 'Autocard';
      case 2:
      return 'Foodcard';
    default:
      return 'desconhecido';
  }
};

</script>
