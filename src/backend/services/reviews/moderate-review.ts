import { Review } from '../../../backend/entities/reviews.entity';
import { getDatabaseConnection } from '../../../backend/config/data-source-config';
import { ReviewStatuses } from '../../../backend/constants/enums/review-statuses';
import { getReviewById } from './get-review-by-id';
import { ModerateReviewInterface } from './interfaces/moderate-review.interface';
import { sendReviewPublishedEmail } from '../mails/send-review-published-email';
import { sendUnverifiedReviewPublishedEmail } from '../mails/send-unverified-review-published-email';
import { sendReviewUnpublishedEmail } from '../mails/send-review-unpublished-email';
import { sendReviewRejectedEmail } from '../mails/send-review-rejected-email';

export const moderate = async (
  id: number,
  reviewData: ModerateReviewInterface
) => {
  const connection = await getDatabaseConnection();
  const { status, reason, unpublishReviewMessage, rejectReviewMessage } =
    reviewData;
  const reviewRecord = await getReviewById(id);

  if (status === ReviewStatuses.published) {
    const isVerified = reviewRecord.attachments.length !== 0;
    await connection.manager.update(Review, { id }, { status, isVerified });

    if (isVerified) {
      await sendReviewPublishedEmail(reviewRecord);
    } else {
      await sendUnverifiedReviewPublishedEmail(reviewRecord);
    }
  }

  if (
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
