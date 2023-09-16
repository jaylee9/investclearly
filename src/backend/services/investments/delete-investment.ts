import { Investment } from '../../../backend/entities/investments.entity';
import { getDatabaseConnection } from '../../config/data-source-config';

export const deleteInvestmentRecord = async (id: number, userId: number) => {
  const connection = await getDatabaseConnection();

  await connection.manager.delete(Investment, { id, userId });
};
