import { AuthRepository } from 'src/repositories/authRepository'

class ChangePasswordUseCase {
	constructor (private readonly authRepository: AuthRepository) {
		this.authRepository = authRepository
	}

	async execute (currentPassword:string, newPassword:string) {
		return await this.authRepository.changePassword(currentPassword, newPassword)
	}

  async executeBySupport (userId:number, seeUser:boolean) {
		return await this.authRepository.changePasswordBySupport(userId, seeUser)
	}
}

export default ChangePasswordUseCase
