import * as sgMail from '@sendgrid/mail';
import { MailDataRequired } from '@sendgrid/mail';
import moment from 'moment';
import { MailConfig, TemplatesIds } from '../../config/mail-config';
import { ReviewInterface } from '../reviews/interfaces/review.interface';
import { MomentConstants } from '../../constants/moment-constants';

export const sendUnverifiedReviewPublishedEmailToBmRecipients = async (
  bmRecipientEmails: string[],
  reviewRecord: ReviewInterface
) => {
  sgMail.setApiKey(MailConfig.sendgridApiKey);

  if (reviewRecord && reviewRecord.sponsor) {
    const userEmails = bmRecipientEmails.map(recipientEmail => {
      const mailDataForRecipient: MailDataRequired = {
        to: { email: recipientEmail },
        from: { email: MailConfig.sendFrom, name: MailConfig.sendFromName },
        templateId: TemplatesIds.unverifiedReviewPublishedEmailToBmRecipients,
        dynamicTemplateData: {
          frontendUrl: MailConfig.frontendUrl,
          averageRating: reviewRecord.overallRating,
          publishedAt: moment(reviewRecord.updatedAt).format(
            MomentConstants.dateFormatForModerationReviews
          ),
          sponsorVanityName: reviewRecord.sponsor!.vanityName,
          sponsorBusinessAvatar: reviewRecord.sponsor!.businessAvatar,
          reviewTitle: reviewRecord.title,
          overallComment: reviewRecord.overallComment,
        },
      };
      return sgMail.send(mailDataForRecipient);
    });

    await Promise.all(userEmails);
  }
};
