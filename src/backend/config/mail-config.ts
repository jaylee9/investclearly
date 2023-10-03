import { loadEnvConfig } from './load-env-config';

loadEnvConfig();

export const MailConfig = {
  sendgridApiKey: process.env.SENDGRID_API_KEY || '',
  host: process.env.MAIL_CONFIG_HOST || '',
  port: process.env.MAIL_CONFIG_PORT || '',
  secure: process.env.MAIL_CONFIG_SECURE || '',
  sendFrom: process.env.INVEST_CLEARLY_SENDER_EMAIL || '',
  supportEmail: process.env.SUPPORT_EMAIL || '',
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
  accountDeactivated: 'd-8adb7ada0a0645cda81c927053aa9667',
  suggestEdit: 'd-06900cb708804309852f49cdf168cddf',
  claimSponsor: 'd-cbc332f1261f49ea897f2242dece7ed0',
  claimDeal: 'd-44ab012125a84821901fd9c1ccd47b33',
};

export const DefaultImages = {
  dealImage: process.env.DEAL_DEFAULT_IMAGE,
  sponsorImage: process.env.SPONSOR_DEFAULT_IMAGE,
  userImage: process.env.USER_DEFAULT_IMAGE,
};
