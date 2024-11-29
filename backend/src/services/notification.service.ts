import { NotificationType, createDefaultNotification, NotificationTypeEnum } from '../types/Notification.types';
import userRepo from '../database/repositories/user.repo';
import emailer from './email/email.service';

class NotificationService {
  notification: NotificationType;
  userId: string;

  constructor(userId: string, title: string, message: string, notificationType?: NotificationTypeEnum) {
    this.notification = createDefaultNotification({ title, message, notificationType });
    this.userId = userId;

    this.updateUser(this.userId);
    this.sendNotificationEmail();
  }

  async updateUser(userId: string) {
    try {
      const user = await userRepo.findUserById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      user.notifications.push(this.notification);
      await userRepo.updateUser(userId, user);
    } catch (error) {
      console.log(error);
    }
  }

  async sendNotificationEmail() {
    try {
      const user = await userRepo.findUserById(this.userId);
      if (!user) {
        throw new Error('User not found');
      }
      const email = user.email;

      if (!email) {
        throw new Error('User email not found');
      }

      emailer.sendNotificationEmail(email, this.notification);
    } catch (error) {
      console.log(error);
    }
  }
}

export default NotificationService;
