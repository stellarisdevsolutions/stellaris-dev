import React from "react";
import { redirect } from "next/navigation";
import { verifyAdminSession } from "../actions";
import { isDatabaseConfigured } from "@/db";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";

export const metadata = {
  title: "Admin Panel | Stellaris Dev",
  description: "Panel de administración y control de Stellaris Dev",
};

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#0D0D0E] text-white flex font-sans selection:bg-[#FF532A]/30 selection:text-white">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader isDbConnected={isDatabaseConfigured} />
        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
