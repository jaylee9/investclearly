import * as bcrypt from 'bcryptjs';
import createHttpError from 'http-errors';
import { AuthConstants } from '../../constants/auth-constants';
import { getDatabaseConnection } from '../../config/data-source-config';
import { User } from '../../entities/user.entity';
import { ChangeEmailInterface } from './interfaces/change-email.interface';

export const changeUserEmail = async (
  user: User,
  userData: ChangeEmailInterface
) => {
  const { password, newEmail } = userData;
  const connection = await getDatabaseConnection();

  if (await bcrypt.compare(password, user.password)) {
    await connection.manager.update(
      User,
      { id: user.id },
      {
        email: newEmail.toLowerCase(),
      }
    );
  } else {
    throw new createHttpError.BadRequest(AuthConstants.somethingGoesWrong);
  }
};
