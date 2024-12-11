import { PromoCode } from '../database/models/promoCode.model';
import { User } from '../database/models/user.model';
import { PromoCodeType } from '../types/PromoCode.types';
import emailService from './email/email.service';

export default class BirthdayService {
  private static instance: BirthdayService;

  constructor() {
    this.init();
  }

  private async init(): Promise<void> {
    await this.sendBirthdayPromoCode();
    this.scheduleBirthdayCheck();
  }

  public static getInstance(): BirthdayService {
    if (!BirthdayService.instance) {
      BirthdayService.instance = new BirthdayService();
    }
    return BirthdayService.instance;
  }

  async sendBirthdayPromoCode() {
    try {
      const today = new Date();
      const todayMonthDay = `${today.getMonth() + 1}-${today.getDate()}`;

      // Find all users
      const users = await User.find();

      // Filter users with birthdays today
      const birthdayUsers = users.filter((user) => {
        if (!user.dob) return false;
        const dob = new Date(user.dob);
        const dobMonthDay = `${dob.getMonth() + 1}-${dob.getDate()}`;
        return dobMonthDay === todayMonthDay;
      });

      for (const user of birthdayUsers) {
        if (!user.email || !user.username) {
          throw new Error('User email not found');
        }
        const promoCodeString = `BDAY-${user.email.split('@')[0].toUpperCase()}`;

        // Check if the promo code already exists
        const existingPromoCode = await PromoCode.findOne({
          code: promoCodeString,
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

          emailService.sendBirthdayEmail(user.email, user.username, promoCodeString);
        }
      }
    } catch (error) {
      console.log('Error sending birthday promo code:', error);
    }
  }

  private scheduleBirthdayCheck(): void {
    setTimeout(async () => {
      try {
        await this.sendBirthdayPromoCode();
      } catch (error: any) {
        console.log('Error refreshing access token:', error.message);
      }
      this.scheduleBirthdayCheck(); // Schedule the next refresh
    }, 150000); // 2.5 minutes
  }
}

export const birthdayService = new BirthdayService();
