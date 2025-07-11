import api from "./api"
import type { RegisterData } from "../types/formDataTypes"
import type { LoginData } from "../types/formDataTypes"

export const registerUser = async (data: RegisterData) => {
    const response = await api.post("/api/auth/Register", data);
    return response.data;
}

export const loginUser = async (data: LoginData) => {
    const response = await api.post("/api/auth/Login", data);
    return response.data;
}

export const getUserInfo = async () => {
const token = localStorage.getItem("accessToken");
    const response = await api.get("/api/Auth/Info", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data;
} 