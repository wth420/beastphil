import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  let userId: string | null | undefined;
  let parsedBody: any = {};

  try {
    userId = verifyToken(req);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    parsedBody = await req.json().catch(() => ({}));

    const {
      fathersName,
      mothersName,
      mothersMaidenName,
      placeOfBirth,
      spouseName
    } = parsedBody;

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        identityQuestionsStatus: "verified",
        kyc: {
          update: {
            fathersName,
            mothersName,
            mothersMaidenName,
            placeOfBirth,
            spouseName
          }
        }
      },
      include: { kyc: true }
    });

    return NextResponse.json({ success: true, identityQuestionsStatus: user.identityQuestionsStatus }, { status: 200 });
  } catch (err: any) {
    if (err.code === 'P2025' && userId) {
       // kyc record doesn't exist yet, we create it
       try {
         const { fathersName, mothersName, mothersMaidenName, placeOfBirth, spouseName } = parsedBody;
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
                 fullName: "Pending",
                 dob: "Pending",
                 ssn: "Pending",
                 address: "Pending",
                 city: "Pending",
                 state: "Pending",
                 zip: "Pending",
                 idNumber: "Pending"
               }
             }
           }
         });
         return NextResponse.json({ success: true, identityQuestionsStatus: user.identityQuestionsStatus }, { status: 200 });
       } catch (e) {
         return NextResponse.json({ error: "Failed to create KYC record." }, { status: 500 });
       }
    }
    return NextResponse.json({ error: err?.message || "Internal Server Error" }, { status: 500 });
  }
}

