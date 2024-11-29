import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { NotificationType } from '../../types/Notification.types';

class EmailService {
  email = process.env.EMAIL;
  password = process.env.PASSWORD;

  transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
      user: this.email,
      pass: this.password,
    },
    tls: {
      ciphers: 'SSLv3',
      rejectUnauthorized: false,
    },
  });

  sendNotificationEmail(email: string, notification: NotificationType) {
    try {
      // Read the HTML file
      const filePath = path.join(__dirname, '../email-templates/notification.html');
      let htmlContent = fs.readFileSync(filePath, 'utf-8');

      // Replace the placeholders with the actual notification data
      htmlContent = htmlContent.replace('{{title}}', notification.title ?? 'Notification');
      htmlContent = htmlContent.replace('{{message}}', notification.message ?? '');

      const mailOptions = {
        from: this.email,
        to: email,
        subject: notification.title ?? 'Notification',
        html: htmlContent,
      };

      this.transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    } catch (error) {
      console.log('Error sending notification email:', error);
    }
  }

  async sendForgotPasswordEmail(email: string, OTP: string) {
    try {
      // Read the HTML file
      const filePath = path.join(__dirname, './email-templates/forgotPassword.html');
      let htmlContent = fs.readFileSync(filePath, 'utf-8');

      // Replace the placeholder with the actual OTP
      htmlContent = htmlContent.replace('{{otp}}', OTP);

      const mailOptions = {
        from: this.email,
        to: email,
        subject: 'Reset Password',
        html: htmlContent,
      };

      this.transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    } catch (error) {
      console.log('Error sending forgot password email:', error);
    }
  }
}

export default new EmailService();
