import { Formatter } from 'src/utils/formatter';

export class CashFlow {
  constructor(
    public hash: string = '',
    public originalAmount: number = 0,
    public installmentCount: number = 0,
    public statuses: string[] = [],
    public captureFee: number = 0,
    public splitAmount: number = 0,
    public cardFee: number = 0,
    public availableWithdrawalAmount: number = 0,
    public billingFeeAmountToPay: number = 0,
    public advanceFee: number = 0,
    public description: string = '',
    public transactionType: string = '',
    public months: number[] = [],
    public years: number[] = [],
    public createdAt: string = ''
  ) {}

  static fromJson(json: any): CashFlow | undefined {
    if (!json) return;

    return new CashFlow(
      json.hash,
      parseFloat(json.originalAmount),
      json.installmentCount,
      json.statuses,
      parseFloat(json.captureFee),
      parseFloat(json.splitAmount),
      parseFloat(json.cardFee),
      parseFloat(json.availableWithdrawalAmount),
      parseFloat(json.billingFeeAmountToPay),
      parseFloat(json.advanceFee),
      json.description,
      json.transactionType,
      json.months,
      json.years,
      Formatter.formatIsoDateToBR(json.createdAt)
    );
  }

  public toJson() {
    return {
      hash: this.hash,
      originalAmount: this.originalAmount.toFixed(2),
      installmentCount: this.installmentCount,
      statuses: this.statuses,
      captureFee: this.captureFee.toFixed(2),
      splitAmount: this.splitAmount.toFixed(2),
      cardFee: this.cardFee.toFixed(2),
      availableWithdrawalAmount: this.availableWithdrawalAmount.toFixed(2),
      billingFeeAmountToPay: this.billingFeeAmountToPay.toFixed(2),
      advanceFee: this.advanceFee.toFixed(2),
      description: this.description,
      transactionType: this.transactionType,
      months: this.months,
      years: this.years,
      createdAt: Formatter.dateToTimestampBR(this.createdAt)
    };
  }

  public getFormattedOriginalAmount(): string {
    return Formatter.formatNumberToBRCurrency(this.originalAmount);
  }

  public getFormattedAvailableWithdrawalAmount(): string {
    return Formatter.formatNumberToBRCurrency(this.availableWithdrawalAmount);
  }
}
