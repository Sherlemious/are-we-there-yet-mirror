import mongoose from 'mongoose';
import { accountType } from '../../types/User.types';

const userSchema = new mongoose.Schema({
  account_type: {
    type: accountType,
    required: true,
  },
  accepted: {
    type: Boolean,
    required: true,
    default: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile_number: {
    type: String,
  },
  nationality: {
    type: String,
  },
  dob: {
    type: Date,
  },
  job: {
    type: String,
  },
  years_of_experience: {
    type: Number,
  },
  previous_work: {
    type: String,
  },
  website: {
    type: String,
  },
  hotline: {
    type: String,
  },
  company_profile: {
    type: String,
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  wallet: {
    type: Number,
  },
  picture_path: {
    type: String,
  },
});

export const User = mongoose.model('User', userSchema);
