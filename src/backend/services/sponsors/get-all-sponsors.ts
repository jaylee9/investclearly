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
      'sponsors.id AS sponsorId',
      'AVG(reviews.overallRating) AS avgOverallRating',
    ])
    .addSelect('COUNT(openDeals.id) > 0', 'activelyRising')
    .addSelect('COUNT(DISTINCT deals.id) AS dealsCount')
    .addSelect('COUNT(DISTINCT reviews.id) AS reviewsCount')
    .from(Sponsor, 'sponsors')
    .leftJoin('sponsors.deals', 'openDeals', 'openDeals.status = :status', {
      status: DealStatuses.open,
    })
    .leftJoin('sponsors.deals', 'deals')
    .leftJoin('sponsors.reviews', 'reviews', 'reviews.status = :reviewStatus', {
      reviewStatus: ReviewStatuses.published,
    })
    .groupBy('sponsors.id');

  let searchQuery = connection.manager
    .createQueryBuilder(Sponsor, 'sponsors')
    .leftJoin('sponsors.deals', 'deals')
    .groupBy('sponsors.id, deals.id');

  if (primaryAssetClasses.length) {
    searchQuery = searchQuery.where(
      'sponsors.specialty IN (:...primaryAssetClasses)',
      {
        primaryAssetClasses,
      }
    );
  }

  if (regionalFocus.length) {
    searchQuery = searchQuery.andWhere(
      'sponsors.region IN (:...regionalFocus)',
      {
        regionalFocus,
      }
    );
  }

  if (activelyRising === true) {
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
  searchQuery = pagination(pageSize, page, searchQuery);

  const sponsors = await searchQuery.getMany();
  const activelyRisingData = await activelyRisingQuery.getRawMany();

  const activelyRisingMap = activelyRisingData.reduce((map, item) => {
    map[item.sponsorid] = {
      activelyRising: item.activelyRising,
      dealsCount: parseInt(item.dealscount),
      reviewsCount: parseInt(item.reviewscount),
      avgTotalRating:
        item.avgoverallrating !== null ? parseFloat(item.avgoverallrating) : 0,
    };
    return map;
  }, {});

  const sponsorsWithActivelyRisingAndCounters = sponsors
    .filter(sponsor => {
      const avgTotalRating = parseFloat(
        activelyRisingMap[sponsor.id]?.avgTotalRating
      );
      return avgTotalRating >= minRating && avgTotalRating <= maxRating;
    })
    .map(sponsor => ({
      ...sponsor,
      activelyRising: activelyRisingMap[sponsor.id]?.activelyRising || false,
      dealsCount: activelyRisingMap[sponsor.id]?.dealsCount || 0,
      reviewsCount: activelyRisingMap[sponsor.id]?.reviewsCount || 0,
      avgTotalRating: activelyRisingMap[sponsor.id]?.avgTotalRating || null,
    }));

  const paginationData = await buildPaginationInfo(
    sponsorsWithActivelyRisingAndCounters.length,
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
