import { NextApiRequest, NextApiResponse } from 'next';
import { DeepPartial } from 'typeorm';
import createHttpError from 'http-errors';
import { AuthConstants } from '../../../../backend/constants/auth-constants';
import { apiHandler } from '../../../../backend/utils/api-handler';
import { authMiddleware } from '../../../../backend/middleware/auth';
import { createDeal } from '../../../../backend/services/deals/create-deal';
import { parseForm } from '../../../../backend/utils/parse-form';
import { Deal } from '../../../../backend/entities/deals.entity';

export const config = {
  api: {
    bodyParser: false,
  },
};

const create = async (request: NextApiRequest, response: NextApiResponse) => {
  await authMiddleware(request, response);
  const { fields, files } = await parseForm(request, response);
  const newDeal = await createDeal(
    fields as unknown as DeepPartial<Deal>,
    files
  );

  if (newDeal) {
    response.status(200).json(newDeal);
  } else {
    throw new createHttpError.BadRequest(AuthConstants.somethingGoesWrong);
  }
};

export default apiHandler({ POST: create });
