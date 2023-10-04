import { PublicUserInterface } from '@/backend/services/users/interfaces/public-user.interface';
import { UpdateProfileSettingsInterface } from '@/backend/services/users/interfaces/update-profile-settings.interface';
import customToast, { ToastType } from '@/components/common/Toast/customToast';
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
    customToast({
      title: 'Profile settings successfully updated.',
      type: ToastType.SUCCESS,
    });
    return response;
  } catch (error) {
    const errorMessage = 'Failed to update profile settings';
    customToast({ title: errorMessage, type: ToastType.ERROR });
    return { error: errorMessage };
  }
};
