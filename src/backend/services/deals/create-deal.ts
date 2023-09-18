import { TargetTypesConstants } from '../../../backend/constants/target-types-constants';
import { getDatabaseConnection } from '../../config/data-source-config';
import { Deal } from '../../entities/deals.entity';
import { uploadFile } from '../files/upload-file';
import { getDealById } from './get-deal-by-id';
import { createAttachment } from '../attachments/create-attachment';
import { transformObjectKeysToArrays } from '../../../backend/utils/transform-object-keys-to-arrays';
import { createLocation } from '../locations/create-location';
import { LocationTargetTypesConstants } from '../../constants/location-target-types-constants';
import { CreateDealInterface } from './interfaces/create-deal.interface';

export const createDeal = async (
  data: CreateDealInterface,
  files: Express.Multer.File[]
) => {
  const connection = await getDatabaseConnection();
  const {
    investmentStructures,
    regions,
    street1,
    street2,
    city,
    stateOrCountry,
    stateOrCountryDescription,
    zipCode,
    ...createDealData
  } = data;

  const transformedData = transformObjectKeysToArrays({
    investmentStructures,
    regions,
  });

  const deal = connection.manager.create(Deal, {
    ...transformedData,
    ...createDealData,
  });
  await connection.manager.save(deal);

  const dealRecord = await getDealById(deal.id);

  if (files?.length) {
    for (const file of files) {
      const fileUrl = await uploadFile(file, TargetTypesConstants.deals);
      await createAttachment(
        fileUrl,
        dealRecord.id,
        TargetTypesConstants.deals
      );
    }
  }

  await createLocation(
    {
      street1,
      street2,
      city,
      stateOrCountry,
      stateOrCountryDescription,
      zipCode,
    },
    LocationTargetTypesConstants.deal,
    deal.id
  );

  return getDealById(deal.id);
};
