import { defineStore } from 'pinia';
import { Withdrawal } from 'src/models/withdrawals';
import { WithdrawalRepository } from 'src/repositories/withdrawalRepository';
import FetchWithdrawalUseCase from 'src/usecases/fetchWithdrawalUseCase';

const repository = new WithdrawalRepository();
const fetchWithdrawalUseCase = new FetchWithdrawalUseCase(repository);

export const useWithdrawalStore = defineStore('withdrawals', {
  state: () => ({
    withdrawls: [] as Withdrawal[],
    totalItemsInDB: 0,
  }),
  getters: {
    getWithdrawals: (state) => state.withdrawls,
  },
  actions: {
    async fetchWithdrawal(
    ) {
      const response = await fetchWithdrawalUseCase.execute(
      );
      console.log('voltou');
      this.withdrawls = response.data;
      this.totalItemsInDB = response.totalItems;
    },
    async payWithdrawal(establishmentId: number, status: boolean) {
       await fetchWithdrawalUseCase.pay(establishmentId, status);
    },
  },
});
