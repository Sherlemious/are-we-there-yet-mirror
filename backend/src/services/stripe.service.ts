import Stripe from 'stripe';
import itineraryRepo from '../database/repositories/itinerary.repo';
import activityRepo from '../database/repositories/activity.repo';

export default class StripeService {
  private static stripe: Stripe;

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

  static async createBookingSession(
    currency: string,
    isItinerary: boolean,
    booked_item_id: string,
    success_url: string,
    cancel_url: string
  ) {
    let booked_item, metadata_name;

    if (isItinerary) {
      booked_item = await itineraryRepo.findItineraryById(booked_item_id);
      metadata_name = 'itinerary_id';
    } else {
      booked_item = await activityRepo.getActivityById(booked_item_id);
      metadata_name = 'activity_id';
    }

    if (!booked_item) {
      throw new Error('Invalid booking item');
    }

    const name = booked_item?.name;
    const price = booked_item?.price ?? 0;

    const line_items = {
      price_data: {
        currency: currency,
        product_data: {
          name: name,
        },
        unit_amount: Math.round(price * 100),
      },
      quantity: 1,
    };

    const metadata = {
      [metadata_name]: booked_item_id,
    };

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [line_items],
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
