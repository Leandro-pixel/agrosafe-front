import { Store } from 'src/models/store'
import { StoreRepository } from 'src/repositories/storeRepository'

class CreateStoreUseCase {
	private storeRepository: StoreRepository
	constructor (storeRepository: StoreRepository) {
		this.storeRepository = storeRepository
	}

	async execute (store: Store) {
		return await this.storeRepository.createStore(store)
	}
}

export default CreateStoreUseCase
