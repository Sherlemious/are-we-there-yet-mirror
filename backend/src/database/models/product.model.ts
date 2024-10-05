import { Schema, model } from 'mongoose';
import { reviewSchema } from './review.model';

const productSchema = new Schema(
  {
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
      type: [{ type: Schema.Types.ObjectId, ref: 'attachment' }],
    },
    reviews: {
      type: [reviewSchema],
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    tags: {
      type: [{ type: Schema.Types.ObjectId, ref: 'tag' }],
    },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    modified_by: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  {
    timestamps: true,
  }
);

export const Product = model('product', productSchema);

export { productSchema };
