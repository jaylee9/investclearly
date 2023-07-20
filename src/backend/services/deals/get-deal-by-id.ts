import createHttpError from 'http-errors';
import { getDatabaseConnection } from '../../config/data-source-config';
import { Deal } from '../../entities/deals.entity';
import { DealConstants } from '../../constants/deal-constants';
import { dealMapper } from '../../mappers/deal.mapper';

export const getDealById = async (id: number) => {
  const connection = await getDatabaseConnection();

  const deal = await connection.manager.findOne(Deal, { where: { id } });

  if (!deal) {
    throw new createHttpError.NotFound(DealConstants.dealNotFound);
  }

  return dealMapper(deal);
};
