export interface User {
  id: string;
  full_name: string;
  is_active: boolean;
  is_verified: boolean;
  email: string;
  timezone: string;
}

export interface token {
  token: string;
}
export interface settings {
  token: string;
  check_interval_hours: number;
  grace_period_hours: number;
  preferred_channel: string;
  checkin_time: string;
  legacy_enabled: boolean;
  auto_alert_enabled: boolean;
}

export interface contact {
  id: string;
  user_id: string;
  email: string;
  name: string;
  relation: string;
  phone: string;
  priority_order: string;
}

export type PreferredChannel = "email" | "sms";

export interface Settings {
  user_id: string;
  check_interval_hours: number;
  grace_period_hours: number;
  preferred_channel: PreferredChannel;
  checkin_time: string;
  legacy_enabled: boolean;
  auto_alert_enabled: boolean;
}

export interface UpdateSettingsData {
  check_interval_hours: number;
  grace_period_hours: number;
  preferred_channel: PreferredChannel;
  checkin_time: string;
  legacy_enabled: boolean;
  auto_alert_enabled: boolean;
}
