import { PrismaClient } from "@prisma/client";
import "dotenv/config";

console.log("DATABASE_URL:", process.env.DATABASE_URL);

// Instantiate with empty options
const prisma = new PrismaClient({});

async function main() {
  try {
    console.log("Attempting to connect to database...");
    await prisma.$connect();
    console.log("Successfully connected to the database!");
    
    const count = await prisma.product.count();
    console.log(`Successfully queried products. Count: ${count}`);
    
    await prisma.$disconnect();
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
}

main();
