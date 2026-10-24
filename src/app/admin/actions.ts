"use server";

import { cookies } from "next/headers";
import {
  getAllProjects,
  getProjectBySlug,
  saveProject,
  deleteProjectById,
  getAllMarketplaceProducts,
  getMarketplaceProductBySlug,
  saveMarketplaceProduct,
  deleteMarketplaceProductById,
  getAllContactMessages,
  updateContactMessageStatus,
  createContactMessage,
  seedDatabase,
  findAdminUserByEmail,
} from "@/db/service";
import { ProjectItem } from "@/data/projects";
import { MarketplaceProduct } from "@/data/marketplace";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

const ADMIN_SECRET = process.env.ADMIN_PASSWORD || "stellaris2026";
const COOKIE_NAME = "stellaris_admin_session";

// ================= AUTH =================
export async function verifyAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME);
  return Boolean(session?.value && session.value.length > 0);
}

export async function loginAdmin(
  identifier: string,
  password?: string
): Promise<{ success: boolean; error?: string }> {
  const emailInput = identifier.trim().toLowerCase();
  const passInput = password ? password.trim() : identifier.trim();

  // 1. Try database admin user with bcrypt
  if (emailInput.includes("@")) {
    try {
      const user = await findAdminUserByEmail(emailInput);
      if (user) {
        const matches = await bcrypt.compare(passInput, user.passwordHash);
        if (matches) {
          const cookieStore = await cookies();
          cookieStore.set(COOKIE_NAME, `user:${user.email}:${user.role}`, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: "/",
            sameSite: "lax",
          });
          return { success: true };
        }
      }
    } catch (err) {
      console.warn("DB user check fallback to master:", err);
    }
  }

  // 2. Master Secret fallback
  if (passInput === ADMIN_SECRET || identifier.trim() === ADMIN_SECRET) {
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, "master:admin", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      sameSite: "lax",
    });
    return { success: true };
  }

  return { success: false, error: "Credenciales inválidas. Verifica tu correo y contraseña." };
}

export async function logoutAdmin(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

// ================= PROJECTS =================
export async function getProjectsAction(): Promise<ProjectItem[]> {
  return await getAllProjects();
}

export async function saveProjectAction(project: ProjectItem) {
  const isAuth = await verifyAdminSession();
  if (!isAuth) throw new Error("No autorizado");

  const result = await saveProject(project);
  revalidatePath("/projects");
  revalidatePath(`/projects/${project.slug}`);
  revalidatePath("/admin/projects");
  revalidatePath("/");
  return result;
}

export async function deleteProjectAction(id: string) {
  const isAuth = await verifyAdminSession();
  if (!isAuth) throw new Error("No autorizado");

  // Fetch project first to discover its physical images in Vercel Blob
  const all = await getAllProjects();
  const target = all.find((p) => p.id === id);

  const success = await deleteProjectById(id);

  if (success && target) {
    const candidateUrls = [target.bgPreview, ...(target.gallery || [])];
    const blobsToDelete = candidateUrls.filter(
      (url): url is string =>
        typeof url === "string" &&
        url.startsWith("https://") &&
        url.includes(".blob.vercel-storage.com")
    );
    if (blobsToDelete.length > 0) {
      try {
        const { del } = await import("@vercel/blob");
        await del(blobsToDelete);
      } catch (err) {
        console.warn("Error deleting project blobs from Vercel:", err);
      }
    }
  }

  revalidatePath("/projects");
  revalidatePath("/admin/projects");
  revalidatePath("/");
  return success;
}

// ================= MARKETPLACE =================
export async function getMarketplaceProductsAction(): Promise<MarketplaceProduct[]> {
  return await getAllMarketplaceProducts();
}

export async function saveMarketplaceProductAction(product: MarketplaceProduct) {
  const isAuth = await verifyAdminSession();
  if (!isAuth) throw new Error("No autorizado");

  const result = await saveMarketplaceProduct(product);
  revalidatePath("/marketplace");
  revalidatePath(`/marketplace/${product.slug}`);
  revalidatePath("/admin/marketplace");
  revalidatePath("/");
  return result;
}

export async function deleteMarketplaceProductAction(id: string) {
  const isAuth = await verifyAdminSession();
  if (!isAuth) throw new Error("No autorizado");

  // Fetch product first to discover its physical images in Vercel Blob
  const all = await getAllMarketplaceProducts();
  const target = all.find((p) => p.id === id);

  const success = await deleteMarketplaceProductById(id);

  if (success && target) {
    const candidateUrls = [target.image, ...(target.gallery || [])];
    const blobsToDelete = candidateUrls.filter(
      (url): url is string =>
        typeof url === "string" &&
        url.startsWith("https://") &&
        url.includes(".blob.vercel-storage.com")
    );
    if (blobsToDelete.length > 0) {
      try {
        const { del } = await import("@vercel/blob");
        await del(blobsToDelete);
      } catch (err) {
        console.warn("Error deleting marketplace blobs from Vercel:", err);
      }
    }
  }

  revalidatePath("/marketplace");
  revalidatePath("/admin/marketplace");
  revalidatePath("/");
  return success;
}

// ================= LEADS & MESSAGES =================
export async function getContactMessagesAction() {
  const isAuth = await verifyAdminSession();
  if (!isAuth) throw new Error("No autorizado");
  return await getAllContactMessages();
}

export async function updateMessageStatusAction(id: number, status: string) {
  const isAuth = await verifyAdminSession();
  if (!isAuth) throw new Error("No autorizado");
  const success = await updateContactMessageStatus(id, status);
  revalidatePath("/admin/leads");
  return success;
}

export async function submitContactFormAction(data: {
  name: string;
  email: string;
  projectType: string;
  details: string;
}) {
  const result = await createContactMessage(data);
  revalidatePath("/admin/leads");
  return result;
}

// ================= SEED =================
export async function seedDatabaseAction() {
  const isAuth = await verifyAdminSession();
  if (!isAuth) throw new Error("No autorizado");
  return await seedDatabase();
}

// ================= VERCEL BLOB STORAGE CLEANUP =================
export async function deleteBlobsAction(urls: string[]) {
  const isAuth = await verifyAdminSession();
  if (!isAuth) throw new Error("No autorizado");

  if (!Array.isArray(urls) || urls.length === 0) {
    return { success: true, count: 0 };
  }

  // Security check: Only delete URLs belonging to our Vercel Blob storage
  const validBlobUrls = urls.filter((url) => {
    return (
      typeof url === "string" &&
      url.startsWith("https://") &&
      url.includes(".blob.vercel-storage.com")
    );
  });

  if (validBlobUrls.length === 0) return { success: true, count: 0 };

  try {
    const { del } = await import("@vercel/blob");
    await del(validBlobUrls);
    return { success: true, count: validBlobUrls.length };
  } catch (err: any) {
    console.error("Error deleting blobs from Vercel Blob:", err);
    return { success: false, error: err?.message };
  }
}
