import * as bcrypt from 'bcryptjs';
import createHttpError from 'http-errors';
import { AuthConstants } from '../../constants/auth-constants';
import { getDatabaseConnection } from '../../config/data-source-config';
import { User } from '../../entities/user.entity';
import { getUserById } from '../users/get-user-by-id';

export const addPasswordToGoogleAccount = async (
  userId: number,
  password: string,
  googleId: string,
  newPassword: string
) => {
  const connection = await getDatabaseConnection();

  if (!googleId && password) {
    throw new createHttpError.BadRequest(AuthConstants.somethingGoesWrong);
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await connection.manager.update(
    User,
    { id: userId },
    {
      password: hashedPassword,
    }
  );

  return getUserById(userId);
};
