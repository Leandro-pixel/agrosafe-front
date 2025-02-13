import api, { PaginatedResponse } from 'src/lib/api';
import { Invoice } from 'src/models/invoices';

export class InvoiceRepository {


  async fetchInvoices(
  ): Promise<PaginatedResponse> {
    console.log('chegou aqui T');
    try {
      const data = await api.requestGet('/invoice');
      console.log('aaaaaaaaaaaa T', data);

			const json: PaginatedResponse = {
				data: data.data.map((item: any) => Invoice.fromJson(item)),
				totalItems: data.totalItems
			}
      console.log('não ta jaisão');
      return json
    } catch (error) {
      throw new Error('Faturas não encontradas');
    }
  }



}
