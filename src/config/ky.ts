import ky from 'ky';

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
        if (!!localStorage.getItem('user')) {
          window.location.href = '/login';
          localStorage.removeItem('user');
        }
        if (!!localStorage.getItem('admin')) {
          window.location.href = '/admin-panel/login';
          localStorage.removeItem('admin');
        }
      },
    ],
  },
});

export default api;
