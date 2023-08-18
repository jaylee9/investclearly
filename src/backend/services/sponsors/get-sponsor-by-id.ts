import createHttpError from 'http-errors';
import _ from 'lodash';
import { getDatabaseConnection } from '../../config/data-source-config';
import { SponsorConstants } from '../../../backend/constants/validation/sponsor-constants';
import { Sponsor } from '../../../backend/entities/sponsors.entity';
import { sponsorMapper } from '../../../backend/mappers/sponsor.mapper';
import { ReviewStatuses } from '../../../backend/constants/enums/review-statuses';
import { Bookmark } from '../../../backend/entities/bookmark.entity';
import { BookmarkConstants } from '../../../backend/constants/bookmark-constants';

export const getSponsorById = async (id: number, currentUserId?: number) => {
  const connection = await getDatabaseConnection();

  let sponsorQuery = connection.manager
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
    .setParameter('reviewStatus', ReviewStatuses.published);

  if (currentUserId) {
    sponsorQuery = sponsorQuery.leftJoinAndMapMany(
      'sponsor.bookmarks',
      Bookmark,
      'bookmarks',
      'bookmarks.entityId = sponsor.id AND bookmarks.entityType = :entityType AND bookmarks.userId = :userId',
      {
        entityType: BookmarkConstants.entityTypes.sponsor,
        userId: currentUserId,
      }
    );
  }

  const sponsor = await sponsorQuery.getOne();

  if (!sponsor) {
    throw new createHttpError.NotFound(SponsorConstants.sponsorNotFound);
  }

  if (sponsor.deals?.length) {
    sponsor.dealsCount = sponsor.deals.length;
  }

  if (sponsor.reviews?.length) {
    const publishedReviews = _.filter(sponsor.reviews, {
      status: ReviewStatuses.published,
    });
    const publishedReviewsCount = publishedReviews.length;
    const totalRating = _.sumBy(publishedReviews, 'overallRating');

    sponsor.reviewsCount = publishedReviewsCount;
    sponsor.avgTotalRating =
      publishedReviewsCount > 0 ? totalRating / publishedReviewsCount : 0;
  }

  if (sponsor.bookmarks?.length) {
    sponsor.isInBookmarks = true;
  }

  return sponsorMapper(sponsor);
};
