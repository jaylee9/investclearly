import { NextApiRequest, NextApiResponse } from 'next';
import { AuthConstants } from '../../../../backend/constants/auth-constants';
import { apiHandler } from '../../../../backend/utils/api-handler';
import { adminMiddleware } from '../../../../../src/backend/middleware/admin';
import createHttpError from 'http-errors';
import { parseForm } from '../../../../backend/utils/parse-form';
import { createSponsorRecord } from '../../../../backend/services/sponsors/create-sponsor';
import { CreateSponsorInterface } from '../../../../backend/services/sponsors/interfaces/create-sponsor.interface';

export const config = {
  api: {
    bodyParser: false,
  },
};

const createSponsor = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  await adminMiddleware(request, response);
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

export default apiHandler({ POST: createSponsor });
