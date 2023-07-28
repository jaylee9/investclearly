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
import { TargetTypesConstants } from '../../../backend/constants/target-types-constants';
import { uploadFile } from '../../../backend/services/files/upload-file';
import { deleteFile } from '../../../backend/services/files/delete-file';

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
  const { fields, files } = await parseForm(request, response);
  const id: number = Number(request.query.id);

  let updatedSponsor = await updateSponsorRecord(
    id,
    fields as unknown as UpdateSponsorInterface
  );

  if (updatedSponsor) {
    if (files.length) {
      if (updatedSponsor.businessAvatar) {
        await deleteFile(updatedSponsor.businessAvatar);
      }

      const fileUrl = await uploadFile(
        files[0],
        TargetTypesConstants.sponsorAvatars
      );
      const fields = { businessAvatar: fileUrl };
      updatedSponsor = await updateSponsorRecord(
        updatedSponsor.id,
        fields as UpdateSponsorInterface
      );
    }
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
