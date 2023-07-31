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
import { transformObjectKeysToArrays } from '../../../backend/utils/transform-object-keys-to-arrays';

export const config = {
  api: {
    bodyParser: false,
  },
};

const create = async (request: NextApiRequest, response: NextApiResponse) => {
  await authMiddleware(request, response);
  const { fields, files } = await parseForm(request, response);
  const newDeal = await createDeal(
    fields as unknown as CreateDealInterface,
    files
  );

  if (newDeal) {
    response.status(200).json(newDeal);
  } else {
    throw new createHttpError.BadRequest(AuthConstants.somethingGoesWrong);
  }
};

const getDeals = async (request: NextApiRequest, response: NextApiResponse) => {
  const params: FindAllDealsInterface = request.query;
  const {
    assetClasses,
    statuses,
    regions,
    investmentStructures,
    exemptions,
    ...getDealsData
  } = params;

  const transformedData = transformObjectKeysToArrays({
    assetClasses,
    statuses,
    regions,
    investmentStructures,
    exemptions,
  });

  const deals = await getAllDeals({ ...getDealsData, ...transformedData });
  response.status(200).json(deals);
};

export default apiHandler({ POST: create, GET: getDeals });
