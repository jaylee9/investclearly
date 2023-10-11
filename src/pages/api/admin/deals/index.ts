import { NextApiRequest, NextApiResponse } from 'next';
import createHttpError from 'http-errors';
import { AuthConstants } from '../../../../backend/constants/auth-constants';
import { apiHandler } from '../../../../backend/utils/api-handler';
import { adminMiddleware } from '../../../../../src/backend/middleware/admin';
import { createDeal } from '../../../../backend/services/deals/create-deal';
import { parseForm } from '../../../../backend/utils/parse-form';
import { CreateDealInterface } from '../../../../backend/services/deals/interfaces/create-deal.interface';
import { dealsVisibilityMiddleware } from '@/backend/middleware/deals-visibility';

export const config = {
  api: {
    bodyParser: false,
  },
};

const create = async (request: NextApiRequest, response: NextApiResponse) => {
  const { user } = await adminMiddleware(request, response);
  const showOnlyPublishedDeals = dealsVisibilityMiddleware(user);
  const { fields, files } = await parseForm(request, response);
  const newDeal = await createDeal(
    fields as unknown as CreateDealInterface,
    files,
    showOnlyPublishedDeals
  );

  if (newDeal) {
    response.status(200).json(newDeal);
  } else {
    throw new createHttpError.BadRequest(AuthConstants.somethingGoesWrong);
  }
};

export default apiHandler({ POST: create });
