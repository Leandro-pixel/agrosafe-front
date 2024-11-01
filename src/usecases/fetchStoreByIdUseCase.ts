import { StoreRepository } from 'src/repositories/storeRepository'

class FetchStoreByIdUseCase {
	private storeRepository: StoreRepository
	constructor (storeRepository: StoreRepository) {
		this.storeRepository = storeRepository
	}

	async execute (storeId: string) {
		return await this.storeRepository.fetchStoreById(storeId)
	}
}

export default FetchStoreByIdUseCase
