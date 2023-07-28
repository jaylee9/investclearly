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
import { uploadFile } from '../../../backend/services/files/upload-file';
import { TargetTypesConstants } from '@/backend/constants/target-types-constants';
import { updateSponsorRecord } from '@/backend/services/sponsors/update-sponsor';
import { UpdateSponsorInterface } from '@/backend/services/sponsors/interfaces/update-sponsor.interface';

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
  let newSponsor = await createSponsorRecord(
    fields as unknown as CreateSponsorInterface
  );

  if (newSponsor) {
    if (files.length) {
      const fileUrl = await uploadFile(
        files[0],
        TargetTypesConstants.sponsorAvatars
      );

      const fields = { businessAvatar: fileUrl };
      newSponsor = await updateSponsorRecord(
        newSponsor.id,
        fields as UpdateSponsorInterface
      );
    }
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
  const sponsors = await getAllSponsors(params);
  response.status(200).json(sponsors);
};

export default apiHandler({ POST: createSponsor, GET: getSponsors });
