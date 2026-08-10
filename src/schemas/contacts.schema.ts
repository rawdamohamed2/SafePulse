import { z } from "zod";

export const CreateContactSchema = z.object({
  name: z
    .string()
    .min(1, "name is required")
    .max(30, "name is can't exceed 30 characters"),
  relation: z
    .string()
    .min(1, "phone is required")
    .max(30, "phone is can't exceed 30 characters"),
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .min(1, "email is required"),
  phone: z.string().min(1, "phone is required"),
  priority_order: z.number().positive().gte(0),
});
export type CreateContactData = z.infer<typeof CreateContactSchema>;

export const ContactIdSchema = z.object({
  contact_id: z.string().min(1, "name is required"),
});
export type ContactIdData = z.infer<typeof ContactIdSchema>;
