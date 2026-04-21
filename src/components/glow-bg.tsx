import { cn } from "@/lib/utils";

export const GlowBg = ({ className }: { className?: string }) => {
  return (
    <div 
      className={cn(
        "absolute inset-0 pointer-events-none overflow-hidden", 
        className
      )}
    >
      {/* Left Glow - Radioactive Green */}
      <div className="absolute inset-y-0 left-0 w-1/2 bg-linear-to-r from-accent/5 to-transparent" />

      {/* Right Glow - Neon Purple */}
      <div className="absolute inset-y-0 right-0 w-1/2 bg-linear-to-l from-primary/5 to-transparent" />
    </div>
  );
};