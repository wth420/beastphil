import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const userId = verifyToken(req);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { hasCreditCard, filed2026Tax, paymentFrequency } = await req.json();

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        hasCreditCard,
        filed2026Tax,
        paymentFrequency,
      },
    });

    return NextResponse.json({ success: true, user: { id: user.id, hasCreditCard: user.hasCreditCard, filed2026Tax: user.filed2026Tax, paymentFrequency: user.paymentFrequency } }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
