import axios, { type InternalAxiosRequestConfig } from 'axios';

const $host = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const $authHost = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const authInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
 if (config.headers) {
    if ('set' in config.headers && typeof config.headers.set === 'function') {
      // Используем метод set для класса AxiosHeaders
      config.headers.set('Authorization', `Bearer ${localStorage.getItem('token') ?? ''}`);
    } else {
      // На случай если headers обычный объект
      (config.headers as Record<string, string>)['Authorization'] = `Bearer ${localStorage.getItem('token') ?? ''}`;
    }
  }
  return config;
};

$authHost.interceptors.request.use(authInterceptor);

export {
  $host,
  $authHost,
};