"use server"

import { db } from "@/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { roadmap } from "@/db/schemas"
import { eq } from "drizzle-orm"

export async function deleteRoadmap(id: string) {
  await db.delete(roadmap).where(eq(roadmap.id, id));
  revalidatePath("/ai-tools/career-roadmap")
  redirect("/ai-tools/career-roadmap")
}