import createHttpError from 'http-errors';
import { getDatabaseConnection } from '../../config/data-source-config';
import { SponsorConstants } from '../../../backend/constants/validation/sponsor-constants';
import { Sponsor } from '../../../backend/entities/sponsors.entity';
import { sponsorMapper } from '../../../backend/mappers/sponsor.mapper';

export const getSponsorById = async (id: number) => {
  const connection = await getDatabaseConnection();

  const sponsor = await connection.manager.findOne(Sponsor, { where: { id } });

  if (!sponsor) {
    throw new createHttpError.NotFound(SponsorConstants.sponsorNotFound);
  }

  return sponsorMapper(sponsor);
};
