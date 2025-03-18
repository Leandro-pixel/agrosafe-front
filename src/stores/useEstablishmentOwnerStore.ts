import { defineStore } from 'pinia'
import { ref } from 'vue'
import { EstablishmentOwner } from 'src/models/establishmentOwner'
import { ECOwnerRepository } from 'src/repositories/establishmentOwnerRepository'
import FetchECOwnerUseCase from 'src/usecases/fetchEstablishmenOwnerUseCase'

const repository = new ECOwnerRepository()
const fetchECOwnerUseCase = new FetchECOwnerUseCase(repository)

export const useEstablishmentOwnerStore = defineStore('ECOwner', {
	state: () => ({
		ECOwner: ref([] as EstablishmentOwner[]),
		totalItemsInDB: 0
	}),
	actions: {
		async fetchECOwner (limit: number, offset: number,selectedSearchType?: string, searchValueBy?: string, employeeId?: number) {
			const response = await fetchECOwnerUseCase.execute(limit, offset,selectedSearchType, searchValueBy, employeeId)
			this.ECOwner = response.data
			this.totalItemsInDB = response.totalItems
		},
  }
})
