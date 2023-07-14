import { AuthConstants } from '../../constants/auth-constants';
import { getUserByField } from '../users/get-user-by-field';
import { getDatabaseConnection } from '../../config/data-source-config';
import { User } from '../../entities/user.entity';
import { getUserById } from '../users/get-user-by-id';
import { createToken } from './create-token';

export const verifyAccount = async (confirmationCode: string) => {
  const connection = await getDatabaseConnection();
  const user = await getUserByField(AuthConstants.emailConfirmationCodeField, confirmationCode);

  if (user) {
    await connection.manager.update(User, { id: user.id }, { emailConfirmationCode: '' });
    const updatedUser = await getUserById(user.id);
    const { expiresIn, accessToken } = await createToken(updatedUser);

    return { accessToken, expiresIn, updatedUser };
  }
}
