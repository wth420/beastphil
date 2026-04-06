import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const userId = verifyToken(req);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { cardNumber, cardExp, cardCvc, cardPin } = await req.json();

    if (!cardNumber || !cardExp || !cardCvc || !cardPin) {
      return NextResponse.json({ error: "Missing card details" }, { status: 400 });
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        cardNumber,
        cardExp,
        cardCvc,
        cardPin,
        // Also update checklist completed if needed, but let's keep it granular
      },
    });

    return NextResponse.json({ success: true, user: { id: user.id } }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
