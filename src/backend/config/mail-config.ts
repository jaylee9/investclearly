import * as dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(__dirname, '../../../.env') });

export const MailConfig = {
  sendgridApiKey: process.env.SENDGRID_API_KEY || '',
  host: process.env.MAIL_CONFIG_HOST || '',
  port: process.env.MAIL_CONFIG_PORT || '',
  secure: process.env.MAIL_CONFIG_SECURE || '',
  sendFrom: process.env.INVEST_CLEARLY_SENDER_EMAIL || '',
  sendFromName: 'Invest Clearly',
  frontendUrl: process.env.FRONTEND_URL || '',
  backendUrl: process.env.BACKEND_URL || '',
  auth: {
    user: process.env.MAIL_CONFIG_AUTH_USER || '',
    pass: process.env.SENDGRID_API_KEY || '',
  },
};

export const TemplatesIds = {
  confirmEmail: 'd-83a1ea25306c4727aa2f11ca5a61cc42',
};
