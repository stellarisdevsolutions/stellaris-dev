import React from "react";
import { ProjectForm } from "@/components/admin/ProjectForm";

export const metadata = {
  title: "Nuevo Proyecto | Admin Stellaris",
};

export default function NewProjectPage() {
  return <ProjectForm isNew={true} />;
}
