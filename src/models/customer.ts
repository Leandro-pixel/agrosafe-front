import { Formatter } from 'src/utils/formatter'
import { Address } from './address'
import { Validator } from 'src/utils/validator'

export class Customer {
	constructor (
		public name = '',
		public email = '',
		public document = '',
		public phone = '',
		public address = new Address()
	) {}

	public toString (): string {
		return `${this.name}, ${this.email}, ${this.document}, ${this.phone}, ${this.address}`
	}

	static fromJson (json: any): Customer {
		return new Customer(
			json.name || '',
			json.email || '',
			json.document || '',
			json.phone || '',
			Address.fromJson(json.address)
		)
	}

	public toJson (): any {
		return {
			name: this.name,
			document: Formatter.clearSymbolsAndLetters(this.document),
			phone: Formatter.clearSymbolsAndLetters(this.phone),
			email: this.email
		}
	}



	public isValid (): boolean {
		return this.name !== '' && Validator.isValidEmail(this.email) && Validator.isValidCPF(this.document) && Validator.isValidPhoneNumber(this.phone)
	}
}


export class CustomerBrands {
	constructor (
		public id = 0,
		public userId = 0,
		public establishmentId = 0,
		public creditAmount = 0,
		public name = '',
		public userType = '',
		public establishmentName = '',
		public createdAt = '',
		public updatedAt = '',
		public email = '',
		public document = '',
		public phone = '',
		public address = new Address()
	) {}

	public toString(): string {
		return `${this.name}, ${this.email}, ${this.document}, ${this.phone}, ${this.address}`;
	}

	// Método ajustado para mapear corretamente os campos do JSON
	static fromJson(json: any): CustomerBrands {
		return new CustomerBrands(
			json.id || 0,
			json.userId || 0,
			json.establishmentId || 0,
			json.creditAmount || 0,
			json.userName || '',
			json.userType || '',
			json.establishmentName || '',
			json.createdAt?.date || '',
			json.updatedAt?.date || '',
			json.email || '',
			json.document || '',
			json.phone || '',
			Address.fromJson(json.address || {})
		);
	}

	public toJson(): any {
		return {
			id: this.id,
			userId: this.userId,
			establishmentId: this.establishmentId,
			creditAmount: this.creditAmount,
			name: this.name,
			userType: this.userType,
			establishmentName: this.establishmentName,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
			document: Formatter.clearSymbolsAndLetters(this.document),
			phone: Formatter.clearSymbolsAndLetters(this.phone),
			email: this.email,
			address: this.address.toJson()
		};
	}

	public isValid(): boolean {
		return (
			this.name !== '' &&
			Validator.isValidEmail(this.email) &&
			Validator.isValidCPF(this.document) &&
			Validator.isValidPhoneNumber(this.phone)
		);
	}
}
