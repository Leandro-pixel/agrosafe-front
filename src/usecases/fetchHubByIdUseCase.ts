import { HubRepository } from 'src/repositories/hubRepository'

class FetchHubByIdUseCase {
	private hubRepository: HubRepository
	constructor (hubRepository: HubRepository) {
		this.hubRepository = hubRepository
	}

	async execute (id:string) {
		return this.hubRepository.fetchHubById(id)
	}
}

export default FetchHubByIdUseCase
