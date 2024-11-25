import { CustomerRepository } from 'src/repositories/customerRepository'

class SendMessageUseCase {
	private customerRepository: CustomerRepository

	constructor (customerRepository: CustomerRepository) {
		this.customerRepository = customerRepository
	}

	async execute (phone: string, message: string): Promise<boolean>{
		return await this.customerRepository.inviteCustomer(phone, message)
	}

  async executeTransaction (phone: string, desc: string, amount: number){
		return await this.customerRepository.sendTransactions(phone, desc, amount)
	}
}

export default SendMessageUseCase
