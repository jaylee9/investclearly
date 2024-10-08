import { UserInterface } from '@/backend/services/users/interfaces/user.interface';
import customToast, { ToastType } from '@/components/common/Toast/customToast';
import {
  ADMIN_OBJECT_LOCALSTORAGE_KEY,
  USER_OBJECT_LOCALSTORAGE_KEY,
} from '@/config/constants';
import api from '@/config/ky';
import { LoginFields, SignUpFields } from '@/types/auth';

export const signUp = async ({
  firstName,
  lastName,
  password,
  email,
}: SignUpFields): Promise<{ email: string } | { error: string }> => {
  try {
    const response: { email: string } = await api
      .post('auth/sign-up', {
        json: { firstName, lastName, email, password },
      })
      .json();
    return response;
  } catch (error) {
    const errorMessage = 'Sign up was failed';
    customToast({ title: errorMessage, type: ToastType.ERROR });
    return { error: errorMessage };
  }
};

export const confirmEmail = async ({
  confirmationCode,
}: {
  confirmationCode: string;
}): Promise<UserInterface | { error: string }> => {
  try {
    const user: UserInterface = await api
      .put('auth/confirm-email', {
        json: { confirmationCode },
      })
      .json();
    customToast({
      title: 'Account was succesfully created',
      type: ToastType.SUCCESS,
    });
    localStorage.setItem(USER_OBJECT_LOCALSTORAGE_KEY, JSON.stringify(user));
    return user;
  } catch (error) {
    const errorMessage = 'Failed to confirm email';
    customToast({ title: errorMessage, type: ToastType.ERROR });
    return { error: errorMessage };
  }
};

export const login = async ({
  password,
  email,
}: LoginFields): Promise<UserInterface | { error: string }> => {
  try {
    const user: UserInterface = await api
      .post('auth/sign-in', {
        json: { email, password },
      })
      .json();
    localStorage.setItem(USER_OBJECT_LOCALSTORAGE_KEY, JSON.stringify(user));
    return user;
  } catch (error) {
    const errorMessage = 'Failed to login';
    customToast({ title: errorMessage, type: ToastType.ERROR });
    return { error: errorMessage };
  }
};

export const forgotPassword = async ({
  email,
}: {
  email: string;
}): Promise<{ message: string } | { error: string }> => {
  try {
    const response: { message: string } = await api
      .post('auth/forgot-password', {
        json: { email },
      })
      .json();
    return response;
  } catch (error) {
    const errorMessage = 'Failed to send forgot password request';
    customToast({ title: errorMessage, type: ToastType.ERROR });
    return { error: errorMessage };
  }
};

export const resetPassword = async ({
  newPassword,
  resetPasswordToken,
}: {
  newPassword: string;
  resetPasswordToken: string;
}): Promise<{ message: string } | { error: string }> => {
  try {
    const response: { message: string } = await api
      .put('auth/reset-password', {
        json: { newPassword, resetPasswordToken },
      })
      .json();
    return response;
  } catch (error) {
    const errorMessage = 'Failed to reset password';
    customToast({ title: errorMessage, type: ToastType.ERROR });
    return { error: errorMessage };
  }
};

export const googleLogin = async ({
  token,
}: {
  token: string;
}): Promise<UserInterface | { error: string }> => {
  try {
    const user: UserInterface = await api
      .post('auth/google', {
        json: { token },
      })
      .json();
    localStorage.setItem(USER_OBJECT_LOCALSTORAGE_KEY, JSON.stringify(user));
    return user;
  } catch (error) {
    const errorMessage = 'Failed to authenticate';
    customToast({ title: errorMessage, type: ToastType.ERROR });
    return { error: errorMessage };
  }
};

export const logout = async (): Promise<
  { message: string } | { error: string }
> => {
  try {
    const response: { message: string } = await api
      .post('auth/sign-out')
      .json();
    localStorage.removeItem(USER_OBJECT_LOCALSTORAGE_KEY);
    return response;
  } catch (error) {
    const errorMessage = 'Failed to log out';
    localStorage.removeItem(USER_OBJECT_LOCALSTORAGE_KEY);
    return { error: errorMessage };
  }
};

export const changePassword = async ({
  newPassword,
  password,
}: {
  newPassword: string;
  password: string;
}): Promise<{ message: string } | { error: string }> => {
  try {
    const response: { message: string } = await api
      .put('auth/change-password', {
        json: { newPassword, password },
      })
      .json();
    return response;
  } catch (error) {
    const errorMessage = 'Failed to change password';
    customToast({ title: errorMessage, type: ToastType.ERROR });
    return { error: errorMessage };
  }
};

export const addPassword = async ({
  newPassword,
}: {
  newPassword: string;
}): Promise<{ message: string } | { error: string }> => {
  try {
    const response: { message: string } = await api
      .post('auth/add-password-to-google', {
        json: { newPassword },
      })
      .json();
    return response;
  } catch (error) {
    const errorMessage = 'Failed to add password';
    customToast({ title: errorMessage, type: ToastType.ERROR });
    return { error: errorMessage };
  }
};

export const adminLogin = async ({
  password,
  email,
}: LoginFields): Promise<UserInterface | { error: string }> => {
  try {
    const user: UserInterface = await api
      .post('auth/sign-in', {
        json: { email, password },
      })
      .json();
    localStorage.setItem(ADMIN_OBJECT_LOCALSTORAGE_KEY, JSON.stringify(user));
    return user;
  } catch (error) {
    const errorMessage = 'Failed to login';
    customToast({ title: errorMessage, type: ToastType.ERROR });
    return { error: errorMessage };
  }
};
