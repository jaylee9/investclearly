import { AuthConstants } from "../../constants/auth-constants";
import { getUserByField } from '../users/get-user-by-field';
import { generateRandomNumber } from '../../utils/generate-random-6-digit-number';
import { getDatabaseConnection } from '../../config/data-source-config';
import { User } from '../../entities/user.entity';
import { sendConfirmationEmail } from "../mails/send-confirmation-email";

export const resendUserVerificationCode = async (email: string) => {
  const connection = await getDatabaseConnection();
  const user = await getUserByField(AuthConstants.emailField, email);
  const confirmationCode = generateRandomNumber(
    AuthConstants.minRandomValue,
    AuthConstants.maxRandomvalue,
  ).toString();

  if (user) {
    await connection.manager.update(User, { id: user.id }, { emailConfirmationCode: confirmationCode });
    await sendConfirmationEmail(user, confirmationCode);
  }
}
