import { NextApiRequest, NextApiResponse } from 'next';
import { AuthConstants } from '../../../backend/constants/auth-constants';
import { apiHandler } from '../../../backend/utils/api-handler';
import { authMiddleware } from '../../../backend/middleware/auth';
import createHttpError from 'http-errors';
import { parseForm } from '../../../backend/utils/parse-form';
import { CreateSponsorInterface } from '../../../backend/services/sponsors/interfaces/create-sponsor.interface';
import { FindAllSponsorsInterface } from '../../../backend/services/sponsors/interfaces/get-all-sponsors.interface';
import { createSponsorRecord } from '../../../backend/services/sponsors/create-sponsor';
import { getAllSponsors } from '../../../backend/services/sponsors/get-all-sponsors';
import { transformObjectKeysToArrays } from '../../../backend/utils/transform-object-keys-to-arrays';

export const config = {
  api: {
    bodyParser: false,
  },
};

const createSponsor = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  await authMiddleware(request, response);
  const { fields, files } = await parseForm(request, response);
  const newSponsor = await createSponsorRecord(
    fields as unknown as CreateSponsorInterface,
    files
  );

  if (newSponsor) {
    response.status(200).json(newSponsor);
  } else {
    throw new createHttpError.BadRequest(AuthConstants.somethingGoesWrong);
  }
};

const getSponsors = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const params: FindAllSponsorsInterface = request.query;
  const { primaryAssetClasses, regionalFocus, ...getSponsorsData } = params;

  const transformedData = transformObjectKeysToArrays({
    primaryAssetClasses,
    regionalFocus,
  });

  const sponsors = await getAllSponsors({
    ...getSponsorsData,
    ...transformedData,
  });
  response.status(200).json(sponsors);
};

export default apiHandler({ POST: createSponsor, GET: getSponsors });
