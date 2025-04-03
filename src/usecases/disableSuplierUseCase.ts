import { SuplierRepository } from 'src/repositories/suplierRepository'

class DisableSuplierUseCase {
	constructor (private repository: SuplierRepository) {
		this.repository = repository
	}

	async execute (suplierId: string) {
		return await this.repository.disableSuplier(suplierId)
	}
}

export default DisableSuplierUseCase
