import { CustomerRepository } from 'src/repositories/customerRepository'

class SendMessageUseCase {
	private customerRepository: CustomerRepository

	constructor (customerRepository: CustomerRepository) {
		this.customerRepository = customerRepository
	}

	async execute (phone: string, message: string): Promise<boolean>{
		return await this.customerRepository.inviteCustomer(phone, message)
	}

  async executeCCB (id: string, status: string): Promise<boolean>{
		return await this.customerRepository.ccbStatus(id, status)
	}

  async executeBureauMessage (phone: string){
		return await this.customerRepository.sendBureauMessage(phone,'BrandsCard: Sua avaliação avançou para a próxima etapa, agora basta acessar seu e-mail e assinar os termos que enviamos para você e seus créditos estarão liberados!', 'Quase lá!')
	}

  async executeTransaction (phone: string, desc: string, amount: number){
		return await this.customerRepository.sendTransactions(phone, desc, amount)
	}
}

export default SendMessageUseCase
