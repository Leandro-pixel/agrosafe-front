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
        establishmentId,
        cardId,
        userId,
        statuses: statuses ?? [],
      }).filter(([, value]) => value !== undefined)
    );
    const body = {
      establishmentId: establishmentId || null,
      cardId: cardId || null,
      userId: userId || null,
      statuses: statuses ?? [],
    };
    try {
      console.log('agora veio aqui T' + body.userId);
      const data = await api.requestGetWithBody('/transaction', params,body );
      console.log('aaaaaaaaaaaa T', data);

			const json: PaginatedResponse = {
				data: data.data.map((item: any) => CashFlow.fromJson(item)),
				totalItems: data.totalItems
			}
      console.log('não ta jaisão');
      return json
    } catch (error) {
      throw new Error('Erro ao buscar lojas');
    }
  }

}
