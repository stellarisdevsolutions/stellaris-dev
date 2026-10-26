import React from "react";
import { isDatabaseConfigured } from "@/db";
import { DatabaseSettings } from "@/components/admin/DatabaseSettings";

export const metadata = {
  title: "Configuración de Base de Datos | Admin Kano Dev",
};

export default function AdminSettingsPage() {
  return <DatabaseSettings isConfigured={isDatabaseConfigured} />;
}
