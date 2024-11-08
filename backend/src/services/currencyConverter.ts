import { Request } from 'express';

const backUpRates: { [key: string]: number } = {
  // As updated as possible in case the API fails
  EGP: 1,
  USD: 49.3,
  EUR: 52.81,
  GBP: 63.65,
};

const validCurrencies: string[] = ['EGP', 'USD', 'EUR', 'GBP'];

export default class currencyConverterService {
  static async getRequestCurrency(req: Request): Promise<string> {
    if (req.body.currency) {
      if (validCurrencies.includes(req.body.currency)) {
        return req.body.currency;
      }
    }
    return 'EGP';
  }

  static async getConversionRate(to: string, from: string = 'EGP'): Promise<number> {
    try {
      const response = await fetch(`https://api.exchangeratesapi.io/latest?base=${from}`);
      const data = await response.json();
      return data.rates[to];
    } catch (error) {
      return backUpRates[to];
    }
  }

  static async convertPrices(prices: number[], to: string, from: string = 'EGP'): Promise<number[]> {
    const conversionRate = await this.getConversionRate(to, from);
    return prices.map((price) => price / conversionRate);
  }

  static async convertPrice(price: number, to: string, from: string = 'EGP'): Promise<number> {
    const conversionRate = await this.getConversionRate(to, from);
    return price / conversionRate;
  }
}
