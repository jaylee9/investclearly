import { NextApiRequest, NextApiResponse } from 'next';
import * as Yup from 'yup';
import { apiHandler } from '../../../backend/utils/api-handler';
import { sendResetPasswordInstructions } from '../../../backend/services/auth/send-reset-password-instructions';
import { validateRequest } from '../../../backend/utils/yup';
import { ValidationAuthConstants } from '../../../backend/constants/validation/auth-constants';
import { MailConstants } from '../../../backend/constants/mail-constants';
import { ForgotPasswordInterface } from '../../../backend/services/auth/interfaces/forgot-password.interface';

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().required(ValidationAuthConstants.emailRequired),
});

const forgotPassword = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const body: ForgotPasswordInterface = request.body;
  validateRequest(body, forgotPasswordSchema);

  await sendResetPasswordInstructions(body.email);

  response.status(200).json({ message: MailConstants.mailSuccessfullySent });
}

export default apiHandler({ POST: forgotPassword });
