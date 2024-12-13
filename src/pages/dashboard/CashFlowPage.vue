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
        <div class="flex row">
          <q-input
            dense
            outlined
            v-model.trim="establishmentId"
            label="ID do Estabelecimento"
            lazy-rules
            class="width-20"
            :rules="implementHierarchy('polo') ? [(val:number) => !!val || 'Campo obrigatório'] : []"
            v-if="implementHierarchy('polo')"
          />
          <q-input
            dense
            outlined
            v-model.trim="userId"
            label="ID do cliente"
            lazy-rules
            class="width-20"
            :rules="[(val:number) => !!val || 'Campo obrigatório']"
            v-if="implementHierarchy('store')"
          />
          <PrimaryButton
            flat
            @click="refreshData"
            label="Atualizar"
            :loading="loading"
          />
        </div>
      </div>
      <div class="flex row q-gutter-md justify-between full-width">
        <q-list bordered>
          <q-item
            v-for="(transactions, index) in transactions"
            :key="index"
            class="transaction-item"
          >
            <q-item-section>
              <q-item-label>{{ transactions.createdAt }}</q-item-label>
              <div class="flex row justify-between">
                <q-item-label class="q-item-label--break-word" caption>{{
                  transactions.description
                }}</q-item-label>
              </div>
              <q-item-label caption>{{
                transactions.status == 'pending'
                  ? 'Compra efetuada'
                  : 'Compra negada'
              }}</q-item-label>
              <q-item-label caption>{{
                transactions.amountToPay != transactions.originalAmount
                ?transactions.invoiceNumber == 1
                  ? `1ª Parcela`
                  : '2ª Parcela'
                : ''
              }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-chip
                :class="
                  'non-selectable bg-' +
                  translateStatusToColor(transactions.status)
                "
                :label="'R$ ' + transactions.amountToPay"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-page>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { implementHierarchy, NotifyError } from 'src/utils/utils';
//import { Formatter } from 'src/utils/formatter';
//import { useRouter } from 'vue-router';
import { Pagination } from 'src/models/pagination';
import { CashFlow } from 'src/models/cashFlow';
import { useCachSflowStore } from 'src/stores/useCashFlowStore';
import { onMounted } from 'vue';
import { translateStatusToColor } from 'src/models/enums/activeStatusEnum';
import PrimaryButton from 'src/components/button/PrimaryButton.vue';

onMounted(() => {
  console.log('foi montado');
  loading.value = true;
  onRequest({ pagination: pagination.value });
});

const refreshData = () => {
  loading.value = true;
  onRequest({ pagination: pagination.value });
};

const pagination = ref(new Pagination());
//const filter = ref('');
const transactions = ref([] as Array<CashFlow>);
const establishmentId = ref(0);
const cardId = ref(0);
const userId = ref(0);
const statuses = ref([]);
const cashFlowStore = useCachSflowStore();
const loading = ref(false);
//const refresh = ref(false);
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

      transactions.value = cashFlowStore.getTransactions;
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
