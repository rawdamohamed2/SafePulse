import { api } from "./axios";
import type { UpdateSettingsData } from "@/schemas/settings.schema";

export const getSettings = async () => {
  const response = await api.get("/settings");

  return response.data;
};

export const updateSettings = async (data: UpdateSettingsData) => {
  const response = await api.put("/settings", data);

  return response.data;
};

export const pauseCheckin = async () => {
  const response = await api.post("/settings/pause");

  return response.data;
};
