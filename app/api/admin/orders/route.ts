import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { orders, customers } from "@/lib/schema";
import { eq, desc } from "drizzle-orm";

// TODO: Implement actual Cognito authorization check
const isAdmin = async (request: Request) => {
  return true; 
};

export async function GET() {
  try {
    const orderList = await db.select().from(orders).leftJoin(customers, eq(orders.customerId, customers.id)).orderBy(desc(orders.createdAt));
    return NextResponse.json(orderList);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  if (!(await isAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const [updatedOrder] = await db.update(orders).set({ status: body.status }).where(eq(orders.id, body.id)).returning();
    return NextResponse.json(updatedOrder);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}
