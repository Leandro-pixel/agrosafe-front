import { defineStore } from 'pinia'
import { Hub, Polo } from 'src/models/hub'
import { HubRepository } from 'src/repositories/hubRepository'
import FetchHubByIdUseCase from 'src/usecases/fetchHubByIdUseCase'
import FetchHubsUseCase from 'src/usecases/fetchHubsUseCase'
import DisableHubUseCase from 'src/usecases/disableHubUseCase'
import CreateHubUseCase from 'src/usecases/createHubUseCase'
import ActivateHubUseCase from 'src/usecases/activateHubUseCase'
import { ref } from 'vue'
import { Representative } from 'src/models/representative'

const repository = new HubRepository()
const fetchHubsUseCase = new FetchHubsUseCase(repository)
const createHubUseCase = new CreateHubUseCase(repository)
const fetchHubByIdUseCase = new FetchHubByIdUseCase(repository)
const activateHubUseCase = new ActivateHubUseCase(repository)
const disableHubUseCase = new DisableHubUseCase(repository)

export const useHubStore = defineStore('hub', {
	state: () => ({
		hubs: ref([] as Hub[]),
		totalItemsInDB: 0
	}),
	actions: {
		async activateHub (hubId: string) {
			return await activateHubUseCase.execute(hubId)
		},
		async disableHub (hubId: string) {
			return await disableHubUseCase.execute(hubId)
		},
		async fetchHubs (limit: number, offset: number, filter: string) {
			const response = await fetchHubsUseCase.execute(limit, offset, filter)
			this.hubs = response.data
			this.totalItemsInDB = response.totalItems
		},

    async fetchOnePolo (id: number) {
			 return await fetchHubsUseCase.executeOnePolo(id)
		},

    async fetchOneUser (id: number) {
      return await fetchHubsUseCase.executeOneUser(id)
   },

    async fetchOneRep (id: number) {
      return await fetchHubsUseCase.executeOneRep(id)
   },

    async fetchHubsBrands (limit: number, offset: number,type: string, filter: string) {
			const response = await fetchHubsUseCase.executeBrands(limit, offset,type, filter)
			this.hubs = response.data
			this.totalItemsInDB = response.totalItems
		},
		async createHub (hub: Hub) {
			return await createHubUseCase.execute(hub)
		},
    async createPolo (polo: Polo) {
			return await createHubUseCase.executePolo(polo)
		},
    async createRepresentative (rep: Representative) {
			return await createHubUseCase.executeRep(rep)
		},
		async fetchHubById (id: string) {
			return await fetchHubByIdUseCase.execute(id)
		}
	}
})
