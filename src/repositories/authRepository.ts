//import api, { PaginatedResponse } from 'src/lib/api'
//import { Admin } from 'src/models/admin'
//import { Guest } from 'src/models/guest'
import { Seller } from 'src/models/seller'
import { CreateUser } from 'src/models/user'
import AuthRepositoryContract from './contracts/authRepositoryContracts'
import api from 'src/lib/api'
import { forgotPasswordDTOcnpj, forgotPasswordDTOcpf } from 'src/models/interfaces/forgotPassword'
//import { SignupInvite } from 'src/models/interfaces/signupInvite'

export class AuthRepository implements AuthRepositoryContract {
	async sellerSignUp (seller: Seller, password: string, email: string, code: string, recaptcha: string) {
		try {
			return await api.requestPostWithApiKey('/signup', seller.toJsonWithEmailAndPassword(email, password, code), { recaptcha })
		} catch (error) {
			throw new Error('Erro ao cadastrar')
		}
	}

	async storeAndHubSignUp (password: string, email: string, code: string, recaptcha: string) {
		try {
			return await api.requestPostWithApiKey('/signup', { email, password, code }, { recaptcha })
		} catch (error) {
			throw new Error('Erro ao cadastrar')
		}
	}
/*
	async adminSignUp (user: Admin, code: string, recaptcha: string) {
		try {
			return await api.requestPostWithApiKey('/signup', user.signupToJson(code), { recaptcha })
		} catch (error) {
			throw new Error('Erro ao cadastrar')
		}
	}

	async guestSignUp (password: string, guest:Guest, code: string, recaptcha: string) {
		try {
			return await api.requestPostWithApiKey('/signup', { guest, password, code }, { recaptcha })
		} catch (error) {
			throw new Error('Erro ao cadastrar')
		}
	}
*/
	async inviteUser (userModel: CreateUser) {
		try {
			return await api.requestPost('/signup-invite', userModel.toJson())
		} catch (error) {
			throw new Error('Erro ao enviar convite, verifique o e-mail e tente novamente.')
		}
	}

	async sendForgotPasswordCode (email: string) {
		try {
			return await api.requestPostWithApiKey('/forgot', { email })
		} catch (error) {
			throw new Error('Erro ao enviar código')
		}
	}

  async sendForgotPassword (email: string, document: string, phone: string) {
    try {
      console.log('chegou aqui: ' + document)
      // Limpa os caracteres não numéricos
      const cleanedDocument = document.replace(/\D/g, '');

      let passwordDTO;

      // Valida CPF ou CNPJ e cria o DTO correspondente
      if (cleanedDocument.length === 11) {
        passwordDTO = new forgotPasswordDTOcpf(email, document, phone, 'false');
      } else if (cleanedDocument.length === 14) {
        passwordDTO = new forgotPasswordDTOcnpj(email, document, phone, 'false');
      } else {
        throw new Error('Documento inválido');
      }

      console.log(passwordDTO.toJson())
      // Envia o DTO para a API
      return await api.requestPost('/sms/reset/password', passwordDTO.toJson());

    } catch (error) {
      // Em caso de erro, lança uma mensagem apropriada
      throw new Error('Erro ao enviar código');
    }
  }


	async sendNewPassword (email: string, password: string, code: string) {
		try {
			return await api.requestPostWithApiKey('/reset-password', { email, password, code })
		} catch (error) {
			throw new Error('Erro ao alterar senha. Verifique o código e tente novamente.')
		}
	}

	async changePassword (currentPassword: string, newPassword: string) {
		try {
			return await api.requestPut('/change-password', { currentPassword, newPassword })
		} catch (error) {
			throw new Error('Erro ao alterar senha')
		}
	}

	async activateUser (userId: string) {
		try {
			return await api.requestPost('/user/activate', { userId })
		} catch (error) {
			throw new Error('Erro ao ativar usuário')
		}
	}

	async disableUser (userId: string) {
		try {
			return await api.requestDelete(`/user/inactivate/${userId}`)
		} catch (error) {
			throw new Error('Erro ao desativar usuário')
		}
	}

	async verifyInviteCode (code: string, recaptcha: string) {
		try {
			const data = await api.requestGetWithApiKey(
				`/signup-invite/check-code/${code}`,
				undefined,
				{ recaptcha }
			)
			return data.userType
		} catch (error) {
			throw new Error('Erro ao verificar código de convite')
		}
	}
/*
	async fetchInvites (limit?: number, offset?: number) {
		const params = Object.fromEntries(Object.entries({
			limit,
			offset
		}).filter(([, value]) => value !== undefined && value !== null))
		try {
			const data = await api.requestGet(
				'/signup-invite',
				params
			)
			const json: PaginatedResponse = {
				totalItems: data.totalItems,
				data: data.data as Array<SignupInvite>
			}
			return json
		} catch (error) {
			throw new Error('Erro ao verificar código de convite')
		}
	}
*/
	async deleteInvite (inviteId: string) {
		try {
			return await api.requestDelete(`/signup-invite/${inviteId}`)
		} catch (error) {
			throw new Error('Erro ao deletar convite')
		}
	}
}
