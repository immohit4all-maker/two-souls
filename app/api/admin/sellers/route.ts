import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sellers } from "@/lib/schema";
import { eq, desc } from "drizzle-orm";

// TODO: Implement actual Cognito authorization check
const isAdmin = async (request: Request) => {
  return true; 
};

export async function GET() {
  try {
    const sellerList = await db.select().from(sellers).orderBy(desc(sellers.createdAt));
    return NextResponse.json(sellerList);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch sellers" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  if (!(await isAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const [updatedSeller] = await db.update(sellers).set({ status: body.status }).where(eq(sellers.id, body.id)).returning();
    return NextResponse.json(updatedSeller);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update seller" }, { status: 500 });
  }
}
