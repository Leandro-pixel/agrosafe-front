import { PaginatedResponse } from 'src/lib/api'
import { UserRepository } from 'src/repositories/userRepository'

class FetchUsersUseCase {
	constructor (private repository: UserRepository) {
		this.repository = repository
	}

	async execute (limit: number, offset: number, email?: string, hubId?: string, storeId?: string): Promise<PaginatedResponse> {
		return await this.repository.fetchUsers(limit, offset, email, hubId, storeId)
	}
  async executeBrands (limit: number, offset: number,ecId: number, email?: string, hubId?: string, storeId?: string): Promise<PaginatedResponse> {
		return await this.repository.fetchBrandsUsers(limit, offset,ecId, email, hubId, storeId)
	}
}

export default FetchUsersUseCase
