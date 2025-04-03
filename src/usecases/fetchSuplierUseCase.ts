import { PaginatedResponse } from 'src/lib/api'
import { SuplierRepository } from 'src/repositories/suplierRepository'

class FetchSuplierUseCase {
	private suplierRepository: SuplierRepository
	constructor (suplierRepository: SuplierRepository) {
		this.suplierRepository = suplierRepository
	}

	async execute (limit:number, offset:number, filter:string): Promise<PaginatedResponse> {
    console.log('veio aqui2')
		return this.suplierRepository.fetchSuplier(limit, offset, filter)
	}
  async executeFindOne (id?: number, supplierStatus?: boolean){
		return this.suplierRepository.fetchOne(id, supplierStatus)
	}
  async executeSuplier (limit:number, offset:number, searchByType?: string, searchValueBy?: string): Promise<PaginatedResponse> {
    console.log('veio aqui2')
		return this.suplierRepository.fetchSuplier(limit, offset, searchByType, searchValueBy, 'true')
	}
}

export default FetchSuplierUseCase
