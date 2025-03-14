import { PaginatedResponse } from 'src/lib/api';
import { CashFlowRepository } from 'src/repositories/cashFlowRepository';

class FetchCashFlowUseCase {
  private cashFlowRepository: CashFlowRepository;
  constructor(cashFlowRepository: CashFlowRepository) {
    this.cashFlowRepository = cashFlowRepository;
  }

  async execute(
    establishmentId?: number,
    cardId?: number,
    userId?: number
  ): Promise<PaginatedResponse> {
    return this.cashFlowRepository.fetchTransactions(
      establishmentId,
      cardId,
      userId,
    );
  }
}

export default FetchCashFlowUseCase;
