import { Hub, Polo } from 'src/models/hub'
import { HubRepository } from 'src/repositories/hubRepository'

class CreateHubUseCase {
	private hubRepository: HubRepository
	constructor (hubRepository: HubRepository) {
		this.hubRepository = hubRepository
	}

	async execute (hub: Hub) {
		return await this.hubRepository.createHub(hub)
	}
  async executePolo (polo: Polo) {
		return await this.hubRepository.createPolo(polo)
	}
}

export default CreateHubUseCase
