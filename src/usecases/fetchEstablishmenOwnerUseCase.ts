import { PaginatedResponse } from 'src/lib/api'
import { ECOwnerRepository } from 'src/repositories/establishmentOwnerRepository'

class FetchECOwnerUseCase {
	private ecOwnerRepository: ECOwnerRepository
	constructor (ecOwnerRepository: ECOwnerRepository) {
		this.ecOwnerRepository = ecOwnerRepository
	}

	async execute (limit: number, offset: number,selectedSearchType?: string, searchValueBy?: string, employeeId?: number): Promise<PaginatedResponse> {
		return await this.ecOwnerRepository.fetchECOwners(limit, offset,selectedSearchType, searchValueBy, employeeId)
	}

}

export default FetchECOwnerUseCase
