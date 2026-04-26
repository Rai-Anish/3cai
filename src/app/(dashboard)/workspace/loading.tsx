import { Skeleton } from "@/components/ui/skeleton";

export default function WorkspaceLoading() {
  return (
    <div className="flex flex-col space-y-6 p-8">
      {/* Welcome Banner Placeholder */}
      <Skeleton className="h-48 w-full rounded-2xl bg-primary/5" />
      
      {/* AI Tools Grid Placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-72 rounded-xl bg-card" />
        ))}
      </div>
    </div>
  );
}