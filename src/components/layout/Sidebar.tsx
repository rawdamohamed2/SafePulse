import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  HeartPulse,
  LayoutDashboard,
  User,
  ShieldCheck,
  History,
  Settings,
  LogOut,
  LoaderCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/store/auth.store.ts";
import { useLogout } from "@/hooks/useLogout.ts";
import { toast } from "sonner";
import axios from "axios";
import { Button } from "@/components/ui/Button.tsx";

interface SidebarProps {
  className?: string;
  onNavigate?: () => void;
}

export function Sidebar({ className, onNavigate }: SidebarProps) {
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useLogout();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Check-in", href: "/checkin", icon: ShieldCheck },
    { name: "Contacts", href: "/contacts", icon: User },
    { name: "Schedule", href: "/schedule", icon: History },
  ];

  const onLogout = async () => {
    try {
      await mutateAsync();
      toast.success("You logged out successfully.", { position: "top-center" });
      logout();
      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? "Something went wrong", {
          position: "top-center",
        });
      } else {
        toast.error("Something went wrong", { position: "top-center" });
      }
    }
  };

  return (
    <div
      className={cn(
        "flex-col w-64 bg-white border-r border-slate-200 h-screen sticky top-0",
        className,
      )}
    >
      <div className="p-6 mb-4">
        <Link to="/" className="flex items-center gap-2" onClick={onNavigate}>
          <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
            <HeartPulse className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">
            Wasaya
          </span>
        </Link>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto">
        <nav className="flex-1 px-4 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={onNavigate}
                className={cn(
                  "group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-colors",
                  isActive
                    ? "bg-primary-50 text-primary-700"
                    : "text-slate-500 hover:bg-slate-50",
                )}
              >
                <item.icon
                  className={cn(
                    "mr-3 h-5 w-5 flex-shrink-0",
                    isActive
                      ? "text-primary-700"
                      : "text-slate-400 group-hover:text-slate-500",
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto border-t border-slate-200">
          <Link
            to="/settings"
            onClick={onNavigate}
            className={cn(
              "group flex items-center justify-center px-3 py-2.5 text-sm font-medium rounded-xl transition-colors",
              location.pathname === "/settings"
                ? "bg-secondary text-primary-700"
                : "text-background bg-primary hover:bg-primary",
            )}
          >
            <Settings
              className={cn(
                "mr-3 h-5 w-5 flex-shrink-0",
                location.pathname === "/settings"
                  ? "text-primary-700"
                  : "text-background",
              )}
            />
            Settings
          </Link>

          <Button
            onClick={onLogout}
            className="group flex items-center justify-center px-3 py-5 bg-sidebar-foreground w-full text-sm font-medium rounded-xl transition-colors text-background hover:bg-sidebar-foreground/90 mt-1"
          >
            {isPending ? (
              <LoaderCircle size={30} className="animate-spin" />
            ) : (
              <LogOut className="mr-3 h-5 w-5 flex-shrink-0 text-background" />
            )}
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
