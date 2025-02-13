<template>
    <q-layout>
  <q-page class="q-pa-md">
    <div class="flex justify-between q-mb-lg">
        <span
          class="q-pt-sm flex items-center text-h6 text-weight-bold text-primary"
          style="border-top: 0.25rem solid #401a58"
        >
          Faturas
        </span>
        </div>
    <div class="flex row q-gutter-md justify-between full-width ">
      <!-- Coluna 1 -->
      <div class="col">
        <q-card flat bordered class="bg-primary text-white">
          <q-card-section class="row items-center q-gutter-md">
            <q-avatar size="56px" icon="account_balance_wallet" color="white" />
            <div>
              <div class="text-h6">Saldo Disponível</div>
              <div class="text-h4 q-mt-xs">R$ 1.500,00</div>
            </div>
          </q-card-section>
        </q-card>

        <q-separator spaced />

        <q-card flat bordered class="q-mt-md">
          <q-card-section class="row justify-between items-center q-gutter-md">
            <div>
              <div class="text-subtitle1">Próxima Data de Saque</div>
              <div class="text-body2 text-grey">Dia 05 de cada mês</div>
            </div>
            <q-btn label="Sacar Agora" color="primary" icon="payments" />
          </q-card-section>
        </q-card>

        <q-separator spaced />

        <q-card flat bordered class="q-mt-md">
          <q-card-section>
            <div class="text-h6">Histórico de Saques</div>
          </q-card-section>

          <q-list bordered>
            <q-item v-for="(transaction, index) in transactions" :key="index">
              <q-item-section>
                <q-item-label>{{ transaction.description }}</q-item-label>
                <q-item-label caption>{{ transaction.date }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-chip color="positive" :label="'R$ ' + transaction.amount" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>

      <!-- Coluna 2 -->
      <div class="flex column">
        <q-card flat bordered>
          <q-card-section class="flex justify-between items-center q-gutter-md">
            <div>
              <div class="text-subtitle1">Cartão: nome do cartão</div>
              <div class="text-body2 text-grey">Informações aqui</div>
              <div class="text-body2 text-grey">Informações aqui</div>
            </div>
            <q-btn
              label="+Cadastrar cartão"
              @click="onToggle(cadastrar)"
              color="primary"
              icon="credit_card"
            />
          </q-card-section>
        </q-card>

        <div v-if="cadastrar">
          <q-separator spaced />

          <q-card flat bordered class="q-mt-md">
            <q-card-section>
              <div class="text-h6">Campos do cartão</div>
            </q-card-section>

            <q-list bordered>
              <q-item v-for="(_, index) in transactions" :key="index">
                <q-item-section>
                  <q-item-label>Campo 1</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
    </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Transaction {
  description: string;
  date: string;
  amount: string;
}

// Definindo a lista de transações usando ref
const transactions = ref<Transaction[]>([
  { description: 'Saque', date: '30/10/2024', amount: '-500,00' },
  { description: 'Saque', date: '05/10/2024', amount: '-300,00' },
]);

const cadastrar = ref(false);

const onToggle = (value: boolean) => {
  cadastrar.value = !value; // Inverte o valor
};
</script>

<style scoped>

.q-btn {
  min-width: 150px;
}

.row {
  align-items: flex-start; /* Alinha os itens no topo */
}
</style>
