import api, { PaginatedResponse } from 'src/lib/api'
import { Employee } from 'src/models/employee'
import { Hub, HubBrands, Polo } from 'src/models/hub'
import { Representative } from 'src/models/representative'
import { User } from 'src/models/userCLient'

export class HubRepository {
	async createHub (hub: Hub): Promise<Hub> {
		try {
			const response = await api.requestPost('/hub', hub.toJson())
			return Hub.fromJson(response) as Hub
		} catch (error) {
			throw new Error('Erro ao salvar polo')
		}
	}

  async createPolo (polo: Polo): Promise<Polo> {
		try {
			const response = await api.requestPostWithApiKey('/establishment', polo.toJson())
			return Polo.fromJson(response) as Polo
		} catch (error) {
			throw new Error('Erro ao salvar polo')
		}
	}

  async createRep (rep: Representative): Promise<Representative> {
		try {
			const response = await api.requestPostWithApiKey('/employee/representative', rep.toJson())
			return Representative.fromJson(response) as Representative
		} catch (error) {
			throw new Error('Erro ao salvar polo')
		}
	}

	async fetchHubs (limit?: number, offset?: number, filter?: string): Promise<PaginatedResponse> {
		const params = Object.fromEntries(Object.entries({
			limit,
			offset,
			filter
		}).filter(([, value]) => value !== undefined))

		try {
			const data = await api.requestGet('/hub', params)
			const json: PaginatedResponse = {
				data: data.data.map((item: any) => Hub.fromJson(item)),
				totalItems: data.totalItems
			}
			return json
		} catch (error) {
			throw new Error('Erro ao buscar polos')
		}
	}

  async fetchOneUser(id?: number,viewPersonalData?: boolean,seeUser?: boolean) {
    const params = Object.fromEntries(
      Object.entries({
        id,
        viewPersonalData,
        seeUser
      }).filter(([, value]) => value !== undefined)
    );
    try {
      const data = await api.requestGet('/profile', params); // Busca os dados da API

      return User.fromJson(data); // Retorna os dados para uso imediato ou para outra lógica
    } catch (error) {
      throw new Error('Erro ao buscar dados do suporte');
    }
  }

  async fetchOnePolo(id?: number,viewPersonalData?: boolean,seeUser?: boolean) {
        const params = Object.fromEntries(
          Object.entries({
            id,
            viewPersonalData,
            seeUser
          }).filter(([, value]) => value !== undefined)
        );
        try {
          const data = await api.requestGet('/profile', params); // Busca os dados da API

          return Employee.fromJson(data); // Retorna os dados para uso imediato ou para outra lógica
        } catch (error) {
          throw new Error('Erro ao buscar dados do suporte');
        }
      }

      async fetchOneRep(id?: number,viewPersonalData?: boolean,seeUser?: boolean) {
        const params = Object.fromEntries(
          Object.entries({
            id,
            viewPersonalData,
            seeUser
          }).filter(([, value]) => value !== undefined)
        );
        try {
          const data = await api.requestGet('/profile', params); // Busca os dados da API

          return Employee.fromJson(data); // Retorna os dados para uso imediato ou para outra lógica
        } catch (error) {
          throw new Error('Erro ao buscar dados do suporte');
        }
      }

  async fetchHubsBrands (limit?: number, offset?: number,employeeType?: string,searchByType?: string, searchValueBy?: string, employeeId?: number ): Promise<PaginatedResponse> {
    //const type = 'polo'
		const params = Object.fromEntries(Object.entries({
			limit,
			offset,
      employeeType,
      [searchByType || '']: searchValueBy,
			employeeId
		}).filter(([, value]) => value != null))

		try {
			const data = await api.requestGet('/employee', params)
			const json: PaginatedResponse = {
				data: data.data.map((item: any) => HubBrands.fromJson(item)),
				totalItems: data.totalItems
			}
			return json
		} catch (error) {
			throw new Error('Erro ao buscar polos')
		}
	}

	async fetchHubById (id: string): Promise<Hub> {
		try {
			const data = await api.requestGet(`/hub/${id}`)
			return Hub.fromJson(data) as Hub
		} catch (error) {
			throw new Error('Erro ao buscar polo')
		}
	}

	async activateHub (id: string) {
		try {
			await api.requestPut(`/hub/activate/${id}`, null)
		} catch (error) {
			throw new Error('Erro ao ativar polo')
		}
	}

	async disableHub (id: string) {
		try {
			await api.requestDelete(`/hub/inactivate/${id}`)
		} catch (error) {
			throw new Error('Erro ao desativar polo')
		}
	}
}
