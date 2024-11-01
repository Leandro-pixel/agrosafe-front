import AddressRepository from 'src/repositories/addressRepository'

class FetchCepUseCase {
	private addressRepository: AddressRepository
	constructor (addressRepository: AddressRepository) {
		this.addressRepository = addressRepository
	}

	async execute (cep: string) {
		return await this.addressRepository.fetchCep(cep)
	}
}

export default FetchCepUseCase
