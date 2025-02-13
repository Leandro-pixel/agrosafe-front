import { PaginatedResponse } from 'src/lib/api';
import { InvoiceRepository } from 'src/repositories/invoiceRepository';

class FetchInvoiceUseCase {
  private invoiceRepository: InvoiceRepository;
  constructor(invoiceRepository: InvoiceRepository) {
    this.invoiceRepository = invoiceRepository;
  }

  async execute(
  ): Promise<PaginatedResponse> {
    return this.invoiceRepository.fetchInvoices(
    );
  }
}

export default FetchInvoiceUseCase;
