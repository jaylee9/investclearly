import { NextApiRequest, NextApiResponse } from 'next';
import { deleteCookie, setCookie } from 'cookies-next';
import { createToken } from '../../../backend/services/auth/create-token';
import { apiHandler } from '../../../backend/utils/api-handler';
import { AuthConstants } from '../../../backend/constants/auth-constants';
import { authMiddleware } from '../../../backend/middleware/auth';
import { ChangeEmailInterface } from '../../../backend/services/auth/interfaces/change-email.interface';
import { changeUserEmail } from '../../../backend/services/auth/change-user-email';

const changeEmail = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const { request: authRequest, user } = await authMiddleware(
    request,
    response
  );
  const body: ChangeEmailInterface = authRequest.body;

  if (user && !user.googleId) {
    const updatedUserRecord = await changeUserEmail(user, body);
    const token = createToken(updatedUserRecord);

    deleteCookie('accessToken', { req: request, res: response });
    setCookie('accessToken', token.accessToken, {
      httpOnly: true,
      secure: false,
      req: request,
      res: response,
      maxAge: token.expiresIn,
    });
  }

  response
    .status(200)
    .json({ message: AuthConstants.emailSuccessfullyChanged });
};

export default apiHandler({ PUT: changeEmail });
