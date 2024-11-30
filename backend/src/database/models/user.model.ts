import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { accountType } from '../../types/User.types';
import { reviewSchema } from './review.model';
import { cartItemSchema } from './cart.model';
import { bookmarkSchema } from './bookmark.model';

const previousWorkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  employmentType: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'internship'],
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
  },
  locationType: {
    type: String,
    enum: ['remote', 'office'],
    required: true,
  },
  description: {
    type: String,
  },
});

const companyProfileSchema = new mongoose.Schema({
  industry: {
    type: String,
    required: true,
  },
  headquarters: {
    type: String,
    required: true,
  },
  specialties: {
    type: String,
  },
});

const notificationSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  message: {
    type: String,
  },
  notificationType: {
    type: String,
    enum: ['error', 'warning', 'information', 'success'],
    default: 'information',
    required: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const userSchema = new mongoose.Schema(
  {
    account_type: {
      type: String,
      enum: Object.values(accountType),
      required: true,
    },
    accepted: {
      type: Boolean,
      required: true,
      default: true,
    },
    rejected: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
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
    deletionRequested: {
      type: Boolean,
      default: false,
    },
    job: {
      type: String,
    },
    years_of_experience: {
      type: Number,
    },
    previous_work: {
      type: [previousWorkSchema],
    },
    website: {
      type: String,
    },
    hotline: {
      type: String,
    },
    company_profile: {
      type: companyProfileSchema,
    },
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    wallet: {
      type: Number,
      default: 0,
    },
    loyalty_points: {
      type: Number,
      default: 0,
    },
    loyalty_level: {
      type: Number,
      default: 1,
    },
    profile_pic: { type: Schema.Types.ObjectId, ref: 'attachment' },
    attachments: {
      type: [{ type: Schema.Types.ObjectId, ref: 'attachment' }],
    },
    reviews: {
      type: [reviewSchema],
    },
    preferences: {
      type: [{ type: Schema.Types.ObjectId, ref: 'tag' }],
    },
    average_rating: {
      type: Number,
      default: 0,
    },
    itinerary_bookings: {
      type: [{ type: Schema.Types.ObjectId, ref: 'booking' }],
    },
    activity_bookings: {
      type: [{ type: Schema.Types.ObjectId, ref: 'booking' }],
    },
    purchased_products: {
      type: [{ type: Schema.Types.ObjectId, ref: 'product' }],
    },
    notifications: {
      type: [notificationSchema],
    },
    OTP: {
      type: String,
    },
    cart: {
      type: [cartItemSchema],
      default: [],
    },
    bookmarks: {
      type: [bookmarkSchema],
    },
    modified_by: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    termsAndConditions: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ account_type: 1, username: 1 }, { unique: true });

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

export const User = model('User', userSchema);
