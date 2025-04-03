import api, { PaginatedResponse } from 'src/lib/api'
import { EstablishmentOwner } from 'src/models/establishmentOwner'

export class ECOwnerRepository {

	async fetchECOwners (limit?: number, offset?: number,selectedSearchType?: string, searchValueBy?: string, employeeId?: number): Promise<PaginatedResponse> {
    const employeeType = 'establishmentOwner'
		const params = Object.fromEntries(Object.entries({
			limit,
			offset,
      [selectedSearchType || '']: searchValueBy,
      employeeType,
			employeeId
		}).filter(([, value]) => value != null))

		try {
			const data = await api.requestGet('/employee', params)
			const json: PaginatedResponse = {
				data: data.data.map((item: any) => EstablishmentOwner.fromJson(item)),
				totalItems: data.totalItems
			}
			return json
		} catch (error) {
			throw new Error('Erro ao buscar polos')
		}
	}
}
