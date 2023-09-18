import * as crypto from 'crypto';
import * as bcrypt from 'bcryptjs';
import { getDatabaseConnection } from '../../config/data-source-config';
import { User } from '../../entities/user.entity';
import { deleteFile } from '../files/delete-file';
import { DeleteUserConstants } from '../../../backend/constants/delete-user-constants';

export const deactivateUserAccount = async (user: User, feedback: string) => {
  const connection = await getDatabaseConnection();
  const profilePicture = user.profilePicture;
  const randomPassword = crypto.randomBytes(10).toString('hex');
  const hashedPassword = await bcrypt.hash(randomPassword, 10);

  if (user.googleId) {
    const randomValueForGoogleId = crypto.randomBytes(10).toString('hex');
    await connection.manager.update(
      User,
      { id: user.id },
      {
        googleId: randomValueForGoogleId,
      }
    );
  }

  await connection.manager.update(
    User,
    { id: user.id },
    {
      firstName: DeleteUserConstants.deleteUserFirstname,
      lastName: DeleteUserConstants.deleteUserLastName,
      email: `${DeleteUserConstants.deleteUserEmailName}${user.id}${DeleteUserConstants.deleteUserEmail}`,
      password: hashedPassword,
      profilePicture: '',
      totalInvestedAmountVisibility: false,
      yourDealsVisibility: false,
      weeklyDigestEmail: false,
      reviewWasPublishedAfterModerationEmail: false,
      reviewWasDeclinedAfterModerationEmail: false,
      newDealMathingYourInvestmentPreferencesEmail: false,
      newDealFromTheSponsorYouSavedEmail: false,
      newReviewHasBeenSharedToSponsorEmail: false,
      // feedbackOfDeletedAccount: feedback,
    }
  );
  if (profilePicture) {
    await deleteFile(profilePicture);
  }
};
