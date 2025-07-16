import api from "./api"
import type 
{ RegisterData, LoginData, ForgotPasswordData, VerifyCodeData, SetNewPasswordData } 
from "../types/formDataTypes";
import {requestWithRefresh} from "../services/requestWithRefresh"
import type { UserInfo } from "../types/userInfoTypes";
import type { GetUserParams } from "../types/paramsType";
import type { editData } from "../types/formDataTypes";

export const registerUser = async (data: RegisterData) => {
    const response = await api.post("/api/auth/Register", data);
    return response.data;
}

export const loginUser = async (data: LoginData) => {
    const response = await api.post("/api/auth/Login", data);
    return response.data;
}

export const getUserInfo = async (): Promise<UserInfo> => {
  return requestWithRefresh<UserInfo>({
    method: 'GET',
    url: '/api/Auth/Info',
  });
} 

export const sendOtpCode = async (data: ForgotPasswordData) => {
    const response = await api.post("/api/Auth/SendOtpCode", data);
    return response.data;
}

export const verifyOtpCode = async (data: VerifyCodeData) => {
    const response = await api.post("/api/Auth/VerifyOtpCode", data);
    return response.data;
}

export const resetPassword = async (data: SetNewPasswordData) => {
    const response = await api.post("/api/Auth/ResetPassword", data);
    return response.data;
}

export const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) return null;

  try {
    const response = await api.post("/api/Auth/Refresh", {refreshToken: refreshToken});

    if (response.data?.accessToken) {
      localStorage.setItem("accessToken", response.data.accessToken);
      
      if (response.data?.refreshToken) {
        localStorage.setItem("refreshToken", response.data.refreshToken);
      }
      return response.data.accessToken;
    }
    return null;
  } catch (error) {
    console.error("Refresh token yenilenmedi", error);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    return null;
  }
};

export const getUsers = async (params: GetUserParams) => {
  const response = await api.get("/api/Users", {params});
  return response.data;
}

export const getUser = async (id: string | undefined) => {
  const response = await api.get(`/api/Users/${id}`);
  return response.data
}

export const deleteUser = async (id: string) => {
  const response = await api.delete(`/api/Users/${id}`);
  return response.data;
};

export const editUser = async (data: editData) => {
  const response = await api.put('/api/Users', data);
  return response.data;
}