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
import { setNullIfNone } from '../../utils/set-null-if-none';

export const createSponsorRecord = async (
  data: CreateSponsorInterface,
  files: Express.Multer.File[]
) => {
  const connection = await getDatabaseConnection();
  const {
    aum,
    specialties,
    regions,
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
    regions,
    interests,
  });
  let businessAvatar: string = '';

  if (files?.length) {
    const fileData = await uploadFile(
      files[0],
      TargetTypesConstants.sponsorAvatars
    );

    businessAvatar = fileData.fileName;
  }

  const objectWithNullValues = setNullIfNone({ aum });

  const sponsor = connection.manager.create(Sponsor, {
    ...transformedData,
    ...createSponsorData,
    businessAvatar,
    ...objectWithNullValues,
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
