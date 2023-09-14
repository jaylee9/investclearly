import { NextApiRequest, NextApiResponse } from 'next';
import { addNewDealsFormDBySecApiScraper } from '../../../backend/services/sec-api-scraper/add-new-deals-form-D-by-sec-api-scraper';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { startDate, endDate } = request.query;
  const startDateParam: string | null =
    typeof startDate === 'string' ? startDate : null;
  const endDateParam: string | null =
    typeof endDate === 'string' ? endDate : null;

  const result = await addNewDealsFormDBySecApiScraper(
    startDateParam,
    endDateParam
  );
  response.status(200).json(result);
}
