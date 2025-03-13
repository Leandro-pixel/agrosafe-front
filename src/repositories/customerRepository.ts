import api, { PaginatedResponse } from 'src/lib/api';
import { CustomerBrands, ECCustomer } from 'src/models/customer';
import { Limit } from 'src/models/interfaces/limit';
import { Formatter } from 'src/utils/formatter';

export class CustomerRepository {
  async inviteCustomer(oldPhone: string, establishmentId: string) {
    const phone = Formatter.clearSymbolsAndLetters(oldPhone)

    const params = Object.fromEntries(Object.entries({
			phone,
      establishmentId,
		}).filter(([, value]) => value !== undefined && value !== ''))
    try {
      return await api.requestPost('/sms/invitation', null,params);
    } catch (error) {
      throw new Error('Erro ao enviar mensagem');
    }
  }

  async ccbStatus(id: string, status: string) {
    const params = Object.fromEntries(Object.entries({
			status,
		}).filter(([, value]) => value !== undefined && value !== ''))
    try {
      return await api.requestPut(`/ccb/status/${id}`, null,params);
    } catch (error) {
      throw new Error('Erro ao ativar conta, verifique se o usuário finalizou seu cadastro');
    }
  }

  async sendBureauMessage(phone: string,description: string,title: string) {

    const payload = Object.fromEntries(Object.entries({
			phone,
      description,
      title
		}).filter(([, value]) => value !== undefined && value !== ''))
    try {
      return await api.requestPost('/sms', payload);
    } catch (error) {
      throw new Error('Erro ao enviar mensagem');
    }
  }

  async sendTransactions(phone: string, description: string, amount: number) {

    const payload = Object.fromEntries(Object.entries({
			phone,
      description,
      amount
		}).filter(([, value]) => value !== undefined && value !== ''))
    try {
      return await api.requestPost('/sms/transaction', payload);
    } catch (error) {
      throw new Error('Erro ao enviar mensagem');
    }
  }

  async fetchBrandsUsers (limit?: number, offset?: number, searchByType?: string,searchValueBy?: string,): Promise<PaginatedResponse> {
		const params = Object.fromEntries(
      Object.entries({
        [searchByType || '']: searchValueBy,
        [limit || '']: limit,
        [offset || '']: offset,
      }).filter(([, value]) => value !== undefined)
    );
    console.log('parametros' + params)
		try {
			const data = await api.requestGet('/user', params)
			const json: PaginatedResponse = {
				data: data.data.map((item: any) => CustomerBrands.fromJson(item)),
				totalItems: data.totalItems
			}
      /*
       if (Array.isArray(data.data)) {
        // Verificar o conteúdo antes de aplicar createDynamicObject
        const mappedData = data.data.map((item: any) => {
          const dynamicItem = createDynamicObject(item);
          return dynamicItem;
        });

        const json: PaginatedResponse = {
          data: mappedData,
          totalItems: data.totalItems
        };
        return json;
      } else {
        console.error('data.data não é um array:', data.data);
        throw new Error('Dados de resposta inesperados');
      }
      */
      console.log(data.data.map((item: any) => CustomerBrands.fromJson(item)))
			return json
		} catch (error) {
			throw new Error('Erro ao buscar usuários')
		}
	}

  async fetchECUsers (limit?: number, offset?: number, establishmentId?: number, email?: string, hubId?: string, storeId?: string): Promise<PaginatedResponse> {
		const params = Object.fromEntries(Object.entries({
			limit,
			offset,
      establishmentId,
			email,
			hubId,
			storeId
		}).filter(([, value]) => value !== undefined && value !== ''))
    console.log('parametros' + params)
		try {
			const data = await api.requestGet('/establishment/customers', params)
			const json: PaginatedResponse = {
				data: data.data.map((item: any) => ECCustomer.fromJson(item)),
				totalItems: data.totalItems
			}
      console.log(data.data.map((item: any) => ECCustomer.fromJson(item)))
			return json
		} catch (error) {
			throw new Error('Erro ao buscar usuários')
		}
	}

  async fetchLimit(cpf: string): Promise<Limit[]> {
    try {
      const data = await api.requestGet(`/helpers/customer-card-infos/${cpf}`);
      return data as unknown as Limit[];
    } catch (error) {
      throw new Error('Erro ao buscar limites');
    }
  }
}
