import { TargetTypesConstants } from '../../../backend/constants/target-types-constants';
import { getDatabaseConnection } from '../../config/data-source-config';
import { uploadFile } from '../files/upload-file';
import { deleteFile } from '../files/delete-file';
import { User } from '../../../backend/entities/user.entity';
import { UpdateProfileSettingsInterface } from './interfaces/update-profile-settings.interface';
import { getUserById } from './get-user-by-id';
import { transformObjectKeysToArrays } from '../../../backend/utils/transform-object-keys-to-arrays';

export const updateProfileSettings = async (
  id: number,
  data: UpdateProfileSettingsInterface,
  files: Express.Multer.File[]
) => {
  const { assetClasses, regions, ...updateProfileData } = data;
  const connection = await getDatabaseConnection();
  const userRecord = await connection.manager.findOne(User, {
    where: { id },
  });

  const transformedData = transformObjectKeysToArrays({
    assetClasses,
    regions,
  });

  if (files?.length) {
    if (userRecord && userRecord.profilePicture) {
      await deleteFile(userRecord.profilePicture);
    }

    data.profilePicture = await uploadFile(
      files[0],
      TargetTypesConstants.profilePictures
    );
  }

  await connection.manager.update(
    User,
    { id },
    { ...transformedData, ...updateProfileData }
  );

  return getUserById(id);
};
