import { UserData, User } from 'src/models/user'
import api, { PaginatedResponse } from '../lib/api'

export class UserRepository {
	async fetchUserData () {
		try {
			const data = await api.requestGet('/user/me')

			return UserData.fromJson(data)
		} catch (error) {
			throw new Error('Erro ao buscar dados')
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
