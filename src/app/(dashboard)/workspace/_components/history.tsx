import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";
import { MdOutlineHistoryToggleOff } from "react-icons/md";

export const History = () => {
  return (
    <section>
      <Card className="flex items-center justify-center py-28">
        <MdOutlineHistoryToggleOff className="w-20 h-20 bg-white/5 p-4 text-gray-600  rounded-full" />
        <h2 className="text-3xl">You don&apos;t have any history</h2>
        <p className="text-muted-foreground">Start your first AI analysis or mock session to see your activity tracking here.</p>
        <Button className={cn("px-6 hover:bg-primary/80 py-3")}>Get Started</Button>
      </Card>
    </section>
  );
};
