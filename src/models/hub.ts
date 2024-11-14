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
		public name = '',
		public email = '',
		public phone = '',
		public employeeType = '',
	) {}

	public static fromJson (json: any): Polo | undefined {
		if (!json) return
		return new Polo(
			json.name,
			json.email,
			json.phone,
			json.employeeType,
		)
	}

	public toString (): string {
		return `${this.name}, ${this.email}, ${this.phone}, ${this.employeeType}`
	}

	public toJson () {
		return {
			name: this.name,
			email: this.email,
			phone: Formatter.clearSymbolsAndLetters(this.phone || ''),
			employeeType: this.employeeType,
		}
	}
}

