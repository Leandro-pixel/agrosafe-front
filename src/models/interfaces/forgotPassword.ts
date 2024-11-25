import { Formatter } from 'src/utils/formatter'

export class forgotPasswordDTOcpf {
	constructor (
    public email: string = '',
		public cpf: string = '',
		public phone: string = '',
    public isUser: string = 'false',
	) {}

	static fromJson (json: any): forgotPasswordDTOcpf | undefined {
		if (!json) return
		return new forgotPasswordDTOcpf(
      json.email,
			json.cpf,
			json.phone,
			json.isUser,
		)
	}

	public toJson () {
		return {
			email: this.email,
      cpf: Formatter.clearSymbolsAndLetters(this.cpf),
			phone: Formatter.clearSymbolsAndLetters(this.phone),
			isUser: this.isUser,
		}
	}
}


export class forgotPasswordDTOcnpj {
	constructor (
    public email: string = '',
    public cnpj: string = '',
		public phone: string = '',
    public isUser: string = 'false',
	) {}

	static fromJson (json: any): forgotPasswordDTOcnpj | undefined {
		if (!json) return
		return new forgotPasswordDTOcnpj(
      json.email,
      json.cnpj,
			json.phone,
			json.isUser,
		)
	}

	public toJson () {
		return {
			email: this.email,
      cnpj: Formatter.clearSymbolsAndLetters(this.cnpj),
			phone: Formatter.clearSymbolsAndLetters(this.phone),
			isUser: this.isUser,
		}
	}
}
