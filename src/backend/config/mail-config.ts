import { loadEnvConfig } from './load-env-config';

loadEnvConfig();

export const MailConfig = {
  sendgridApiKey: process.env.SENDGRID_API_KEY || '',
  host: process.env.MAIL_CONFIG_HOST || '',
  port: process.env.MAIL_CONFIG_PORT || '',
  secure: process.env.MAIL_CONFIG_SECURE || '',
  sendFromHost: `no-reply@${process.env.INVEST_CLEARLY_SENDER_EMAIL}` || '',
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
  publishedReviewEmailToBmRecipients: 'd-e78d6118c3304548aced4e33bde3bfcc',
  unverifiedReviewPublishedEmailToBmRecipients:
    'd-95e8d9691b194844a93544335be80ef8',
  sponsorPostedNewDeals: 'd-fa5dc29ee1db47ca91b6a27805dcc8b0',
  newDealsMatchingYourInvestmentPreferences:
    'd-3f1e3aecfe1346709fb63b4f90ac9ca3',
};

export const DefaultImages = {
  dealImage:
    'https://okcclpkpkpacuteeaoul.supabase.co/storage/v1/object/public/invest-clearly-prod/default-images/Deal-placeholder.png',
  sponsorImage:
    'https://okcclpkpkpacuteeaoul.supabase.co/storage/v1/object/public/invest-clearly-prod/default-images/Sponsor-placeholder.png',
  userImage:
    'https://okcclpkpkpacuteeaoul.supabase.co/storage/v1/object/public/invest-clearly-prod/default-images/User-Avatar.png',
};
