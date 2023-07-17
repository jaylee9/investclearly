import api from '@/config/ky';
import { LoginFields, SignUpFields } from '@/types/auth';

export const signUp = async ({
  firstName,
  lastName,
  password,
  email,
}: SignUpFields): Promise<{ isError: boolean }> => {
  try {
    await api.post('auth/sign-up', {
      json: { firstName, lastName, email, password },
    });
    return { isError: false };
  } catch (error) {
    return { isError: true };
  }
};

export const confirmEmail = async ({
  confirmationCode,
}: {
  confirmationCode: string;
}): Promise<{ isError: boolean }> => {
  try {
    await api.put('auth/confirm-email', {
      json: { confirmationCode },
    });
    return { isError: false };
  } catch (error) {
    return { isError: true };
  }
};

export const login = async ({
  password,
  email,
}: LoginFields): Promise<{ isError: boolean }> => {
  try {
    await api.post('auth/sign-in', {
      json: { email, password },
    });
    return { isError: false };
  } catch (error) {
    return { isError: true };
  }
};

export const forgotPassword = async ({
  email,
}: {
  email: string;
}): Promise<{ isError: boolean }> => {
  try {
    await api.post('auth/forgot-password', {
      json: { email },
    });
    return { isError: false };
  } catch (error) {
    return { isError: true };
  }
};

export const resetPassword = async ({
  newPassword,
  resetPasswordToken,
}: {
  newPassword: string;
  resetPasswordToken: string;
}): Promise<{ isError: boolean }> => {
  try {
    await api.put('auth/reset-password', {
      json: { newPassword, resetPasswordToken },
    });
    return { isError: false };
  } catch (error) {
    return { isError: true };
  }
};
