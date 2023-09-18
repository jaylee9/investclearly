import { SponsorInterface } from './interfaces/sponsor.interface';
import { transformObjectKeysToArrays } from '../../../backend/utils/transform-object-keys-to-arrays';
import { TargetTypesConstants } from '../../../backend/constants/target-types-constants';
import { Sponsor } from '../../../backend/entities/sponsors.entity';
import { getDatabaseConnection } from '../../config/data-source-config';
import { uploadFile } from '../files/upload-file';
import { getSponsorById } from './get-sponsor-by-id';
import { createLocation } from '../locations/create-location';
import { LocationTargetTypesConstants } from '../../constants/location-target-types-constants';
import { CreateSponsorInterface } from './interfaces/create-sponsor.interface';

export const createSponsorRecord = async (
  data: CreateSponsorInterface,
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
    street1,
    street2,
    city,
    stateOrCountry,
    stateOrCountryDescription,
    zipCode,
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
  let businessAvatar: string = '';

  if (files?.length) {
    businessAvatar = await uploadFile(
      files[0],
      TargetTypesConstants.sponsorAvatars
    );
  }

  const sponsor = connection.manager.create(Sponsor, {
    ...transformedData,
    ...createSponsorData,
    businessAvatar,
  }) as unknown as SponsorInterface;
  await connection.manager.save(sponsor);

  await createLocation(
    {
      street1,
      street2,
      city,
      stateOrCountry,
      stateOrCountryDescription,
      zipCode,
    },
    LocationTargetTypesConstants.sponsor,
    sponsor.id
  );

  return getSponsorById(sponsor.id);
};
