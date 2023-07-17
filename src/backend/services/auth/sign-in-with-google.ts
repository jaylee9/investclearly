import createHttpError from 'http-errors';
import { getDatabaseConnection } from '../../config/data-source-config';
import { AuthConstants } from '../../constants/auth-constants';
import { updateUserDataFromGoogle } from '../users/update-user-data-from-google';
import { createToken } from './create-token';
import { createGoogleUser } from '../users/create-google-user';
import { GoogleAuthInterface } from './interfaces/google-auth.interface';
import { User } from '../../entities/user.entity';

export const signInWithGoogle = async (googleData: GoogleAuthInterface) => {
  const connection = await getDatabaseConnection();
  let user = await connection.manager.findOne(User, {
    where: { googleId: googleData.sub },
  });

  if (user) {
    const updatedUser = await updateUserDataFromGoogle(googleData, user.id);
    const { expiresIn, accessToken } = await createToken(user);
    return { expiresIn, accessToken, user: updatedUser };
  }

  user = await connection.manager.findOne(User, {
    where: { email: googleData.email },
  });
  if (user) {
    throw new createHttpError.BadRequest(
      AuthConstants.userAlreadyExistsGoogleAccountWasNotConnected
    );
  }

  const newUser = await createGoogleUser(googleData);

  const { expiresIn, accessToken } = await createToken(newUser);
  return { expiresIn, accessToken, user: newUser };
};
