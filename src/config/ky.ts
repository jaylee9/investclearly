import ky from 'ky';

export const api = ky.create({
  prefixUrl: '/api/',
});
export default api;
