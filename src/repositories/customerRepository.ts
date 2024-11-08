import api from 'src/lib/api';
import { Limit } from 'src/models/interfaces/limit';
import { Formatter } from 'src/utils/formatter';

export class CustomerRepository {
  async inviteCustomer(oldPhone: string, establishmentId: string) {
    const phone = Formatter.clearSymbolsAndLetters(oldPhone)
    try {
      return await api.requestPost('/sms/invitation', null,{ phone, establishmentId });
    } catch (error) {
      throw new Error('Erro ao enviar mensagem');
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
