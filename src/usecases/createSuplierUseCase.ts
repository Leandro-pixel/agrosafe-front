import { Supplier } from 'src/models/suplier'
import { SuplierRepository } from 'src/repositories/suplierRepository'

class CreateSuplierUseCase {
	private suplierRepository: SuplierRepository
	constructor (suplierRepository: SuplierRepository) {
		this.suplierRepository = suplierRepository
	}

  async executeSuplier (suplier: Supplier) {
		return await this.suplierRepository.createSuplier(suplier)
	}
}

export default CreateSuplierUseCase
