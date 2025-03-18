<template>
  <q-layout>
    <q-page class="column">
      <q-select
  v-if="cards.length > 0"
  v-model="cardId"
  :options="cards.map(card => ({ label: getCardType(card.cardId), value: card.cardId }))"
  label="Escolha um cartão"
  outlined
  emit-value
  map-options
  @update:model-value="searchCards"
/>
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
              :class="
                'non-selectable bg-' +
                translateStatusToColor(props.props.row.statuses[0])
              "
              size="md"
              flat
            >
              {{
                props.props.row.statuses[0] == 'pending' ? 'Pendente' : 'Pago'
              }}
            </q-chip>
          </q-td>
        </template>
        <template v-slot:body-cell-userName="props">
          <q-td>
            <span
              class="text-primary hoverable"
              @click="onCashClick(props.props.row.id, props.props.row.name)"
            >
              {{ props.props.row.name }}
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
                    details(props.props.row.id, props.props.row.name, 'true')
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
import PrimaryButton from 'src/components/button/PrimaryButton.vue';
import { useCachSflowStore } from 'src/stores/useCashFlowStore';
import { CashFlow } from 'src/models/cashFlow';
import { useUserCardsStore } from 'src/stores/useUserCardsStore';
import { UserCard } from 'src/models/userCard';
import { onMounted } from 'vue';

onMounted(() => {
  searchCards(); // Busca os cartões assim que o componente for carregado
});
const rows = ref([] as Array<CashFlow>);
const cashFlowStore = useCachSflowStore();
const pagination = ref(new Pagination());
const loading = ref(false);
const refresh = ref(false);
const searchByType = ref('');
const cardStore = useUserCardsStore()
const cards = ref([] as Array<UserCard>)
const cardId = ref<number | null>(null);

const props = defineProps<{
  clientId?: number
}>();


const columns: QTableColumn[] = [
  {
    name: 'EC',
    label: 'EC',
    field: (row: CashFlow) => row.businessName,
    align: 'center',
  },
  {
    name: 'user',
    label: 'cliente',
    field: (row: CashFlow) => row.userName,
    align: 'center',
  },
  {
    name: 'criado',
    required: true,
    label: 'data criação',
    field: (row: CashFlow) => row.createdAt,
    align: 'left',
  },
  {
    name: 'originalAmount',
    required: true,
    label: 'Valor',
    field: (row: CashFlow) => row.getFormattedOriginalAmount(),
    align: 'left',
  },
  {
    name: 'status',
    required: true,
    label: 'Status',
    field: (row: CashFlow) => row.statuses[0],
    align: 'left',
  },
  {
    name: 'transactionType',
    required: true,
    label: 'Parcelas',
    field: (row: CashFlow) => row.installmentCount,
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
  await cashFlowStore
    .fetchCashFlow(
      null,
      cardId.value,
      props.clientId
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

const searchCards = async () => {
  loading.value = true;
  await cardStore
    .fetchUserCards(
      props.clientId
    )
    .then(() => {
      cards.value = cardStore.getCards;
      cardId.value = cards.value[0].cardId
      onRequest()
    })
    .catch((error: any) => NotifyError.error(error.message))
    .finally(() => {
      loading.value = false;
    });
};

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
