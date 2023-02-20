export interface Currency {
  symbol: string;
  name: string;
  symbol_native: string;
  decimal_digits: number;
  code: string;
  name_plural: string;
}

export interface Rate {
  code: string;
  rate: number;
}
