import ZipCode from './valueObjects/zipCode'

export class Address {
  constructor (
    public id = 0,
    public city = '',
    public uf = '',
    public neighborhood = '',
    public street = '',
    public number = '',
    public zipCode: ZipCode = new ZipCode(),
    public complement = '',
    public ibgeCode = '',
    public ddd = '',
    public siafi = ''
  ) {}

  public toString (): string {
    return `${this.city}, ${this.uf}, ${this.neighborhood}, ${this.street}, ${this.zipCode.getCodeFormatted()}`
  }

  static fromJson (json: any): Address {
    return new Address(
      0, // id não está presente no payload, então mantemos 0
      json.localidade || '',
      json.uf || '',
      json.bairro || '',
      json.logradouro || '',
      json.unidade || '',
      new ZipCode(json.cep || ''),
      json.complemento || '',
      json.ibge || '',
      json.ddd || '',
      json.siafi || ''
    )
  }

  public toJson (): any {
    return {
      city: this.city,
      uf: this.uf,
      neighborhood: this.neighborhood,
      street: this.street,
      number: this.number,
      zipCode: this.zipCode.getCodeWithoutSymbols(),
      complement: this.complement,
      ibgeCode: this.ibgeCode,
      ddd: this.ddd,
      siafi: this.siafi
    }
  }

  public isValid (): boolean {
    return (
      this.city !== '' &&
      this.uf !== '' &&
      this.neighborhood !== '' &&
      this.street !== '' &&
      this.zipCode.validate()
    )
  }
}
