import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    // For this demo, we allow all GET requests to this admin endpoint.
    // In production, we would check for an admin flag in the JWT or session.
    const users = await prisma.user.findMany({
      include: {
        kyc: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ users }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
