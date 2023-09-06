import { NextApiRequest, NextApiResponse } from 'next';
import { addNewDealsFormDBySecApiScraper } from '../../../backend/services/sec-api-scraper/add-new-deals-form-D-by-sec-api-scraper';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const result = await addNewDealsFormDBySecApiScraper();
  response.status(200).json(result);
}
