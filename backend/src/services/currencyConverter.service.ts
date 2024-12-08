const backUpRates: { [key: string]: number } = {
  // As updated as possible in case the API fails
  EGP: 1,
  USD: 49.3,
  EUR: 52.81,
  GBP: 63.65,
};

export default class currencyConverterService {
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
    return Promise.all(prices.map((price) => this.convertPrice(price, to, from)));
  }

  static async convertPrice(price: number, to: string, from: string = 'EGP'): Promise<number> {
    to = to.toUpperCase();
    from = from.toUpperCase();

    const conversionRate: number = await this.getConversionRate(to, from);
    const roundedPrice: number = Math.round((price / conversionRate) * 20) / 20;
    return parseFloat(roundedPrice.toFixed(2));
  }
}
