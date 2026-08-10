import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  LoaderCircle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCheckin } from "@/hooks/useCheckin.ts";
import { toast } from "sonner";

export function CheckIn() {
  const { isPending } = useCheckin();

  const checkin = async () => {
    // try {
    //   const response = await mutateAsync();
    //
    //   toast.success("You Check in successfully.", {
    //     position: "top-center",
    //   });
    //   console.log(response);
    // } catch (error) {
    //   if (axios.isAxiosError(error)) {
    //     toast.error(error.response?.data?.message ?? "Something went wrong", {
    //       position: "top-center",
    //     });
    //   } else {
    //     toast.error("Something went wrong", {
    //       position: "top-center",
    //     });
    //   }
    //}
    toast.warning("Still under working", {
      position: "top-center",
    });
  };
  const handleHelp = async () => {
    // try {
    //   const response = await mutateAsync();
    //
    //   toast.success("You Check in successfully.", {
    //     position: "top-center",
    //   });
    //   console.log(response);
    // } catch (error) {
    //   if (axios.isAxiosError(error)) {
    //     toast.error(error.response?.data?.message ?? "Something went wrong", {
    //       position: "top-center",
    //     });
    //   } else {
    //     toast.error("Something went wrong", {
    //       position: "top-center",
    //     });
    //   }
    //}
    toast.warning("Still under working", {
      position: "top-center",
    });
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 p-8 text-center relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary-50 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-warning-50 rounded-full blur-3xl opacity-50"></div>

          <div className="relative z-10">
            <div className="mx-auto w-24 h-24 bg-primary-50 rounded-full flex items-center justify-center mb-6 ring-8 ring-primary-50/50 animate-pulse">
              <ShieldAlert className="h-12 w-12 text-primary-600" />
            </div>

            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Are you safe?
            </h1>
            <p className="text-slate-500 mb-8 text-lg">
              Please confirm your status.
            </p>

            <div className="space-y-4">
              <Button
                size="lg"
                onClick={checkin}
                className="w-full h-16 text-lg rounded-2xl bg-success-500 hover:bg-success-600 shadow-lg shadow-success-500/20"
              >
                {isPending ? (
                  <LoaderCircle size={30} className={`animate-spin`} />
                ) : (
                  <>
                    <ShieldCheck size={30} />
                    I'm Safe
                  </>
                )}
              </Button>

              <Button
                size="lg"
                onClick={handleHelp}
                className="w-full h-16 bg-danger-600 hover:bg-danger-500 transition-all duration-200 text-lg rounded-2xl shadow-lg shadow-danger-500/20"
              >
                <AlertTriangle size={30} />
                Need Help Now
              </Button>
            </div>

            <p className="mt-8 text-sm text-slate-500">
              If the timer expires, we will automatically notify your emergency
              contacts with your last known location.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
