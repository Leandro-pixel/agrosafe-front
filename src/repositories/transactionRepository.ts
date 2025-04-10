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
      console.log('aaaaaaaaaaaa T', data);

      const json: PaginatedResponse = {
        data: data.data.map((item: any) => Transaction.fromJson(item)),
        totalItems: data.totalItems,
      };
      console.log('não ta jaisão', json);
      return json;
    } catch (error) {
      console.log(error)
      throw new Error('transação não encontrada');
    }
  }
}
