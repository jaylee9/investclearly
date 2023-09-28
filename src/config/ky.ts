import ky from 'ky';
import { ADMIN_ROLE, USER_ROLE } from './constants';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const api = ky.create({
  prefixUrl: `${baseURL}/api/`,
  credentials: 'include',
  hooks: {
    afterResponse: [
      (request, options, response) => {
        if (response.status !== 401 || !window) {
          return response;
        }
        if (!!localStorage.getItem(USER_ROLE)) {
          window.location.href = '/login';
          localStorage.removeItem(USER_ROLE);
        }
        if (!!localStorage.getItem(ADMIN_ROLE)) {
          window.location.href = '/admin-panel/login';
          localStorage.removeItem(ADMIN_ROLE);
        }
      },
    ],
  },
});

export default api;
