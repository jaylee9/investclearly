import { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from 'cookies-next';
import * as Yup from 'yup';
import createHttpError from 'http-errors';
import { validateRequest } from '../../../backend/utils/yup';
import { signInWithGoogle } from '../../../backend/services/auth/sign-in-with-google';
import { apiHandler } from '../../../backend/utils/api-handler';
import { ValidationAuthConstants } from '../../../backend/constants/validation/auth-constants';
import { GoogleAuthInterface } from '../../../backend/services/auth/interfaces/google-auth.interface';
import { AuthConstants } from '../../../backend/constants/auth-constants';

const googleAuthSchema = Yup.object().shape({
  email: Yup.string().required(ValidationAuthConstants.emailRequired),
  sub: Yup.string().required(ValidationAuthConstants.googleSubRequired),
});

const googleAuth = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const body: GoogleAuthInterface = request.body;
  validateRequest(body, googleAuthSchema);

  const result = await signInWithGoogle(body)

  if (result.accessToken && result.expiresIn) {
    setCookie('accessToken', result.accessToken, {
      httpOnly: true,
      secure: false,
      req: request,
      res: response,
      maxAge: result.expiresIn,
    });

    response.status(200).json(result.user);
  } else {
    throw new createHttpError.BadRequest(AuthConstants.somethingGoesWrong);
  }
}

export default apiHandler({ POST: googleAuth });
