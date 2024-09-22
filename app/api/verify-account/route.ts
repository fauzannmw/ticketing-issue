// @/app/api/verify-account/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/db";
export async function POST(request: Request) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Update the accountVerified status to true
    const updatedAccount = await prisma.account.update({
      where: { userId },
      data: {
        accountVerified: true,
      },
    });

    return NextResponse.json({ success: true, account: updatedAccount });
  } catch (error) {
    console.error("Error verifying account:", error);
    return NextResponse.json(
      { error: "Failed to verify account" },
      { status: 500 }
    );
  }
}
