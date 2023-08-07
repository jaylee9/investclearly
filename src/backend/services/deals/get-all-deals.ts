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

export const getAllDeals = async (params: FindAllDealsInterface) => {
  const {
    pageSize = PaginationConstants.defaultPageSize,
    page = PaginationConstants.defaultPage,
    orderDirection = OrderDirectionConstants.DESC,
    assetClasses = [],
    statuses = [],
    regions = [],
    investmentStructures = [],
    IRRMin,
    IRRMax,
    investmentMinValue,
    investmentMaxValue,
    exemptions = [],
    sponsorFeesMin,
    sponsorFeesMax,
    search,
    limit,
    minRating = ReviewConstants.minAndMaxRatings.minRating,
    maxRating = ReviewConstants.minAndMaxRatings.maxRating,
    sponsorId,
  } = params;

  const connection = await getDatabaseConnection();
  const averageRatingQuery = connection.manager
    .createQueryBuilder()
    .select([
      'deals.id AS deal_id',
      'AVG(reviews.overallRating) AS avg_overall_rating',
    ])
    .addSelect('COUNT(DISTINCT reviews.id) AS reviews_count')
    .from(Deal, 'deals')
    .leftJoin('deals.reviews', 'reviews', 'reviews.status = :reviewStatus', {
      reviewStatus: ReviewStatuses.published,
    })
    .groupBy('deals.id');

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
    .groupBy('deals.id, attachments.id');

  if (assetClasses.length) {
    searchQuery = searchQuery.where('deals.assetClass IN (:...assetClasses)', {
      assetClasses,
    });
  }

  if (statuses.length) {
    searchQuery = searchQuery.andWhere('deals.status IN (:...statuses)', {
      statuses,
    });
  }

  if (regions.length) {
    searchQuery = searchQuery.andWhere('deals.region IN (:...regions)', {
      regions,
    });
  }

  if (investmentStructures.length) {
    searchQuery = searchQuery.andWhere(
      'deals.investmentStructure IN (:...investmentStructures)',
      { investmentStructures }
    );
  }

  if (IRRMin && IRRMax) {
    searchQuery = searchQuery.andWhere(
      'deals.targetIRR BETWEEN :IRRMin AND :IRRMax',
      { IRRMin, IRRMax }
    );
  }

  if (investmentMinValue && investmentMaxValue) {
    searchQuery = searchQuery.andWhere(
      'deals.minimumInvestment BETWEEN :investmentMinValue AND :investmentMaxValue',
      { investmentMinValue, investmentMaxValue }
    );
  }

  if (exemptions.length) {
    searchQuery = searchQuery.andWhere('deals.exemption IN (:...exemptions)', {
      exemptions,
    });
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

  if (limit) {
    searchQuery = searchQuery.limit(limit);
  }

  searchQuery = searchQuery.orderBy('deals.createdAt', orderDirection);
  searchQuery = pagination(pageSize, page, searchQuery);

  const averageRatingData = await averageRatingQuery.getRawMany();
  const deals = await searchQuery.getMany();

  const activelyRisingMap = averageRatingData.reduce((map, item) => {
    map[item.deal_id] = {
      reviewsCount: parseInt(item.reviews_count),
      avgTotalRating:
        item.avg_overall_rating !== null
          ? parseFloat(item.avg_overall_rating)
          : 0,
    };
    return map;
  }, {});

  const dealsWithCounters = deals.map(deal => ({
    ...deal,
    reviewsCount: activelyRisingMap[deal.id]?.reviewsCount || 0,
    avgTotalRating: activelyRisingMap[deal.id]?.avgTotalRating || 0,
  }));

  const paginationData = await buildPaginationInfo(
    dealsWithCounters.length,
    page,
    pageSize
  );

  return {
    deals: await Promise.all(dealsWithCounters.map(dealMapper)),
    ...paginationData,
  };
};
