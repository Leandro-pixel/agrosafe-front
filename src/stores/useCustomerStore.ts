import { defineStore } from 'pinia'
import { Limit } from 'src/models/interfaces/limit'
import { CustomerRepository } from 'src/repositories/customerRepository'
import CheckLimitUseCase from 'src/usecases/checkLimitUseCase'
import SendMessageUseCase from 'src/usecases/sendMessageUseCase'

const repository = new CustomerRepository()
const sendMessageUseCase = new SendMessageUseCase(repository)
const checkLimitUseCase = new CheckLimitUseCase(repository)

export const useCustomerStore = defineStore('customer', {
	actions: {

		async inviteCustomer (phone: string, message: string): Promise<boolean>{
			return await sendMessageUseCase.execute(phone, message)
		},
		async checkLimit (cpf: string): Promise<Limit[]> {
			return await checkLimitUseCase.execute(cpf)
		}
	}
})
