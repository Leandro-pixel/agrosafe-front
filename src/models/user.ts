import { translateUserType } from 'src/models/enums/userTypeEnum'
import { Address } from './address'
import { Seller } from './seller'
import { Store } from './store'
import { Hub } from './hub'
import { translateStatus } from 'src/models/enums/activeStatusEnum'
import { capitalize } from 'vue'

class User {
	constructor (
		public id: string = '',
		public email: string = '',
		public emailWasVerified: boolean = false,
		public status: string = '',
		public userType: string = '',
		public detail: Seller | Store | Hub | undefined | null = undefined
	) {}

	static fromJson (json: any): User | undefined {
		if (json === null || json === undefined) return

		const detailClass = [Seller, Store, Hub].find(c => c.name === capitalize(json.userType))

		return new User(
			json.id,
			json.email,
			json.emailWasVerified,
			translateStatus(json.status),
			translateUserType(json.userType),
			detailClass ? detailClass.fromJson(json.detail) : undefined
		)
	}

	toJson () {
		return {
			id: this.id,
			email: this.email,
			emailWasVerified: this.emailWasVerified,
			status: this.status,
			userType: this.userType
		}
	}
}

class CreateUser {
	constructor (
		public userType: string = '',
		public email: string = '',
		public autoActivate: boolean = false,
		public relationId:string = ''
	) {}

	toJson () {
		return {
			email: this.email,
			userType: this.userType,
			relationId: this.relationId,
			autoActivate: this.autoActivate
		}
	}
}

class UserData {
	constructor (
		public id: string = '',
		public detailId: string = '',
		public name: string = "Brand's Card",
		public document: string = '',
		public phone: string = '',
		public email: string = '',
		public address: Address = new Address(),
		public userType: string = '') {}

	static fromJson (json: any) {
		return new UserData(
			json.id || json.userId,
			json.detailId,
			json.name,
			json.document,
			json.phone,
			json.email,
			Address.fromJson(json.address),
			translateUserType(json.userType))
	}
}

export { CreateUser, UserData, User }
