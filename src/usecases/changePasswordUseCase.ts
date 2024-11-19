import { AuthRepository } from 'src/repositories/authRepository'

class ChangePasswordUseCase {
	constructor (private readonly authRepository: AuthRepository) {
		this.authRepository = authRepository
	}

	async execute (currentPassword:string, newPassword:string) {
		return await this.authRepository.changePassword(currentPassword, newPassword)
	}
}

export default ChangePasswordUseCase
