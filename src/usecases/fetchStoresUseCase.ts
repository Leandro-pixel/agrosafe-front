import { PaginatedResponse } from 'src/lib/api'
import { StoreRepository } from 'src/repositories/storeRepository'

class FetchStoresUseCase {
	private storeRepository: StoreRepository
	constructor (storeRepository: StoreRepository) {
		this.storeRepository = storeRepository
	}

	async execute (limit:number, offset:number, searchByType?: string, searchValueBy?: string): Promise<PaginatedResponse> {
    console.log('veio aqui2')
		return this.storeRepository.fetchStores(limit, offset, searchByType, searchValueBy)
	}
  async executeFindOne (id?: number, supplierStatus?: boolean){
		return this.storeRepository.fetchOne(id, supplierStatus)
	}
  async executeSuplier (limit:number, offset:number, filter:string): Promise<PaginatedResponse> {
    console.log('veio aqui2')
		return this.storeRepository.fetchSuplier(limit, offset, filter, 'true')
	}
}

export default FetchStoresUseCase
