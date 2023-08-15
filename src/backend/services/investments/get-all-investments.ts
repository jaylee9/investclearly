import { Brackets } from 'typeorm';
import { getDatabaseConnection } from '../../config/data-source-config';
import { FindAllInvestmentsInterface } from './interfaces/get-all-investments.interface';
import { OrderDirectionConstants } from '../../constants/order-direction-constants';
import { pagination } from '../../utils/pagination/pagination';
import { buildPaginationInfo } from '../../utils/pagination/build-pagination-info';
import { PaginationConstants } from '../../constants/pagination-constants';
import { Investment } from '../../../backend/entities/investments.entity';
import { investmentMapper } from '../../../backend/mappers/investment.mapper';

export const getAllInvestments = async (
  params: FindAllInvestmentsInterface,
  userId: number
) => {
  const {
    pageSize = PaginationConstants.defaultPageSize,
    page = PaginationConstants.defaultPage,
    orderDirection = OrderDirectionConstants.DESC,
    status,
    search,
  } = params;

  const connection = await getDatabaseConnection();

  let searchQuery = connection.manager
    .createQueryBuilder()
    .select('investments')
    .from(Investment, 'investments')
    .leftJoinAndSelect('investments.user', 'user')
    .leftJoinAndSelect('investments.deal', 'deal')
    .where('investments.userId = :userId', { userId });

  if (status) {
    searchQuery = searchQuery.andWhere('investments.status = :status', {
      status,
    });
  }

  const totalInvesteData = await searchQuery
    .clone()
    .select('SUM(investments.totalInvested)', 'totalInvestedSum')
    .getRawOne();

  if (search) {
    searchQuery = searchQuery.andWhere(
      new Brackets(qb => {
        return qb
          .where('deal.dealTitle ILIKE :search', { search: `%${search}%` })
          .orWhere('deal.dealAddress ILIKE :search', {
            search: `%${search}%`,
          })
          .orWhere('deal.dealLegalName ILIKE :search', {
            search: `%${search}%`,
          })
          .orWhere('deal.dealSponsor ILIKE :search', {
            search: `%${search}%`,
          })
          .orWhere('deal.description ILIKE :search', {
            search: `%${search}%`,
          });
      })
    );
  }

  searchQuery = searchQuery.orderBy('investments.createdAt', orderDirection);
  searchQuery = pagination(pageSize, page, searchQuery);

  const [deals, count] = await searchQuery.getManyAndCount();
  const paginationData = await buildPaginationInfo(count, page, pageSize);

  return {
    deals: await Promise.all(deals.map(investmentMapper)),
    totalInvested: totalInvesteData.totalInvestedSum,
    ...paginationData,
  };
};
