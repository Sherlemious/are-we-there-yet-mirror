import { Schema, model } from 'mongoose';

/**
 * Product schema: Represents products offered by sellers (as users).
 *
 * TODO: Modify types of documents, services_offered, availability when their schemas are created
 */
const productSchema = new Schema({
  seller: {
    // type: Schema.Types.ObjectId,
    // ref: 'User', // Reference to the User schema
    type: String, // For now, store the seller's username
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  available_quantity: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  documents: {
    licenses: {
      type: [String], // Array for storing document links/IDs, if applicable
    },
    certifications: {
      type: [String], // Array for certifications, if applicable
    },
  },
  services_offered: {
    type: [String], // Array of services associated with the product
  },
  availability: {
    type: [String], // Array representing available days/times
  },
});

export const Product = model('Product', productSchema);
