"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function DeleteResumeButton({ resumeId }: { resumeId: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPending, startTransition] = useTransition();

  function onDelete() {
    setIsDeleting(true);

    startTransition(async () => {
      const res = await fetch(`/api/resume-analyzer/${resumeId}`, {
        method: "DELETE",
      });

      setIsDeleting(false);

      if (res.ok) {
        router.refresh();
      }
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button
            variant="destructive"
            size="sm"
            className="gap-2 font-mono text-[10px] uppercase tracking-widest"
            onClick={(event) => event.stopPropagation()}
          >
            <Trash2 className="h-3.5 w-3.5" />
            Delete
          </Button>
        }
      />

      <AlertDialogContent className="border-border bg-card font-mono">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-primary uppercase tracking-tighter italic">
            Delete Resume?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-xs uppercase text-muted-foreground">
            This action is irreversible. The uploaded resume, AI feedback, and edited draft will be removed.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="text-xs uppercase">
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            render={
              <Button
                onClick={onDelete}
                disabled={isDeleting || isPending}
                variant="destructive"
                className="bg-red-500 text-xs uppercase text-white hover:bg-red-600"
              >
                {isDeleting || isPending ? (
                  <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                ) : null}
                Confirm Delete
              </Button>
            }
          />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
