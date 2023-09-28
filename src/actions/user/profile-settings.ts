import { PublicUserInterface } from '@/backend/services/users/interfaces/public-user.interface';
import { UpdateProfileSettingsInterface } from '@/backend/services/users/interfaces/update-profile-settings.interface';
import api from '@/config/ky';
import { serialize } from 'object-to-formdata';

export type OptionalUpdateProfileSettingsInterface =
  Partial<UpdateProfileSettingsInterface>;

export type UpdateProfileSettingPayload = Omit<
  OptionalUpdateProfileSettingsInterface,
  'profilePicture'
> & {
  profilePicture?: File;
};

export const updateProfileSettings = async (
  payload: UpdateProfileSettingPayload
): Promise<PublicUserInterface | { error: string }> => {
  const formData = serialize(payload, {
    indices: true,
    nullsAsUndefineds: true,
  });

  try {
    const response: PublicUserInterface = await api
      .put('profile-settings', {
        body: formData,
      })
      .json();
    return response;
  } catch (error) {
    return { error: 'Failed to update profile settings' };
  }
};
