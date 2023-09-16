import { getDatabaseConnection } from '../../config/data-source-config';
import { getInvestmentById } from './get-investment-by-id';
import { UpdateInvestmentInterface } from './interfaces/update-investment.interface';
import { Investment } from '../../../backend/entities/investments.entity';

export const updateInvestmentRecord = async (
  id: number,
  data: UpdateInvestmentInterface,
  userId: number
) => {
  const connection = await getDatabaseConnection();

  await getInvestmentById(id, userId);
  await connection.manager.update(Investment, { id, userId }, data);

  return getInvestmentById(id, userId);
};
