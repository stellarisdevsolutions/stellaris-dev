import React from "react";
import { getAllContactMessages } from "@/db/service";
import { LeadsManager } from "@/components/admin/LeadsManager";

export const metadata = {
  title: "Bandeja de Leads | Admin Kano Dev",
};

export default async function AdminLeadsPage() {
  const messages = await getAllContactMessages();

  return <LeadsManager initialMessages={messages} />;
}
