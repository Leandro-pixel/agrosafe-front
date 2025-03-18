import api, { PaginatedResponse } from 'src/lib/api';
import { Establishment } from 'src/models/establishment';
import { Supplier } from 'src/models/suplier';

export class SuplierRepository {
  async createSuplier(suplier: Supplier): Promise<Supplier> {
    try {
      const response = await api.requestPost('/establishment', suplier.toJson());
      return Supplier.fromJson(response) as Supplier;
    } catch (error) {
      throw new Error('Erro ao salvar loja');
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
      const data = await api.requestGet('/establishment/find', params);
      return Establishment.fromJson(data);
    } catch (error) {
      throw new Error('Erro ao buscar lojas');
    }
  }


  async fetchSuplier(
    limit?: number,
    offset?: number,
    searchByType?: string,
    searchValueBy?: string,
    supplierStatus?: string,
  ): Promise<PaginatedResponse> {

    const params = Object.fromEntries(
      Object.entries({
        limit,
        offset,
        supplierStatus,
        [searchByType || '']: searchValueBy,
      }).filter(([, value]) => value !== null)
    );
    try {
      console.log('agora veio aqui');
      const data = await api.requestGet('/establishment', params);
      console.log('aaaaaaaaaaaa', data);

      return data;
    } catch (error) {
      throw new Error('Erro ao buscar fornecedores');
    }
  }


  async activateSuplier(id: string, status: boolean) {
    const params = Object.fromEntries(
      Object.entries({
        status
      }).filter(([, value]) => value !== undefined)
    );
    try {
      await api.requestPut(`/establishment/approve/${id}`, {}, params);
    } catch (error) {
      throw new Error('Erro ao ativar fornecedor');
    }
  }

  async disableSuplier(id: string) {
    try {
      await api.requestDelete(`/store/inactivate/${id}`);
    } catch (error) {
      throw new Error('Erro ao desativar loja');
    }
  }
}
