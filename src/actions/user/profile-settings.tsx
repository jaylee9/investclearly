import { PublicUserInterface } from '@/backend/services/users/interfaces/public-user.interface';
import { UpdateProfileSettingsInterface } from '@/backend/services/users/interfaces/update-profile-settings.interface';
import api from '@/config/ky';

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
): Promise<PublicUserInterface> => {
  const formData = new FormData();

  for (const key in payload) {
    if (payload.hasOwnProperty(key)) {
      const valueKey = key as keyof UpdateProfileSettingPayload;
      const value = payload[valueKey];
      if (value === undefined) continue;
      if (typeof value === 'string' || value instanceof File) {
        formData.append(key, value);
      } else if (typeof value === 'number' || typeof value === 'boolean') {
        formData.append(key, value.toString());
      } else if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          formData.append(`${key}[]`, value[i].toString());
        }
      }
    }
  }

  try {
    const response = await api.put('profile-settings', {
      body: formData,
    });
    return response.json();
  } catch (error) {
    console.error('Error updating profile settings', error);
    throw error;
  }
};
