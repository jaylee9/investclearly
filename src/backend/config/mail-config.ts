import { loadEnvConfig } from './load-env-config';

loadEnvConfig();

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
  resetPasswordEmail: 'd-6e26ea582d8846c98da66f913dec1eb2',
  publishedReviewEmail: 'd-7c83854285fc4c2a972660f7a342756e',
  unverifiedReviewPublishedEmail: 'd-56bab407e42b416aaf80bad685b96b81',
  reviewRejectedEmail: 'd-1b544cf59d2f4df8af9b5b87561ddab7',
  reviewUnpublishedEmail: 'd-59d7a3fdad2e45ad86e35bfd5450c9cf',
};
