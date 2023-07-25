import { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler } from '../../../backend/utils/api-handler';
import { searchDealsAndSponsors } from '../../../backend/services/search/search';
import { SearchInterface } from '../../../backend/services/search/interfaces/search.interface';

const search = async (request: NextApiRequest, response: NextApiResponse) => {
  const params: SearchInterface = request.query;
  const searchResult = await searchDealsAndSponsors(params);
  response.status(200).json(searchResult);
};

export default apiHandler({ GET: search });
