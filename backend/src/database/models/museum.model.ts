import { Schema, model } from 'mongoose';
import { locationSchema } from './location.model';

const museumSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    tags: {
      type: [{ type: Schema.Types.ObjectId, ref: 'tag' }],
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    pictures: {
      type: [{ type: Schema.Types.ObjectId, ref: 'attachment' }],
    },
    location: {
      type: locationSchema,
    },
    opening_hours: {
      type: String,
      required: true,
    },
    ticket_prices: {
      foreigner: {
        type: Number,
        required: true,
        min: 0,
      },
      native: {
        type: Number,
        required: true,
        min: 0,
      },
      student: {
        type: Number,
        required: true,
        min: 0,
      },
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

export const Museum = model('museum', museumSchema);
