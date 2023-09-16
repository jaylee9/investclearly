import { NextApiRequest, NextApiResponse } from 'next';
import { DeepPartial } from 'typeorm';
import { AuthConstants } from '../../../../backend/constants/auth-constants';
import { apiHandler } from '../../../../backend/utils/api-handler';
import { authMiddleware } from '../../../../backend/middleware/auth';
import createHttpError from 'http-errors';
import { parseForm } from '../../../../backend/utils/parse-form';
import { createSponsorRecord } from '../../../../backend/services/sponsors/create-sponsor';
import { Sponsor } from '../../../../backend/entities/sponsors.entity';

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
    fields as unknown as DeepPartial<Sponsor>,
    files
  );

  if (newSponsor) {
    response.status(200).json(newSponsor);
  } else {
    throw new createHttpError.BadRequest(AuthConstants.somethingGoesWrong);
  }
};

export default apiHandler({ POST: createSponsor });
