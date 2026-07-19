import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { products, sellers } from "@/lib/schema";
import { eq } from "drizzle-orm";

// TODO: Implement actual Cognito authorization check
const isAdmin = async (request: Request) => {
  return true; 
};

export async function GET() {
  try {
    const productList = await db.select().from(products).leftJoin(sellers, eq(products.sellerId, sellers.id)).orderBy(products.createdAt);
    return NextResponse.json(productList);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await isAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const [product] = await db.insert(products).values({
        id: crypto.randomUUID(), // Assuming UUID, but original used cuid()
        name: body.name,
        sku: body.sku,
        description: body.description,
        category: body.category,
        price: body.price,
        inventory: body.inventory,
        sellerId: body.sellerId,
        status: body.status || "DRAFT",
    }).returning();
    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
