import { HubRepository } from 'src/repositories/hubRepository'

class DisableHubUseCase {
	constructor (private repository: HubRepository) {
		this.repository = repository
	}

	async execute (hubId: string) {
		return await this.repository.disableHub(hubId)
	}
}

export default DisableHubUseCase
