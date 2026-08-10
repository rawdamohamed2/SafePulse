import { z } from "zod";

export const SettingsSchema = z.object({
  check_interval_hours: z
    .number()
    .min(1, "Check-in interval must be at least 1 hour"),

  grace_period_hours: z.number().min(0, "Grace period cannot be negative"),

  preferred_channel: z.enum(["email", "sms"]),

  checkin_time: z.string().min(1, "Check-in time is required"),

  legacy_enabled: z.boolean(),

  auto_alert_enabled: z.boolean(),
});

export type UpdateSettingsData = z.infer<typeof SettingsSchema>;
