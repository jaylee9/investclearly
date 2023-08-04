import createHttpError from 'http-errors';
import { getDatabaseConnection } from '../../config/data-source-config';
import { Deal } from '../../entities/deals.entity';
import { DealConstants } from '../../constants/deal-constants';
import { dealMapper } from '../../mappers/deal.mapper';
import { Attachment } from '../../../backend/entities/attachments.entity';
import { TargetTypesConstants } from '../../../backend/constants/target-types-constants';
import { ReviewStatuses } from '../../../backend/constants/enums/review-statuses';
import { Review } from '../../../backend/entities/reviews.entity';

export const getDealById = async (id: number) => {
  const connection = await getDatabaseConnection();
  const deal = await connection.manager
    .createQueryBuilder()
    .select('deals')
    .from(Deal, 'deals')
    .leftJoinAndSelect('deals.sponsor', 'sponsor')
    .leftJoinAndSelect('deals.reviews', 'reviews')
    .leftJoinAndSelect('sponsor.reviews', 'sponsorReviews')
    .leftJoinAndMapMany(
      'deals.attachments',
      Attachment,
      'attachments',
      'attachments.entityId = deals.id AND attachments.entityType = :entityType',
      { entityType: TargetTypesConstants.deals }
    )
    .where('deals.id = :id', { id })
    .where('reviews.status = :reviewStatus', {
      reviewStatus: ReviewStatuses.published,
    })
    .getOne();

  if (!deal) {
    throw new createHttpError.NotFound(DealConstants.dealNotFound);
  }

  deal.reviewsCount = await connection.manager.count(Review, {
    where: { dealId: deal.id, status: ReviewStatuses.published },
  });

  if (deal.sponsor.reviews && deal.sponsor.reviews.length > 0) {
    let totalRating = 0;
    let publishedReviewsCount = 0;

    deal.sponsor.reviews.forEach(review => {
      if (review.status === ReviewStatuses.published) {
        totalRating += review.overallRating;
        publishedReviewsCount++;
      }
    });

    if (publishedReviewsCount > 0) {
      deal.sponsor.avgTotalRating = totalRating / publishedReviewsCount;
    } else {
      deal.sponsor.avgTotalRating = 0;
    }
  } else {
    deal.sponsor.avgTotalRating = 0;
  }

  return dealMapper(deal);
};
