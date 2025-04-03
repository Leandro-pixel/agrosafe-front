import { Formatter } from 'src/utils/formatter'
import { Address } from './address'

export class Hub {
	constructor (
		public id = '',
		public fullName = '',
		public fantasyName = '',
		public document = '',
		public address = new Address(),
		public active = false,
		public createdAt = Date.now(),
		public phone = ''
	) {}

	public static fromJson (json: any): Hub | undefined {
		if (!json) return
		return new Hub(
			json.id,
			json.fullName,
			json.fantasyName,
			json.document,
			Address.fromJson(json.address),
			json.active,
			json.createdAt
		)
	}

	public toString (): string {
		return `${this.fullName}, ${this.fantasyName}, ${this.document}, ${this.address}, ${this.active}, ${this.createdAt}`
	}

	public toJson () {
		return {
			fullName: this.fullName,
			fantasyName: this.fantasyName,
			document: Formatter.clearSymbolsAndLetters(this.document),
			phone: Formatter.clearSymbolsAndLetters(this.phone || ''),
			address: this.address.toJson()
		}
	}
}


export class HubBrands {
	constructor (
		public id = 0,
		public name = '',  // Ajuste para incluir `name`
		public employeeType = '', // Ajuste para incluir `employeeType`
		public establishmentId: string | null = null, // Pode ser null conforme o payload
		public currentBalance = 0,
		public amountToReceive = 0,
		public email = '',
		public phone = '',
		public status = false,
		public changePassword = false,
		public createdAt = '',
		public updatedAt = ''
	) {}

	public static fromJson (json: any): HubBrands | undefined {
		if (!json) return;
		return new HubBrands(
			json.id,
			json.name,
			json.employeeType,
			json.establishmentId,
			json.currentBalance,
			json.amountToReceive,
			json.email,
			json.phone,
			json.status,
			json.changePassword,
			json.createdAt,
			json.updatedAt
		);
	}

	public toString (): string {
		return `${this.name}, ${this.employeeType}, ${this.email}, ${this.phone}, ${this.status}`;
	}

	public toJson () {
		return {
			name: this.name,
			employeeType: this.employeeType,
			email: this.email,
			phone: Formatter.clearSymbolsAndLetters(this.phone || ''),
			status: this.status,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt
		};
	}
}

export class Polo {
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
		public address: Address = new Address(),
		public city: string = address.city,
		public state: string = address.uf,
		public neighborhood: string = address.neighborhood,
		public street: string = address.street,
		public number: string = address.number,
		public postalCode: string = address.zipCode.getCodeWithoutSymbols(),
		public complement: string = address.complement,
		public employeeId: string = '',
		public isPolo: string = 'false'
	) {}

	public static fromJson (json: any): Polo | undefined {
		if (!json) return
		return new Polo(
			json.businessName,
			json.tradeName,
			json.cpf,
			json.cnpj,
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
			json.isPolo
		)
	}

	public toJson () {
		return {
			businessName: this.businessName,
			tradeName: this.tradeName,
			cpf: Formatter.clearSymbolsAndLetters(this.cpf),
			cnpj: Formatter.clearSymbolsAndLetters(this.cnpj),
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
			isPolo: this.isPolo
		};
	}
}

