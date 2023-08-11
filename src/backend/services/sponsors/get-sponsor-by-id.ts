import createHttpError from 'http-errors';
import _ from 'lodash';
import { getDatabaseConnection } from '../../config/data-source-config';
import { SponsorConstants } from '../../../backend/constants/validation/sponsor-constants';
import { Sponsor } from '../../../backend/entities/sponsors.entity';
import { sponsorMapper } from '../../../backend/mappers/sponsor.mapper';
import { ReviewStatuses } from '../../../backend/constants/enums/review-statuses';

export const getSponsorById = async (id: number) => {
  const connection = await getDatabaseConnection();

  const sponsor = await connection.manager
    .createQueryBuilder(Sponsor, 'sponsor')
    .where('sponsor.id = :id', { id })
    .leftJoinAndSelect('sponsor.user', 'user')
    .leftJoinAndSelect('sponsor.deals', 'deals')
    .leftJoinAndSelect(
      'sponsor.reviews',
      'reviews',
      'reviews.status = :reviewStatus'
    )
    .leftJoinAndSelect('reviews.reviewer', 'reviewer')
    .setParameter('reviewStatus', ReviewStatuses.published)
    .getOne();

  if (!sponsor) {
    throw new createHttpError.NotFound(SponsorConstants.sponsorNotFound);
  }

  if (sponsor.deals && sponsor.deals.length) {
    sponsor.dealsCount = sponsor.deals.length;

    const publishedReviews = _.filter(sponsor.reviews, {
      status: ReviewStatuses.published,
    });
    const publishedReviewsCount = publishedReviews.length;
    const totalRating = _.sumBy(publishedReviews, 'overallRating');

    sponsor.reviewsCount = publishedReviewsCount;
    sponsor.avgTotalRating =
      publishedReviewsCount > 0 ? totalRating / publishedReviewsCount : 0;
  }

  return sponsorMapper(sponsor);
};
