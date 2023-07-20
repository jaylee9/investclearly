import { getDatabaseConnection } from '../../config/data-source-config';
import { Deal } from '../../entities/deals.entity';
import { getDealById } from './get-deal-by-id';
import { CreateDealInterface } from './interfaces/create-deal.interface';

export const createDeal = async (data: CreateDealInterface) => {
  const connection = await getDatabaseConnection();

  const deal = connection.manager.create(Deal, {
    ...data,
  });
  await connection.manager.save(deal);
  return getDealById(deal.id);
};
