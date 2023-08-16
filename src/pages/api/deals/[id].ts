import { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler } from '../../../backend/utils/api-handler';
import { getDealById } from '../../../backend/services/deals/get-deal-by-id';
import { authMiddleware } from '../../../backend/middleware/auth';

const getDeal = async (request: NextApiRequest, response: NextApiResponse) => {
  const { request: authRequest, user } = await authMiddleware(
    request,
    response,
    true
  );

  const id: number = Number(authRequest.query.id);
  const dealRecord = await getDealById(id, user?.id);

  response.status(200).json(dealRecord);
};

export default apiHandler({
  GET: getDeal,
});
