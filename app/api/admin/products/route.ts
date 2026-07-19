import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// TODO: Implement actual Cognito authorization check
const isAdmin = async (request: Request) => {
  return true; 
};

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: { seller: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(products);
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
    const product = await prisma.product.create({
      data: {
        name: body.name,
        sku: body.sku,
        description: body.description,
        category: body.category,
        price: body.price,
        inventory: body.inventory,
        sellerId: body.sellerId,
        status: body.status || "DRAFT",
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
