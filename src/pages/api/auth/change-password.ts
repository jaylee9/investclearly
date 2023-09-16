import { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler } from '../../../backend/utils/api-handler';
import { AuthConstants } from '../../../backend/constants/auth-constants';
import { ChangePasswordInterface } from '../../../backend/services/auth/interfaces/change-password.interface';
import { authMiddleware } from '../../../backend/middleware/auth';
import { changeUserPassword } from '../../../backend/services/auth/change-user-password';

const changePassword = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const { request: authRequest, user } = await authMiddleware(
    request,
    response
  );
  const body: ChangePasswordInterface = authRequest.body;

  if (user) {
    await changeUserPassword(user, body);
  }

  response
    .status(200)
    .json({ message: AuthConstants.passwordSuccessfullyChanged });
};

export default apiHandler({ PUT: changePassword });
