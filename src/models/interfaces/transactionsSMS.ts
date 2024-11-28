import { Formatter } from 'src/utils/formatter';

export class TransactionsDTO {
  constructor(
    public phone: string = '',
    public description: string = '',
    public amount: number = 0
  ) {}

  static fromJson(json: any): TransactionsDTO | undefined {
    if (!json) return;
    return new TransactionsDTO(
      json.phone,
      json.description,
      json.amount
    );
  }

  public toJson() {
    return {
      phone: Formatter.clearSymbolsAndLetters(this.phone),
      description: this.description,
      amount: this.amount
    };
  }
}

