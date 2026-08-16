import { useDashboard } from "@/hooks/useDashboard.ts";
import { Link } from "react-router-dom";
import Loading from "@/components/Loading.tsx";
import ErrorCard from "@/components/ErrorCard.tsx";
import CheckinTimer from "@/components/dashboard/CheckinTimer.tsx";
import { toast } from "sonner";

export function Dashboard() {
  const { data: dashboard = [], isLoading, isError, error } = useDashboard();

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
  const contact = dashboard.emergency_contact;

  const initials = contact.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleSafe = async () => {
    toast.warning("Still under working", {
      position: "top-center",
    });
  };
  const handleHelp = async () => {
    toast.warning("Still under working", {
      position: "top-center",
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 flex flex-col gap-8">
        <CheckinTimer
          nextCheckin={dashboard.next_checkin}
          status={dashboard.status}
          onSafe={handleSafe}
          onNeedHelp={handleHelp}
        />
      </div>

      <div className="lg:col-span-5 flex flex-col gap-6">
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg">Emergency Contacts</h3>
            <Link
              to={"/contacts"}
              className="text-primary-600 text-sm font-bold hover:underline"
            >
              + Add New
            </Link>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center text-primary-600 font-bold">
              {initials}
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-slate-900">{contact.name}</p>
              <p className="text-xs text-slate-500 font-medium">
                {contact.email}
              </p>
            </div>
            <div className="text-right">
              <span className="inline-block px-2 py-1 bg-primary-100 text-primary-700 text-[10px] font-bold rounded-md uppercase">
                High Priority
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between px-2 pt-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-success-500 animate-pulse"></div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              System Secure
            </span>
          </div>
          <p className="text-[11px] text-slate-400">v1.2.4 Premium Edition</p>
        </div>
      </div>
    </div>
  );
}
