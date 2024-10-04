import { Schema, model } from 'mongoose';
import { attachmentSchema } from './attachment.model';
import { reviewSchema } from './review.model';

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
  },
  available_quantity: {
    type: Number,
  },
  attachments: {
    type: [attachmentSchema],
    required: true,
  },
  reviews: {
    type: [reviewSchema],
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export const Product = model('product', productSchema);

export { productSchema };
