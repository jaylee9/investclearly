import { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler } from '../../../backend/utils/api-handler';
import { FindAllSponsorsInterface } from '../../../backend/services/sponsors/interfaces/get-all-sponsors.interface';
import { getAllSponsors } from '../../../backend/services/sponsors/get-all-sponsors';
import { transformObjectKeysToArrays } from '../../../backend/utils/transform-object-keys-to-arrays';
import { authMiddleware } from '../../../backend/middleware/auth';

const getSponsors = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const { request: authRequest, user } = await authMiddleware(
    request,
    response,
    true
  );
  const currentUserId = user?.id;
  const params: FindAllSponsorsInterface = authRequest.query;
  const { primaryAssetClasses, regionalFocus, ...getSponsorsData } = params;

  const transformedData = transformObjectKeysToArrays({
    primaryAssetClasses,
    regionalFocus,
  });

  const sponsors = await getAllSponsors({
    ...getSponsorsData,
    ...transformedData,
    currentUserId,
  });
  response.status(200).json(sponsors);
};

export default apiHandler({ GET: getSponsors });
