import { pgTable, text, timestamp, integer, jsonb, serial } from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: jsonb("title").$type<{ es: string; en: string } | string>().notNull(),
  client: text("client").notNull(),
  year: text("year").notNull().default("2026"),
  category: text("category").notNull().default("web"),
  categoryLabel: jsonb("category_label").$type<{ es: string; en: string }>().notNull(),
  tagline: jsonb("tagline").$type<{ es: string; en: string }>().notNull(),
  overview: jsonb("overview").$type<{ es: string; en: string }>().notNull(),
  challenge: jsonb("challenge").$type<{ es: string; en: string }>().default({ es: "", en: "" }),
  solution: jsonb("solution").$type<{ es: string; en: string }>().default({ es: "", en: "" }),
  metrics: jsonb("metrics").$type<{ value: string; label: { es: string; en: string } }[]>().notNull(),
  features: jsonb("features").$type<{ es: string[]; en: string[] }>().notNull(),
  stack: jsonb("stack").$type<string[]>().notNull(),
  liveUrl: text("live_url").default("https://stellaris-dev.vercel.app"),
  liveUrlLabel: text("live_url_label").default("Demo en Vivo"),
  gallery: jsonb("gallery").$type<string[]>().default([]),
  testimonial: jsonb("testimonial").$type<{
    quote?: { en: string; es: string } | string;
    name?: string;
    role?: { en: string; es: string } | string;
  }>().default({}),
  bgPreview: text("bg_preview").default("bg-gradient-to-br from-neutral-900 to-[#171717]"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const marketplaceProducts = pgTable("marketplace_products", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: jsonb("title").$type<{ es: string; en: string } | string>().notNull(),
  image: text("image").default(""),
  gallery: jsonb("gallery").$type<string[]>().default([]),
  category: text("category").notNull().default("saas"),
  categoryLabel: jsonb("category_label").$type<{ es: string; en: string }>().notNull(),
  tag: jsonb("tag").$type<{ es: string; en: string }>().notNull(),
  price: text("price").notNull(),
  originalPrice: text("original_price"),
  rating: text("rating").notNull().default("4.9"),
  salesCount: integer("sales_count").default(0).notNull(),
  shortDesc: jsonb("short_desc").$type<{ es: string; en: string }>().notNull(),
  fullDesc: jsonb("full_desc").$type<{ es: string; en: string }>().notNull(),
  architecture: jsonb("architecture").$type<any>().notNull(),
  features: jsonb("features").$type<{ es: string[]; en: string[] }>().notNull(),
  includedFiles: jsonb("included_files").$type<{ es: string[]; en: string[] }>().notNull(),
  stack: jsonb("stack").$type<string[]>().notNull(),
  demoUrl: text("demo_url").default("https://stellaris-dev.vercel.app"),
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
