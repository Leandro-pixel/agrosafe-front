import api from '../lib/api'
import { EmployeeEstablishmentStore } from 'src/models/ecUserData'

export class EmployeeEstablishmentRepository {

  // Método para buscar os dados de Employee e Establishment
  async fetchEmployeeEstablishmentData() {
    try {
      const data = await api.requestGet('/profile')

      // Criando a instância do EmployeeEstablishmentStore
      const employeeEstablishmentStore = new EmployeeEstablishmentStore()

      employeeEstablishmentStore.data = {
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
        establishment: {
          id: data.establishment.id,
          cnpj: data.establishment.cnpj,
          cpf: data.establishment.cpf,
          businessName: data.establishment.businessName,
          tradeName: data.establishment.tradeName,
          issuanceDate: data.establishment.issuanceDate,
          email: data.establishment.email,
          phone: data.establishment.phone,
          street: data.establishment.street,
          number: data.establishment.number,
          complement: data.establishment.complement,
          neighborhood: data.establishment.neighborhood,
          city: data.establishment.city,
          state: data.establishment.state,
          postalCode: data.establishment.postalCode,
          totalBalance: data.establishment.totalBalance,
          amountToReceive: data.establishment.amountToReceive,
          availableBalance: data.establishment.availableBalance,
          averageTicket: data.establishment.averageTicket,
          minimumPercentage: data.establishment.minimumPercentage,
          maximumPercentage: data.establishment.maximumPercentage,
          status: data.establishment.status,
          createdAt: data.establishment.createdAt,
          updatedAt: data.establishment.updatedAt,
        }
      }

      // Salva os dados no localStorage
      employeeEstablishmentStore.saveToLocalStorage()

      // Retorna os dados armazenados
      return employeeEstablishmentStore.data

    } catch (error) {
      throw new Error('Erro ao buscar dados de Employee e Establishment')
    }
  }

  // Método para limpar os dados armazenados no localStorage
  clearData() {
    const employeeEstablishmentStore = new EmployeeEstablishmentStore()
    employeeEstablishmentStore.clearData()
  }

  // Método para carregar os dados do localStorage
  loadData() {
    const employeeEstablishmentStore = new EmployeeEstablishmentStore()
    employeeEstablishmentStore.loadFromLocalStorage()
    return employeeEstablishmentStore.data
  }
}
