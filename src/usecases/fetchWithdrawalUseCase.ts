import { PaginatedResponse } from 'src/lib/api';
import { WithdrawalRepository } from 'src/repositories/withdrawalRepository';

class FetchWithdrawalUseCase {
  private withdrawalRepository: WithdrawalRepository;
  constructor(withdrawalRepository: WithdrawalRepository) {
    this.withdrawalRepository = withdrawalRepository;
  }

  async execute(limit: number, offset: number,emploeeyFiltred?: string,establishmentId?:number): Promise<PaginatedResponse> {
    return this.withdrawalRepository.fetchWithdrawals(limit, offset,emploeeyFiltred, establishmentId);
  }
  async pay(establishmentId: number, status: boolean) {
     this.withdrawalRepository.payWithdrawals(establishmentId, status);
  }
}

export default FetchWithdrawalUseCase;
