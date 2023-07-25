import { NextApiRequest, NextApiResponse } from 'next';
import createHttpError from 'http-errors';
import { AuthConstants } from '../../../backend/constants/auth-constants';
import { apiHandler } from '../../../backend/utils/api-handler';
import { authMiddleware } from '../../../backend/middleware/auth';
import { parseForm } from '../../../backend/utils/parse-form';
import { SponsorConstants } from '../../../backend/constants/validation/sponsor-constants';
import { updateSponsorRecord } from '../../../backend/services/sponsors/update-sponsor';
import { getSponsorById } from '../../../backend/services/sponsors/get-sponsor-by-id';
import { deleteSponsorRecord } from '../../../backend/services/sponsors/delete-sponsor';
import { UpdateSponsorInterface } from '../../../backend/services/sponsors/interfaces/update-sponsor.interface';

export const config = {
  api: {
    bodyParser: false,
  },
};

const updateSponsor = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  await authMiddleware(request, response);
  const result = await parseForm(request);
  const id: number = Number(request.query.id);
  const updatedSponsor = await updateSponsorRecord(
    id,
    result.fields as unknown as UpdateSponsorInterface
  );

  if (updatedSponsor) {
    response.status(200).json(updatedSponsor);
  } else {
    throw new createHttpError.BadRequest(AuthConstants.somethingGoesWrong);
  }
};

const getSponsor = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const id: number = Number(request.query.id);
  const sponsorRecord = await getSponsorById(id);
  response.status(200).json(sponsorRecord);
};

const deleteSponsor = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  await authMiddleware(request, response);
  const id: number = Number(request.query.id);
  const sponsorRecord = await getSponsorById(id);

  if (sponsorRecord) {
    await deleteSponsorRecord(id);
  }
  response
    .status(200)
    .json({ message: SponsorConstants.sponsorSuccessfullyDeleted });
};

export default apiHandler({
  PUT: updateSponsor,
  GET: getSponsor,
  DELETE: deleteSponsor,
});
