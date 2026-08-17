import { Link } from "react-router-dom";
import { HeartPulse, Menu } from "lucide-react";
import { Button } from "../ui/Button";
import { useAuth } from "@/store/auth.store.ts";
import { RiDashboardFill } from "react-icons/ri";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

export function Navbar() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <header className="fixed top-0 inset-x-0 bg-white/80 backdrop-blur-md border-b border-slate-100 z-50">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex  justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <HeartPulse className="h-7 w-7 text-primary-600" />
            <span className="font-semibold text-xl text-slate-900 tracking-tight">
              Wasaya
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
                <Button variant="secondary" className="hidden lg:inline-flex">
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
            <Button variant="ghost" size="icon" onClick={toggle}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
          {isOpen && (
            <div
              className={`md:hidden absolute bg-card top-15 backdrop-blur-md start-0 end-0 min-h-[13rem] py-8`}
            >
              <Button
                onClick={toggle}
                className={`bg-transparent text-primary absolute end-5 top-0`}
              >
                <IoClose className="size-[30px]" />
              </Button>
              <nav className={`flex flex-col items-center gap-2`}>
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
                {user === null ? (
                  <div className="md:hidden flex flex-col items-center gap-4">
                    <Link to="/login">
                      <Button
                        variant="secondary"
                        className="md:hidden inline-flex"
                      >
                        Log in
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button>Get Started</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="md:hidden flex items-center gap-4">
                    <Link to="/dashboard">
                      <Button className="md:hidden inline-flex font-semibold">
                        <RiDashboardFill />
                        Dashboard
                      </Button>
                    </Link>
                  </div>
                )}
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
