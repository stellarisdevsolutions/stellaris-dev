import { db, isDatabaseConfigured, projects, marketplaceProducts, contactMessages, adminUsers, AdminUserRecord } from "./index";
import { eq, desc } from "drizzle-orm";
import { PROJECTS, ProjectItem } from "@/data/projects";
import { MARKETPLACE_PRODUCTS, MarketplaceProduct } from "@/data/marketplace";
import bcrypt from "bcryptjs";

// Local in-memory store for dev when DB is not yet connected
let localProjects: ProjectItem[] = [...PROJECTS];
let localMarketplace: MarketplaceProduct[] = [...MARKETPLACE_PRODUCTS];
let localMessages: Array<{
  id: number;
  name: string;
  email: string;
  projectType: string;
  details: string;
  status: string;
  createdAt: Date;
}> = [
  {
    id: 1,
    name: "Carlos Rivera",
    email: "carlos@fintechlatam.com",
    projectType: "Web App SaaS",
    details: "Necesitamos desarrollar un dashboard para analítica financiera con Next.js y pasarela Stripe.",
    status: "unread",
    createdAt: new Date(Date.now() - 3600000 * 4),
  },
  {
    id: 2,
    name: "Elena Morales",
    email: "elena@boutiquemoda.mx",
    projectType: "E-Commerce",
    details: "Queremos migrar nuestra tienda online a una solución personalizada de alta velocidad.",
    status: "contacted",
    createdAt: new Date(Date.now() - 86400000 * 2),
  },
];

// ==========================================
// PROJECTS
// ==========================================
export async function getAllProjects(): Promise<ProjectItem[]> {
  if (isDatabaseConfigured && db) {
    try {
      const rows = await db.select().from(projects).orderBy(desc(projects.createdAt));
      if (rows.length > 0) {
        return rows as unknown as ProjectItem[];
      }
    } catch (err) {
      console.warn("Falling back to local projects data:", err);
    }
  }
  return localProjects;
}

export async function getProjectBySlug(slug: string): Promise<ProjectItem | null> {
  if (isDatabaseConfigured && db) {
    try {
      const rows = await db.select().from(projects).where(eq(projects.slug, slug)).limit(1);
      if (rows.length > 0) {
        return rows[0] as unknown as ProjectItem;
      }
    } catch (err) {
      console.warn("Falling back to local projects data for slug:", err);
    }
  }
  return localProjects.find((p) => p.slug === slug) || null;
}

export async function saveProject(projectData: ProjectItem): Promise<ProjectItem> {
  if (isDatabaseConfigured && db) {
    try {
      await db
        .insert(projects)
        .values({
          ...projectData,
          updatedAt: new Date(),
        } as any)
        .onConflictDoUpdate({
          target: projects.id,
          set: {
            ...projectData,
            updatedAt: new Date(),
          } as any,
        });
      return projectData;
    } catch (err) {
      console.error("Error saving project to DB:", err);
    }
  }

  // Fallback in-memory
  const index = localProjects.findIndex((p) => p.id === projectData.id || p.slug === projectData.slug);
  if (index >= 0) {
    localProjects[index] = projectData;
  } else {
    localProjects.unshift(projectData);
  }
  return projectData;
}

export async function deleteProjectById(id: string): Promise<boolean> {
  if (isDatabaseConfigured && db) {
    try {
      await db.delete(projects).where(eq(projects.id, id));
    } catch (err) {
      console.error("Error deleting project from DB:", err);
    }
  }
  localProjects = localProjects.filter((p) => p.id !== id);
  return true;
}

// ==========================================
// MARKETPLACE
// ==========================================
export async function getAllMarketplaceProducts(): Promise<MarketplaceProduct[]> {
  if (isDatabaseConfigured && db) {
    try {
      const rows = await db.select().from(marketplaceProducts).orderBy(desc(marketplaceProducts.createdAt));
      if (rows.length > 0) {
        return rows as unknown as MarketplaceProduct[];
      }
    } catch (err) {
      console.warn("Falling back to local marketplace data:", err);
    }
  }
  return localMarketplace;
}

export async function getMarketplaceProductBySlug(slug: string): Promise<MarketplaceProduct | null> {
  if (isDatabaseConfigured && db) {
    try {
      const rows = await db.select().from(marketplaceProducts).where(eq(marketplaceProducts.slug, slug)).limit(1);
      if (rows.length > 0) {
        return rows[0] as unknown as MarketplaceProduct;
      }
    } catch (err) {
      console.warn("Falling back to local marketplace data for slug:", err);
    }
  }
  return localMarketplace.find((p) => p.slug === slug) || null;
}

