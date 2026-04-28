"use client"

import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { DeleteRoadmapButton } from "./delete_roadmap_button"

interface Roadmap {
  id: string
  title: string | null
  description: string | null
  status: string
  createdAt: Date
  userInput: string
}

export function RoadmapList({ roadmaps }: { roadmaps: Roadmap[] }) {
  if (roadmaps.length === 0) {
    return (
      <div className="border border-dashed border-border rounded-lg p-16 text-center">
        <p className="font-mono text-sm text-muted-foreground uppercase tracking-widest">
          No trajectories found. Initialize first sequence.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-3">
      {roadmaps.map((r) => (
        <div key={r.id} className="relative group">
          <Link
            href={`/ai-tools/career-roadmap/${r.id}`}
            className="flex flex-col border border-border rounded-lg p-5 bg-card/30 hover:border-primary/50 hover:bg-card/50 transition-all"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <p className="font-semibold truncate uppercase tracking-tight">
                    {r.title ?? r.userInput.slice(0, 40) + '...'}
                  </p>
                  <StatusBadge status={r.status} />
                </div>
                
                {r.description && (
                  <p className="text-sm text-muted-foreground line-clamp-1 italic">
                    {r.description}
                  </p>
                )}
                
                <div className="flex items-center gap-4 mt-3">
                   <p className="text-[10px] font-mono text-muted-foreground/60 uppercase">
                    ID: {r.id.split('-')[0]}
                  </p>
                  <p className="text-[10px] font-mono text-muted-foreground/60 uppercase">
                    {formatDistanceToNow(r.createdAt, { addSuffix: true })}
                  </p>
                </div>
              </div>
            </div>
          </Link>

          <div className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <DeleteRoadmapButton roadmapId={r.id} />
          </div>
        </div>
      ))}
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const styles = {
    completed: "bg-primary/10 text-primary border-primary/20",
    pending:   "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    failed:    "bg-red-500/10 text-red-400 border-red-500/20",
  }[status] ?? "bg-muted text-muted-foreground"

  return (
    <span className={`text-[9px] font-mono px-2 py-0.5 rounded border shrink-0 tracking-tighter ${styles}`}>
      {status.toUpperCase()}
    </span>
  )
}