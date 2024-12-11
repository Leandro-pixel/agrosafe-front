import { Formatter } from 'src/utils/formatter';

export class CashFlow {
  constructor(
    public id: number = 0,
    public establishmentId: number = 0,
    public financingInstallmentId: number | null = null,
    public userCardId: number = 0,
    public description: string = '',
    public transactionType: string = '',
    public amountToPay: number = 0, // Convertido de string para número
    public originalAmount: number = 0, // Convertido de string para número
    public cashbackAmount: number = 0, // Convertido de string para número
    public interest: number = 0, // Convertido de string para número
    public installmentCount: number = 0,
    public invoiceNumber: number = 0,
    public month: number = 0,
    public year: number = 0,
    public paymentDate: string | null = null, // Pode ser null
    public status: string = '',
    public createdAt: string = '', // Data formatada
    public updatedAt: string = '' // Data formatada
  ) {}

  static fromJson(json: any): CashFlow | undefined {
    if (!json) return;

    return new CashFlow(
      json.id,
      json.establishmentId,
      json.financingInstallmentId,
      json.userCardId,
      json.description,
      json.transactionType,
      parseFloat(json.amountToPay), // Converte de string para número
      parseFloat(json.originalAmount), // Converte de string para número
      parseFloat(json.cashbackAmount), // Converte de string para número
      parseFloat(json.interest), // Converte de string para número
      json.installmentCount,
      json.invoiceNumber,
      json.month,
      json.year,
      json.paymentDate, // Permanece como string ou null
      json.status,
      Formatter.formatIsoDateToBR(json.createdAt), // Formata a data para o padrão brasileiro
      Formatter.formatIsoDateToBR(json.updatedAt)
    );
  }

  public toJson() {
    return {
      id: this.id,
      establishmentId: this.establishmentId,
      financingInstallmentId: this.financingInstallmentId,
      userCardId: this.userCardId,
      description: this.description,
      transactionType: this.transactionType,
      amountToPay: this.amountToPay.toFixed(2), // Converte para string com duas casas decimais
      originalAmount: this.originalAmount.toFixed(2),
      cashbackAmount: this.cashbackAmount.toFixed(2),
      interest: this.interest.toFixed(2),
      installmentCount: this.installmentCount,
      invoiceNumber: this.invoiceNumber,
      month: this.month,
      year: this.year,
      paymentDate: this.paymentDate,
      status: this.status,
      createdAt: Formatter.dateToTimestampBR(this.createdAt),
      updatedAt: Formatter.dateToTimestampBR(this.updatedAt)
    };
  }

  // Formata o amountToPay para exibição como moeda brasileira
  public getFormattedAmountToPay(): string {
    return Formatter.formatNumberToBRCurrency(this.amountToPay);
  }

  // Formata o originalAmount para exibição como moeda brasileira
  public getFormattedOriginalAmount(): string {
    return Formatter.formatNumberToBRCurrency(this.originalAmount);
  }
}
