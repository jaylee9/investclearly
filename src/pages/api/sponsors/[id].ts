import { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler } from '../../../backend/utils/api-handler';
import { getSponsorById } from '../../../backend/services/sponsors/get-sponsor-by-id';
import { authMiddleware } from '../../../backend/middleware/auth';
import { GetSponsorInterface } from '../../../backend/services/sponsors/interfaces/get-sponsor.interface';

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

  const { reviewsLimit, dealsLimit }: GetSponsorInterface = authRequest.query;
  const sponsorRecord = await getSponsorById(
    id!,
    reviewsLimit,
    dealsLimit,
    currentUserId
  );
  response.status(200).json(sponsorRecord);
};

export default apiHandler({
  GET: getSponsor,
});
