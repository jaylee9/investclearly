import { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler } from '../../../backend/utils/api-handler';
import { getAllDeals } from '../../../backend/services/deals/get-all-deals';
import { FindAllDealsInterface } from '../../../backend/services/deals/interfaces/get-all-deals.interface';
import { transformObjectKeysToArrays } from '../../../backend/utils/transform-object-keys-to-arrays';

const getDeals = async (request: NextApiRequest, response: NextApiResponse) => {
  const params: FindAllDealsInterface = request.query;
  const {
    assetClasses,
    statuses,
    regions,
    investmentStructures,
    exemptions,
    regulations,
    ...getDealsData
  } = params;

  const transformedData = transformObjectKeysToArrays({
    assetClasses,
    statuses,
    regions,
    investmentStructures,
    exemptions,
    regulations,
  });

  const deals = await getAllDeals({ ...getDealsData, ...transformedData });
  response.status(200).json(deals);
};

export default apiHandler({ GET: getDeals });
