import api, { PaginatedResponse } from 'src/lib/api';
import { CustomerBrands } from 'src/models/customer';
import { Limit } from 'src/models/interfaces/limit';
import { Formatter } from 'src/utils/formatter';

export class CustomerRepository {
  async inviteCustomer(oldPhone: string, establishmentId: string) {
    const phone = Formatter.clearSymbolsAndLetters(oldPhone)
    try {
      return await api.requestPost('/sms/invitation', null,{ phone, establishmentId });
    } catch (error) {
      throw new Error('Erro ao enviar mensagem');
    }
  }

  async fetchBrandsUsers (limit?: number, offset?: number, establishmentId?: string, email?: string, hubId?: string, storeId?: string): Promise<PaginatedResponse> {
		const params = Object.fromEntries(Object.entries({
			limit,
			offset,
      establishmentId,
			email,
			hubId,
			storeId
		}).filter(([, value]) => value !== undefined && value !== ''))
    console.log(params)
		try {
			const data = await api.requestGet('/establishment/customers', params)

			const json: PaginatedResponse = {
				data: data.data.map((item: any) => CustomerBrands.fromJson(item)),
				totalItems: data.totalItems
			}
			return json
		} catch (error) {
			throw new Error('Erro ao buscar usuários')
		}
	}

  async fetchLimit(cpf: string): Promise<Limit[]> {
    try {
      const data = await api.requestGet(`/helpers/customer-card-infos/${cpf}`);
      return data as unknown as Limit[];
    } catch (error) {
      throw new Error('Erro ao buscar limites');
    }
  }
}
