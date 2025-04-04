import api, { PaginatedResponse } from 'src/lib/api';
import { Invoice } from 'src/models/invoices';

export class InvoiceRepository {


  async fetchInvoices(
    limit: number,
    offset: number,
    userId?: number,
    cardId?: number
  ): Promise<PaginatedResponse> {
    try {
      console.log(limit, offset, userId, cardId);

      const params = Object.fromEntries(
        Object.entries({
          limit,
          offset,
          userId,
          cardId,
        }).filter(([, value]) => value != null) // Remove `null` e `undefined`
      );
      console.log('aaaaaaaaaaaa T', params);

      const data = await api.requestGet('/invoice', params);

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
