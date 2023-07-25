import { Sponsor } from '../../../backend/entities/sponsors.entity';
import { getDatabaseConnection } from '../../config/data-source-config';

export const deleteSponsorRecord = async (id: number) => {
  const connection = await getDatabaseConnection();

  await connection.manager.delete(Sponsor, { id });
};
