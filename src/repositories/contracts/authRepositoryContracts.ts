//import { Admin } from 'src/models/admin'
//import { Guest } from 'src/models/guest'
import { Seller } from 'src/models/seller'
import { CreateUser } from 'src/models/user'

export default interface AuthRepositoryContract {
    sellerSignUp (seller: Seller, password: string, email: string, code: string, recaptcha: string): Promise<any>
    storeAndHubSignUp (password: string, email: string, code: string, recaptcha: string): Promise<any>
    //adminSignUp (user: Admin, code: string, recaptcha: string): Promise<any>
    //guestSignUp (password: string, guest:Guest, code: string, recaptcha: string): Promise<any>
    inviteUser (userModel: CreateUser): Promise<any>
    sendForgotPasswordCode (email: string): Promise<any>
    sendNewPassword (email: string, password: string, code: string): Promise<any>
    changePassword (currentPassword: string, newPassword: string): Promise<any>
    activateUser (userId: string): Promise<any>
    disableUser (userId: string): Promise<any>
    verifyInviteCode (code: string, recaptcha: string): Promise<any>
    //fetchInvites (limit?: number, offset?: number): Promise<any>
    deleteInvite (inviteId: string): Promise<any>
}
