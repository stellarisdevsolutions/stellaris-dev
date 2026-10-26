import React from "react";
import { redirect } from "next/navigation";
import { verifyAdminSession } from "../actions";
import { isDatabaseConfigured } from "@/db";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";

export const metadata = {
  title: "Admin Panel | Kano Dev",
  description: "Panel de administración y control de Kano Dev",
  robots: {
    index: false,
    follow: false,
  },
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
    <div className="min-h-screen bg-[#0D0D0E] text-white flex font-sans selection:bg-[#E6FF2A]/30 selection:text-[#0C4651]">
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
