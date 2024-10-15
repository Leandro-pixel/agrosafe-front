import Config from 'src/models/config'

const RECAPTCHA_KEY = process.env.RECAPTCHA_KEY as string
const RECAPTCHA_KEY_DEV = process.env.RECAPTCHA_KEY_DEV as string

const blueAssistConfig = new Config(
	'#00113f',
	'#26A69A',
	'blue.svg',
	'Blue Assist',
	'blue-branco.svg',
	'Venha conhecer os produtos da Blue Assist! Crédito fácil e rápido para você!',
	[{ label: 'Get Net', value: 'getnet' }, { label: 'Unico', value: 'unico' }],
	window.location.hostname === 'backoffice.blueassist.com.br' ? RECAPTCHA_KEY : RECAPTCHA_KEY_DEV
)

const upCredConfig = new Config(
	'#162c8c',
	'#d4d90b',
	'upcred.svg',
	'UpCred',
	'upcred.svg',
	'Venha conhecer os produtos da UpCred! Crédito fácil e rápido para você!',
	[{ label: 'Get Net', value: 'getnet' }, { label: 'Unico', value: 'unico' }],
	window.location.hostname === 'backoffice.upcred.com.br' ? RECAPTCHA_KEY : RECAPTCHA_KEY_DEV
)

export default class ConfigRepository {
	fetchConfig (): Config {
		if (['backoffice.upcred.com.br', 'upcred.local'].includes(window.location.hostname)) {
			return upCredConfig
		} else {
			return blueAssistConfig
		}
	}
}
