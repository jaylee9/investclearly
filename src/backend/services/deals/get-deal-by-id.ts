import createHttpError from 'http-errors';
import _ from 'lodash';
import { getDatabaseConnection } from '../../config/data-source-config';
import { Deal } from '../../entities/deals.entity';
import { DealConstants } from '../../constants/deal-constants';
import { dealMapper } from '../../mappers/deal.mapper';
import { Attachment } from '../../../backend/entities/attachments.entity';
import { TargetTypesConstants } from '../../../backend/constants/target-types-constants';
import { ReviewStatuses } from '../../../backend/constants/enums/review-statuses';

export const getDealById = async (id: number, userId?: number) => {
  const connection = await getDatabaseConnection();
  let dealQuery = connection.manager
    .createQueryBuilder()
    .select('deals')
    .from(Deal, 'deals')
    .leftJoinAndSelect('deals.sponsor', 'sponsor')
    .leftJoinAndSelect(
      'deals.reviews',
      'reviews',
      'reviews.status = :reviewStatus',
      {
        reviewStatus: ReviewStatuses.published,
      }
    )
    .leftJoinAndSelect('reviews.reviewer', 'reviewer')
    .leftJoinAndSelect(
      'sponsor.reviews',
      'sponsorReviews',
      'sponsorReviews.status = :sponsorReviewStatus',
      {
        sponsorReviewStatus: ReviewStatuses.published,
      }
    )
    .leftJoinAndMapMany(
      'deals.attachments',
      Attachment,
      'attachments',
      'attachments.entityId = deals.id AND attachments.entityType = :entityType',
      { entityType: TargetTypesConstants.deals }
    )
    .where('deals.id = :id', { id });

  if (userId) {
    dealQuery = dealQuery.leftJoinAndSelect(
      'deals.investments',
      'investments',
      'investments.userId = :userId',
      {
        userId,
      }
    );
  }

  const deal = await dealQuery.getOne();

  if (!deal) {
    throw new createHttpError.NotFound(DealConstants.dealNotFound);
  }

  if (deal.reviews?.length) {
    deal.reviewsCount = deal.reviews.length;
  }

  if (deal.sponsor?.reviews?.length) {
    const publishedReviews = _.filter(deal.sponsor.reviews, {
      status: ReviewStatuses.published,
    });
    const publishedReviewsCount = publishedReviews.length;
    const totalRating = _.sumBy(publishedReviews, 'overallRating');

    deal.sponsor.avgTotalRating =
      publishedReviewsCount > 0 ? totalRating / publishedReviewsCount : 0;
  }

  if (deal.investments?.length) {
    deal.isInInvestments = true;
  }

  return dealMapper(deal);
};
