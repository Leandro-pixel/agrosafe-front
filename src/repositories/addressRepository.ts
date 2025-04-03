import api from 'src/lib/api'
import { NotFoundError } from 'src/lib/errors/notFoundError'
import { Address } from 'src/models/address'

export default class AddressRepository {
	async fetchCep (cep: string): Promise<Address> {
		try {
			const response = await api.requestGetCEP(`https://viacep.com.br/ws/${cep}/json`)
			return Address.fromJson(response)
		} catch (error) {
			if (error instanceof NotFoundError) throw new NotFoundError('CEP não encontrado')
			throw error
		}
	}
}
