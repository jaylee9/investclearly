import { NextApiRequest, NextApiResponse } from 'next';
import createHttpError from 'http-errors';
import { AuthConstants } from '../../../backend/constants/auth-constants';
import { apiHandler } from '../../../backend/utils/api-handler';
import { authMiddleware } from '../../../backend/middleware/auth';
import { update } from '../../../backend/services/deals/update-deal';
import { getDealById } from '../../../backend/services/deals/get-deal-by-id';
import { deleteDealRecord } from '../../../backend/services/deals/delete-deal';
import { DealConstants } from '../../../backend/constants/deal-constants';
import { parseForm } from '../../../backend/utils/parse-form';
import { UpdateDealInterface } from '../../../backend/services/deals/interfaces/update-deal.interface';
import { uploadFile } from '../../../backend/services/files/upload-file';
import { TargetTypesConstants } from '../../../backend/constants/target-types-constants';
import { createAttachment } from '../../../backend/services/attachments/create-attachment';
import { getAttachments } from '@/backend/services/attachments/get-attachments';
import { deleteFile } from '@/backend/services/files/delete-file';
import { deleteAttachment } from '@/backend/services/attachments/delete-attachments';

export const config = {
  api: {
    bodyParser: false,
  },
};

const updateDeal = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  await authMiddleware(request, response);
  const { fields, files } = await parseForm(request, response);

  const { attachmentsIdsToDelete, ...updateDealData } =
    fields as unknown as UpdateDealInterface;

  const id: number = Number(request.query.id);

  const updatedDeal = await update(id, updateDealData);

  if (updatedDeal) {
    if (files.length) {
      for (const file of files) {
        const fileUrl = await uploadFile(file, TargetTypesConstants.deals);
        await createAttachment(
          fileUrl,
          updatedDeal.id,
          TargetTypesConstants.deals
        );
      }
    }

    if (attachmentsIdsToDelete && attachmentsIdsToDelete.length !== 0) {
      const attachments = await getAttachments(
        updatedDeal.id,
        TargetTypesConstants.deals,
        attachmentsIdsToDelete
      );

      for (const attachment of attachments) {
        await deleteFile(attachment.path);
        await deleteAttachment(attachment.id);
      }
    }

    response.status(200).json(updatedDeal);
  } else {
    throw new createHttpError.BadRequest(AuthConstants.somethingGoesWrong);
  }
};

const getDeal = async (request: NextApiRequest, response: NextApiResponse) => {
  const id: number = Number(request.query.id);
  const dealRecord = await getDealById(id);
  response.status(200).json(dealRecord);
};

const deleteDeal = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  await authMiddleware(request, response);
  const id: number = Number(request.query.id);
  const dealRecord = await getDealById(id);

  if (dealRecord) {
    await deleteDealRecord(id);
  }
  response.status(200).json({ message: DealConstants.dealSuccessfullyDeleted });
};

export default apiHandler({
  PUT: updateDeal,
  GET: getDeal,
  DELETE: deleteDeal,
});
