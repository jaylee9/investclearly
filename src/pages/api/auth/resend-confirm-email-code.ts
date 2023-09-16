import { NextApiRequest, NextApiResponse } from 'next';
import * as Yup from 'yup';
import { validateRequest } from '../../../backend/utils/yup';
import { apiHandler } from '../../../backend/utils/api-handler';
import { ValidationAuthConstants } from '../../../backend/constants/validation/auth-constants';
import { MailConstants } from '../../../backend/constants/mail-constants';
import { resendUserVerificationCode } from '../../../backend/services/auth/resend-user-verification-code';
import { ResendConfirmEmailInterface } from '../../../backend/services/auth/interfaces/resend-confirm-email.interface';

const resendConfirmEmailCodeSchema = Yup.object().shape({
  email: Yup.string().required(ValidationAuthConstants.emailRequired),
});

const resendConfirmEmailCode = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const body: ResendConfirmEmailInterface = request.body;
  validateRequest(body, resendConfirmEmailCodeSchema);

  await resendUserVerificationCode(body.email);

  response.status(200).json({ message: MailConstants.mailSuccessfullySent });
};

export default apiHandler({ POST: resendConfirmEmailCode });
