import createHttpError from 'http-errors';
import _ from 'lodash';
import { getDatabaseConnection } from '../../config/data-source-config';
import { Deal } from '../../entities/deals.entity';
import { DealConstants } from '../../constants/deal-constants';
import { dealMapper } from '../../mappers/deal.mapper';
import { Attachment } from '../../../backend/entities/attachments.entity';
import { TargetTypesConstants } from '../../../backend/constants/target-types-constants';
import { ReviewStatuses } from '../../../backend/constants/enums/review-statuses';
import { BookmarkConstants } from '../../../backend/constants/bookmark-constants';
import { Bookmark } from '../../../backend/entities/bookmark.entity';
import { Location } from '../../entities/locations.entity';
import { LocationTargetTypesConstants } from '../../constants/location-target-types-constants';

export const getDealById = async (id: number, userId?: number) => {
  const connection = await getDatabaseConnection();
  let dealQuery = connection.manager
    .createQueryBuilder()
    .select('deals')
    .from(Deal, 'deals')
    .leftJoinAndSelect('deals.sponsor', 'sponsor')
    .leftJoinAndSelect(
      'sponsor.reviews',
      'sponsorReviews',
      'sponsorReviews.status = :sponsorReviewStatus',
      {
        sponsorReviewStatus: ReviewStatuses.published,
      }
    )
    .where('deals.id = :id', { id });

  if (userId) {
    dealQuery = dealQuery
      .leftJoinAndSelect(
        'deals.investments',
        'investments',
        'investments.userId = :userId',
        {
          userId,
        }
      )
      .leftJoinAndMapMany(
        'deals.bookmarks',
        Bookmark,
        'bookmarks',
        'bookmarks.entityId = deals.id AND bookmarks.entityType = :entityType AND bookmarks.userId = :userId',
        { entityType: BookmarkConstants.entityTypes.deal, userId }
      );
  }

  dealQuery = dealQuery
    .leftJoinAndMapMany(
      'deals.attachments',
      Attachment,
      'attachments',
      'attachments.entityId = deals.id AND attachments.entityType = :entityType',
      { entityType: TargetTypesConstants.deals }
    )
    .leftJoinAndMapMany(
      'deals.locations',
      Location,
      'locations',
      'locations.entityId = deals.id AND locations.entityType = :dealEntityType',
      { dealEntityType: LocationTargetTypesConstants.deal }
    );

  const deal = await dealQuery.getOne();
  if (!deal) {
    throw new createHttpError.NotFound(DealConstants.dealNotFound);
  }

  if (deal.sponsor?.reviews?.length) {
    const publishedReviews = _.filter(deal.sponsor.reviews, {
      status: ReviewStatuses.published,
    });
    const publishedReviewsCount = publishedReviews.length;
    const totalRating = _.sumBy(publishedReviews, 'overallRating');

    deal.sponsor.avgTotalRating =
      publishedReviewsCount > 0
        ? parseFloat((totalRating / publishedReviewsCount).toFixed(1))
        : 0;
    deal.sponsor.reviewsCount = publishedReviewsCount;
  }

  if (deal.investments?.length) {
    deal.isInInvestments = true;
  }

  if (deal.bookmarks?.length) {
    deal.isInBookmarks = true;
  }

  return dealMapper(deal);
};
