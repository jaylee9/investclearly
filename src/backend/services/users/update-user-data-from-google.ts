import { getDatabaseConnection } from '../../config/data-source-config';
import { User } from '../../entities/user.entity';
import { GoogleAuthInterface } from '../auth/interfaces/google-auth.interface';
import { getUserById } from './get-user-by-id';
import { splitGoogleName } from '../../../backend/utils/split-google-name';

export const updateUserDataFromGoogle = async (
  googleData: GoogleAuthInterface,
  userId: number
) => {
  const connection = await getDatabaseConnection();
  const { name, picture } = googleData;

  const { firstName, lastName } = splitGoogleName(name);

  await connection.manager.update(
    User,
    { id: userId },
    { firstName, lastName, profilePicture: picture }
  );
  return getUserById(userId);
};
