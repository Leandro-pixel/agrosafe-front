import { AuthRepository } from 'src/repositories/authRepository'

class SendForgotPasswordCodeUseCase {
	private readonly authRepository: AuthRepository
	constructor (authRepository: AuthRepository) {
		this.authRepository = authRepository
	}

	async execute (email: string) {
		return await this.authRepository.sendForgotPasswordCode(email)
	}

  async execute2 (email: string, document: string, phone: string) {
		return await this.authRepository.sendForgotPassword(email, document, phone)
	}
}

export default SendForgotPasswordCodeUseCase
