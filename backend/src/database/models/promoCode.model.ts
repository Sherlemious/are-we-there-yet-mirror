import { Schema, model } from 'mongoose';

const promoCodeSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
    },
    discountPercentage: {
      type: Number,
      required: true,
      default: 10,
    },
    can_use_date: {
      type: Date,
    },
    expiry_date: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export const PromoCode = model('promoCode', promoCodeSchema);

export { promoCodeSchema };
