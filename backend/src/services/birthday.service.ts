import { PromoCode } from '../database/models/promoCode.model';
import { User } from '../database/models/user.model';
import { PromoCodeType } from '../types/PromoCode.types';
import emailService from './email/email.service';
import cron from 'node-cron';

class BirthdayService {
  constructor() {
    // Schedule the task to run every 2 minutes
    cron.schedule('*/2 * * * *', this.sendBirthdayPromoCode.bind(this));
  }

  async sendBirthdayPromoCode() {
    try {
      const today = new Date();
      const todayMonthDay = `${today.getMonth() + 1}-${today.getDate()}`;

      // Find users with birthdays today
      const users = await User.find().where({
        birthday: { $regex: `-${todayMonthDay}$` },
      });

      for (const user of users) {
        if (!user.email || !user.name) {
          throw new Error('User email not found');
        }
        const promoCodeString = `BDAY-${user.email.split('@')[0].toUpperCase()}`;

        // Check if the promo code already exists
        const existingPromoCode = await PromoCode.findOne({
          code: promoCodeString,
          created_by: user._id,
        });

        if (!existingPromoCode) {
          const promoCodeData: PromoCodeType = {
            code: promoCodeString,
            discountPercentage: 20,
            can_use_date: today,
            expiry_date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7),
            createdAt: today,
            updatedAt: today,
          };

          const promoCode = new PromoCode(promoCodeData);
          await promoCode.save();

          emailService.sendBirthdayEmail(user.email, user.name, promoCodeString);
        }
      }
    } catch (error) {
      console.log('Error sending birthday promo code:', error);
    }
  }
}

export const birthdayService = new BirthdayService();
