import mongoose from 'mongoose';
import { accountType } from '../../types/User.types';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  account_type: {
    type: String,
    enum: Object.values(accountType),
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

userSchema.pre('save', function (next) {
  var user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

export const User = mongoose.model('User', userSchema);
