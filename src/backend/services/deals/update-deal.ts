import { getDatabaseConnection } from '../../config/data-source-config';
import { Deal } from '../../entities/deals.entity';
import { getDealById } from './get-deal-by-id';
import { UpdateDealInterface } from './interfaces/update-deal.interface';

export const update = async (id: number, data: UpdateDealInterface) => {
  const connection = await getDatabaseConnection();
  await getDealById(id);
  await connection.manager.update(Deal, { id }, data);

  return getDealById(id);
};
