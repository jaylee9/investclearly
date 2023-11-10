import { TargetTypesConstants } from '../../../backend/constants/target-types-constants';
import { getDatabaseConnection } from '../../config/data-source-config';
import { Deal } from '../../entities/deals.entity';
import { createAttachment } from '../attachments/create-attachment';
import { uploadFile } from '../files/upload-file';
import { getDealById } from './get-deal-by-id';
import { getAttachments } from '../attachments/get-attachments';
import { deleteFile } from '../files/delete-file';
import { deleteAttachment } from '../attachments/delete-attachments';
import { transformObjectKeysToArrays } from '../../../backend/utils/transform-object-keys-to-arrays';
import { UpdateDealInterface } from './interfaces/update-deal.interface';
import { createOrUpdateLocation } from '../locations/create-or-update-location';
import { LocationTargetTypesConstants } from '../../constants/location-target-types-constants';
import { sendMailToUsersWithNewDealsFromBookmarkedSponsors } from './send-mail-to-users-with-new-deal-from-bookmarked-sponsors';
import { setNullIfNone } from '../../utils/set-null-if-none';

export const update = async (
  id: number,
  fields: UpdateDealInterface,
  files: Express.Multer.File[],
  showOnlyPublishedDeals: boolean
) => {
  const connection = await getDatabaseConnection();
  const {
    fees,
    equityMultiple,
    targetIRR,
    actualIRR,
    attachmentsIdsToDelete,
    investmentStructures,
    regions,
    street1,
    street2,
    city,
    stateOrCountry,
    stateOrCountryDescription,
    zipCode,
    sponsorId,
    ...updateDealData
  } = fields;

  const transformedAttachmentsIdsToDelete = transformObjectKeysToArrays({
    attachmentsIdsToDelete,
  });

  const transformedData = transformObjectKeysToArrays({
    investmentStructures,
    regions,
  });

  const objectWithNullValues = setNullIfNone({
    sponsorId,
    fees,
    equityMultiple,
    targetIRR,
    actualIRR,
  });

  const dealRecord = await getDealById(id, showOnlyPublishedDeals);

  await connection.manager.update(
    Deal,
    { id },
    {
      ...objectWithNullValues,
      ...updateDealData,
      ...transformedData,
    }
  );

  if (files?.length) {
    for (const file of files) {
      const fileData = await uploadFile(file, TargetTypesConstants.deals);
      await createAttachment(fileData, id, TargetTypesConstants.deals);
    }
  }

  if (transformedData.attachmentsIdsToDelete?.length !== 0) {
    const attachments = await getAttachments(
      id,
      TargetTypesConstants.deals,
      transformedAttachmentsIdsToDelete.attachmentsIdsToDelete
    );
    for (const attachment of attachments) {
      await deleteFile(attachment.path);
      await deleteAttachment(attachment.id);
    }
  }

  await createOrUpdateLocation(
    {
      street1,
      street2,
      city,
      stateOrCountry,
      stateOrCountryDescription,
      zipCode,
    },
    LocationTargetTypesConstants.deal,
    id
  );
  const updatedDeal = await getDealById(id, showOnlyPublishedDeals);

  if (
    (!dealRecord?.sponsor || dealRecord.isDealPublished === false) &&
    updatedDeal.sponsor &&
    updatedDeal.isDealPublished === true
  ) {
    sendMailToUsersWithNewDealsFromBookmarkedSponsors(updatedDeal.id);
  }

  return updatedDeal;
};
