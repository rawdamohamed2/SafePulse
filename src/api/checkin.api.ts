import { api } from "./axios";

export const confirmCheckin = async () => {
  const response = await api.get("/checkin/confirm");

  return response.data;
};
