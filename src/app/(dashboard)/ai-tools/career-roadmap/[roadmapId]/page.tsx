// app/(dashboard)/ai-tools/career-roadmap/[roadmapId]/page.tsx
import { db } from "@/db"
import { roadmap } from "@/db/schemas"
import { auth } from "@/lib/auth"
import { eq, and } from "drizzle-orm"
import { headers } from "next/headers"
import { redirect, notFound } from "next/navigation"
import { RoadmapClient } from "../_components/roadmap_client"
import { Node, Edge } from "@xyflow/react"

export default async function CareerRoadmapPage(
  { params }: { params: Promise<{ roadmapId: string }> }
) {
  const { roadmapId } = await params
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user?.id) redirect('/login')

  const record = await db.query.roadmap.findFirst({
    where: and(
      eq(roadmap.id, roadmapId),
      eq(roadmap.userId, session.user.id)
    )
  })

  if (!record) notFound()

  return (
    <RoadmapClient
      roadmapId={roadmapId}
      initialStatus={record.status}
      initialNodes={(record.nodes as Node[]) ?? []}
      initialEdges={(record.edges as Edge[]) ?? []}
      title={record.title}
      initialUserInput={record.userInput}
    />
  )
}
