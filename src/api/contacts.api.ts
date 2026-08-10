import { api } from "./axios";
import type { CreateContactData } from "@/schemas/contacts.schema.ts";

export const getContacts = async () => {
  const response = await api.get("/contacts");

  return response.data;
};

export const createContact = async (data: CreateContactData) => {
  const response = await api.post("/contacts", data);

  return response.data;
};

export const deleteContact = async (contact_id: string) => {
  const response = await api.delete(`/contacts/${contact_id}`);

  return response.data;
};
