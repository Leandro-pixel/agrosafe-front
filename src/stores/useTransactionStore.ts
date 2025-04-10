import { Transaction } from 'src/models/cashFlow_Transactions';
import { TransactionRepository } from 'src/repositories/transactionRepository';
import FetchTransactionUseCase from 'src/usecases/fetchTransactionUseCase';
import { defineStore } from 'pinia';

const repository = new TransactionRepository();
const fetchTransactionUseCase = new FetchTransactionUseCase(repository);

export const useTransactionStore = defineStore('transaction', {
  state: () => ({
    transactions: [] as Transaction[],
    totalItemsInDB: 0,
  }),
  getters: {
    getTransactions: (state) => state.transactions,
  },
  actions: {
    async fetchTransaction(
      hashId: string
    ) {
      const response = await fetchTransactionUseCase.execute(
        hashId
      );
      console.log('voltou');
      this.transactions = response.data;
      this.totalItemsInDB = response.totalItems;
    },
  },
});
