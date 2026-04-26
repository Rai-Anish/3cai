// components/dashboard/loading-state.tsx
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardLoading() {
  return (
    <div className="min-h-screen p-8 space-y-8 bg-background">
      {/* Header Skeleton */}
      <header className="flex justify-between items-end border-b border-border pb-6">
        <div className="space-y-2">
          {/* Title Placeholder */}
          <Skeleton className="h-8 w-64 bg-primary/10" />
          {/* Status Pulse Placeholder */}
          <Skeleton className="h-3 w-32 bg-primary/5" />
        </div>
      </header>

      <main className="grid gap-6 md:grid-cols-2 max-w-4xl">
        {/* User_Identity_Node Skeleton */}
        <section className="p-6 rounded-xl border border-border/50 bg-card/50 space-y-6">
          <Skeleton className="h-4 w-32 bg-muted/20" />
          
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="grid grid-cols-3 gap-4 border-b border-border/10 pb-2">
                <Skeleton className="h-3 w-full bg-muted/10" />
                <Skeleton className="h-4 w-full col-span-2 bg-muted/20" />
              </div>
            ))}
          </div>
        </section>

        {/* Connection_Stable Skeleton */}
        <section className="p-6 rounded-xl border border-dashed border-border/50 flex flex-col items-center justify-center space-y-3">
          <Skeleton className="h-3 w-3 rounded-full bg-primary/20" />
          <Skeleton className="h-3 w-40 bg-primary/10" />
        </section>
      </main>
    </div>
  );
}