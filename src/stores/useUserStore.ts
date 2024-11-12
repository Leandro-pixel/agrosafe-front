import { defineStore } from 'pinia'
import { UserData, User } from 'src/models/user'
import { UserRepository } from 'src/repositories/userRepository'
import FetchUserDataUseCase from 'src/usecases/fetchUserDataUseCase'
import FetchUsersUseCase from 'src/usecases/fetchUsersUseCase'
import { ref } from 'vue'

const repository = new UserRepository()
const fetchUserDataUseCase = new FetchUserDataUseCase(repository)
const fetchUsersUseCase = new FetchUsersUseCase(repository)

export const useUserStore = defineStore('user', {
	state: () => ({
		user: ref(new UserData()),
		users: [] as Array<User>,
		totalItemsInDB: 0
	}),
	getters: {
		getUser: (state) => state.user,
		getUsers: (state) => state.users
	},
	actions: {
		async fetchUserData () {
			if (this.user.id !== '') return this.user
			this.user = await fetchUserDataUseCase.execute()
			return this.user
		},
		async fetchUsers (limit: number, offset: number, email?: string, hubId?: string, storeId?: string) {
			const response = await fetchUsersUseCase.execute(limit, offset, email, hubId, storeId)
			this.users = response.data
			this.totalItemsInDB = response.totalItems
		},

    async fetchBrandsUsers (limit: number, offset: number,ecId: number, email?: string, hubId?: string, storeId?: string) {
			const response = await fetchUsersUseCase.executeBrands(limit, offset,ecId, email, hubId, storeId)
			this.users = response.data
			this.totalItemsInDB = response.totalItems
		}
	}
})
