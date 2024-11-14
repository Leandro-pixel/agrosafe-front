import { HubRepository } from 'src/repositories/hubRepository'
import { PaginatedResponse } from 'src/lib/api'

class FetchHubsUseCase {
	private hubRepository: HubRepository
	constructor (hubRepository: HubRepository) {
		this.hubRepository = hubRepository
	}

	async execute (limit: number, offset: number, filter: string): Promise<PaginatedResponse> {
		return await this.hubRepository.fetchHubs(limit, offset, filter)
	}

  async executeBrands (limit: number, offset: number, filter: string): Promise<PaginatedResponse> {
		return await this.hubRepository.fetchHubsBrands(limit, offset, filter)
	}
}

export default FetchHubsUseCase
