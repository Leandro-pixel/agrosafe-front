import { PaginatedResponse } from 'src/lib/api';
import { CashFlowRepository } from 'src/repositories/cashFlowRepository';

class FetchCashFlowUseCase {
  private cashFlowRepository: CashFlowRepository;
  constructor(cashFlowRepository: CashFlowRepository) {
    this.cashFlowRepository = cashFlowRepository;
  }

  async execute(
    searchByType?: string,
      searchValueBy?: string,
    idType?: string,
    idValue?: number,
    statuses?: Array<any>
  ): Promise<PaginatedResponse> {
    return this.cashFlowRepository.fetchTransactions(
      searchByType,
        searchValueBy,
      idType,
      idValue,
      statuses
    );
  }
}

export default FetchCashFlowUseCase;
