import createHttpError from 'http-errors';
import { getDatabaseConnection } from '../../config/data-source-config';
import { AuthConstants } from '../../constants/auth-constants';
import { updateUserDataFromGoogle } from '../users/update-user-data-from-google';
import { createToken } from './create-token';
import { createGoogleUser } from '../users/create-google-user';
import { GoogleAuthInterface } from './interfaces/google-auth.interface';
import { User } from '../../entities/user.entity';
import { verifyGoogleUser } from './verify-google-user';
import { GoogleDataInterface } from './interfaces/google-data.interface';

export const signInWithGoogle = async (googleToken: GoogleAuthInterface) => {
  const connection = await getDatabaseConnection();
  const googleUser = (await verifyGoogleUser(
    googleToken.token
  )) as GoogleDataInterface;

  if (!googleUser) {
    throw new createHttpError.BadRequest(AuthConstants.invalidGoogleToken);
  }

  const user = await connection.manager.findOne(User, {
    where: [{ googleId: googleUser.googleId }, { email: googleUser.email }],
  });

  if (user) {
    if (user.googleId === googleUser.googleId) {
      const updatedUser = await updateUserDataFromGoogle(googleUser, user.id);
      const { expiresIn, accessToken } = await createToken(user);
      return { expiresIn, accessToken, user: updatedUser };
    } else {
      throw new createHttpError.BadRequest(
        AuthConstants.userAlreadyExistsGoogleAccountWasNotConnected
      );
    }
  }

  const newUser = await createGoogleUser(googleUser);
  const { expiresIn, accessToken } = await createToken(newUser);
  return { expiresIn, accessToken, user: newUser };
};
