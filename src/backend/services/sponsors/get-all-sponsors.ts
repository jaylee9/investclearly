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
  } = params;

  const connection = await getDatabaseConnection();

  const activelyRisingQuery = connection.manager
    .createQueryBuilder()
    .select('sponsors.id', 'sponsorId')
    .addSelect('COUNT(deals.id) > 0', 'activelyRising')
    .addSelect('COUNT(deals.id) AS dealscount')
    .from(Sponsor, 'sponsors')
    .leftJoin('sponsors.deals', 'deals', 'deals.status = :status', {
      status: DealStatuses.open,
    })
    .groupBy('sponsors.id');

  let searchQuery = connection.manager
    .createQueryBuilder(Sponsor, 'sponsors')
    .leftJoin('sponsors.deals', 'deals', 'deals.status = :status', {
      status: DealStatuses.open,
    })
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
    searchQuery = searchQuery
      .leftJoin('sponsors.deals', 'deals')
      .andWhere('deals.status= :status', { status: DealStatuses.open });
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

  const [sponsors, count] = await searchQuery.getManyAndCount();
  const activelyRisingData = await activelyRisingQuery.getRawMany();

  const activelyRisingMap = activelyRisingData.reduce((map, item) => {
    map[item.sponsorId] = {
      activelyRising: item.activelyRising,
      dealscount: parseInt(item.dealscount),
    };
    return map;
  }, {});

  const sponsorsWithActivelyRisingAndDealsCount = sponsors.map(sponsor => ({
    ...sponsor,
    activelyRising: activelyRisingMap[sponsor.id]?.activelyRising || false,
    dealscount: activelyRisingMap[sponsor.id]?.dealscount || 0,
  }));
  const paginationData = await buildPaginationInfo(count, page, pageSize);

  return {
    sponsors: await Promise.all(
      sponsorsWithActivelyRisingAndDealsCount.map(sponsorMapper)
    ),
    ...paginationData,
  };
};
