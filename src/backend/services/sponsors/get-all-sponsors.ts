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
  } = params;

  const connection = await getDatabaseConnection();

  const activelyRisingQuery = connection.manager
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
      status: DealStatuses.open,
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
    )
    .groupBy('sponsors.id');

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
    .groupBy('sponsors.id, deals.id');

  if (primaryAssetClasses.length) {
    searchQuery = searchQuery.where(
      'sponsors.specialties && :primaryAssetClasses',
      {
        primaryAssetClasses,
      }
    );
  }

  if (regionalFocus.length) {
    searchQuery = searchQuery.andWhere('sponsors.regions && :regionalFocus', {
      regionalFocus,
    });
  }

  if (activelyRising === 'true') {
    searchQuery = searchQuery.andWhere('deals.status= :status', {
      status: DealStatuses.open,
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
      avgTotalRating: parseFloat(item.avg_overall_rating),
    };
    return map;
  }, {});

  const sponsorsWithActivelyRisingAndCounters = sponsors.map(sponsor => ({
    ...sponsor,
    activelyRising: activelyRisingMap[sponsor.id]?.activelyRising,
    dealsCount: activelyRisingMap[sponsor.id]?.dealsCount,
    reviewsCount: activelyRisingMap[sponsor.id]?.reviewsCount,
    avgTotalRating: activelyRisingMap[sponsor.id]?.avgTotalRating,
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
