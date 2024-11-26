import api, { PaginatedResponse } from 'src/lib/api';

export class NotificationRepository {


  async fetchNotifications(
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
      const data = await api.requestGet('/sms', params);
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

}
