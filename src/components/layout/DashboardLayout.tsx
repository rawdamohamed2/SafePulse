import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { HeartPulse, Menu, X } from "lucide-react";

import { Button } from "../ui/Button";
import { useAuth } from "@/store/auth.store.ts";

export function DashboardLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { user } = useAuth();

  const initials = user.full_name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div className="min-h-dvh bg-slate-50 flex">
      <Sidebar />

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl flex flex-col">
            <div className="flex items-center justify-between h-16 px-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <HeartPulse className="h-6 w-6 text-primary-600" />
                <span className="font-semibold text-lg text-slate-900 tracking-tight">
                  SafePulse
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div
              className="flex-1 overflow-y-auto"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="p-4 flex flex-col h-full">
                <p className="text-sm text-slate-500 mb-4">
                  Navigation is available on desktop for this demo, or rotate
                  device.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-slate-200 h-20 flex items-center justify-between px-4 sm:px-6 lg:px-8 shrink-0 sticky top-0 z-10 md:hidden">
          <div className="flex items-center gap-2">
            <HeartPulse className="h-6 w-6 text-primary-600" />
            <span className="font-semibold text-lg text-slate-900 tracking-tight">
              SafePulse
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </header>

        <header className="hidden md:flex bg-white border-b border-slate-200 h-20 items-center justify-between px-4 sm:px-6 lg:px-8 shrink-0 sticky top-0 z-10">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Good morning, {user.full_name}
            </h1>
            <p className="text-sm text-slate-500">
              Next check-in scheduled for 2:00 PM today
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 ml-2 border-l pl-6 border-slate-200">
              <div className="text-right hidden lg:block">
                <p className="text-sm font-semibold text-slate-900"></p>
                <p className="text-xs text-slate-500 font-medium">
                  Premium Account
                </p>
              </div>
              <Link
                to={"/settings"}
                className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center text-slate-500 font-bold"
              >
                {initials}
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-slate-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
