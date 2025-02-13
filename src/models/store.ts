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
		public supplierStatus: string = 'false'
	) {}

	static fromJson (json: any): EC | undefined {
		if (!json) return
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
			// Mapeamento direto dos campos do endereço
			json.city,
			json.neighborhood,
			json.street,
			json.number,
			json.postalCode,
			json.complement,
			json.employeeId,
			json.splitStatus,
			json.supplierStatus
		)
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
			// Mapeamento direto dos campos de endereço
			city: this.address.city,
      state: this.address.uf,
			neighborhood: this.address.neighborhood,
			street: this.address.street,
			number: this.address.number,
			postalCode: this.address.zipCode.getCodeWithoutSymbols(),
			complement: this.address.complement,
			splitStatus: this.splitStatus,
			supplierStatus: this.supplierStatus
		};

		// Condicional para incluir `employeeId` apenas se for diferente de 0
		if (this.employeeId !== '0') {
			json.employeeId = this.employeeId;
		}

		return json;
	}
}
