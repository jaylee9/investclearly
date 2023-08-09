import { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler } from '../../../backend/utils/api-handler';
import { AuthConstants } from '../../../backend/constants/auth-constants';
import { authMiddleware } from '../../../backend/middleware/auth';
import { ChangeEmailInterface } from '@/backend/services/auth/interfaces/change-email.interface';
import { changeUserEmail } from '@/backend/services/auth/change-user-email';

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
    await changeUserEmail(user, body);
  }

  response
    .status(200)
    .json({ message: AuthConstants.emailSuccessfullyChanged });
};

export default apiHandler({ PUT: changeEmail });
