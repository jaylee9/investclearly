import { NextApiRequest, NextApiResponse } from 'next';
import createHttpError from 'http-errors';
import { AuthConstants } from '../../../backend/constants/auth-constants';
import { apiHandler } from '../../../backend/utils/api-handler';
import { authMiddleware } from '../../../backend/middleware/auth';
import { parseForm } from '../../../backend/utils/parse-form';
import { UpdateProfileSettingsInterface } from '../../../backend/services/users/interfaces/update-profile-settings.interface';
import { updateProfileSettings } from '../../../backend/services/users/update-profile-settings';

export const config = {
  api: {
    bodyParser: false,
  },
};

const updateProfile = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const { request: authRequest, user } = await authMiddleware(
    request,
    response
  );
  const userId = user?.id;
  const { fields, files } = await parseForm(authRequest, response);

  const updatedUser = await updateProfileSettings(
    userId!,
    fields as unknown as UpdateProfileSettingsInterface,
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
