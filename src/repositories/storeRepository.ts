import api, { PaginatedResponse } from 'src/lib/api';
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
      console.log('EC:' + ec.toJson);
      throw new Error('Erro ao salvar loja2');
    }
  }

  async fetchStores(
    limit?: number,
    offset?: number,
    filter?: string
  ): Promise<PaginatedResponse> {
    console.log('chegou aqui');
    const params = Object.fromEntries(
      Object.entries({
        limit,
        offset,
        filter,
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

  async disableStore(id: string) {
    try {
      await api.requestDelete(`/store/inactivate/${id}`);
    } catch (error) {
      throw new Error('Erro ao desativar loja');
    }
  }
}
