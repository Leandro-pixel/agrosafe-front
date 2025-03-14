import { PaginatedResponse } from 'src/lib/api';
import { InvoiceRepository } from 'src/repositories/invoiceRepository';

class FetchInvoiceUseCase {
  private invoiceRepository: InvoiceRepository;
  constructor(invoiceRepository: InvoiceRepository) {
    this.invoiceRepository = invoiceRepository;
  }

  async execute(
    userId?: number,
    cardId?: number
  ): Promise<PaginatedResponse> {
    return this.invoiceRepository.fetchInvoices(userId, cardId );
  }
}

export default FetchInvoiceUseCase;
