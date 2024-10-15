import { UserRepository } from 'src/repositories/userRepository'

class FetchUserDataUseCase {
	private userRepository: UserRepository
	constructor (userRepository: UserRepository) {
		this.userRepository = userRepository
	}

	async execute () {
		return await this.userRepository.fetchUserData()
	}
}

export default FetchUserDataUseCase
