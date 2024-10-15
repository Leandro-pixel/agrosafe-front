import { Formatter } from 'src/utils/formatter'
import { Address } from './address'
import { Store } from './store'
import { User } from './user'

export class Seller {
	constructor (
		public name: string = '',
		public phone: string = '',
		public document: string = '',
		public address: Address = new Address(),
		public id: number = 0,
		public createdAt: number = 0,
		public image: string = '',
		public store: Store = new Store(),
		public user: User = new User()
	) {}

	static fromJson (json: any): Seller | undefined {
		if (!json) return
		return new Seller(
			json.name,
			Formatter.phoneToBR(json.phone),
			json.document,
			Address.fromJson(json.address),
			json.id,
			json.createdAt,
			json.image,
			Store.fromJson(json.store),
			User.fromJson(json.user)
		)
	}

	public toJson () {
		return {
			document: Formatter.clearSymbolsAndLetters(this.document),
			name: this.name,
			phone: Formatter.clearSymbolsAndLetters(this.phone),
			address: this.address.toJson(),
			createdAt: this.createdAt ? this.createdAt : null,
			image: this.image ? this.image : null,
			store: this.store ? this.store.toJson() : null,
			user: this.user ? this.user.toJson() : null
		}
	}

	public toJsonWithEmailAndPassword (email: string, password: string, code: string) {
		return {
			...this.toJson(),
			email,
			password,
			code
		}
	}
}
