import * as sgMail from '@sendgrid/mail';
import { MailDataRequired } from '@sendgrid/mail';
import { MailConfig, TemplatesIds } from '../../config/mail-config';
import { ReviewInterface } from '../reviews/interfaces/review.interface';

export const sendReviewPublishedEmail = async (
  reviewRecord: ReviewInterface
) => {
  sgMail.setApiKey(MailConfig.sendgridApiKey);

  if (reviewRecord.reviewer && reviewRecord.sponsor) {
    const mailData: MailDataRequired = {
      to: { email: reviewRecord.reviewer.email },
      from: { email: MailConfig.sendFrom, name: MailConfig.sendFromName },
      templateId: TemplatesIds.publishedReviewEmail,
      dynamicTemplateData: {
        frontendUrl: MailConfig.frontendUrl,
        averageRating: reviewRecord.overallRating,
        publishedAt: reviewRecord.updatedAt,
        sponsorVanityName: reviewRecord.sponsor.vanityName,
        sponsorBusinessAvatar: reviewRecord.sponsor.businessAvatar,
        reviewTittle: reviewRecord.title,
        overallComment: reviewRecord.overallComment,
      },
    };

    return sgMail.send(mailData);
  }
};
