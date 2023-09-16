import ky from 'ky';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const api = ky.create({
  prefixUrl: `${baseURL}/api/`,
  credentials: 'include',
});
export default api;
