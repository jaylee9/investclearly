import { AuthConstants } from '../../constants/auth-constants';
import { getUserByField } from '../users/get-user-by-field';
import { generateRandomNumber } from '../../utils/generate-random-6-digit-number';
import { getDatabaseConnection } from '../../config/data-source-config';
import { User } from '../../entities/user.entity';
import { sendConfirmationEmail } from '../mails/send-confirmation-email';
import { divideDigitNumber } from '../../utils/divide-digit-number.ts';

export const resendUserVerificationCode = async (email: string) => {
  const connection = await getDatabaseConnection();
  const user = await getUserByField(AuthConstants.emailField, email);

  if (user) {
    const confirmationCode = generateRandomNumber(
      AuthConstants.minForRandomSixDigitNumber,
      AuthConstants.maxForRandomSixDigitNumber
    ).toString();

    await connection.manager.update(
      User,
      { id: user.id },
      { emailConfirmationCode: confirmationCode }
    );

    const dividedConfirmationCodeData = divideDigitNumber(confirmationCode);
    await sendConfirmationEmail(user, dividedConfirmationCodeData);
  }
};
