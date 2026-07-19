import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// TODO: Implement actual Cognito authorization check
const isAdmin = async (request: Request) => {
  return true; 
};

export async function GET() {
  try {
    const sellers = await prisma.seller.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(sellers);
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
    const seller = await prisma.seller.update({
      where: { id: body.id },
      data: { status: body.status },
    });
    return NextResponse.json(seller);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update seller" }, { status: 500 });
  }
}
