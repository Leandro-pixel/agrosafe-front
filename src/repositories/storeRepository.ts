import { UnauthorizedError } from 'src/lib/errors/unauthorizedError';
import { InternalError } from 'src/lib/errors/internalError';
import { BadRequestError } from 'src/lib/errors/badRequestError';
import { NotFoundError } from 'src/lib/errors/notFoundError';
import api, { PaginatedResponse } from 'src/lib/api';
import { NotAcceptableError } from 'src/lib/errors/notAcceptableError';
import { Establishment } from 'src/models/establishment';
import { EC, Store } from 'src/models/store';

export class StoreRepository {
  async createStore(store: Store): Promise<Store> {
    try {
      const response = await api.requestPost('/establishment', store.toJson());
      return Store.fromJson(response) as Store;
    } catch (error) {
      throw new Error('Erro ao salvar loja');
    }
  }

  async createEC(ec: EC): Promise<EC> {
    console.log(
      'Dados enviados para a API:',
      JSON.stringify(ec.toJson(), null, 2)
    );
    try {
      const response = await api.requestPost('/establishment', ec.toJson());


      return EC.fromJson(response) as EC;
    } catch (error) {
      console.error('Erro ao cadastrar loja:', error.response);

      if (error instanceof NotAcceptableError) {
        throw new Error('Erro 406: Alguma informação do formulário já esta sendo usada por outro EC');
      } else if (error instanceof BadRequestError) {
        throw new Error('Erro 400: Requisição inválida.');
      } else if (error instanceof UnauthorizedError) {
        throw new Error('Erro 401: Não autorizado.');
      } else if (error instanceof NotFoundError) {
        throw new Error('Erro 404: Recurso não encontrado.');
      } else if (error instanceof InternalError) {
        throw new Error('Erro 500: Erro interno do servidor.');
      } else {
        throw new Error(`Erro desconhecido: ${error.message}`);
      }
    }
  }

  async fetchOne(
    id?: number,
    supplierStatus?: boolean
  ){
    const params = Object.fromEntries(
      Object.entries({
        id,
        supplierStatus,
      }).filter(([, value]) => value !== undefined)
    );
    try {
      console.log('agora veio aqui');
      const data = await api.requestGet('/establishment/find', params);
      console.log('aaaaaaaaaaaa', data);
      return Establishment.fromJson(data);
    } catch (error) {
      throw new Error('Erro ao buscar lojas');
    }
  }

  async fetchStores(
    limit?: number,
    offset?: number,
    supplierStatus?: boolean,
    searchByType?: string,
    searchValueBy?: string,
    employeeId?: number
  ): Promise<PaginatedResponse> {
  

    const params = Object.fromEntries(
      Object.entries({
        [searchByType || '']: searchValueBy,
        limit,
        offset,
        supplierStatus,
        employeeId
      }).filter(([, value]) => value != null )
    );
    try {
      console.log('agora veio aqui');
      const data = await api.requestGet('/establishment', params);
      console.log('aaaaaaaaaaaa', data);
      /*
			const json: PaginatedResponse = {
				data: data.data.map((item: any) => Store.fromJson(item)),
				totalItems: data.totalItems
			}*/
      console.log('não ta jaisão');
      //return json
      return data;
    } catch (error) {
      throw new Error('Erro ao buscar lojas');
    }
  }

  async fetchSuplier(
    limit?: number,
    offset?: number,
    filter?: string,
    supplierStatus?: string,
  ): Promise<PaginatedResponse> {

    const params = Object.fromEntries(
      Object.entries({
        limit,
        offset,
        filter,
        supplierStatus
      }).filter(([, value]) => value !== undefined)
    );
    try {
      console.log('agora veio aqui');
      const data = await api.requestGet('/establishment', params);
      console.log('aaaaaaaaaaaa', data);
      /*
			const json: PaginatedResponse = {
				data: data.data.map((item: any) => Store.fromJson(item)),
				totalItems: data.totalItems
			}*/
      console.log('não ta jaisão');
      //return json
      return data;
    } catch (error) {
      throw new Error('Erro ao buscar lojas');
    }
  }

  async fetchStoreById(id: string): Promise<Store> {
    try {
      const data = await api.requestGet(`/store/${id}`);
      return Store.fromJson(data) as Store;
    } catch (error) {
      throw new Error('Erro ao buscar loja');
    }
  }

  async activateStore(id: string) {
    try {
      await api.requestPut(`/store/activate/${id}`, null);
    } catch (error) {
      throw new Error('Erro ao ativar loja');
    }
  }

  async activateEC(id: string, status: boolean) {
    const params = Object.fromEntries(
      Object.entries({
        status
      }).filter(([, value]) => value !== undefined)
    );
    try {
      await api.requestPut(`/establishment/approve/${id}`, {}, params);
    } catch (error) {
      throw new Error('Erro ao ativar loja');
    }
  }

  async disableStore(id: string) {
    try {
      await api.requestDelete(`/store/inactivate/${id}`);
    } catch (error) {
      throw new Error('Erro ao desativar loja');
    }
  }
}
