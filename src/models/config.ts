export interface PaymentProcessor {
  label: string
  value: string
}

export default class Config {
	constructor (
    public primary = '',
    public secondary = '',
    public logoUrl = 'src/assets/logo_brands.png',
    public tenantName = 'BrandsCard',
    public secondaryLogoUrl = 'src/assets/icone_brands.png',
    public SmsMessage = '',
    public paymentProcessors = [] as PaymentProcessor[],
    public recaptchaKey = ''
	) {}
}
