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
    userId?: number,
    statuses?: Array<any>
  ): Promise<PaginatedResponse> {
    console.log('veio aqui user2' + userId);
    return this.cashFlowRepository.fetchTransactions(
      establishmentId,
      cardId,
      userId,
      statuses
    );
  }
}

export default FetchCashFlowUseCase;
