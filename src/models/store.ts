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
