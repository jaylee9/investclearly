import { Sponsor } from '../../../backend/entities/sponsors.entity';
import { getDatabaseConnection } from '../../config/data-source-config';
import { getSponsorById } from './get-sponsor-by-id';
import { SponsorInterface } from './interfaces/sponsor.interface';

export const updateSponsorRecord = async (
  id: number,
  data: SponsorInterface
) => {
  const connection = await getDatabaseConnection();
  await getSponsorById(id);

  await connection.manager.update(Sponsor, { id }, data);

  return getSponsorById(id);
};
