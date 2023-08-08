import { NextApiRequest, NextApiResponse } from 'next';
import createHttpError from 'http-errors';
import { AuthConstants } from '../../../backend/constants/auth-constants';
import { apiHandler } from '../../../backend/utils/api-handler';
import { authMiddleware } from '../../../backend/middleware/auth';
import { parseForm } from '../../../backend/utils/parse-form';

export const config = {
  api: {
    bodyParser: false,
  },
};

const updateProfile = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  await authMiddleware(request, response);
  const { fields, files } = await parseForm(request, response);
  const id: number = Number(request.query.id);

  const updatedUser = await updateProfileSettings(
    id,
    fields as unknown as UpdateProfileSettings,
    files
  );

  if (updatedUser) {
    response.status(200).json(updatedUser);
  } else {
    throw new createHttpError.BadRequest(AuthConstants.somethingGoesWrong);
  }
};

export default apiHandler({
  PUT: updateProfile,
});
