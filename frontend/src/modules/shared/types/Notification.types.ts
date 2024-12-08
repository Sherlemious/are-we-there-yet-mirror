export enum NotificationTypeEnum {
  ERROR = 'error',
  WARNING = 'warning',
  INFORMATION = 'information',
  SUCCESS = 'success',
}

export interface NotificationType {
  _id?: string;
  title?: string;
  message?: string;
  notificationType: NotificationTypeEnum;
  read: boolean;
  createdAt: Date;
}

export const createDefaultNotification = (partial: Partial<NotificationType>): NotificationType => ({
  title: '',
  message: '',
  notificationType: NotificationTypeEnum.INFORMATION,
  read: false,
  createdAt: new Date(),
  ...partial,
});
