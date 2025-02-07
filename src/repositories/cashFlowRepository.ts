import api, { PaginatedResponse } from 'src/lib/api';
import { CashFlow } from 'src/models/cashFlow';

export class CashFlowRepository {
  async fetchTransactions(
    establishmentId?: number,
    cardId?: number,
    userId?: number,
    statuses?: Array<any>
  ): Promise<PaginatedResponse> {
    console.log('chegou aqui T');
    const params = Object.fromEntries(
      Object.entries({
        establishmentId: establishmentId || undefined,
        cardId: cardId || undefined,
        userId: userId || undefined,
        statuses: statuses && statuses.length > 0 ? statuses : undefined,
      }).filter(([, value]) => value !== undefined)
    );
    const body = Object.fromEntries(
      Object.entries({
        establishmentId: establishmentId || undefined,
        cardId: cardId || undefined,
        userId: userId || undefined,
        statuses: statuses && statuses.length > 0 ? statuses : undefined,
      }).filter(([value]) => value !== undefined && value !== null)
    );

    console.log('Conteúdo do body limpo:', JSON.stringify(body));

    try {
      console.log('agora veio aqui T' + params);
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
