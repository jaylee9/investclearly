import { AuthConstants } from '../../constants/auth-constants';
import { generateRandomNumber } from '../../utils/generate-random-6-digit-number';
import { sendConfirmationEmail } from '../mails/send-confirmation-email';
import { createUser } from '../users/create-user';
import { SignUpInterface } from './interfaces/sign-up.interface';

export const register = async (userData: SignUpInterface) => {
  const confirmationCode = generateRandomNumber(
    AuthConstants.minForRandomSixDigitNumber,
    AuthConstants.maxForRandomSixDigitNumber,
  ).toString();

  const newUser = await createUser(userData, confirmationCode);

  if (newUser) {
    await sendConfirmationEmail(newUser, confirmationCode);
    return newUser.email;
  }
}
