import { NextApiRequest, NextApiResponse } from 'next';
import * as bcrypt from 'bcryptjs';
import { setCookie } from 'cookies-next';
import * as Yup from 'yup';
import createHttpError from 'http-errors';
import { validateRequest } from '../../../backend/utils/yup';
import { AuthConstants } from '../../../backend/constants/auth-constants';
import { getUserByField } from '../../../backend/services/users/get-user-by-field';
import { createToken } from '../../../backend/services/auth/create-token';
import { userMapper } from '../../../backend/mappers/user.mapper';
import { apiHandler } from '../../../backend/utils/api-handler';
import { ValidationAuthConstants } from '../../../backend/constants/validation/auth-constants';
import { SignInInterface } from '../../../backend/services/auth/interfaces/sign-in.interface';

const signInSchema = Yup.object().shape({
  email: Yup.string().required(ValidationAuthConstants.emailRequired),
  password: Yup.string().required(ValidationAuthConstants.passwordRequired),
});

const signIn = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const body: SignInInterface = request.body;
  validateRequest(body, signInSchema);

  const user = await getUserByField(AuthConstants.emailField, body.email);

  if (user.emailConfirmationCode !== null && user.emailConfirmationCode !== '') {
    throw new createHttpError.BadRequest(AuthConstants.verifyAccountFirst);
  }

  if (user && (await bcrypt.compare(body.password, user.password))) {
    const token = createToken(user);

    setCookie('accessToken', token.accessToken, {
      httpOnly: true,
      secure: false,
      req: request,
      res: response,
      maxAge: token.expiresIn,
    });

    response.status(200).json(userMapper(user));
  } else {
    throw new createHttpError.BadRequest(AuthConstants.wrongEmailOrPassword);
  }
}

export default apiHandler({ POST: signIn });
