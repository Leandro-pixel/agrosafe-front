import { CustomerRepository } from 'src/repositories/customerRepository'
import { Formatter } from 'src/utils/formatter'

class CheckLimitUseCase {
	constructor (private repository: CustomerRepository) {
		this.repository = repository
	}

	async execute (cpf: string) {
		cpf = Formatter.clearSymbols(cpf)
		return await this.repository.fetchLimit(cpf)
	}
}

export default CheckLimitUseCase
