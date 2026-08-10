import { useEffect } from "react";
import { AlertCircle, LoaderCircle, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";

import { Button } from "@/components/ui/Button";
import { Switch } from "@/components/ui/Switch";
import { Input } from "@/components/ui/Input";

import {
  SettingsSchema,
  type UpdateSettingsData,
} from "@/schemas/settings.schema";

import { useSettings, useUpdateSettings } from "@/hooks/useSettings";

import { toast } from "sonner";
import ErrorCard from "@/components/ErrorCard.tsx";
import Loading from "@/components/Loading.tsx";

export function Schedule() {
  const { data: settings, isLoading, isError, error } = useSettings();

  const { mutateAsync: updateSettings, isPending } = useUpdateSettings();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<UpdateSettingsData>({
    resolver: zodResolver(SettingsSchema),

    defaultValues: {
      check_interval_hours: 24,
      grace_period_hours: 2,
      preferred_channel: "email",
      checkin_time: "09:00",
      legacy_enabled: false,
      auto_alert_enabled: true,
    },
  });

  useEffect(() => {
    if (!settings) return;

    reset({
      check_interval_hours: settings.check_interval_hours,
      grace_period_hours: settings.grace_period_hours,
      preferred_channel: settings.preferred_channel,
      checkin_time: settings.checkin_time,
      legacy_enabled: settings.legacy_enabled,
      auto_alert_enabled: settings.auto_alert_enabled,
    });
  }, [settings, reset]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <ErrorCard
        message={
          error ? error.message : "Something went wrong while loading the data."
        }
      />
    );
  }

  const autoAlertEnabled = watch("auto_alert_enabled");
  const legacyEnabled = watch("legacy_enabled");

  const onSubmit = async (data: UpdateSettingsData) => {
    try {
      await updateSettings(data);

      toast.success("Settings updated successfully");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update settings",
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Check-in Schedule</h1>

            <p className="text-slate-500">
              Configure when and how we check on you.
            </p>
          </div>

          <Button type="submit" disabled={isPending} className="gap-2">
            <Save className="h-4 w-4" />

            {isPending ? (
              <LoaderCircle size={30} className={`animate-spin`} />
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Frequency</CardTitle>

                <CardDescription>
                  How often should we send a check-in request?
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Check-in Interval
                  </label>

                  <div className="flex items-center gap-4">
                    <Input
                      type="number"
                      min={1}
                      {...register("check_interval_hours", {
                        valueAsNumber: true,
                      })}
                      className="w-28"
                    />

                    <span className="text-sm text-slate-500">
                      hours between check-ins
                    </span>
                  </div>

                  {errors.check_interval_hours && (
                    <p className="mt-1 text-sm text-destructive">
                      {errors.check_interval_hours.message}
                    </p>
                  )}
                </div>

                <div className="border-t border-slate-100 pt-4">
                  <label className="mb-2 block text-sm font-medium">
                    Check-in Time
                  </label>

                  <Input
                    type="time"
                    {...register("checkin_time")}
                    className="w-40"
                  />

                  {errors.checkin_time && (
                    <p className="mt-1 text-sm text-destructive">
                      {errors.checkin_time.message}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alert Settings</CardTitle>

                <CardDescription>
                  Configure how your emergency contacts are notified.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <div>
                    <p className="font-medium">Automatic Alerts</p>

                    <p className="text-sm text-slate-500">
                      Notify your emergency contacts if you miss a check-in.
                    </p>
                  </div>

                  <Switch
                    checked={autoAlertEnabled}
                    onCheckedChange={(value) =>
                      setValue("auto_alert_enabled", value, {
                        shouldDirty: true,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Preferred Channel
                  </label>

                  <select
                    {...register("preferred_channel")}
                    className="flex h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm"
                  >
                    <option value="email">Email</option>

                    <option value="sms">SMS</option>
                  </select>

                  {errors.preferred_channel && (
                    <p className="mt-1 text-sm text-destructive">
                      {errors.preferred_channel.message}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-warning-500" />
                  Escalation
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Grace Period
                  </label>

                  <p className="mb-3 text-sm text-slate-500">
                    How long to wait before alerting your contacts.
                  </p>

                  <select
                    {...register("grace_period_hours", {
                      setValueAs: (value) => Number(value),
                    })}
                    className="flex h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm"
                  >
                    <option value={1}>1 Hour</option>

                    <option value={2}>2 Hours</option>

                    <option value={3}>3 Hours</option>

                    <option value={4}>4 Hours</option>
                  </select>

                  {errors.grace_period_hours && (
                    <p className="mt-1 text-sm text-destructive">
                      {errors.grace_period_hours.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                  <div>
                    <p className="font-medium">Legacy Mode</p>

                    <p className="text-xs text-slate-500">
                      Enable legacy notification behavior.
                    </p>
                  </div>

                  <Switch
                    checked={legacyEnabled}
                    onCheckedChange={(value) =>
                      setValue("legacy_enabled", value, {
                        shouldDirty: true,
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-primary-50">
              <CardContent className="p-6">
                <h3 className="mb-4 font-semibold text-primary-900">Summary</h3>

                <ul className="space-y-3 text-sm text-primary-700">
                  <li className="flex justify-between">
                    <span>Check-in Time:</span>

                    <span className="font-medium">{watch("checkin_time")}</span>
                  </li>

                  <li className="flex justify-between">
                    <span>Interval:</span>

                    <span className="font-medium">
                      Every {watch("check_interval_hours")}h
                    </span>
                  </li>

                  <li className="flex justify-between">
                    <span>Grace Period:</span>

                    <span className="font-medium">
                      {watch("grace_period_hours")}h
                    </span>
                  </li>

                  <li className="flex justify-between">
                    <span>Channel:</span>

                    <span className="font-medium capitalize">
                      {watch("preferred_channel")}
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </form>
  );
}
