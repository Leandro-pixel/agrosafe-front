import { PaginatedResponse } from 'src/lib/api'
import { StoreRepository } from 'src/repositories/storeRepository'

class FetchStoresUseCase {
	private storeRepository: StoreRepository
	constructor (storeRepository: StoreRepository) {
		this.storeRepository = storeRepository
	}

	async execute (limit:number, offset:number, filter:string): Promise<PaginatedResponse> {
		return this.storeRepository.fetchStores(limit, offset, filter)
	}
}

export default FetchStoresUseCase
