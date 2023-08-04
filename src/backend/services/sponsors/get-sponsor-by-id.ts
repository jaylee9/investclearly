import createHttpError from 'http-errors';
import { getDatabaseConnection } from '../../config/data-source-config';
import { SponsorConstants } from '../../../backend/constants/validation/sponsor-constants';
import { Sponsor } from '../../../backend/entities/sponsors.entity';
import { sponsorMapper } from '../../../backend/mappers/sponsor.mapper';
import { Deal } from '../../../backend/entities/deals.entity';
import { Review } from '../../../backend/entities/reviews.entity';
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

  sponsor.reviewsCount = await connection.manager.count(Review, {
    where: { sponsorId: sponsor.id, status: ReviewStatuses.published },
  });

  if (sponsor.reviews && sponsor.reviews.length > 0) {
    let totalRating = 0;
    let publishedReviewsCount = 0;

    sponsor.reviews.forEach(review => {
      if (review.status === ReviewStatuses.published) {
        totalRating += review.overallRating;
        publishedReviewsCount++;
      }
    });

    if (publishedReviewsCount > 0) {
      sponsor.avgTotalRating = totalRating / publishedReviewsCount;
    } else {
      sponsor.avgTotalRating = 0;
    }
  } else {
    sponsor.avgTotalRating = 0;
  }

  return sponsorMapper(sponsor);
};
