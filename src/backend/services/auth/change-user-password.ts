import * as bcrypt from 'bcryptjs';
import createHttpError from 'http-errors';
import { AuthConstants } from '../../constants/auth-constants';
import { getDatabaseConnection } from '../../config/data-source-config';
import { User } from '../../entities/user.entity';
import { ChangePasswordInterface } from './interfaces/change-password.interface';

export const changeUserPassword = async (
  user: User,
  userData: ChangePasswordInterface
) => {
  const { password, newPassword } = userData;
  const connection = await getDatabaseConnection();

  if (await bcrypt.compare(password, user.password)) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await connection.manager.update(
      User,
      { id: user.id },
      {
        password: hashedPassword,
      }
    );
  } else {
    throw new createHttpError.BadRequest(AuthConstants.somethingGoesWrong);
  }
};
