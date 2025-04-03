import { SuplierRepository } from 'src/repositories/suplierRepository'

class ActivateSuplierUseCase {
	constructor (private suplierRepository: SuplierRepository) {}

	async execute (storeId: string) {
		return await this.suplierRepository.activateSuplier(storeId, true)
	}
  async executeEC (storeId: string, status: boolean) {
		return await this.suplierRepository.activateSuplier(storeId, status)
	}

}

export default ActivateSuplierUseCase
