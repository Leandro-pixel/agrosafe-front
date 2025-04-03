import api from '../lib/api'
import { PoloDataStore } from 'src/models/poloUserData'

export class PoloRepository {
  async fetchPoloUserData () {
    try {
      const data = await api.requestGet('/profile')

      // Renomeando a variável para evitar conflito com a classe
      const poloDataStoreInstance = new PoloDataStore()

      poloDataStoreInstance.data = {
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
      poloDataStoreInstance.saveToLocalStorage()

      // Retorna os dados
      return poloDataStoreInstance.data
    } catch (error) {
      console.warn('Erro 400 ignorado. Avançando sem erro.')
        return null // Retorna nulo ou outro valor padrão
    }
  }

  // Método para limpar os dados armazenados no localStorage
  clearData() {
    const poloStore = new PoloDataStore()
    poloStore.clearData()
  }

  // Método para carregar os dados do localStorage
  loadData() {
    const poloStore = new PoloDataStore()
    poloStore.loadFromLocalStorage()
    return poloStore.data
  }
}
