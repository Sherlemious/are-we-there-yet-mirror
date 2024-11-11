import { Request, Response, NextFunction } from 'express';

interface currencyPayload {
  currency: string;
}

declare global {
  namespace Express {
    interface Request {
      currency: currencyPayload;
    }
  }
}

const validCurrencies: string[] = ['EGP', 'USD', 'EUR', 'GBP'];

const currencySetter = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.header('Currency')) {
      const currencyHeader = req.header('Currency');
      req.currency = currencyHeader ? { currency: currencyHeader } : { currency: 'EGP' };
    } else {
      req.currency = { currency: 'EGP' };
    }
    if (!validCurrencies.includes(req.currency.currency)) {
      req.currency = { currency: 'EGP' };
    }
    next();
  } catch (err) {
    req.currency = { currency: 'EGP' };
    next();
  }
};

export { currencySetter };
