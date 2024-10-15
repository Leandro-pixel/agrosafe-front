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
