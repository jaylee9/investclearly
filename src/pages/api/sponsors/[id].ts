import { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler } from '../../../backend/utils/api-handler';
import { getSponsorById } from '../../../backend/services/sponsors/get-sponsor-by-id';

const getSponsor = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const id: number = Number(request.query.id);
  const sponsorRecord = await getSponsorById(id);
  response.status(200).json(sponsorRecord);
};

export default apiHandler({
  GET: getSponsor,
});
