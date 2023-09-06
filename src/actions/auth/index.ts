import { UserInterface } from '@/backend/services/users/interfaces/user.interface';
import api from '@/config/ky';
import { LoginFields, SignUpFields } from '@/types/auth';
import { toast } from 'react-toastify';

interface SignUpResponse {
  error?: string;
  response?: { email: string };
}

export const signUp = async ({
  firstName,
  lastName,
  password,
  email,
}: SignUpFields): Promise<SignUpResponse> => {
  try {
    const response: { email: string } = await api
      .post('auth/sign-up', {
        json: { firstName, lastName, email, password },
      })
      .json();
    return { response };
  } catch (error) {
    toast.error('Sign up was failed');
    return { error: 'Sign up was failed' };
  }
};

interface SuccessSignInterface {
  error?: string;
  response?: UserInterface;
}

export const confirmEmail = async ({
  confirmationCode,
}: {
  confirmationCode: string;
}): Promise<SuccessSignInterface> => {
  try {
    const response: UserInterface = await api
      .put('auth/confirm-email', {
        json: { confirmationCode },
      })
      .json();
    toast.success('Account was succesfully created');
    return { response };
  } catch (error) {
    const errorMessage = 'Failed to confirm email';
    toast.error(errorMessage);
    return { error: errorMessage };
  }
};

export const login = async ({
  password,
  email,
}: LoginFields): Promise<SuccessSignInterface> => {
  try {
    const response: UserInterface = await api
      .post('auth/sign-in', {
        json: { email, password },
      })
      .json();
    localStorage.setItem('user', JSON.stringify(response));
    toast.success('Login Successful!');
    return { response };
  } catch (error) {
    const errorMessage = 'Failed to login';
    toast.error(errorMessage);
    return { error: errorMessage };
  }
};

interface ActionsWithMessageResponse {
  error?: string;
  response?: { message: string };
}

export const forgotPassword = async ({
  email,
}: {
  email: string;
}): Promise<ActionsWithMessageResponse> => {
  try {
    const response: { message: string } = await api
      .post('auth/forgot-password', {
        json: { email },
      })
      .json();
    return { response };
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
}): Promise<ActionsWithMessageResponse> => {
  try {
    const response: { message: string } = await api
      .put('auth/reset-password', {
        json: { newPassword, resetPasswordToken },
      })
      .json();
    return { response };
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
}): Promise<SuccessSignInterface> => {
  try {
    const response: UserInterface = await api
      .post('auth/google', {
        json: { token },
      })
      .json();
    localStorage.setItem('user', JSON.stringify(response));
    return { response };
  } catch (error) {
    const errorMessage = 'Failed to authentificate';
    toast.error(errorMessage);
    return { error: errorMessage };
  }
};

export const logout = async (): Promise<ActionsWithMessageResponse> => {
  try {
    const response: { message: string } = await api
      .post('auth/sign-out')
      .json();
    localStorage.removeItem('user');
    return { response };
  } catch (error) {
    const errorMessage = 'Failed to log out';
    toast.error(errorMessage);
    return { error: errorMessage };
  }
};
