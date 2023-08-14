import { DeepPartial } from 'typeorm';
import { SponsorInterface } from './interfaces/sponsor.interface';
import { transformObjectKeysToArrays } from '../../../backend/utils/transform-object-keys-to-arrays';
import { TargetTypesConstants } from '../../../backend/constants/target-types-constants';
import { Sponsor } from '../../../backend/entities/sponsors.entity';
import { getDatabaseConnection } from '../../config/data-source-config';
import { uploadFile } from '../files/upload-file';
import { getSponsorById } from './get-sponsor-by-id';

export const createSponsorRecord = async (
  data: DeepPartial<Sponsor>,
  files: Express.Multer.File[]
) => {
  const connection = await getDatabaseConnection();
  const {
    specialties,
    investmentStructures,
    exemptions,
    regions,
    regulations,
    interests,
    ...createSponsorData
  } = data;

  const transformedData = transformObjectKeysToArrays({
    specialties,
    investmentStructures,
    exemptions,
    regions,
    regulations,
    interests,
  });

  if (files.length) {
    data.businessAvatar = await uploadFile(
      files[0],
      TargetTypesConstants.sponsorAvatars
    );
  }

  const sponsor = connection.manager.create(Sponsor, {
    ...transformedData,
    ...createSponsorData,
  }) as SponsorInterface;
  await connection.manager.save(sponsor);

  return getSponsorById(sponsor.id);
};
