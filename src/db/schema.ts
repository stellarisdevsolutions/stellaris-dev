import { pgTable, text, timestamp, integer, jsonb, serial } from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  client: text("client").notNull(),
  year: text("year").notNull().default("2026"),
  category: text("category").notNull().default("web"),
  categoryLabel: jsonb("category_label").$type<{ es: string; en: string }>().notNull(),
  tagline: jsonb("tagline").$type<{ es: string; en: string }>().notNull(),
  overview: jsonb("overview").$type<{ es: string; en: string }>().notNull(),
  challenge: jsonb("challenge").$type<{ es: string; en: string }>().notNull(),
  solution: jsonb("solution").$type<{ es: string; en: string }>().notNull(),
  metrics: jsonb("metrics").$type<{ value: string; label: { es: string; en: string } }[]>().notNull(),
  features: jsonb("features").$type<{ es: string[]; en: string[] }>().notNull(),
  stack: jsonb("stack").$type<string[]>().notNull(),
  liveUrl: text("live_url").default("https://stellaris-dev.vercel.app"),
  accent: text("accent").default("#FF532A"),
  bgPreview: text("bg_preview").default("bg-gradient-to-br from-neutral-900 to-[#171717]"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const marketplaceProducts = pgTable("marketplace_products", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  category: text("category").notNull().default("saas"),
  categoryLabel: jsonb("category_label").$type<{ es: string; en: string }>().notNull(),
  tag: jsonb("tag").$type<{ es: string; en: string }>().notNull(),
  price: text("price").notNull(),
  originalPrice: text("original_price"),
  rating: text("rating").notNull().default("4.9"),
  salesCount: integer("sales_count").default(0).notNull(),
  shortDesc: jsonb("short_desc").$type<{ es: string; en: string }>().notNull(),
  fullDesc: jsonb("full_desc").$type<{ es: string; en: string }>().notNull(),
  architecture: jsonb("architecture").$type<{
    frontend: string;
    backend: string;
    database: string;
    styling: string;
    auth: string;
    deployment: string;
  }>().notNull(),
  features: jsonb("features").$type<{ es: string[]; en: string[] }>().notNull(),
  includedFiles: jsonb("included_files").$type<{ es: string[]; en: string[] }>().notNull(),
  stack: jsonb("stack").$type<string[]>().notNull(),
  demoUrl: text("demo_url").default("https://stellaris-dev.vercel.app"),
  accent: text("accent").default("#FF532A"),
  faqs: jsonb("faqs").$type<{ q: { es: string; en: string }; a: { es: string; en: string } }[]>().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  projectType: text("project_type").default("Custom Web"),
  details: text("details").notNull(),
  status: text("status").notNull().default("unread"), // unread, contacted, archived
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull().default("Admin"),
  passwordHash: text("password_hash").notNull(),
  role: text("role").notNull().default("admin"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type ProjectRecord = typeof projects.$inferSelect;
export type NewProjectRecord = typeof projects.$inferInsert;

export type MarketplaceProductRecord = typeof marketplaceProducts.$inferSelect;
export type NewMarketplaceProductRecord = typeof marketplaceProducts.$inferInsert;

export type ContactMessageRecord = typeof contactMessages.$inferSelect;
export type AdminUserRecord = typeof adminUsers.$inferSelect;
export type NewAdminUserRecord = typeof adminUsers.$inferInsert;
