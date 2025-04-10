import { TransactionRepository } from '@/repositories/transactionRepository';
import { PaginatedResponse } from 'src/lib/api';

class FetchTransactionUseCase {
  private transactionRepository: TransactionRepository;
  constructor(transactionRepository: TransactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  async execute(
    hashId: string
  ): Promise<PaginatedResponse> {
    return this.transactionRepository.fetchTransactions(
      hashId
    );
  }
}

export default FetchTransactionUseCase;
