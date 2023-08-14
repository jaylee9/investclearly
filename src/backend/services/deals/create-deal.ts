import { TargetTypesConstants } from '../../../backend/constants/target-types-constants';
import { getDatabaseConnection } from '../../config/data-source-config';
import { Deal } from '../../entities/deals.entity';
import { uploadFile } from '../files/upload-file';
import { getDealById } from './get-deal-by-id';
import { DealInterface } from './interfaces/deal.interface';
import { createAttachment } from '../attachments/create-attachment';
import { transformObjectKeysToArrays } from '../../../backend/utils/transform-object-keys-to-arrays';
import { DeepPartial } from 'typeorm';

export const createDeal = async (
  data: DeepPartial<Deal>,
  files: Express.Multer.File[]
) => {
  const connection = await getDatabaseConnection();
  const { investmentStructures, regions, ...createDealData } = data;

  const transformedData = transformObjectKeysToArrays({
    investmentStructures,
    regions,
  });

  const deal = connection.manager.create(Deal, {
    ...transformedData,
    ...createDealData,
  }) as DealInterface;
  await connection.manager.save(deal);

  const dealRecord = await getDealById(deal.id);

  if (files.length) {
    for (const file of files) {
      const fileUrl = await uploadFile(file, TargetTypesConstants.deals);
      await createAttachment(
        fileUrl,
        dealRecord.id,
        TargetTypesConstants.deals
      );
    }
  }

  return dealRecord;
};
