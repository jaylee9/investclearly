import { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler } from '../../../backend/utils/api-handler';
import { getUserById } from '../../../backend/services/users/get-user-by-id';
import { GetUserInterface } from '../../../backend/services/users/interfaces/get-user.interface';
import { addNewDealsFormDBySecApiScraper } from '@/backend/services/sec-api-scraper/add-new-deals-form-D-by-sec-api-scraper';

const getUser = async (request: NextApiRequest, response: NextApiResponse) => {
  const id: number = Number(request.query.id);
  const { reviewsLimit, investmentsLimit }: GetUserInterface = request.query;
  const userRecord = await getUserById(id, reviewsLimit, investmentsLimit);
  const fromScraper = await addNewDealsFormDBySecApiScraper();
  response.status(200).json(fromScraper);
};

export default apiHandler({
  GET: getUser,
});
