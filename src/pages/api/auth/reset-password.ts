import { NextApiRequest, NextApiResponse } from 'next';
import * as Yup from 'yup';
import { validateRequest } from '../../../backend/utils/yup';
import { resetUserPassword } from '../../../backend/services/auth/reset-password';
import { apiHandler } from '../../../backend/utils/api-handler';
import { ValidationAuthConstants } from '../../../backend/constants/validation/auth-constants';
import { AuthConstants } from '../../../backend/constants/auth-constants';
import { ResetPasswordInterface } from '../../../backend/services/auth/interfaces/reset-password.interface';

const resetPasswordSchema = Yup.object().shape({
  resetPasswordToken: Yup.string().required(
    ValidationAuthConstants.resetPasswordTokenRequired
  ),
  newPassword: Yup.string().required(
    ValidationAuthConstants.newPasswordRequired
  ),
});

const resetPassword = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const body: ResetPasswordInterface = request.body;
  validateRequest(body, resetPasswordSchema);

  await resetUserPassword(body.resetPasswordToken, body.newPassword);

  response
    .status(200)
    .json({ message: AuthConstants.passwordSuccessfullyChanged });
};

export default apiHandler({ PUT: resetPassword });
