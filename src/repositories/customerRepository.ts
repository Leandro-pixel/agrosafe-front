import api from 'src/lib/api';
import { Limit } from 'src/models/interfaces/limit';

export class CustomerRepository {
  async inviteCustomer(phone: string, message: string) {
    try {
      return await api.requestPost('/helpers/send-sms', { phone, message });
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
