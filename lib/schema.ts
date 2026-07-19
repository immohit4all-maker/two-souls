import { pgTable, text, timestamp, decimal, integer, jsonb, boolean, pgEnum } from "drizzle-orm/pg-core";

export const productStatusEnum = pgEnum("ProductStatus", ["DRAFT", "ACTIVE", "ARCHIVED"]);
export const orderStatusEnum = pgEnum("OrderStatus", ["PENDING", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"]);
export const sellerStatusEnum = pgEnum("SellerStatus", ["PENDING", "ACTIVE", "SUSPENDED"]);

export const sellers = pgTable("Seller", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  contactName: text("contactName").notNull(),
  email: text("email").unique().notNull(),
  phone: text("phone"),
  status: sellerStatusEnum("status").default("PENDING"),
  commissionRate: decimal("commissionRate", { precision: 5, scale: 2 }).default("15"),
  rating: decimal("rating", { precision: 2, scale: 1 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const products = pgTable("Product", {
  id: text("id").primaryKey(),
  sku: text("sku").unique().notNull(),
  name: text("name").notNull(),
  description: text("description"),
  category: text("category").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  compareAt: decimal("compareAt", { precision: 10, scale: 2 }),
  inventory: integer("inventory").default(0).notNull(),
  imageKey: text("imageKey"),
  status: productStatusEnum("status").default("DRAFT"),
  sellerId: text("sellerId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const customers = pgTable("Customer", {
  id: text("id").primaryKey(),
  email: text("email").unique().notNull(),
  name: text("name"),
  phone: text("phone"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const orders = pgTable("Order", {
  id: text("id").primaryKey(),
  orderNumber: text("orderNumber").unique().notNull(),
  customerId: text("customerId").notNull(),
  status: orderStatusEnum("status").default("PENDING"),
  subtotal: decimal("subtotal", { precision: 10, scale: 2 }).notNull(),
  shippingAmount: decimal("shippingAmount", { precision: 10, scale: 2 }).default("0"),
  total: decimal("total", { precision: 10, scale: 2 }).notNull(),
  shippingAddress: jsonb("shippingAddress"),
  trackingNumber: text("trackingNumber"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const orderItems = pgTable("OrderItem", {
  id: text("id").primaryKey(),
  orderId: text("orderId").notNull(),
  productId: text("productId"),
  name: text("name").notNull(),
  sku: text("sku").notNull(),
  unitPrice: decimal("unitPrice", { precision: 10, scale: 2 }).notNull(),
  quantity: integer("quantity").notNull(),
});
