import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";

function parseProject(p: any) {
  return {
    ...p,
    technologies: JSON.parse(p.technologies || "[]"),
  };
}

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });

    return NextResponse.json(projects.map(parseProject));
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      description,
      image,
      category,
      technologies,
      siteUrl,
      githubUrl,
      featured,
      order,
    } = body;

    const project = await prisma.project.create({
      data: {
        title,
        description,
        image,
        category,
        technologies: JSON.stringify(
          Array.isArray(technologies) ? technologies : []
        ),
        siteUrl,
        githubUrl,
        featured: featured ?? false,
        order: order ?? 0,
      },
    });

    return NextResponse.json(parseProject(project), { status: 201 });
  } catch (error) {
    console.error("Failed to create project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
