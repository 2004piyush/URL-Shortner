import { Outlet } from "react-router-dom";
import Header from "@/components/header";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <main className="container mx-auto px-4">
        <Header />
      <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;