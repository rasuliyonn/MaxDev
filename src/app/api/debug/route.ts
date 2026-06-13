import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const hasSecret = !!process.env.AUTH_SECRET;
    const authUrl = process.env.AUTH_URL || "not set";
    
    let prismaOk = false;
    let userCount = 0;
    let prismaError = "";
    try {
      const { prisma } = await import("@/lib/prisma");
      userCount = await prisma.user.count();
      prismaOk = true;
    } catch (e: any) {
      prismaError = e.message;
    }

    let authOk = false;
    let authError = "";
    try {
      const { auth } = await import("@/lib/auth");
      const session = await auth();
      authOk = true;
    } catch (e: any) {
      authError = e.message?.substring(0, 200);
    }

    return NextResponse.json({
      hasSecret,
      authUrl,
      prismaOk,
      userCount,
      prismaError,
      authOk,
      authError,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
