import { HubRepository } from 'src/repositories/hubRepository'

class ActivateHubUseCase {
	constructor (private hubRepository: HubRepository) {}

	async execute (hubId: string) {
		return await this.hubRepository.activateHub(hubId)
	}
}

export default ActivateHubUseCase
