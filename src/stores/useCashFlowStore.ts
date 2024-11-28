import { defineStore } from 'pinia';
import { CashFlow } from 'src/models/cashFlow';
import { CashFlowRepository } from 'src/repositories/cashFlowRepository';
import FetchCashFlowUseCase from 'src/usecases/fetchCashFlowUseCase';

const repository = new CashFlowRepository();
const fetchCashFlowUseCase = new FetchCashFlowUseCase(repository);

export const useCachSflowStore = defineStore('cashFlow', {
  state: () => ({
    transactions: [] as CashFlow[],
    totalItemsInDB: 0,
  }),
  getters: {
    getTransactions: (state) => state.transactions,
  },
  actions: {
    async fetchCashFlow(
      establishmentId?: number,
      cardId?: number,
      userId?: number,
      statuses?: Array<any>
    ) {
      console.log('veio aqui user' + userId);
      const response = await fetchCashFlowUseCase.execute(
        establishmentId,
        cardId,
        userId,
        statuses
      );
      console.log('voltou');
      this.transactions = response.data;
      this.totalItemsInDB = response.totalItems;
    },
  },
});
