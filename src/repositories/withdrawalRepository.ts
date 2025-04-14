import api, { PaginatedResponse } from 'src/lib/api';
import { Withdrawal } from 'src/models/withdrawals';

export class WithdrawalRepository {


  async fetchWithdrawals(limit: number, offset: number,emploeeyFiltred?: string, employeeId?:number): Promise<PaginatedResponse> {
    const params = Object.fromEntries(
      Object.entries({
        limit,
        offset,
        [emploeeyFiltred || '']: employeeId,
      }).filter(([, value]) => value != null)
    );    try {
      const data = await api.requestGet('/establishment/withdrawals', params);

			const json: PaginatedResponse = {
				data: data.data.map((item: any) => Withdrawal.fromJson(item)),
				totalItems: data.totalItems
			}
      return json
    } catch (error) {
      throw new Error('Antecipações não encontradas');
    }
  }

  async payWithdrawals(establishmentId: number, status: boolean){
    console.log('chegou aqui' ,establishmentId);
    try {
        await api.requestPut(`/establishment/withdrawals/approve/${establishmentId}`,{},{'status': status});

      return
    } catch (error) {
      throw new Error('Antecipações não encontradas');
    }
  }

}
