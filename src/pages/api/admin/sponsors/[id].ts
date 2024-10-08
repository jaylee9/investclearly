import { NextApiRequest, NextApiResponse } from 'next';
import createHttpError from 'http-errors';
import { AuthConstants } from '../../../../backend/constants/auth-constants';
import { apiHandler } from '../../../../backend/utils/api-handler';
import { adminMiddleware } from '../../../../../src/backend/middleware/admin';
import { parseForm } from '../../../../backend/utils/parse-form';
import { SponsorConstants } from '../../../../backend/constants/sponsor-constants';
import { updateSponsorRecord } from '../../../../backend/services/sponsors/update-sponsor';
import { getSponsorById } from '../../../../backend/services/sponsors/get-sponsor-by-id';
import { deleteSponsorRecord } from '../../../../backend/services/sponsors/delete-sponsor';
import { UpdateSponsorInterface } from '../../../../backend/services/sponsors/interfaces/update-sponsor.interface';

export const config = {
  api: {
    bodyParser: false,
  },
};

const updateSponsor = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  await adminMiddleware(request, response);
  const { fields, files } = await parseForm(request, response);
  const id: number = Number(request.query.id);

  const updatedSponsor = await updateSponsorRecord(
    id,
    fields as unknown as UpdateSponsorInterface,
    files
  );

  if (updatedSponsor) {
    response.status(200).json(updatedSponsor);
  } else {
    throw new createHttpError.BadRequest(AuthConstants.somethingGoesWrong);
  }
};

const deleteSponsor = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  await adminMiddleware(request, response);
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
  DELETE: deleteSponsor,
});
