import { TargetTypesConstants } from '../../../backend/constants/target-types-constants';
import { Sponsor } from '../../../backend/entities/sponsors.entity';
import { getDatabaseConnection } from '../../config/data-source-config';
import { uploadFile } from '../files/upload-file';
import { getSponsorById } from './get-sponsor-by-id';
import { UpdateSponsorInterface } from './interfaces/update-sponsor.interface';
import { deleteFile } from '../files/delete-file';
import { transformObjectKeysToArrays } from '../../../backend/utils/transform-object-keys-to-arrays';
import { LocationTargetTypesConstants } from '../../constants/location-target-types-constants';
import { createOrUpdateLocation } from '../locations/create-or-update-location';

export const updateSponsorRecord = async (
  id: number,
  data: UpdateSponsorInterface,
  files: Express.Multer.File[]
) => {
  const connection = await getDatabaseConnection();
  const sponsorRecord = await connection.manager.findOne(Sponsor, {
    where: { id },
  });

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
    ...updateSponsorData
  } = data;

  const transformedData = transformObjectKeysToArrays({
    specialties,
    investmentStructures,
    exemptions,
    regions,
    regulations,
    interests,
  });
  let businessAvatar = sponsorRecord?.businessAvatar;

  if (files?.length) {
    if (sponsorRecord && sponsorRecord.businessAvatar) {
      await deleteFile(sponsorRecord.businessAvatar);
    }

    const fileData = await uploadFile(
      files[0],
      TargetTypesConstants.sponsorAvatars
    );

    businessAvatar = fileData.fileName;
  }

  await connection.manager.update(
    Sponsor,
    { id },
    { ...updateSponsorData, ...transformedData, businessAvatar }
  );

  await createOrUpdateLocation(
    {
      street1,
      street2,
      city,
      stateOrCountry,
      stateOrCountryDescription,
      zipCode,
    },
    LocationTargetTypesConstants.sponsor,
    id
  );

  return getSponsorById(id);
};
