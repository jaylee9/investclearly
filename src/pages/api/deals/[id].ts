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
  const id: number = Number(request.query.id);
  const updatedDeal = await update(
    id,
    fields as unknown as UpdateDealInterface,
    files
  );

  if (updatedDeal) {
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