export async function saveMarketplaceProduct(productData: MarketplaceProduct): Promise<MarketplaceProduct> {
  if (isDatabaseConfigured && db) {
    try {
      await db
        .insert(marketplaceProducts)
        .values({
          ...productData,
          updatedAt: new Date(),
        } as any)
        .onConflictDoUpdate({
          target: marketplaceProducts.id,
          set: {
            ...productData,
            updatedAt: new Date(),
          } as any,
        });
      return productData;
    } catch (err) {
      console.error("Error saving marketplace product to DB:", err);
    }
  }

  const index = localMarketplace.findIndex((p) => p.id === productData.id || p.slug === productData.slug);
  if (index >= 0) {
    localMarketplace[index] = productData;
  } else {
    localMarketplace.unshift(productData);
  }
  return productData;
}

export async function deleteMarketplaceProductById(id: string): Promise<boolean> {
  if (isDatabaseConfigured && db) {
    try {
      await db.delete(marketplaceProducts).where(eq(marketplaceProducts.id, id));
    } catch (err) {
      console.error("Error deleting product from DB:", err);
    }
  }
  localMarketplace = localMarketplace.filter((p) => p.id !== id);
  return true;
}

// ==========================================
// CONTACT MESSAGES / LEADS
// ==========================================
export async function getAllContactMessages() {
  if (isDatabaseConfigured && db) {
    try {
      const rows = await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
      return rows;
    } catch (err) {
      console.warn("Falling back to local messages:", err);
    }
  }
  return localMessages;
}

export async function createContactMessage(data: {
  name: string;
  email: string;
  projectType: string;
  details: string;
}) {
  if (isDatabaseConfigured && db) {
    try {
      const res = await db.insert(contactMessages).values(data).returning();
      return res[0];
    } catch (err) {
      console.error("Error saving contact message to DB:", err);
    }
  }
  const newMsg = {
    id: Date.now(),
    ...data,
    status: "unread",
    createdAt: new Date(),
  };
  localMessages.unshift(newMsg);
  return newMsg;
}

export async function updateContactMessageStatus(id: number, status: string) {
  if (isDatabaseConfigured && db) {
    try {
      await db.update(contactMessages).set({ status }).where(eq(contactMessages.id, id));
      return true;
    } catch (err) {
      console.error("Error updating message status:", err);
    }
  }
  const msg = localMessages.find((m) => m.id === id);
  if (msg) {
    msg.status = status;
    return true;
  }
  return false;
}

// ==========================================
// ADMIN USERS (BCRYPT ENCRYPTION)
// ==========================================
export async function findAdminUserByEmail(email: string): Promise<AdminUserRecord | null> {
  if (isDatabaseConfigured && db) {
    try {
      const rows = await db
        .select()
        .from(adminUsers)
        .where(eq(adminUsers.email, email.toLowerCase().trim()))
        .limit(1);
      return rows[0] || null;
    } catch (err) {
      console.error("Error finding admin user by email:", err);
    }
  }
  return null;
}

export async function createAdminUser(name: string, email: string, plainPassword: string, role = "admin") {
  const hash = await bcrypt.hash(plainPassword, 10);
  if (isDatabaseConfigured && db) {
    try {
      const inserted = await db
        .insert(adminUsers)
        .values({
          name,
          email: email.toLowerCase().trim(),
          passwordHash: hash,
          role,
          updatedAt: new Date(),
        })
        .returning();
      return inserted[0];
    } catch (err) {
      console.error("Error creating admin user:", err);
      throw err;
    }
  }
  return null;
}

// ==========================================
// SEED DATABASE UTILITY
// ==========================================
export async function seedDatabase() {
  if (!isDatabaseConfigured || !db) {
    return { success: false, message: "Database is not connected (POSTGRES_URL missing)." };
  }

  try {
    for (const project of PROJECTS) {
      await db
        .insert(projects)
        .values({
          ...project,
          createdAt: new Date(),
          updatedAt: new Date(),
        } as any)
        .onConflictDoNothing();
    }

    for (const product of MARKETPLACE_PRODUCTS) {
      await db
        .insert(marketplaceProducts)
        .values({
          ...product,
          createdAt: new Date(),
          updatedAt: new Date(),
        } as any)
        .onConflictDoNothing();
    }

    // Seed default admin user with bcrypt hashed password
    const defaultAdminEmail = "admin@stellaris.dev";
    const existing = await findAdminUserByEmail(defaultAdminEmail);
    if (!existing) {
      const passwordHash = await bcrypt.hash("stellaris2026", 10);
      await db
        .insert(adminUsers)
        .values({
          name: "Stellaris Master",
          email: defaultAdminEmail,
          passwordHash,
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .onConflictDoNothing();
    }

    return { success: true, message: "Base de datos y usuario administrador creados exitosamente!" };
  } catch (err: any) {
    console.error("Seeding error:", err);
    return { success: false, message: err?.message || "Error seeding database." };
  }
}
