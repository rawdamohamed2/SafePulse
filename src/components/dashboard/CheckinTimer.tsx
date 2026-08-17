import { useEffect, useState } from "react";
import { Check, CircleHelp } from "lucide-react";
import { Button } from "@/components/ui/Button.tsx";

interface CheckinTimerProps {
  checkinTime: string;
  intervalHours: number;
  status: string;
  onSafe?: () => void;
  onNeedHelp?: () => void;
}

const getNextCheckin = (checkinTime: string, intervalHours: number) => {
  const now = new Date();
  const [hours, minutes] = checkinTime.split(":").map(Number);

  const anchor = new Date(now);
  anchor.setHours(hours, minutes, 0, 0);

  while (anchor <= now) {
    anchor.setHours(anchor.getHours() + intervalHours);
  }

  return anchor;
};

const getRemainingTime = (checkinTime: string, intervalHours: number) => {
  const now = new Date();
  const target = getNextCheckin(checkinTime, intervalHours);
  return target.getTime() - now.getTime();
};

const formatTime = (milliseconds: number) => {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0",
  )}:${String(seconds).padStart(2, "0")}`;
};

const CheckinTimer = ({
  checkinTime,
  intervalHours,
  status,
  onSafe,
  onNeedHelp,
}: CheckinTimerProps) => {
  const [remaining, setRemaining] = useState(() =>
    getRemainingTime(checkinTime, intervalHours),
  );

  useEffect(() => {
    const updateTimer = () => {
      setRemaining(getRemainingTime(checkinTime, intervalHours));
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [checkinTime, intervalHours]);

  const isActive = status.toLowerCase() === "active";
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative mb-9">
        <div className="relative flex h-80 w-80 items-center justify-center rounded-full border-8 border-slate-50">
          <svg
            className="absolute inset-0 h-full w-full -rotate-90"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              className="text-primary-100"
              stroke="currentColor"
              strokeWidth="8"
            />

            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              className="text-primary"
              stroke="currentColor"
              strokeWidth="8"
              strokeDasharray="283"
              strokeDashoffset="70"
              strokeLinecap="round"
            />
          </svg>

          <div className="z-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
              Remaining
            </p>

            <h2 className="font-mono text-5xl font-black tabular-nums text-slate-900">
              {formatTime(remaining)}
            </h2>

            <p className="mt-1 text-sm font-medium text-slate-400">
              Until Check-in
            </p>
          </div>
        </div>

        <div
          className={`absolute -bottom-8 left-1/2 -translate-x-1/2 rounded-full px-4 py-1.5 text-xs font-bold uppercase shadow-lg ${
            isActive ? "bg-success-500 text-white" : "bg-slate-400 text-white"
          }`}
        >
          {status}
        </div>
      </div>

      <h3 className="mb-2 text-xl font-bold">Ready for your check-in?</h3>

      <p className="mb-8 max-w-sm text-slate-500">
        If you don't confirm safety before the timer ends, we'll notify your
        emergency contacts automatically.
      </p>

      <div className="flex w-full max-w-sm gap-4">
        <Button
          type="button"
          onClick={onSafe}
          className="h-14 flex-1 rounded-2xl bg-success-500 font-bold text-white shadow-lg shadow-success-500/20 hover:bg-success-600"
        >
          <Check className="mr-2 h-5 w-5" strokeWidth={3} />
          I'm Safe
        </Button>

        <Button
          type="button"
          onClick={onNeedHelp}
          className="h-14 flex-1 rounded-2xl bg-slate-900 font-bold text-white hover:bg-slate-800"
        >
          <CircleHelp className="mr-2 h-5 w-5" />
          Need Help
        </Button>
      </div>
    </div>
  );
};
export default CheckinTimer;
