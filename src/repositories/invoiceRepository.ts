import api, { PaginatedResponse } from 'src/lib/api';
import { Invoice } from 'src/models/invoices';

export class InvoiceRepository {


  async fetchInvoices(
    userId?: number,
    cardId?: number
  ): Promise<PaginatedResponse> {
    console.log('chegou aqui T');
    try {
      const params = Object.fromEntries(
        Object.entries({
          userId,
          cardId,
        }).filter(([, value]) => value != null) // Remove `null` e `undefined`
      );

      const data = await api.requestGet('/invoice', params);
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
