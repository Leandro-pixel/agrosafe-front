import { Formatter } from 'src/utils/formatter'
import { Address } from './address'
//import { Hub } from './hub'


export class Store {
  constructor(
    public id: number | null = null,
    public cnpj: string = '',
    public cpf: string = '',
    public businessName: string = '',
    public tradeName: string = '',
    public automaticStatusAnticipation: boolean = false,
    public initialValueCard: string = '',
    public maximumNumberInstallments: number = 6,
    public cardCreditLimit: string = '',
    public cardDebitLimit: string = '',
    public totalBalance: string = '',
    public amountToReceive: string = '',
    public availableCreditBalance: string = '',
    public outstandingCredit: string = '',
    public splitPercentage: string = '',
    public issuanceDate: string | null = null,
    public email: string = '',
    public phone: string = '',
    public street: string = '',
    public number: string = '',
    public complement: string = '',
    public neighborhood: string = '',
    public city: string = '',
    public state: string = '',
    public postalCode: string = '',
    public customerLimit: number = 20,
    public amountToReceiveWithFee: number = 0.0,
    public discountedByAnticipationFee: number = 0.0,
    public captureFee: number = 0.0,
    public splitDiscount: number = 0.0,
    public splitStatus: boolean | string = '',
    public supplierStatus: boolean | string = '',
    public status: boolean | string = '',
    public deactivationStatus: boolean | string = '',
    public deactivationDate: string | null = null,
    public createdAt: string = '',
    public updatedAt: string = ''
  ) {}

  static fromJson(json: any): Store {
    return new Store(
      json.id ?? null,
      json.cnpj ?? '',
      json.cpf ?? '',
      json.businessName ?? '',
      json.tradeName ?? '',
      Boolean(json.automaticStatusAnticipation),
      json.initialValueCard ?? '',
      json.maximumNumberInstallments ?? 6,
      json.cardCreditLimit ?? '',
      json.cardDebitLimit ?? '',
      json.totalBalance ?? '',
      json.amountToReceive ?? '',
      json.availableCreditBalance ?? '',
      json.outstandingCredit ?? '',
      json.splitPercentage ?? '',
      json.issuanceDate ?? null,
      json.email ?? '',
      json.phone ?? '',
      json.street ?? '',
      json.number ?? '',
      json.complement ?? '',
      json.neighborhood ?? '',
      json.city ?? '',
      json.state ?? '',
      json.postalCode ?? '',
      json.customerLimit ?? 20,
      Number(json.amountToReceiveWithFee ?? 0),
      Number(json.discountedByAnticipationFee ?? 0),
      Number(json.captureFee ?? 0),
      Number(json.splitDiscount ?? 0),
      json.splitStatus ?? '',
      json.supplierStatus ?? '',
      json.status ?? '',
      json.deactivationStatus ?? '',
      json.deactivationDate ?? null,
      json.createdAt ?? '',
      json.updatedAt ?? ''
    );
  }

  public toJson(): any {
    return {
      id: this.id,
      cnpj: Formatter.clearSymbolsAndLetters(this.cnpj),
      cpf: Formatter.clearSymbolsAndLetters(this.cpf),
      businessName: this.businessName,
      tradeName: this.tradeName,
      automaticStatusAnticipation: this.automaticStatusAnticipation,
      initialValueCard: this.initialValueCard,
      maximumNumberInstallments: this.maximumNumberInstallments,
      cardCreditLimit: this.cardCreditLimit,
      cardDebitLimit: this.cardDebitLimit,
      totalBalance: this.totalBalance,
      amountToReceive: this.amountToReceive,
      availableCreditBalance: this.availableCreditBalance,
      outstandingCredit: this.outstandingCredit,
      splitPercentage: this.splitPercentage,
      issuanceDate: this.issuanceDate,
      email: this.email,
      phone: Formatter.clearSymbolsAndLetters(this.phone),
      street: this.street,
      number: this.number,
      complement: this.complement,
      neighborhood: this.neighborhood,
      city: this.city,
      state: this.state,
      postalCode: this.postalCode,
      customerLimit: this.customerLimit,
      amountToReceiveWithFee: this.amountToReceiveWithFee,
      discountedByAnticipationFee: this.discountedByAnticipationFee,
      captureFee: this.captureFee,
      splitDiscount: this.splitDiscount,
      splitStatus: this.splitStatus,
      supplierStatus: this.supplierStatus,
      status: this.status,
      deactivationStatus: this.deactivationStatus,
      deactivationDate: this.deactivationDate,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

export class EC {
    constructor (
      public businessName: string = '',
      public tradeName: string = '',
      public cpf: string = '',
      public cnpj: string = '',
      public automaticStatusAnticipation: string = 'false',
      public establishmentEmail: string = '',
      public establishmentPhone: string = '',
      public employeeEmail: string = '',
      public employeePhone: string = '',
      public employeeName: string = '',
      public address: Address = new Address(),
      public city: string = address.city,
      public state: string = address.uf,
      public neighborhood: string = address.neighborhood,
      public street: string = address.street,
      public number: string = address.number,
      public postalCode: string = address.zipCode.getCodeWithoutSymbols(),
      public complement: string = address.complement,
      public employeeId: string = '',
      public splitStatus: string = 'false',
      public supplierStatus: string = 'false',
      public maximumNumberInstallments: number | null = null
    ) {}


    static fromJson(json: any): EC | undefined {
      if (!json) return;
      return new EC(
        json.businessName,
        json.tradeName,
        json.cpf,
        json.cnpj,
        json.automaticStatusAnticipation,
        json.establishmentEmail,
        json.establishmentPhone,
        json.employeeEmail,
        json.employeePhone,
        json.employeeName,
        // Endereço e outros campos
        new Address(), // ou Address.fromJson(json.address) se estiver estruturado
        json.city,
        json.state,
        json.neighborhood,
        json.street,
        json.number,
        json.postalCode,
        json.complement,
        json.employeeId,
        json.splitStatus,
        json.supplierStatus,
        json.maximumNumberInstallments !== undefined ? Number(json.maximumNumberInstallments) : null // 👈 aqui
      );
    }

    public toJson() {
      const json: any = {
        businessName: this.businessName,
        tradeName: this.tradeName,
        cpf: Formatter.clearSymbolsAndLetters(this.cpf),
        cnpj: Formatter.clearSymbolsAndLetters(this.cnpj),
        automaticStatusAnticipation: this.automaticStatusAnticipation,
        establishmentEmail: this.establishmentEmail,
        establishmentPhone: Formatter.clearSymbolsAndLetters(this.establishmentPhone),
        employeeEmail: this.employeeEmail,
        employeePhone: Formatter.clearSymbolsAndLetters(this.employeePhone),
        employeeName: this.employeeName,
        city: this.address.city,
        state: this.address.uf,
        neighborhood: this.address.neighborhood,
        street: this.address.street,
        number: this.address.number,
        postalCode: this.address.zipCode.getCodeWithoutSymbols(),
        complement: this.address.complement,
        splitStatus: this.splitStatus,
        supplierStatus: this.supplierStatus,
      };

      if (this.employeeId !== '0') {
        json.employeeId = this.employeeId;
      }

      if (this.maximumNumberInstallments !== null) {
        json.maximumNumberInstallments = this.maximumNumberInstallments;
      }

      return json;
    }

}
