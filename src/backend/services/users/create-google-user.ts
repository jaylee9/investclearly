import { getDatabaseConnection } from '../../config/data-source-config';
import { User } from '../../entities/user.entity';
import { getUserById } from './get-user-by-id';
import { GoogleAuthInterface } from '../auth/interfaces/google-auth.interface';
import { splitGoogleName } from '../../../backend/utils/split-google-name';

export const createGoogleUser = async (googleData: GoogleAuthInterface) => {
  const connection = await getDatabaseConnection();

  const { name, email, picture, sub } = googleData;
  const { firstName, lastName } = splitGoogleName(name);

  const user = connection.manager.create(User, {
    googleId: sub,
    profilePicture: picture,
    firstName,
    lastName,
    email,
  });

  await connection.manager.save(user);
  return getUserById(user.id);
}
