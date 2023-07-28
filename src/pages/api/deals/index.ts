import { NextApiRequest, NextApiResponse } from 'next';
import { AuthConstants } from '../../../backend/constants/auth-constants';
import { apiHandler } from '../../../backend/utils/api-handler';
import { authMiddleware } from '../../../backend/middleware/auth';
import { createDeal } from '../../../backend/services/deals/create-deal';
import { getAllDeals } from '../../../backend/services/deals/get-all-deals';
import { FindAllDealsInterface } from '../../../backend/services/deals/interfaces/get-all-deals.interface';
import createHttpError from 'http-errors';
import { parseForm } from '../../../backend/utils/parse-form';
import { CreateDealInterface } from '../../../backend/services/deals/interfaces/create-deal.interface';
import { TargetTypesConstants } from '../../../backend/constants/target-types-constants';
import { createAttachment } from '../../../backend/services/attachments/create-attachment';
import { uploadFile } from '../../../backend/services/files/upload-file';

export const config = {
  api: {
    bodyParser: false,
  },
};

const create = async (request: NextApiRequest, response: NextApiResponse) => {
  await authMiddleware(request, response);
  const { fields, files } = await parseForm(request, response);
  const newDeal = await createDeal(fields as unknown as CreateDealInterface);

  if (newDeal) {
    if (files.length) {
      for (const file of files) {
        const fileUrl = await uploadFile(file, TargetTypesConstants.deals);
        await createAttachment(fileUrl, newDeal.id, TargetTypesConstants.deals);
      }
    }

    response.status(200).json(newDeal);
  } else {
    throw new createHttpError.BadRequest(AuthConstants.somethingGoesWrong);
  }
};

const getDeals = async (request: NextApiRequest, response: NextApiResponse) => {
  const params: FindAllDealsInterface = request.query;
  const deals = await getAllDeals(params);
  response.status(200).json(deals);
};

export default apiHandler({ POST: create, GET: getDeals });
