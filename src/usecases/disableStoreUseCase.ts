import { StoreRepository } from 'src/repositories/storeRepository'

class DisableStoreUseCase {
	constructor (private repository: StoreRepository) {
		this.repository = repository
	}

	async execute (storeId: string) {
		return await this.repository.disableStore(storeId)
	}
}

export default DisableStoreUseCase
