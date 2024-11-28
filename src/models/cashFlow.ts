import { Formatter } from 'src/utils/formatter';

export class CashFlow {
  constructor(
    public id: number = 0,
    public establishmentId: number = 0,
    public financingInstallmentId: number | null = null,
    public userCardId: number = 0,
    public description: string = '',
    public transactionType: string = '',
    public amount: number = 0, // Mantém como número
    public status: string = '',
    public installmentCount: number = 0,
    public expirationDate: string = '', // Data formatada
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
      json.amount, // Usa o valor como está no JSON (double)
      json.status,
      json.installmentCount,
      Formatter.formatIsoDateToBR(json.expirationDate), // Formata a data para o padrão brasileiro
      Formatter.formatIsoDateToBR(json.createdAt),
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
      amount: this.amount, // Mantém como número
      status: this.status,
      installmentCount: this.installmentCount,
      expirationDate: Formatter.dateToTimestampBR(this.expirationDate), // Converte de volta para timestamp
      createdAt: Formatter.dateToTimestampBR(this.createdAt),
      updatedAt: Formatter.dateToTimestampBR(this.updatedAt)
    };
  }

  // Formata o amount para exibição como moeda brasileira
  public getFormattedAmount(): string {
    return Formatter.formatNumberToBRCurrency(this.amount);
  }
}
