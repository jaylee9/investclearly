import { Not } from 'typeorm';
import { Review } from '../../../backend/entities/reviews.entity';
import { getDatabaseConnection } from '../../../backend/config/data-source-config';
import { ReviewStatuses } from '../../../backend/constants/enums/review-statuses';
import { getReviewById } from './get-review-by-id';
import { ModerateReviewInterface } from './interfaces/moderate-review.interface';
import { sendReviewPublishedEmail } from '../mails/send-review-published-email';
import { sendUnverifiedReviewPublishedEmail } from '../mails/send-unverified-review-published-email';
import { sendReviewUnpublishedEmail } from '../mails/send-review-unpublished-email';
import { sendReviewRejectedEmail } from '../mails/send-review-rejected-email';
import { Bookmark } from '../../../backend/entities/bookmark.entity';
import { BookmarkConstants } from '../../../backend/constants/bookmark-constants';
import { sendReviewPublishedEmailToBmRecipients } from '../mails/send-review-published-email-to-bm-recipients';
import { sendUnverifiedReviewPublishedEmailToBmRecipients } from '../mails/send-unverified-review-published-email-to-bm-recipients';

export const moderate = async (
  id: number,
  reviewData: ModerateReviewInterface
) => {
  const connection = await getDatabaseConnection();
  const { status, reason, unpublishReviewMessage, rejectReviewMessage } =
    reviewData;
  const reviewRecord = await getReviewById(id);
  const bookmarks = await connection.manager.find(Bookmark, {
    where: {
      entityId: reviewRecord.sponsorId,
      entityType: BookmarkConstants.entityTypes.sponsor,
      userId: Not(reviewRecord.reviewerId),
    },
    relations: ['user'],
  });

  const bmRecipientEmails = bookmarks.map(obj => obj.user.email);

  if (status === ReviewStatuses.published) {
    const isVerified = reviewRecord.attachments?.length !== 0;
    await connection.manager.update(
      Review,
      { id },
      { status: ReviewStatuses.published, isVerified }
    );

    if (isVerified) {
      await sendReviewPublishedEmail(reviewRecord);
      if (bmRecipientEmails?.length) {
        await sendReviewPublishedEmailToBmRecipients(
          bmRecipientEmails,
          reviewRecord
        );
      }
    } else {
      await sendUnverifiedReviewPublishedEmail(reviewRecord);
      if (bmRecipientEmails?.length) {
        await sendUnverifiedReviewPublishedEmailToBmRecipients(
          bmRecipientEmails,
          reviewRecord
        );
      }
    }
  }

  if (
    reason &&
    status === ReviewStatuses.rejected &&
    (unpublishReviewMessage || rejectReviewMessage)
  ) {
    await connection.manager.update(
      Review,
      { id },
      { status: ReviewStatuses.rejected, isVerified: false }
    );

    if (unpublishReviewMessage) {
      await sendReviewUnpublishedEmail(
        reviewRecord,
        reason,
        unpublishReviewMessage
      );
    }

    if (rejectReviewMessage) {
      await sendReviewRejectedEmail(reviewRecord, reason, rejectReviewMessage);
    }
  }

  return getReviewById(id);
};
