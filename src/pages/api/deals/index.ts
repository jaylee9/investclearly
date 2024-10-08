import { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler } from '../../../backend/utils/api-handler';
import { getAllDeals } from '../../../backend/services/deals/get-all-deals';
import { FindAllDealsInterface } from '../../../backend/services/deals/interfaces/get-all-deals.interface';
import { transformObjectKeysToArrays } from '../../../backend/utils/transform-object-keys-to-arrays';
import { authMiddleware } from '../../../backend/middleware/auth';
import { dealsVisibilityMiddleware } from '../../../backend/middleware/deals-visibility';

const getDeals = async (request: NextApiRequest, response: NextApiResponse) => {
  const { request: authRequest, user } = await authMiddleware(
    request,
    response,
    true
  );
  const currentUserId = user?.id;
  const showOnlyPublishedDeals = dealsVisibilityMiddleware(user);

  const params: FindAllDealsInterface = authRequest.query;
  const {
    assetClasses,
    statuses,
    regions,
    investmentStructures,
    exemptions,
    regulations,
    stateOrCountryDescriptions,
    ...getDealsData
  } = params;

  const transformedData = transformObjectKeysToArrays({
    assetClasses,
    statuses,
    regions,
    investmentStructures,
    exemptions,
    regulations,
    stateOrCountryDescriptions,
  });

  const deals = await getAllDeals({
    ...getDealsData,
    ...transformedData,
    currentUserId,
    showOnlyPublishedDeals,
  });
  response.status(200).json(deals);
};

export default apiHandler({ GET: getDeals });
