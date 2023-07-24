import { Sponsor } from '../../../backend/entities/sponsors.entity';
import { getDatabaseConnection } from '../../config/data-source-config';
import { getSponsorById } from './get-sponsor-by-id';
import { CreateSponsorInterface } from './interfaces/create-sponsor.interface';
import { SponsorInterface } from './interfaces/sponsor.interface';

export const createSponsorRecord = async (data: CreateSponsorInterface) => {
  const connection = await getDatabaseConnection();

  const sponsor = connection.manager.create(Sponsor, data) as SponsorInterface;
  await connection.manager.save(sponsor);
  return getSponsorById(sponsor.id);
};
