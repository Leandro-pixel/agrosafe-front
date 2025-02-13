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

  async executeOnePolo (id?: number) {
		return await this.hubRepository.fetchOnePolo(id, false, false)
	}
  async executeOneUser (id?: number) {
		return await this.hubRepository.fetchOneUser(id, false, true)
	}
  async executeOneRep (id?: number) {
		return await this.hubRepository.fetchOneRep(id, false, false)
	}
  async executeBrands (limit: number, offset: number,type: string, filter: string): Promise<PaginatedResponse> {
		return await this.hubRepository.fetchHubsBrands(limit, offset,type, filter)
	}
}

export default FetchHubsUseCase
