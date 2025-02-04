<template>
  <q-layout>
    <q-page class="q-pa-md">
      <div class="flex justify-between q-mb-lg">
        <span
          class="q-pt-sm flex items-center text-h6 text-weight-bold text-primary"
          style="border-top: 0.25rem solid #401a58"
        >
          Antecipações
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
          <PrimaryButton
            flat
            @click="refreshData"
            label="Atualizar"
            :loading="loading"
          />
        </div>
      </div>
      <div class="flex row q-gutter-md justify-between full-width">
        <div v-if="withdrals.length === 0" class="q-mt-lg text-center">
          <span class="text-body2 text-grey">Nenhuma antecipação pendente.</span>
        </div>
        <q-list bordered>
          <q-item
            v-for="(withdrals, index) in withdrals"
            :key="index"
            class="transaction-item"
          >
            <q-item-section>
              <q-item-label>Solicitado em: {{ withdrals.createdAt }}</q-item-label>
              <div class="flex row justify-between">
                <q-item-label class="q-item-label--break-word" caption>Valor com taxas {{
                  Formatter.formatDoubleToCurrency(withdrals.amountToReceiveWithFee)
                }}</q-item-label>
              </div>

              <q-item-label caption>Valor sem taxas {{
                  Formatter.formatDoubleToCurrency(withdrals.amountToReceive)
                }}</q-item-label>
            </q-item-section>
            <q-item-section side class="justify-center">
              <q-chip
                :class="
                  'non-selectable bg-' +
                  translateStatusToColor(withdrals.paidStatus? 'Ativo' : 'Inativo')
                "
                :label="withdrals.paidStatus? 'Pago':'Pendente'"
              />
              <PrimaryButton
            flat
            @click="pay(withdrals.id, true)"
            label="Efetuar pagamento"
            :loading="loading"
          />
          <PrimaryButton
            flat
            @click="pay(withdrals.id, false)"
            label="Desfazer pagamento"
            :loading="loading"
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
import { Formatter } from 'src/utils/formatter';
//import { useRouter } from 'vue-router';
import { Pagination } from 'src/models/pagination';
import { Withdrawal } from 'src/models/withdrawals';
import { useWithdrawalStore } from 'src/stores/useWithdrawalStore';
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
const withdrals = ref([] as Array<Withdrawal>);
const establishmentId = ref(0);
const userId = ref(0);
const withdralStore = useWithdrawalStore();
const loading = ref(false);
//const refresh = ref(false);
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

      withdrals.value = withdralStore.getWithdrawals;
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
