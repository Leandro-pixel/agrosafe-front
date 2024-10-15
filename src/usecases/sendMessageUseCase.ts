import { CustomerRepository } from 'src/repositories/customerRepository'

class SendMessageUseCase {
	private customerRepository: CustomerRepository

	constructor (customerRepository: CustomerRepository) {
		this.customerRepository = customerRepository
	}

	async execute (phone: string, message: string): Promise<boolean>{
		return await this.customerRepository.inviteCustomer(phone, message)
	}
}

export default SendMessageUseCase
