import { NextApiRequest, NextApiResponse } from 'next';
import createHttpError from 'http-errors';
import { AuthConstants } from '../../../backend/constants/auth-constants';
import { apiHandler } from '../../../backend/utils/api-handler';
import { authMiddleware } from '../../../backend/middleware/auth';
import { AddPasswordToGoogleAccountInterface } from '../../../backend/services/auth/interfaces/add-password.interface';
import { addPasswordToGoogleAccount } from '../../../backend/services/auth/add-password-to-google-account';
import { deleteCookie } from 'cookies-next';

const addPassword = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const { request: authRequest, user } = await authMiddleware(
    request,
    response
  );

  const body: AddPasswordToGoogleAccountInterface = authRequest.body;
  let userRecord = null;

  if (user && !user.password) {
    userRecord = await addPasswordToGoogleAccount(user, body.newPassword);
  }

  if (userRecord) {
    deleteCookie('accessToken', { req: request, res: response });
    response
      .status(200)
      .json({ message: AuthConstants.passwordSuccessfullyAdded });
  } else {
    throw new createHttpError.BadRequest(AuthConstants.somethingGoesWrong);
  }
};

export default apiHandler({ POST: addPassword });
