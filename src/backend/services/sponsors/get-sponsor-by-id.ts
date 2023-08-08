import createHttpError from 'http-errors';
import _ from 'lodash';
import { getDatabaseConnection } from '../../config/data-source-config';
import { SponsorConstants } from '../../../backend/constants/validation/sponsor-constants';
import { Sponsor } from '../../../backend/entities/sponsors.entity';
import { sponsorMapper } from '../../../backend/mappers/sponsor.mapper';
import { Deal } from '../../../backend/entities/deals.entity';
import { ReviewStatuses } from '../../../backend/constants/enums/review-statuses';

export const getSponsorById = async (id: number) => {
  const connection = await getDatabaseConnection();

  const sponsor = await connection.manager.findOne(Sponsor, {
    where: { id, reviews: { status: ReviewStatuses.published } },
    relations: ['user', 'deals', 'reviews'],
  });

  if (!sponsor) {
    throw new createHttpError.NotFound(SponsorConstants.sponsorNotFound);
  }

  sponsor.dealsCount = await connection.manager.count(Deal, {
    where: { sponsorId: sponsor.id },
  });

  const publishedReviews = _.filter(sponsor.reviews, {
    status: ReviewStatuses.published,
  });
  const publishedReviewsCount = publishedReviews.length;
  const totalRating = _.sumBy(publishedReviews, 'overallRating');

  sponsor.reviewsCount = publishedReviewsCount;
  sponsor.avgTotalRating =
    publishedReviewsCount > 0 ? totalRating / publishedReviewsCount : 0;

  return sponsorMapper(sponsor);
};
