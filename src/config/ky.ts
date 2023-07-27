import ky from 'ky';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const api = ky.create({
  prefixUrl: `${baseURL}/api/`,
  credentials: 'include',
});
export default api;
