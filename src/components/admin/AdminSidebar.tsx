"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderGit2,
  ShoppingBag,
  Inbox,
  Database,
  ExternalLink,
  LogOut,
  Sparkles,
} from "lucide-react";
import { logoutAdmin } from "@/app/admin/actions";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Proyectos", href: "/admin/projects", icon: FolderGit2 },
  { label: "Marketplace", href: "/admin/marketplace", icon: ShoppingBag },
  { label: "Mensajes / Leads", href: "/admin/leads", icon: Inbox },
  { label: "Base de Datos", href: "/admin/settings", icon: Database },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await logoutAdmin();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside className="w-64 bg-[#141416] border-r border-white/10 flex flex-col justify-between shrink-0 min-h-screen">
      {/* Top logo & navigation */}
      <div>
        {/* Brand */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-white/10">
          <Link href="/admin" className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-[#FF532A] flex items-center justify-center font-bold text-white text-sm shadow-md shadow-[#FF532A]/20">
              S
            </span>
            <span className="font-bold text-sm tracking-tight text-white">
              STELLARIS <span className="text-[#FF532A] text-xs font-mono ml-1 px-1.5 py-0.5 rounded bg-[#FF532A]/10 border border-[#FF532A]/20">ADMIN</span>
            </span>
          </Link>
        </div>

        {/* Links list */}
        <nav className="p-4 space-y-1">
          <div className="px-3 py-2 text-[11px] font-semibold tracking-wider text-neutral-400 uppercase">
            Gestión
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? "bg-[#FF532A] text-white shadow-md shadow-[#FF532A]/20 font-semibold"
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-neutral-400"}`} />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-white/10 font-mono">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom actions */}
      <div className="p-4 border-t border-white/10 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs text-neutral-300 hover:text-white hover:bg-white/5 transition-all group"
        >
          <span className="flex items-center gap-2.5">
            <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-white" />
            Ver sitio público
          </span>
          <span className="text-[10px] text-neutral-500">↗</span>
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Cerrar Sesión</span>
        </button>

        {/* Small badge */}
        <div className="pt-2 text-[10px] text-neutral-400 text-center flex items-center justify-center gap-1 font-mono">
          <Sparkles className="w-3 h-3 text-[#FF532A]" />
          Vercel + Next.js 16
        </div>
      </div>
    </aside>
  );
}
