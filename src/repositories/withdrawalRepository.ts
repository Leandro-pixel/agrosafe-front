import api, { PaginatedResponse } from 'src/lib/api';
import { Withdrawal } from 'src/models/withdrawals';

export class WithdrawalRepository {


  async fetchWithdrawals(
  ): Promise<PaginatedResponse> {
    console.log('chegou aqui T');
    try {
      const data = await api.requestGet('/establishment/withdrawals');
      console.log('aaaaaaaaaaaa T', data);

			const json: PaginatedResponse = {
				data: data.data.map((item: any) => Withdrawal.fromJson(item)),
				totalItems: data.totalItems
			}
      console.log('não ta jaisão');
      return json
    } catch (error) {
      throw new Error('Antecipações não encontradas');
    }
  }

}
