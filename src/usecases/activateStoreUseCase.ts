import { StoreRepository } from 'src/repositories/storeRepository'

class ActivateStoreUseCase {
	constructor (private storeRepository: StoreRepository) {}

	async execute (storeId: string) {
		return await this.storeRepository.activateStore(storeId)
	}
  async executeEC (storeId: string, status: boolean) {
		return await this.storeRepository.activateEC(storeId, status)
	}

}

export default ActivateStoreUseCase
