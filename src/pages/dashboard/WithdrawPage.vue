<template>
  <q-page class="q-pa-md">
    <div class="row q-gutter-md justify-between full-width bg-red">
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
      <div class="col">
        <q-card flat bordered>
          <q-card-section class="row justify-between items-center q-gutter-md">
            <div>
              <div class="text-subtitle1">Cartão: Leandro</div>
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
.q-page {
  max-width: 900px; /* Aumente a largura se necessário */
  margin: 0 auto;
}

.q-btn {
  min-width: 150px;
}

.row {
  align-items: flex-start; /* Alinha os itens no topo */
}
</style>
