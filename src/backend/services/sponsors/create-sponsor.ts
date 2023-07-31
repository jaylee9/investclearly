import { TargetTypesConstants } from '../../../backend/constants/target-types-constants';
import { Sponsor } from '../../../backend/entities/sponsors.entity';
import { getDatabaseConnection } from '../../config/data-source-config';
import { uploadFile } from '../files/upload-file';
import { getSponsorById } from './get-sponsor-by-id';
import { CreateSponsorInterface } from './interfaces/create-sponsor.interface';
import { SponsorInterface } from './interfaces/sponsor.interface';

export const createSponsorRecord = async (
  data: CreateSponsorInterface,
  files: Express.Multer.File[]
) => {
  const connection = await getDatabaseConnection();

  if (files.length) {
    data.businessAvatar = await uploadFile(
      files[0],
      TargetTypesConstants.sponsorAvatars
    );
  }

  const sponsor = connection.manager.create(Sponsor, data) as SponsorInterface;
  await connection.manager.save(sponsor);

  return getSponsorById(sponsor.id);
};
