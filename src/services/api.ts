import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.uollet.com.br',
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
