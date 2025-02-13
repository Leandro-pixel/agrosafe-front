import { Hub, Polo } from 'src/models/hub'
import { Representative } from 'src/models/representative'
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
  async executeRep (rep: Representative) {
		return await this.hubRepository.createRep(rep)
	}
}

export default CreateHubUseCase
