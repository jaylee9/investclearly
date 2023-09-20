import { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from 'cookies-next';
import * as Yup from 'yup';
import { validateRequest } from '../../../backend/utils/yup';
import { verifyAccount } from '../../../backend/services/auth/verify-account';
import { apiHandler } from '../../../backend/utils/api-handler';
import { ValidationAuthConstants } from '../../../backend/constants/validation/auth-constants';
import { ConfirmEmailInterface } from '../../../backend/services/auth/interfaces/confirm-email.interface';

const confirmEmailSchema = Yup.object().shape({
  confirmationCode: Yup.string().required(
    ValidationAuthConstants.confirmationCodeRequired
  ),
});

const confirmEmail = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const body: ConfirmEmailInterface = request.body;
  validateRequest(body, confirmEmailSchema);

  const result = await verifyAccount(body.confirmationCode);

  if (result) {
    setCookie('accessToken', result.accessToken, {
      httpOnly: true,
      secure: false,
      req: request,
      res: response,
      maxAge: result.expiresIn,
    });

    setCookie('userRole', result.updatedUser.role, {
      httpOnly: true,
      secure: false,
      req: request,
      res: response,
      maxAge: result.expiresIn,
    });

    response.status(200).json(result.updatedUser);
  }
};

export default apiHandler({ PUT: confirmEmail });
