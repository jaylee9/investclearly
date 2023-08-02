import * as sgMail from '@sendgrid/mail';
import { MailDataRequired } from '@sendgrid/mail';
import { MailConfig, TemplatesIds } from '../../config/mail-config';
import { ReviewInterface } from '../reviews/interfaces/review.interface';

export const sendReviewUnpublishedEmail = async (
  reviewRecord: ReviewInterface,
  reason: string,
  unpublishReviewMessage: string
) => {
  sgMail.setApiKey(MailConfig.sendgridApiKey);

  const mailData: MailDataRequired = {
    to: { email: reviewRecord.reviewer.email },
    from: { email: MailConfig.sendFrom, name: MailConfig.sendFromName },
    templateId: TemplatesIds.reviewUnpublishedEmail,
    dynamicTemplateData: {
      frontendUrl: MailConfig.frontendUrl,
      averageRating: reviewRecord.overallRating,
      publishedAt: reviewRecord.updatedAt,
      sponsorVanityName: reviewRecord.sponsor.vanityName,
      sponsorBusinessAvatar: reviewRecord.sponsor.businessAvatar,
      reviewTittle: reviewRecord.title,
      overallComment: reviewRecord.overallComment,
      reason,
      unpublishReviewMessage,
    },
  };

  return sgMail.send(mailData);
};
