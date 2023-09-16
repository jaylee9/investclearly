import { NextApiRequest, NextApiResponse } from 'next';
import { getCookies, deleteCookie } from 'cookies-next';
import * as Yup from 'yup';
import { apiHandler } from '../../../backend/utils/api-handler';
import { ValidationAuthConstants } from '../../../backend/constants/validation/auth-constants';
import { validateRequest } from '../../../backend/utils/yup';
import { AuthConstants } from '../../../backend/constants/auth-constants';

const signOutSchema = Yup.object().shape({
  token: Yup.string().required(ValidationAuthConstants.tokenRequired),
});

const signOut = async (request: NextApiRequest, response: NextApiResponse) => {
  const token = getCookies({ req: request, res: response });

  validateRequest({ token: token.accessToken }, signOutSchema);
  deleteCookie('accessToken', { req: request, res: response });
  response.status(200).json({ message: AuthConstants.signedOut });
};

export default apiHandler({ POST: signOut });
