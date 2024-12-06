import { Formatter } from 'src/utils/formatter'
import { Address } from './address'
import { Hub } from './hub'

export class Store {
	constructor (
		public id: string = '',
		public fullName: string = '',
		public fantasyName: string = '',
		public document: string = '',
		public active: boolean = false,
		public createdAt: number = 0,
		public address: Address = new Address(),
		public hub: Hub = new Hub(),
		public phone: string = ''
	) {}

	static fromJson (json: any): Store | undefined {
		if (!json) return
		return new Store(
			json.id,
			json.fullName,
			json.fantasyName,
			json.document,
			Boolean(json.active),
			json.createdAt,
			Address.fromJson(json.address),
			Hub.fromJson(json.hub)
		)
	}

	public toJson () {
		return {
			hubId: this.hub.id,
			fullName: this.fullName,
			fantasyName: this.fantasyName,
			document: Formatter.clearSymbolsAndLetters(this.document),
			phone: Formatter.clearSymbolsAndLetters(this.phone || ''),
			address: this.address.toJson()
		}
	}
}
export class EC {
	constructor (
		public businessName: string = '',
		public tradeName: string = '',
		public cpf: string = '',
    public cnpj: string = '',
		public establishmentEmail: string = '',
		public establishmentPhone: string = '',
		public employeeEmail: string = '',
		public employeePhone: string = '',
		public employeeName: string = '',
    public city: string = '',
    public state: string = '',
    public neighborhood: string = '',
    public street: string = '',
    public number: string = '',
    public postalCode: string = '',
    public complement: string = '',
		public poloId: number = 0
	) {}

	static fromJson (json: any): EC | undefined {
		if (!json) return
		return new EC(
			json.businessName,
			json.tradeName,
			json.cpf,
      json.cnpj,
			json.establishmentEmail,
			json.establishmentPhone,
			json.employeeEmail,
			json.employeePhone,
			json.employeeName,
			json.city,
			json.neighborhood,
			json.street,
			json.number,
			json.postalCode,
      json.complement,
			json.poloId
		)
	}

	public toJson() {
    const json: any = {
      businessName: this.businessName,
      tradeName: this.tradeName,
      cpf: Formatter.clearSymbolsAndLetters(this.cpf),
      cnpj: Formatter.clearSymbolsAndLetters(this.cnpj),
      establishmentEmail: this.establishmentEmail,
      establishmentPhone: Formatter.clearSymbolsAndLetters(this.establishmentPhone),
      employeeEmail: this.employeeEmail,
      employeePhone: Formatter.clearSymbolsAndLetters(this.employeePhone),
      employeeName: this.employeeName,
      city: this.city,
      neighborhood: this.neighborhood,
      street: this.street,
      number: this.number,
      postalcode: Formatter.clearSymbolsAndLetters(this.postalCode),
      complement: this.complement,
    };

    // Condicional para incluir `poloId` apenas se for diferente de 0
    if (this.poloId !== 0) {
      json.poloId = this.poloId;
    }

    return json;
  }

}

