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
		public userType = '',
		public name = '',
		public cpf = '',
		public rg = '',
		public currentBalance = '0.00',
		public birthDate: string | null = null,
		public gender: string | null = null,
		public email: string | null = '',
		public phone: string | null = '',
		public fatherName: string | null = null,
		public motherName: string | null = null,
		public maritalStatus: string | null = null,
		public street: string | null = '',
		public number: string | null = '',
		public complement: string | null = null,
		public neighborhood: string | null = '',
		public city: string | null = '',
		public state: string | null = '',
		public postalCode: string | null = '',
		public status = true,
		public changePassword = false,
		public codeValidation = false,
		public deviceId = '',
		public deactivationDate: string | null = null,
		public createdAt = '',
		public updatedAt = ''
	) {}

	public toString(): string {
		return `${this.name}, ${this.email}, ${this.cpf}, ${this.phone}, ${this.street}, ${this.city}, ${this.state}`;
	}

	// Método ajustado para mapear corretamente os campos do JSON
	static fromJson(json: any): CustomerBrands {
		return new CustomerBrands(
			json.id || 0,
			json.userType || '',
			json.name || '',
			json.cpf || '',
			json.rg || '',
			json.currentBalance || '0.00',
			json.birthDate || null,
			json.gender || null,
			json.email || null,
			json.phone || null,
			json.fatherName || null,
			json.motherName || null,
			json.maritalStatus || null,
			json.street || null,
			json.number || null,
			json.complement || null,
			json.neighborhood || null,
			json.city || null,
			json.state || null,
			json.postalCode || null,
			json.status || true,
			json.changePassword || false,
			json.codeValidation || false,
			json.deviceId || '',
			json.deactivationDate || null,
			json.createdAt || '',
			json.updatedAt || ''
		);
	}

	public toJson(): any {
		return {
			id: this.id,
			userType: this.userType,
			name: this.name,
			cpf: Formatter.clearSymbolsAndLetters(this.cpf),
			rg: Formatter.clearSymbolsAndLetters(this.rg),
			currentBalance: this.currentBalance,
			birthDate: this.birthDate,
			gender: this.gender,
			email: this.email,
			phone: Formatter.clearSymbolsAndLetters(this.phone || ''),
			fatherName: this.fatherName,
			motherName: this.motherName,
			maritalStatus: this.maritalStatus,
			street: this.street,
			number: this.number,
			complement: this.complement,
			neighborhood: this.neighborhood,
			city: this.city,
			state: this.state,
			postalCode: this.postalCode,
			status: this.status,
			changePassword: this.changePassword,
			codeValidation: this.codeValidation,
			deviceId: this.deviceId,
			deactivationDate: this.deactivationDate,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt
		};
	}

	public isValid(): boolean {
		return (
			this.name !== '' &&
			Validator.isValidEmail(this.email || '') &&
			Validator.isValidCPF(this.cpf) &&
			Validator.isValidPhoneNumber(this.phone || '')
		);
	}
}
