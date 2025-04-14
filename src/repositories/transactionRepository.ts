import { Transaction } from 'src/models/cashFlow_Transactions';
import api, { PaginatedResponse } from 'src/lib/api';

export class TransactionRepository {
  async fetchTransactions(
    purchaseHash: string
  ): Promise<PaginatedResponse> {


    const params = Object.fromEntries(
      Object.entries({
        purchaseHash
      }).filter(([, value]) => value != null) // Remove `null` e `undefined`
    );


    try {
      console.log('agora veio aqui T' + purchaseHash);
      const data = await api.requestGet(
        '/transaction',
        params
      );

      const json: PaginatedResponse = {
        data: data.data.map((item: any) => Transaction.fromJson(item)),
        totalItems: data.totalItems,
      };
      return json;
    } catch (error) {
      throw new Error('transação não encontrada');
    }
  }
}
