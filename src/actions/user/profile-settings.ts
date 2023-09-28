import { PublicUserInterface } from '@/backend/services/users/interfaces/public-user.interface';
import { UpdateProfileSettingsInterface } from '@/backend/services/users/interfaces/update-profile-settings.interface';
import api from '@/config/ky';
import notAuthorizedErrorHandler, {
  Roles,
} from '@/helpers/notAuthorizedErrorHandler';
import { HTTPError } from 'ky';
import { NextRouter } from 'next/router';
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
  payload: UpdateProfileSettingPayload,
  router: NextRouter
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
    if (error instanceof HTTPError) {
      notAuthorizedErrorHandler({
        status: error.response.status,
        router,
        role: Roles.USER,
      });
    }
    return { error: 'Failed to update profile settings' };
  }
};
