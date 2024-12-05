import Stripe from 'stripe';

export default class StripeService {
  public static stripe: Stripe;

  static getInstance() {
    if (!this.stripe) {
      this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
    }

    return this.stripe;
  }

  static async createCheckoutSession(
    currency: string,
    address_id: string,
    products: any,
    success_url: string,
    cancel_url: string
  ) {
    const line_items = products.map((product: any) => {
      return {
        price_data: {
          currency: currency,
          product_data: {
            name: product.product.name,
          },
          unit_amount: Math.round(product.product.price * 100),
        },
        quantity: product.quantity,
      };
    });

    const metadata = {
      address_id: address_id,
    };

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: line_items,
      mode: 'payment',
      metadata: metadata,
      success_url: success_url,
      cancel_url: cancel_url,
    });

    return session;
  }

  static async getMetadata(sessionId: string) {
    const session = await this.stripe.checkout.sessions.retrieve(sessionId);
    return session.metadata;
  }
}
