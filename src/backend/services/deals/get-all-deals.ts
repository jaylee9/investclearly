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
  } = params;

  const connection = await getDatabaseConnection();
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
    );

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

  const [deals, count] = await searchQuery.getManyAndCount();
  const paginationData = await buildPaginationInfo(count, page, pageSize);

  return {
    deals: await Promise.all(deals.map(dealMapper)),
    ...paginationData,
  };
};
