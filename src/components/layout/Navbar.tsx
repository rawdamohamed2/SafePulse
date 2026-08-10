import { Link } from "react-router-dom";
import { HeartPulse, Menu } from "lucide-react";
import { Button } from "../ui/Button";
import { useAuth } from "@/store/auth.store.ts";
import { RiDashboardFill } from "react-icons/ri";

export function Navbar() {
  const { user } = useAuth();

  return (
    <header className="fixed top-0 inset-x-0 bg-white/80 backdrop-blur-md border-b border-slate-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <HeartPulse className="h-7 w-7 text-primary-600" />
            <span className="font-semibold text-xl text-slate-900 tracking-tight">
              SafePulse
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              Features
            </Link>
            <Link
              to="/"
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              How it Works
            </Link>
            <Link
              to="/"
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              Testimonials
            </Link>
          </nav>
          {!user ? (
            <div className="hidden md:flex items-center gap-4">
              <Link to="/login">
                <Button variant="ghost" className="hidden lg:inline-flex">
                  Log in
                </Button>
              </Link>
              <Link to="/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-4">
              <Link to="/dashboard">
                <Button className="hidden lg:inline-flex font-semibold">
                  <RiDashboardFill />
                  Dashboard
                </Button>
              </Link>
            </div>
          )}
          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
