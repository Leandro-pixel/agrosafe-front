import api from '../lib/api';
import { SupStore } from 'src/models/supUserData';

export class SupRepository {

  async fetchUserData() {
    try {
      const data = await api.requestGet('/profile'); // Busca os dados da API

      // Cria um objeto da store e salva os dados no localStorage
      const supStore = new SupStore();
      supStore.data = {
        employee: {
          id: data.employee.id,
          name: data.employee.name,
          cpf: data.employee.cpf,
          employeeType: data.employee.employeeType,
          establishmentId: data.employee.establishmentId,
          currentBalance: data.employee.currentBalance,
          amountToReceive: data.employee.amountToReceive,
          email: data.employee.email,
          phone: data.employee.phone,
          status: data.employee.status,
          changePassword: data.employee.changePassword,
          createdAt: data.employee.createdAt,
          updatedAt: data.employee.updatedAt,
        },
      };

      // Salva os dados no localStorage
      supStore.saveToLocalStorage();
      console.log('aquiii nome' + supStore.data.employee.name);
      return supStore.data; // Retorna os dados para uso imediato ou para outra lógica
    } catch (error) {
      throw new Error('Erro ao buscar dados do suporte');
    }
  }
}
