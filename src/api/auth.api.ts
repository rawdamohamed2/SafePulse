import { api } from "./axios";
import { type RegisterFormData } from "@/schemas/auth.schema";

export const register = async (data: RegisterFormData) => {
  const response = await api.post("/auth/signup", data);
  return response.data;
};
export const login = async (data: RegisterFormData) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};
export const verifyEmail = async (token: string) => {
  const response = await api.get("/auth/verify-email", {
    params: {
      token,
    },
  });

  return response.data;
};
export const logout = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};
