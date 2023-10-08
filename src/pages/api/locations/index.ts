import { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler } from '../../../backend/utils/api-handler';
import { FindAllStateOrCountryDescriptionsInterface } from '../../../backend/services/locations/interfaces/find-all-state-or-country-descriptions.interface';
import { getAllStateOrCountryDescriptions } from '@/backend/services/locations/find-all-state-or-country-descriptions';

const getLocations = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const params: FindAllStateOrCountryDescriptionsInterface = request.query;
  const { entityType } = params;

  const locations = await getAllStateOrCountryDescriptions(entityType!);
  response.status(200).json(locations);
};

export default apiHandler({ GET: getLocations });
