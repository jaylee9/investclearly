import createHttpError from 'http-errors';
import _ from 'lodash';
import { getDatabaseConnection } from '../../config/data-source-config';
import { SponsorConstants } from '../../constants/sponsor-constants';
import { Sponsor } from '../../../backend/entities/sponsors.entity';
import { sponsorMapper } from '../../../backend/mappers/sponsor.mapper';
import { ReviewStatuses } from '../../../backend/constants/enums/review-statuses';
import { Bookmark } from '../../../backend/entities/bookmark.entity';
import { BookmarkConstants } from '../../../backend/constants/bookmark-constants';
import { Review } from '../../../backend/entities/reviews.entity';
import { Deal } from '../../../backend/entities/deals.entity';
import { Attachment } from '../../../backend/entities/attachments.entity';
import { TargetTypesConstants } from '../../../backend/constants/target-types-constants';
import { Location } from '../../entities/locations.entity';
import { LocationTargetTypesConstants } from '../../constants/location-target-types-constants';

export const getSponsorById = async (
  id: number,
  reviewsLimit = SponsorConstants.defaultLimits.defaultReviewsLimit,
  dealsLimit = SponsorConstants.defaultLimits.defaultDealsLimit,
  currentUserId?: number
) => {
  const connection = await getDatabaseConnection();

  let sponsorQuery = connection.manager
    .createQueryBuilder()
    .select('sponsor')
    .from(Sponsor, 'sponsor')
    .where('sponsor.id = :id', { id })
    .leftJoinAndSelect('sponsor.user', 'user')
    .leftJoinAndMapMany(
      'sponsor.locations',
      Location,
      'locations',
      'locations.entityId = sponsor.id AND locations.entityType = :sponsorEntityType',
      { sponsorEntityType: LocationTargetTypesConstants.sponsor }
    );

  const reviewsQuery = connection.manager
    .createQueryBuilder(Review, 'reviews')
    .where('reviews.sponsorId = :sponsorId', { sponsorId: id })
    .andWhere('reviews.status = :reviewStatus', {
      reviewStatus: ReviewStatuses.published,
    })
    .leftJoinAndSelect('reviews.reviewer', 'reviewer');

  const dealsQuery = connection.manager
    .createQueryBuilder(Deal, 'deals')
    .where('deals.sponsorId = :sponsorId', { sponsorId: id })
    .andWhere('deals.isDealPublished = :isPublished', {
      isPublished: true,
    })
    .leftJoinAndMapMany(
      'deals.attachments',
      Attachment,
      'attachments',
      'attachments.entityId = deals.id AND attachments.entityType = :attachmentEntityType',
      { attachmentEntityType: TargetTypesConstants.deals }
    );

  const dealsCount = await dealsQuery.clone().getCount();
  const publishedReviewsCount = await reviewsQuery.clone().getCount();

  if (currentUserId) {
    sponsorQuery = sponsorQuery.leftJoinAndMapMany(
      'sponsor.bookmarks',
      Bookmark,
      'bookmarks',
      'bookmarks.entityId = sponsor.id AND bookmarks.entityType = :bookmarkEntityType AND bookmarks.userId = :userId',
      {
        bookmarkEntityType: BookmarkConstants.entityTypes.sponsor,
        userId: currentUserId,
      }
    );
  }

  const sponsor = await sponsorQuery.getOne();

  if (!sponsor) {
    throw new createHttpError.NotFound(SponsorConstants.sponsorNotFound);
  }
  const publishedReviews = await reviewsQuery.getMany();
  sponsor.reviews = await reviewsQuery.limit(reviewsLimit).getMany();
  sponsor.deals = await dealsQuery.limit(dealsLimit).getMany();
  sponsor.dealsCount = dealsCount;

  if (publishedReviews?.length) {
    const totalRating = _.sumBy(publishedReviews, 'overallRating');

    sponsor.reviewsCount = publishedReviewsCount;
    sponsor.avgTotalRating =
      publishedReviewsCount > 0
        ? parseFloat((totalRating / publishedReviewsCount).toFixed(1))
        : 0;
  }

  if (sponsor.bookmarks?.length) {
    sponsor.isInBookmarks = true;
  }

  return sponsorMapper(sponsor);
};
