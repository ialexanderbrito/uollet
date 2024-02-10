import axios from 'axios';

console.log(import.meta.env.VITE_URL_API);

export const api = axios.create({
  baseURL: import.meta.env.VITE_URL_API,
});

api.interceptors.request.use(async (config) => {
  const token = sessionStorage.getItem('@uollet:token');
  const refreshToken = sessionStorage.getItem('@uollet:refreshToken');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (refreshToken) {
    config.headers.refresh_token = refreshToken;
  }

  return config;
});
