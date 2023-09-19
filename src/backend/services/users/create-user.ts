import createHttpError from 'http-errors';
import { getDatabaseConnection } from '../../config/data-source-config';
import { User } from '../../entities/user.entity';
import { getUserById } from './get-user-by-id';
import { AuthConstants } from '../../constants/auth-constants';
import { SignUpInterface } from '../auth/interfaces/sign-up.interface';

export const createUser = async (
  data: SignUpInterface,
  confirmationCode: string
) => {
  const connection = await getDatabaseConnection();

  const { email } = data;
  const lowerCasedEmail = email.toLowerCase();

  const userRecord = await connection.manager.findOne(User, {
    where: {
      email: lowerCasedEmail,
    },
  });

  if (userRecord) {
    throw new createHttpError.BadRequest(AuthConstants.somethingGoesWrong);
  }

  const user = connection.manager.create(User, {
    ...data,
    emailConfirmationCode: confirmationCode,
  });
  await connection.manager.save(user);
  return getUserById(user.id);
};
