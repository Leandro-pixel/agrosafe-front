import { Formatter } from 'src/utils/formatter'

export default class ZipCode {
	constructor (public code = '') {}

	public validate (): boolean {
		return /^\d{5}-\d{3}$/.test(this.code) || /^\d{8}$/.test(this.code) || /^\d{2}.\d{3}-\d{3}$/.test(this.code)
	}

	public getCodeFormatted (): string {
		if (this.code.length === 8) {
			return Formatter.strToCep(this.code)
		}
		return this.code
	}

	public getCodeWithoutSymbols (): string {
		return Formatter.clearSymbolsAndLetters(this.code)
	}
}
