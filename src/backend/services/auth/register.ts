import { AuthConstants } from '../../constants/auth-constants';
import { generateRandomNumber } from '../../utils/generate-random-6-digit-number';
import { sendConfirmationEmail } from '../mails/send-confirmation-email';
import { createUser } from '../users/create-user';
import { SignUpInterface } from './interfaces/sign-up.interface';
import { divideDigitNumber } from '../../utils/divide-6-digit-number.ts';

export const register = async (userData: SignUpInterface) => {
  const confirmationCode = generateRandomNumber(
    AuthConstants.minForRandomSixDigitNumber,
    AuthConstants.maxForRandomSixDigitNumber,
  ).toString();

  const newUser = await createUser(userData, confirmationCode);

  if (newUser) {
    const dividedConfirmationCodeData = divideDigitNumber(confirmationCode);
    await sendConfirmationEmail(newUser, dividedConfirmationCodeData);
    return newUser.email;
  }
}
