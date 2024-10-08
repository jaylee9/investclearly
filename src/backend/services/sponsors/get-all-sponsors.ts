import { Brackets } from 'typeorm';
import { getDatabaseConnection } from '../../config/data-source-config';
import { FindAllSponsorsInterface } from './interfaces/get-all-sponsors.interface';
import { OrderDirectionConstants } from '../../constants/order-direction-constants';
import { pagination } from '../../utils/pagination/pagination';
import { buildPaginationInfo } from '../../utils/pagination/build-pagination-info';
import { PaginationConstants } from '../../constants/pagination-constants';
import { Sponsor } from '../../../backend/entities/sponsors.entity';
import { sponsorMapper } from '../../../backend/mappers/sponsor.mapper';
import { DealStatuses } from '../../../backend/constants/enums/deal-statuses';
import { ReviewStatuses } from '../../../backend/constants/enums/review-statuses';
import { ReviewConstants } from '../../../backend/constants/review-constants';
import { Bookmark } from '../../../backend/entities/bookmark.entity';
import { BookmarkConstants } from '../../../backend/constants/bookmark-constants';
import { Location } from '../../entities/locations.entity';
import { LocationTargetTypesConstants } from '../../constants/location-target-types-constants';

export const getAllSponsors = async (params: FindAllSponsorsInterface) => {
  const {
    pageSize = PaginationConstants.defaultPageSize,
    page = PaginationConstants.defaultPage,
    orderDirection = OrderDirectionConstants.DESC,
    activelyRising,
    primaryAssetClasses = [],
    regionalFocus = [],
    search,
    limit,
    minRating = ReviewConstants.minAndMaxRatings.minRating,
    maxRating = ReviewConstants.minAndMaxRatings.maxRating,
    entityIds = [],
    currentUserId,
    stateOrCountryDescriptions = [],
  } = params;

  const connection = await getDatabaseConnection();

  let activelyRisingQuery = connection.manager
    .createQueryBuilder()
    .select([
      'sponsors.id AS sponsor_id',
      'AVG(COALESCE(reviews.overallRating, 0)) AS avg_overall_rating',
    ])
    .addSelect('COUNT(openDeals.id) > 0', 'actively_rising')
    .addSelect('COUNT(DISTINCT deals.id) AS deals_count')
    .addSelect('COUNT(DISTINCT reviews.id) AS reviews_count')
    .from(Sponsor, 'sponsors')
    .leftJoin('sponsors.deals', 'openDeals', 'openDeals.status = :status', {
      status: DealStatuses.active,
    })
    .andWhere('deals.isDealPublished = :isPublished', {
      isPublished: true,
    })
    .leftJoin('sponsors.deals', 'deals')
    .leftJoin('sponsors.reviews', 'reviews', 'reviews.status = :reviewStatus', {
      reviewStatus: ReviewStatuses.published,
    })
    .andHaving(
      'AVG(COALESCE(reviews.overallRating, 0)) BETWEEN :minRating AND :maxRating',
      {
        minRating,
        maxRating,
      }
    );

  if (currentUserId) {
    activelyRisingQuery = activelyRisingQuery
      .leftJoinAndMapMany(
        'sponsors.bookmarks',
        Bookmark,
        'bookmarks',
        'bookmarks.entityId = sponsors.id AND bookmarks.entityType = :bookmarkEntityType AND bookmarks.userId = :userId',
        {
          bookmarkEntityType: BookmarkConstants.entityTypes.sponsor,
          userId: currentUserId,
        }
      )
      .groupBy('sponsors.id, bookmarks.id');
  } else {
    activelyRisingQuery = activelyRisingQuery.groupBy('sponsors.id');
  }

  if (entityIds?.length) {
    activelyRisingQuery = activelyRisingQuery.andWhere(
      'sponsors.id IN (:...entityIds)',
      {
        entityIds,
      }
    );
  }

  let searchQuery = connection.manager
    .createQueryBuilder(Sponsor, 'sponsors')
    .leftJoin('sponsors.deals', 'deals')
    .leftJoin('sponsors.reviews', 'reviews')
    .andHaving(
      'AVG(COALESCE(reviews.overallRating, 0)) BETWEEN :minRating AND :maxRating',
      {
        minRating,
        maxRating,
      }
    )
    .leftJoinAndMapMany(
      'sponsors.locations',
      Location,
      'locations',
      'locations.entityId = sponsors.id AND locations.entityType = :sponsorEntityType',
      { sponsorEntityType: LocationTargetTypesConstants.sponsor }
    )
    .groupBy('sponsors.id, deals.id, locations.id');

  if (primaryAssetClasses?.length) {
    searchQuery = searchQuery.where(
      'sponsors.specialties && :primaryAssetClasses',
      {
        primaryAssetClasses,
      }
    );
  }

  if (stateOrCountryDescriptions.length) {
    searchQuery = searchQuery.andWhere(
      'locations.stateOrCountryDescription IN (:...stateOrCountryDescriptions)',
      {
        stateOrCountryDescriptions,
      }
    );
  }

  if (regionalFocus?.length) {
    searchQuery = searchQuery.andWhere('sponsors.regions && :regionalFocus', {
      regionalFocus,
    });
  }

  if (activelyRising === 'true') {
    searchQuery = searchQuery.andWhere('deals.status= :status', {
      status: DealStatuses.active,
    });
  }

  if (search) {
    searchQuery = searchQuery.andWhere(
      new Brackets(qb => {
        return qb
          .where('sponsors.vanityName ILIKE :search', { search: `%${search}%` })
          .orWhere('sponsors.legalName ILIKE :search', {
            search: `%${search}%`,
          })
          .orWhere('sponsors.address ILIKE :search', {
            search: `%${search}%`,
          })
          .orWhere('sponsors.sponsorName ILIKE :search', {
            search: `%${search}%`,
          });
      })
    );
  }

  if (entityIds?.length) {
    searchQuery = searchQuery.andWhere('sponsors.id IN (:...entityIds)', {
      entityIds,
    });
  }

  if (limit) {
    searchQuery = searchQuery.limit(limit);
  }

  searchQuery = searchQuery.orderBy('sponsors.createdAt', orderDirection);
  const amountSponsors = (await searchQuery.getMany()).length;

  searchQuery = pagination(pageSize, page, searchQuery);

  const sponsors = await searchQuery.getMany();
  const activelyRisingData = await activelyRisingQuery.getRawMany();

  const activelyRisingMap = activelyRisingData.reduce((map, item) => {
    map[item.sponsor_id] = {
      activelyRising: item.actively_rising,
      dealsCount: parseInt(item.deals_count),
      reviewsCount: parseInt(item.reviews_count),
      avgTotalRating: parseFloat(item.avg_overall_rating).toFixed(1),
      isInBookmarks: !!item?.bookmarks_id,
    };
    return map;
  }, {});

  const sponsorsWithActivelyRisingAndCounters = sponsors.map(sponsor => ({
    ...sponsor,
    activelyRising: activelyRisingMap[sponsor.id]?.activelyRising,
    dealsCount: activelyRisingMap[sponsor.id]?.dealsCount,
    reviewsCount: activelyRisingMap[sponsor.id]?.reviewsCount,
    avgTotalRating: activelyRisingMap[sponsor.id]?.avgTotalRating,
    isInBookmarks: activelyRisingMap[sponsor.id]?.isInBookmarks,
  }));

  const paginationData = await buildPaginationInfo(
    amountSponsors,
    page,
    pageSize
  );

  return {
    sponsors: await Promise.all(
      sponsorsWithActivelyRisingAndCounters.map(sponsorMapper)
    ),
    ...paginationData,
  };
};
