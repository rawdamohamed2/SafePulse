import { Navbar } from "@/components/layout/Navbar.tsx";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div className="min-h-dvh bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
export default HomeLayout;
