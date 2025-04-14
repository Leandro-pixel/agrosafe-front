import { defineStore } from 'pinia'
import { CustomerBrands } from 'src/models/customer'
import { Limit } from 'src/models/interfaces/limit'
import { CustomerRepository } from 'src/repositories/customerRepository'
import CheckLimitUseCase from 'src/usecases/checkLimitUseCase'
import SendMessageUseCase from 'src/usecases/sendMessageUseCase'
import FetchBUsersUseCase from 'src/usecases/fetchBUsersUseCase'
import { ref } from 'vue'

const repository = new CustomerRepository()
const sendMessageUseCase = new SendMessageUseCase(repository)
const checkLimitUseCase = new CheckLimitUseCase(repository)
const fetchUsersUseCase = new FetchBUsersUseCase(repository)

export const useCustomerStore = defineStore('customer', {
  state: () => ({
		user: ref(new CustomerBrands()),
		users: [] as Array<CustomerBrands>,
		totalItemsInDB: 0
	}),
	getters: {
		getUser: (state) => state.user,
		getUsers: (state) => state.users
	},
	actions: {

		async inviteCustomer (phone: string, message: string): Promise<boolean>{
			return await sendMessageUseCase.execute(phone, message)
		},

    async activateCustomer (id: string, status?: string, loginStatus?: boolean): Promise<boolean>{
			return await sendMessageUseCase.executeCCB(id, status, loginStatus)
		},

    async sendBureauMessage (phone: string,message: string, title: string){
			return await sendMessageUseCase.executeBureauMessage(phone, message, title)
		},

    async sendTransaction (phone: string, desc: string, amount: number){
			return await sendMessageUseCase.executeTransaction(phone, desc, amount)
		},

		async checkLimit (cpf: string): Promise<Limit[]> {
			return await checkLimitUseCase.execute(cpf)
		},
    async fetchBrandsUsers (limit: number, offset: number,searchByType?: string, searchValueBy?: string) {
      console.log('chegou aqui')
			const response = await fetchUsersUseCase.executeBrands(limit, offset,searchByType,searchValueBy)
			this.users = response.data
			this.totalItemsInDB = response.totalItems
		},
    async fetchECUsers (limit: number, offset: number,ecId?: number, email?: string, hubId?: string, storeId?: string) {
      console.log('chegou aqui')
			const response = await fetchUsersUseCase.executeECUsers(limit, offset,ecId, email, hubId, storeId)
			this.users = response.data
			this.totalItemsInDB = response.totalItems
		}
	}
})
