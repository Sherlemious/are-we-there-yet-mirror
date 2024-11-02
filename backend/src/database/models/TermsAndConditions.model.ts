import e from 'express';
import { Schema, model } from 'mongoose';

const termsAndConditionsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    version: {
      type: Number,
      required: true,
    },
    isAccepted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const TermsAndConditions = model('termsAndConditions', termsAndConditionsSchema);
export { TermsAndConditions, termsAndConditionsSchema };
