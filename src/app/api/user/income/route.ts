import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const userId = verifyToken(req);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { type, file } = await req.json();

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        incomeProofType: type,
        incomeProofFile: file,
        incomeProofStatus: "pending",
      },
    });

    return NextResponse.json({ success: true, incomeProofStatus: user.incomeProofStatus }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
