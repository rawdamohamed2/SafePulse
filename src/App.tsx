import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing } from "@/pages/Landing";
import { Login } from "@/pages/Login";
import { Register } from "@/pages/Register";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Dashboard } from "@/pages/Dashboard";
import { CheckIn } from "@/pages/CheckIn";
import { Contacts } from "@/pages/Contacts";
import { Schedule } from "@/pages/Schedule";
import { Settings } from "@/pages/Settings";
import { Toaster } from "sonner";
import VerifyEmail from "@/pages/VerifyEmail.tsx";
import ProtectedRoute from "@/pages/ProtectedRoute.tsx";
import PublicRoute from "@/pages/PublicRoute.tsx";
import HomeLayout from "@/components/layout/HomeLayout.tsx";

export default function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route element={<PublicRoute />}>
            <Route element={<HomeLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify-success" element={<VerifyEmail />} />
            </Route>
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/checkin" element={<CheckIn />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
