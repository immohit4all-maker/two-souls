import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// TODO: Implement actual Cognito authorization check
const isAdmin = async (request: Request) => {
  return true; 
};

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: { customer: true, items: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(orders);
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
    const order = await prisma.order.update({
      where: { id: body.id },
      data: { status: body.status },
    });
    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}
