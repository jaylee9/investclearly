import createHttpError from 'http-errors';
import { AuthConstants } from '../../constants/auth-constants';
import { getUserByField } from '../users/get-user-by-field';
import { updateUserDataFromGoogle } from '../users/update-user-data-from-google';
import { createToken } from './create-token';
import { createGoogleUser } from '../users/create-google-user';
import { GoogleAuthInterface } from './interfaces/google-auth.interface';

export const signInWithGoogle = async (googleData: GoogleAuthInterface) => {

  if (googleData) {
    let user = await getUserByField(AuthConstants.googleIdField, googleData.sub);

    if (user) {
      const updatedUser = await updateUserDataFromGoogle(googleData, user.id);
      const { expiresIn, accessToken } = await createToken(user);
      return { expiresIn, accessToken, user: updatedUser };
    }

    user = await getUserByField(AuthConstants.emailField, googleData.email);
    if (user) {
      throw new createHttpError.BadRequest(AuthConstants.userAlreadyExistsGoogleAccountWasNotConnected);
    }
  };

  const newUser = await createGoogleUser(googleData);

  const { expiresIn, accessToken } = await createToken(newUser);
  return { expiresIn, accessToken, user: newUser };
}
