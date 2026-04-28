import { db } from "@/db"
import { roadmap } from "@/db/schemas"
import { inngest } from "@/inngest/client"
import { auth } from "@/lib/auth"
import { getTokenBalance } from "@/services/tokens/token-service"
import { eq, count } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"

const MAX_ROADMAPS = 10

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: req.headers })
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id

    const [{ total }] = await db
      .select({ total: count() })
      .from(roadmap)
      .where(eq(roadmap.userId, userId))

    if (total >= MAX_ROADMAPS) {
      return NextResponse.json(
        { message: `You've reached the limit of ${MAX_ROADMAPS} roadmaps. Delete one to continue.` },
        { status: 403 }
      )
    }

    const [newRoadmap] = await db
      .insert(roadmap)
      .values({
        userId,
        userInput: "",
        status: "pending",
      })
      .returning()

    return NextResponse.json({ roadmapId: newRoadmap.id }, { status: 201 })
  } catch (err) {
    console.error("CREATE ROADMAP ERROR:", err)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}