import { NextApiRequest, NextApiResponse } from 'next';
import { getCookies, deleteCookie } from 'cookies-next';
import * as Yup from 'yup';
import { apiHandler } from '../../../backend/utils/api-handler';
import { authMiddleware } from '../../../backend/middleware/auth';
import { validateRequest } from '../../../backend/utils/yup';
import { ValidationAuthConstants } from '../../../backend/constants/validation/auth-constants';
import { deactivateUserAccount } from '../../../backend/services/users/deactivate-user-account';
import { UserConstants } from '../../../backend/constants/users-constants';

const signOutSchema = Yup.object().shape({
  token: Yup.string().required(ValidationAuthConstants.tokenRequired),
});

const deactivateAccount = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const { request: authRequest, user } = await authMiddleware(
    request,
    response
  );
  if (user) {
    const token = getCookies({ req: request, res: response });
    await deactivateUserAccount(user);
    validateRequest({ token: token.accessToken }, signOutSchema);
    deleteCookie('accessToken', { req: authRequest, res: response });
    response
      .status(200)
      .json({ message: UserConstants.accountWasSuccessfullyDeactivated });
  }
};

export default apiHandler({
  DELETE: deactivateAccount,
});
