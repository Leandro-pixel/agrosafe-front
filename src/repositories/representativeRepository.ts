import { RepDataStore } from 'src/models/repUserData'
import api from '../lib/api'

export class RepRepository {
  async fetchRepUserData () {
    try {
      const data = await api.requestGet('/profile')

      // Renomeando a variável para evitar conflito com a classe
      const repDataStoreInstance = new RepDataStore()

      repDataStoreInstance.data = {
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
        }
      }

      // Salva no localStorage
      repDataStoreInstance.saveToLocalStorage()

      // Retorna os dados
      return repDataStoreInstance.data
    } catch (error) {
      throw new Error('Erro ao buscar dados')
    }
  }

  // Método para limpar os dados armazenados no localStorage
  clearData() {
    const repStore = new RepDataStore()
    repStore.clearData()
  }

  // Método para carregar os dados do localStorage
  loadData() {
    const repStore = new RepDataStore()
    repStore.loadFromLocalStorage()
    return repStore.data
  }
}
