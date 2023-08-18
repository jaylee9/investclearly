import { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler } from '../../../backend/utils/api-handler';
import { getSponsorById } from '../../../backend/services/sponsors/get-sponsor-by-id';
import { authMiddleware } from '../../../backend/middleware/auth';

const getSponsor = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const { request: authRequest, user } = await authMiddleware(
    request,
    response,
    true
  );
  const currentUserId = user?.id;
  const id: number = Number(authRequest.query.id);
  const sponsorRecord = await getSponsorById(id, currentUserId);
  response.status(200).json(sponsorRecord);
};

export default apiHandler({
  GET: getSponsor,
});
