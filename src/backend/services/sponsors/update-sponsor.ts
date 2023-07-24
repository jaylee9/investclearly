import { Sponsor } from '../../../backend/entities/sponsors.entity';
import { getDatabaseConnection } from '../../config/data-source-config';
import { getSponsorById } from './get-sponsor-by-id';
import { UpdateSponsorInterface } from './interfaces/update-sponsor.interface';

export const updateSponsorRecord = async (
  id: number,
  data: UpdateSponsorInterface
) => {
  const connection = await getDatabaseConnection();
  await getSponsorById(id);

  await connection.manager.update(Sponsor, { id }, data);

  return getSponsorById(id);
};
