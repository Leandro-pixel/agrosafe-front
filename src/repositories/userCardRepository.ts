import api, { PaginatedResponse } from 'src/lib/api';
import { UserCard } from 'src/models/userCard';

export class UserCardRepository {
  async fetchCards(
    userId?: number,
    cardId?: number
  ): Promise<PaginatedResponse> {


    const params = Object.fromEntries(Object.entries({
			userId,
      cardId
		}).filter(([, value]) => value !== undefined))

    try {
      console.log('agora veio aqui T' + params);
      const data = await api.requestGet(
        '/user/card',
        params
      );
      console.log('aaaaaaaaaaaa T', data);

      const json: PaginatedResponse = {
        data: Array.isArray(data.data) ? data.data.map((item: any) => UserCard.fromJson(item)) : [],
        totalItems: data.totalItems ?? 0,
      };
      console.log('não ta jaisão');
      return json;
    } catch (error) {
      console.log(error)
      throw new Error('usuário não encontrado');
    }
  }
}
