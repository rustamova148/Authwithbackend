import api from './api';
import { refreshToken } from './authService';
import type { AxiosError, AxiosRequestConfig } from 'axios';

export async function requestWithRefresh<T>(config: AxiosRequestConfig): Promise<T> {
  const token = localStorage.getItem('accessToken');
  const refreshTokenExpiredAt = localStorage.getItem('refreshTokenExpiredAt');

  if(refreshTokenExpiredAt) {
   const expiredDate = new Date(refreshTokenExpiredAt);
   const now = new Date();

   if(expiredDate <= now){
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("refreshTokenExpiredAt");
    throw new Error("Sessiya muddeti bitib, zehmet olmasa yeniden daxil olun.")
   }
  }

  config.headers = {
    ...config.headers,
    Authorization: token ? `Bearer ${token}` : '',
  };

  try {
    const response = await api(config);
    return response.data;
  } catch (error: unknown) {
    if (typeof error === 'object' &&
      error !== null &&
      'isAxiosError' in error &&
      (error as AxiosError).isAxiosError &&
      (error as AxiosError).response?.status === 401) {
      const newToken = await refreshToken();
      if (newToken) {
        config.headers.Authorization = `Bearer ${newToken}`;
        const retryResponse = await api(config);
        return retryResponse.data;
      } else {
        throw error;
      }
    }
    throw error;
  }
}
