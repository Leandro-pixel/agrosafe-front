import { StoreRepository } from 'src/repositories/storeRepository'

class ActivateStoreUseCase {
	constructor (private storeRepository: StoreRepository) {}

	async execute (storeId: string) {
		return await this.storeRepository.activateStore(storeId)
	}
}

export default ActivateStoreUseCase
