import { getDatabaseConnection } from '../../config/data-source-config';
import { Deal } from '../../entities/deals.entity';

export const deleteDealRecord = async (id: number) => {
  const connection = await getDatabaseConnection();

  await connection.manager.delete(Deal, { id });
};
