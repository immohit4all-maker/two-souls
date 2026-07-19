import { loadEnvConfig } from "@next/env";
import { db } from "./lib/db";
import { products } from "./lib/schema";
import { count } from "drizzle-orm";

// Load .env / .env.local the same way Next.js does
loadEnvConfig(process.cwd());

console.log("DATABASE_URL:", process.env.DATABASE_URL);

async function main() {
  try {
    console.log("Attempting to connect to database...");
    
    const result = await db.select({ count: count() }).from(products);
    console.log(`Successfully queried products. Count: ${result[0].count}`);
    
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
}

main();
