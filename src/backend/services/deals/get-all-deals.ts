import { Brackets } from 'typeorm';
import { getDatabaseConnection } from '../../config/data-source-config';
import { Deal } from '../../entities/deals.entity';
import { dealMapper } from '../../mappers/deal.mapper';
import { FindAllDealsInterface } from './interfaces/get-all-deals.interface';
import { OrderDirectionConstants } from '../../constants/order-direction-constants';
import { pagination } from '../../utils/pagination/pagination';
import { buildPaginationInfo } from '../../utils/pagination/build-pagination-info';
import { PaginationConstants } from '../../constants/pagination-constants';
import { Attachment } from '../../../backend/entities/attachments.entity';
import { TargetTypesConstants } from '../../../backend/constants/target-types-constants';
import { ReviewConstants } from '../../../backend/constants/review-constants';
import { ReviewStatuses } from '../../../backend/constants/enums/review-statuses';
import { Bookmark } from '../../../backend/entities/bookmark.entity';
import { BookmarkConstants } from '../../../backend/constants/bookmark-constants';
import { Location } from '../../entities/locations.entity';
import { LocationTargetTypesConstants } from '../../constants/location-target-types-constants';

export const getAllDeals = async (params: FindAllDealsInterface) => {
  const {
    pageSize = PaginationConstants.defaultPageSize,
    page = PaginationConstants.defaultPage,
    orderDirection = OrderDirectionConstants.DESC,
    assetClasses = [],
    statuses = [],
    regions = [],
    investmentStructures = [],
    targetIRRMin,
    targetIRRMax,
    actualIRRMin,
    actualIRRMax,
    investmentMinValue,
    investmentMaxValue,
    preferredReturnMin,
    preferredReturnMax,
    exemptions = [],
    sponsorFeesMin,
    sponsorFeesMax,
    search,
    limit,
    minRating = ReviewConstants.minAndMaxRatings.minRating,
    maxRating = ReviewConstants.minAndMaxRatings.maxRating,
    sponsorId,
    regulations = [],
    entityIds = [],
    currentUserId,
  } = params;

  const connection = await getDatabaseConnection();
  let averageRatingQuery = connection.manager
    .createQueryBuilder()
    .select([
      'deals.id AS deal_id',
      'AVG(COALESCE(reviews.overallRating, 0)) AS avg_overall_rating',
    ])
    .addSelect('COUNT(DISTINCT reviews.id) AS reviews_count')
    .from(Deal, 'deals')
    .leftJoin('deals.reviews', 'reviews', 'reviews.status = :reviewStatus', {
      reviewStatus: ReviewStatuses.published,
    })
    .andHaving(
      'AVG(COALESCE(reviews.overallRating, 0)) BETWEEN :minRating AND :maxRating',
      {
        minRating,
        maxRating,
      }
    );

  if (sponsorId) {
    averageRatingQuery = averageRatingQuery.andWhere(
      'deals.sponsorId = :sponsorId',
      {
        sponsorId,
      }
    );
  }

  if (entityIds?.length) {
    averageRatingQuery = averageRatingQuery.andWhere(
      'deals.id IN (:...entityIds)',
      {
        entityIds,
      }
    );
  }

  if (currentUserId) {
    averageRatingQuery = averageRatingQuery
      .leftJoinAndMapMany(
        'deals.bookmarks',
        Bookmark,
        'bookmarks',
        'bookmarks.entityId = deals.id AND bookmarks.entityType = :entityType AND bookmarks.userId = :userId',
        {
          entityType: BookmarkConstants.entityTypes.deal,
          userId: currentUserId,
        }
      )
      .groupBy('deals.id, bookmarks.id');
  } else {
    averageRatingQuery = averageRatingQuery.groupBy('deals.id');
  }

  let searchQuery = connection.manager
    .createQueryBuilder()
    .select('deals')
    .from(Deal, 'deals')
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
    )
    .leftJoin('deals.reviews', 'reviews', 'reviews.status = :reviewStatus', {
      reviewStatus: ReviewStatuses.published,
    })
    .andHaving(
      'AVG(COALESCE(reviews.overallRating, 0)) BETWEEN :minRating AND :maxRating',
      {
        minRating,
        maxRating,
      }
    )
    .leftJoinAndSelect('deals.sponsor', 'sponsor')
    .groupBy('deals.id, attachments.id, locations.id, sponsor.id');

  if (assetClasses?.length) {
    searchQuery = searchQuery.where('deals.assetClass IN (:...assetClasses)', {
      assetClasses,
    });
  }

  if (statuses?.length) {
    searchQuery = searchQuery.andWhere('deals.status IN (:...statuses)', {
      statuses,
    });
  }

  if (regions?.length) {
    searchQuery = searchQuery.andWhere('deals.regions && :regions', {
      regions,
    });
  }

  if (investmentStructures?.length) {
    searchQuery = searchQuery.andWhere(
      'deals.investmentStructures && :investmentStructures',
      { investmentStructures }
    );
  }

  if (targetIRRMin && targetIRRMax) {
    searchQuery = searchQuery.andWhere(
      'deals.targetIRR BETWEEN :targetIRRMin AND :targetIRRMax',
      { targetIRRMin, targetIRRMax }
    );
  }

  if (actualIRRMin && actualIRRMax) {
    searchQuery = searchQuery.andWhere(
      'deals.actualIRR BETWEEN :actualIRRMin AND :actualIRRMax',
      { actualIRRMin, actualIRRMax }
    );
  }

  if (investmentMinValue && investmentMaxValue) {
    searchQuery = searchQuery.andWhere(
      'deals.minimumInvestment BETWEEN :investmentMinValue AND :investmentMaxValue',
      { investmentMinValue, investmentMaxValue }
    );
  }

  if (preferredReturnMin && preferredReturnMax) {
    searchQuery = searchQuery.andWhere(
      'deals.preferredReturn BETWEEN :preferredReturnMin AND :preferredReturnMax',
      { preferredReturnMin, preferredReturnMax }
    );
  }

  if (exemptions?.length) {
    searchQuery = searchQuery.andWhere('deals.exemption IN (:...exemptions)', {
      exemptions,
    });
  }

  if (regulations?.length) {
    searchQuery = searchQuery.andWhere(
      'deals.regulation IN (:...regulations)',
      {
        regulations,
      }
    );
  }

  if (investmentMinValue && investmentMaxValue) {
    searchQuery = searchQuery.andWhere(
      'deals.minimumInvestment BETWEEN :investmentMinValue AND :investmentMaxValue',
      { investmentMinValue, investmentMaxValue }
    );
  }

  if (sponsorFeesMin && sponsorFeesMax) {
    searchQuery = searchQuery.andWhere(
      'deals.fees BETWEEN :sponsorFeesMin AND :sponsorFeesMax',
      { sponsorFeesMin, sponsorFeesMax }
    );
  }

  if (sponsorId) {
    searchQuery = searchQuery.andWhere('deals.sponsorId = :sponsorId', {
      sponsorId,
    });
  }

  if (search) {
    searchQuery = searchQuery.andWhere(
      new Brackets(qb => {
        return qb
          .where('deals.dealTitle ILIKE :search', { search: `%${search}%` })
          .orWhere('deals.dealAddress ILIKE :search', {
            search: `%${search}%`,
          })
          .orWhere('deals.dealLegalName ILIKE :search', {
            search: `%${search}%`,
          })
          .orWhere('deals.dealSponsor ILIKE :search', {
            search: `%${search}%`,
          })
          .orWhere('deals.description ILIKE :search', {
            search: `%${search}%`,
          });
      })
    );
  }

  if (entityIds?.length) {
    searchQuery = searchQuery.andWhere('deals.id IN (:...entityIds)', {
      entityIds,
    });
  }

  if (limit) {
    searchQuery = searchQuery.limit(limit);
  }

  searchQuery = searchQuery.orderBy('deals.createdAt', orderDirection);
  const amountDeals = (await searchQuery.getMany()).length;

  searchQuery = pagination(pageSize, page, searchQuery);

  const averageRatingData = await averageRatingQuery.getRawMany();
  const deals = await searchQuery.getMany();

  const averageRatingMap = averageRatingData.reduce((map, item) => {
    map[item.deal_id] = {
      reviewsCount: parseInt(item.reviews_count),
      avgTotalRating: parseFloat(item.avg_overall_rating).toFixed(1),
      isInBookmarks: !!item?.bookmarks_id,
    };
    return map;
  }, {});

  const dealsWithCounters = deals.map(deal => ({
    ...deal,
    reviewsCount: averageRatingMap[deal.id]?.reviewsCount,
    avgTotalRating: averageRatingMap[deal.id]?.avgTotalRating,
    isInBookmarks: averageRatingMap[deal.id]?.isInBookmarks,
  }));

  const paginationData = await buildPaginationInfo(amountDeals, page, pageSize);

  const {
    minInvestment,
    maxInvestment,
    minTargetIRR,
    maxTargetIRR,
    minActualIRR,
    maxActualIRR,
    minFee,
    maxFee,
    minPreferredReturn,
    maxPreferredReturn,
  } = await connection
    .createQueryBuilder()
    .select('MIN(deals.minimumInvestment)', 'minInvestment')
    .addSelect('MAX(deals.minimumInvestment)', 'maxInvestment')
    .addSelect('MIN(deals.targetIRR)', 'minTargetIRR')
    .addSelect('MAX(deals.targetIRR)', 'maxTargetIRR')
    .addSelect('MIN(deals.actualIRR)', 'minActualIRR')
    .addSelect('MAX(deals.actualIRR)', 'maxActualIRR')
    .addSelect('MIN(deals.fees)', 'minFee')
    .addSelect('MAX(deals.fees)', 'maxFee')
    .addSelect('MIN(deals.preferredReturn)', 'minPreferredReturn')
    .addSelect('MAX(deals.preferredReturn)', 'maxPreferredReturn')
    .from(Deal, 'deals')
    .getRawOne();

  return {
    deals: await Promise.all(dealsWithCounters.map(dealMapper)),
    rangeData: {
      minInvestment,
      maxInvestment,
      minTargetIRR,
      maxTargetIRR,
      minActualIRR,
      maxActualIRR,
      minFee,
      maxFee,
      minPreferredReturn,
      maxPreferredReturn,
    },
    ...paginationData,
  };
};
