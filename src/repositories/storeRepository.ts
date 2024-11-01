import api, { PaginatedResponse } from 'src/lib/api'
import { Store } from 'src/models/store'

export class StoreRepository {
	async createStore (store: Store): Promise<Store> {
		try {
			const response = await api.requestPost('/store', store.toJson())
			return Store.fromJson(response) as Store
		} catch (error) {
			throw new Error('Erro ao salvar loja')
		}
	}

	async fetchStores (limit?:number, offset?:number, filter?:string): Promise<PaginatedResponse> {
		const params = Object.fromEntries(Object.entries({
			limit,
			offset,
			filter
		}).filter(([, value]) => value !== undefined))
		try {
			const data = await api.requestGet('/store', params)
			const json: PaginatedResponse = {
				data: data.data.map((item: any) => Store.fromJson(item)),
				totalItems: data.totalItems
			}
			return json
		} catch (error) {
			throw new Error('Erro ao buscar lojas')
		}
	}

	async fetchStoreById (id: string): Promise<Store> {
		try {
			const data = await api.requestGet(`/store/${id}`)
			return Store.fromJson(data) as Store
		} catch (error) {
			throw new Error('Erro ao buscar loja')
		}
	}

	async activateStore (id: string) {
		try {
			await api.requestPut(`/store/activate/${id}`, null)
		} catch (error) {
			throw new Error('Erro ao ativar loja')
		}
	}

	async disableStore (id: string) {
		try {
			await api.requestDelete(`/store/inactivate/${id}`)
		} catch (error) {
			throw new Error('Erro ao desativar loja')
		}
	}
}
