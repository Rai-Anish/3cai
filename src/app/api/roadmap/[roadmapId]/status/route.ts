import { db } from "@/db";
import { roadmap } from "@/db/schemas";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ roadmapId: string }> }
) {
  const { roadmapId } = await params;

  const roadmapData = await db.query.roadmap.findFirst({
    where: eq(roadmap.id, roadmapId)
  });

  if (!roadmapData) {
    return NextResponse.json({ status: 'error', error: 'Not found' }, { status: 404 });
  }

  if (roadmapData.status !== 'completed') {
    return NextResponse.json({ status: roadmapData.status });  
  }

  const nodes = typeof roadmapData.nodes === 'string' 
    ? JSON.parse(roadmapData.nodes) 
    : roadmapData.nodes

  const edges = typeof roadmapData.edges === 'string' 
    ? JSON.parse(roadmapData.edges) 
    : roadmapData.edges

  return NextResponse.json({
    status: 'completed',
    title: roadmapData.title,
    description: roadmapData.description,
    duration: roadmapData.duration,
    nodes,
    edges,
  });
}