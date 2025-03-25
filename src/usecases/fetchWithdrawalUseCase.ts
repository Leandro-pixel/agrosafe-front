import { PaginatedResponse } from 'src/lib/api';
import { WithdrawalRepository } from 'src/repositories/withdrawalRepository';

class FetchWithdrawalUseCase {
  private withdrawalRepository: WithdrawalRepository;
  constructor(withdrawalRepository: WithdrawalRepository) {
    this.withdrawalRepository = withdrawalRepository;
  }

  async execute(limit: number, offset: number,establishmentId?:number): Promise<PaginatedResponse> {
    return this.withdrawalRepository.fetchWithdrawals(limit, offset, establishmentId);
  }
  async pay(establishmentId: number, status: boolean) {
     this.withdrawalRepository.payWithdrawals(establishmentId, status);
  }
}

export default FetchWithdrawalUseCase;
