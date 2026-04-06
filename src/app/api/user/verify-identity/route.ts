import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const userId = verifyToken(req);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { licenseFront, licenseBack } = await req.json();

    if (!licenseFront || !licenseBack) {
      return NextResponse.json({ error: "Missing identity documents" }, { status: 400 });
    }

    const updatedKYC = await prisma.kYC.update({
      where: { userId },
      data: {
        licenseFront,
        licenseBack,
      },
    });

    return NextResponse.json({ success: true, kyc: { id: updatedKYC.id, licenseFront: !!updatedKYC.licenseFront, licenseBack: !!updatedKYC.licenseBack } }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
