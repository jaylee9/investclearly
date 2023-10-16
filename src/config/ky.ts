import ky from 'ky';
import {
  ADMIN_OBJECT_LOCALSTORAGE_KEY,
  USER_OBJECT_LOCALSTORAGE_KEY,
} from './constants';

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
        if (!!localStorage.getItem(USER_OBJECT_LOCALSTORAGE_KEY)) {
          window.location.href = '/login';
          localStorage.removeItem(USER_OBJECT_LOCALSTORAGE_KEY);
        }
        if (
          !!localStorage.getItem(ADMIN_OBJECT_LOCALSTORAGE_KEY) &&
          !localStorage.getItem(USER_OBJECT_LOCALSTORAGE_KEY)
        ) {
          window.location.href = '/admin-panel/login';
          localStorage.removeItem(ADMIN_OBJECT_LOCALSTORAGE_KEY);
        }
      },
    ],
  },
});

export default api;
