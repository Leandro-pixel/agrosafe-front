import { User } from 'src/models/user'
import api, { PaginatedResponse } from '../lib/api'

export class UserRepository {
	async fetchUserData(id?: number,viewPersonalData?: boolean,seeUser?: boolean) {
      const params = Object.fromEntries(
        Object.entries({
          id,
          viewPersonalData,
          seeUser
        }).filter(([, value]) => value !== undefined)
      );
      try {
        const data = await api.requestGet('/profile', params); // Busca os dados da API

        return data; // Retorna os dados para uso imediato ou para outra lógica
      } catch (error) {
        throw new Error('Erro ao buscar dados do suporte');
      }
    }

  async fetchUsers (limit?: number, offset?: number, email?: string, hubId?: string, storeId?: string): Promise<PaginatedResponse> {
		const params = Object.fromEntries(Object.entries({
			limit,
			offset,
			email,
			hubId,
			storeId
		}).filter(([, value]) => value !== undefined))
		try {
			const data = await api.requestGet('/user', params)

			const json: PaginatedResponse = {
				data: data.data.map((item: any) => User.fromJson(item)),
				totalItems: data.totalItems
			}
			return json
		} catch (error) {
			throw new Error('Erro ao buscar usuários')
		}
	}

	async fetchBrandsUsers (limit?: number, offset?: number, establishmentId?: number, email?: string, hubId?: string, storeId?: string): Promise<PaginatedResponse> {
		const params = Object.fromEntries(Object.entries({
			limit,
			offset,
      establishmentId,
			email,
			hubId,
			storeId
		}).filter(([, value]) => value !== undefined))
    console.log(params)
		try {
			const data = await api.requestGet('/establishment/customers', params)

			const json: PaginatedResponse = {
				data: data.data.map((item: any) => User.fromJson(item)),
				totalItems: data.totalItems
			}
			return json
		} catch (error) {
			throw new Error('Erro ao buscar usuários')
		}
	}
}
