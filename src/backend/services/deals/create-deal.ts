import { TargetTypesConstants } from '../../../backend/constants/target-types-constants';
import { getDatabaseConnection } from '../../config/data-source-config';
import { Deal } from '../../entities/deals.entity';
import { uploadFile } from '../files/upload-file';
import { getDealById } from './get-deal-by-id';
import { CreateDealInterface } from './interfaces/create-deal.interface';
import { DealInterface } from './interfaces/deal.interface';
import { createAttachment } from '../attachments/create-attachment';

export const createDeal = async (
  data: CreateDealInterface,
  files: Express.Multer.File[]
) => {
  const connection = await getDatabaseConnection();

  const deal = connection.manager.create(Deal, data) as DealInterface;
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
