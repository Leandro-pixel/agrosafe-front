import { defineStore } from 'pinia';
import { Invoice } from 'src/models/invoices';
import { InvoiceRepository } from 'src/repositories/invoiceRepository';
import FetchInvoiceUseCase from 'src/usecases/fetchInvoiceUseCase';

const repository = new InvoiceRepository();
const fetchInvoiceUseCase = new FetchInvoiceUseCase(repository);

export const useInvoiceStore = defineStore('invoices', {
  state: () => ({
    invoices: [] as Invoice[],
    totalItemsInDB: 0,
  }),
  getters: {
    getinvoices: (state) => state.invoices,
  },
  actions: {
    async fetchInvoice(
    ) {
      const response = await fetchInvoiceUseCase.execute(
      );
      console.log('voltou');
      this.invoices = response.data;
      this.totalItemsInDB = response.totalItems;
    },
  },
});
