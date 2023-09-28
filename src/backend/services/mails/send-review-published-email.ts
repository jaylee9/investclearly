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

export const sendReviewPublishedEmail = async (
  reviewRecord: ReviewInterface
) => {
  sgMail.setApiKey(MailConfig.sendgridApiKey);

  if (
    reviewRecord.reviewer &&
    reviewRecord.sponsor &&
    reviewRecord.reviewer.reviewWasPublishedAfterModerationEmail
  ) {
    const mailData: MailDataRequired = {
      to: { email: reviewRecord.reviewer.email },
      from: { email: MailConfig.sendFromHost, name: MailConfig.sendFromName },
      templateId: TemplatesIds.publishedReviewEmail,
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
      },
    };

    return sgMail.send(mailData);
  }
};
