import { defineStore } from 'pinia'
//import { Admin } from 'src/models/admin'
//import { Guest } from 'src/models/guest'
//import { Seller } from 'src/models/seller'
//import { CreateUser } from 'src/models/user'
import { AuthRepository } from 'src/repositories/authRepository'
//import ActivateUserUseCase from 'src/usecases/activateUserUseCase'
//import { AdminSignUpUseCase } from 'src/usecases/adminSignUpUseCase'
import ChangePasswordUseCase from 'src/usecases/changePasswordUseCase'
import SendForgotPasswordCodeUseCase from 'src/usecases/sendForgotPasswordCodeUseCase'
//import CreateUserUseCase from 'src/usecases/createUserUseCase'
//import DisableUserUseCase from 'src/usecases/disableUserUseCase'
//import { FetchInvitesUseCase } from 'src/usecases/fetchInvitesUseCase'
//import GuestSignUpUseCase from 'src/usecases/guestSignUpUsecase'
//import SellerSignUpUseCase from 'src/usecases/sellerSignUpUseCase'
//import SendForgotPasswordCodeUseCase from 'src/usecases/sendForgotPasswordCodeUseCase'
//import SendNewPasswordUseCase from 'src/usecases/sendNewPasswordUseCase'
//import StoreAndHubSignUpUseCase from 'src/usecases/storeAndHubSignUpUseCase'
//import { VerifyInviteCodeUseCase } from 'src/usecases/verifyInviteCodeUseCase'

const repository = new AuthRepository()
/*
const storeAndHubSignUpUseCase = new StoreAndHubSignUpUseCase(repository)
const sellerSignUpUseCase = new SellerSignUpUseCase(repository)
const guestSignUpUseCase = new GuestSignUpUseCase(repository)
const adminSignUpUseCase = new AdminSignUpUseCase(repository)
const createUserUseCase = new CreateUserUseCase(repository)
const sendForgotPasswordCodeUseCase = new SendForgotPasswordCodeUseCase(repository)
const sendNewPasswordUseCase = new SendNewPasswordUseCase(repository)
*/
const sendForgotPasswordCodeUseCase = new SendForgotPasswordCodeUseCase(repository)
const changePasswordUseCase = new ChangePasswordUseCase(repository)
/*
const verifyInviteCodeUseCase = new VerifyInviteCodeUseCase(repository)
const activateUserUseCase = new ActivateUserUseCase(repository)
const disableUserUseCase = new DisableUserUseCase(repository)
const fetchInvitesUseCase = new FetchInvitesUseCase(repository)
*/
export const useAuthStore = defineStore('auth', {
	state: () => ({
		totalInvites: 0
	}),
	getters: {
		getTotalInvites: (state) => state.totalInvites
	},
	actions: {
    /*
		async sellerSignUp (seller: Seller, password: string, email: string, code: string, recaptchaToken: string) {
			return await sellerSignUpUseCase.execute(seller, password, email, code, recaptchaToken)
		},
		async storeAndHubSignUp (password: string, email: string, code: string, recaptchaToken: string) {
			return await storeAndHubSignUpUseCase.execute(password, email, code, recaptchaToken)
		},
		async adminSignUp (user:Admin, code: string, recaptchaToken: string) {
			return await adminSignUpUseCase.execute(user, code, recaptchaToken)
		},
		async guestSignUp (guest: Guest, password: string, code: string, recaptchaToken: string) {
			return await guestSignUpUseCase.execute(guest, password, code, recaptchaToken)
		},
		async inviteUser (userModel: CreateUser) {
			return await createUserUseCase.execute(userModel)
		},
		async sendForgotPasswordCode (email: string) {
			return await sendForgotPasswordCodeUseCase.execute(email)
		},
		async sendNewPassword (email: string, password: string, code: string) {
			return await sendNewPasswordUseCase.execute(email, password, code)
		},
    */
    async sendForgotPassword (email: string, document: string, phone:string) {
			return await sendForgotPasswordCodeUseCase.execute2(email, document, phone)
		},

		async changePassword (currentPassword: string, newPassword: string) {
			return await changePasswordUseCase.execute(currentPassword, newPassword)
		},

    async changePasswordBySupport (userId: number, seeUser: boolean) {
			return await changePasswordUseCase.executeBySupport(userId, seeUser)
		},
    /*
		async activateUser (userId: string) {
			return await activateUserUseCase.execute(userId)
		},
		async disableUser (userId: string) {
			return await disableUserUseCase.execute(userId)
		},
		async verifyInviteCode (code: string, recaptchaToken: string) {
			return await verifyInviteCodeUseCase.execute(code, recaptchaToken)
		},
		async fetchInvites (limit?: number, offset?: number) {
			const response = await fetchInvitesUseCase.execute(limit, offset)
			this.totalInvites = response.totalItems
			return response.data
		},
    */
		async deleteInvite (inviteId: string) {
			return await repository.deleteInvite(inviteId)
		}
	}
})
