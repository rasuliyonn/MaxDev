import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const contact = await prisma.contactRequest.update({
      where: { id },
      data: { read: true },
    });

    return NextResponse.json(contact);
  } catch (error) {
    console.error("Failed to update contact request:", error);
    return NextResponse.json(
      { error: "Failed to update contact request" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    await prisma.contactRequest.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Contact request deleted" });
  } catch (error) {
    console.error("Failed to delete contact request:", error);
    return NextResponse.json(
      { error: "Failed to delete contact request" },
      { status: 500 }
    );
  }
}
