import { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler } from '../../../backend/utils/api-handler';
import { getDealById } from '../../../backend/services/deals/get-deal-by-id';

const getDeal = async (request: NextApiRequest, response: NextApiResponse) => {
  const id: number = Number(request.query.id);
  const dealRecord = await getDealById(id);
  response.status(200).json(dealRecord);
};

export default apiHandler({
  GET: getDeal,
});
