import { PaginatedResponse } from 'src/lib/api'
import { CustomerRepository } from 'src/repositories/customerRepository'

class FetchBUsersUseCase {
	constructor (private repository: CustomerRepository) {
		this.repository = repository
	}

  async executeBrands (limit: number, offset: number,ecId: string, email?: string, hubId?: string, storeId?: string): Promise<PaginatedResponse> {
		return await this.repository.fetchBrandsUsers(limit, offset,ecId, email, hubId, storeId)
	}
}

export default FetchBUsersUseCase
