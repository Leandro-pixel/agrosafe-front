import { defineStore } from 'pinia'
import AddressRepository from 'src/repositories/addressRepository'
import FetchCepUseCase from 'src/usecases/fetchCepUseCase'

const addressRepository = new AddressRepository()
const fetchCepUseCase = new FetchCepUseCase(addressRepository)

export const useAddressStore = defineStore('address', {
	actions: {
		async fetchCep (cep: string) {
			return await fetchCepUseCase.execute(cep)
		}
	}
})
