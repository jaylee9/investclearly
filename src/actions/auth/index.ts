import { UserInterface } from '@/backend/services/users/interfaces/user.interface';
import api from '@/config/ky';
import { LoginFields, SignUpFields } from '@/types/auth';
import { toast } from 'react-toastify';

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
    toast.error(errorMessage);
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
    toast.success('Account was succesfully created');
    return user;
  } catch (error) {
    const errorMessage = 'Failed to confirm email';
    toast.error(errorMessage);
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
    localStorage.setItem('user', JSON.stringify(user));
    toast.success('Login Successful!');
    return user;
  } catch (error) {
    const errorMessage = 'Failed to login';
    toast.error(errorMessage);
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
    toast.error(errorMessage);
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
    toast.error(errorMessage);
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
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  } catch (error) {
    const errorMessage = 'Failed to authenticate';
    toast.error(errorMessage);
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
    localStorage.removeItem('user');
    return response;
  } catch (error) {
    const errorMessage = 'Failed to log out';
    toast.error(errorMessage);
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
    toast.error(errorMessage);
    return { error: errorMessage };
  }
};
