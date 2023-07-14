import * as jwt from 'jsonwebtoken';
import moment from 'moment';
import { AuthConstants } from '../../constants/auth-constants';
import { sendResetPasswordEmail } from '../mails/send-reset-password-email';
import { getUserByField } from '../users/get-user-by-field';

export const sendResetPasswordInstructions = async (email: string) => {
  const user = await getUserByField(AuthConstants.emailField, email);

  const expireAt = moment().add(AuthConstants.emailConfirmationTokenExpiresInHours, 'hour').toISOString();

  const resetPasswordToken: string = jwt.sign({
    id: user.id,
    email: user.email,
    expireAt,
  },
    process.env.JWT_SECRET || '',
  );

  await sendResetPasswordEmail(user, resetPasswordToken);
}
