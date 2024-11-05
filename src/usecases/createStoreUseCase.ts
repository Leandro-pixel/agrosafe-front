import { EC, Store } from 'src/models/store'
import { StoreRepository } from 'src/repositories/storeRepository'

class CreateStoreUseCase {
	private storeRepository: StoreRepository
	constructor (storeRepository: StoreRepository) {
		this.storeRepository = storeRepository
	}

	async execute (store: Store) {
		return await this.storeRepository.createStore(store)
	}
  async executeEC (store: EC) {
		return await this.storeRepository.createEC(store)
	}
}

export default CreateStoreUseCase
