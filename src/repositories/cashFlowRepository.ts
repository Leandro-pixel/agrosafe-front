import api, { PaginatedResponse } from 'src/lib/api';
import { CashFlow } from 'src/models/cashFlow';

export class CashFlowRepository {
  async fetchTransactions(
    establishmentId?: number,
    cardId?: number,
    userId?: number
  ): Promise<PaginatedResponse> {


    const params = Object.fromEntries(
      Object.entries({
        userId,
        cardId,
        establishmentId,
      }).filter(([, value]) => value != null) // Remove `null` e `undefined`
    );


    try {
      console.log('agora veio aqui T' + establishmentId, cardId,userId);
      const data = await api.requestGet(
        '/transaction/purchase',
        params
      );
      console.log('aaaaaaaaaaaa T', data);

      const json: PaginatedResponse = {
        data: data.map((item: any) => CashFlow.fromJson(item)),
        totalItems: data.totalItems,
      };
      console.log('não ta jaisão');
      return json;
    } catch (error) {
      console.log(error)
      throw new Error('usuário não encontrado');
    }
  }
}
