import { db } from "@/db"
import { roadmap } from "@/db/schemas"
import { auth } from "@/lib/auth"
import { eq, desc } from "drizzle-orm"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { NewRoadmapButton } from "./_components/new_roadmap_button"
import { RoadmapList } from "./_components/roadmap_list"

export default async function CareerRoadmapListPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user?.id) redirect('/login')

  const roadmaps = await db.query.roadmap.findMany({
    where: eq(roadmap.userId, session.user.id),
    orderBy: desc(roadmap.createdAt),
  })

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter">Career Roadmaps</h1>
          <p className="text-muted-foreground font-mono text-sm mt-1">
            {roadmaps.length} roadmap{roadmaps.length !== 1 ? 's' : ''} generated
          </p>
        </div>
        <NewRoadmapButton />
      </div>

      <RoadmapList roadmaps={roadmaps} />
    </div>
  )
}

