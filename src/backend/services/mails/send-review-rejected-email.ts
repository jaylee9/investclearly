import * as sgMail from '@sendgrid/mail';
import { MailDataRequired } from '@sendgrid/mail';
import moment from 'moment';
import {
  DefaultImages,
  MailConfig,
  TemplatesIds,
} from '../../config/mail-config';
import { ReviewInterface } from '../reviews/interfaces/review.interface';
import { MomentConstants } from '../../../backend/constants/moment-constants';

export const sendReviewRejectedEmail = async (
  reviewRecord: ReviewInterface,
  reason: string,
  rejectReviewMessage: string
) => {
  sgMail.setApiKey(MailConfig.sendgridApiKey);

  if (
    reviewRecord.reviewer &&
    reviewRecord.sponsor &&
    reviewRecord.reviewer.reviewWasDeclinedAfterModerationEmail
  ) {
    const mailData: MailDataRequired = {
      to: { email: reviewRecord.reviewer.email },
      from: { email: MailConfig.sendFrom, name: MailConfig.sendFromName },
      templateId: TemplatesIds.reviewRejectedEmail,
      dynamicTemplateData: {
        frontendUrl: MailConfig.frontendUrl,
        averageRating: reviewRecord.overallRating,
        publishedAt: moment(reviewRecord.updatedAt).format(
          MomentConstants.dateFormatForModerationReviews
        ),
        sponsorVanityName: reviewRecord.sponsor.vanityName,
        sponsorBusinessAvatar:
          reviewRecord.sponsor.businessAvatar || DefaultImages.sponsorImage,
        reviewTittle: reviewRecord.title,
        overallComment: reviewRecord.overallComment,
        reason,
        rejectReviewMessage,
      },
    };

    return sgMail.send(mailData);
  }
};
