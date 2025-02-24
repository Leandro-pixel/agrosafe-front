import api, { PaginatedResponse } from 'src/lib/api';
import { CashFlow } from 'src/models/cashFlow';

export class CashFlowRepository {
  async fetchTransactions(
    searchByType?: string,
    searchValueBy?: string,
    idType?: string,
    idValue?: number,
    statuses?: Array<any>
  ): Promise<PaginatedResponse> {


    const params = Object.fromEntries(
      Object.entries({
        [searchByType || '']: searchValueBy,
        [idType || '']: idValue,
        statuses: statuses && statuses.length > 0 ? statuses : undefined,
      }).filter(([, value]) => value !== undefined)
    );

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
