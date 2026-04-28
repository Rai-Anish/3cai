"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Trash2, Loader2 } from "lucide-react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import { deleteRoadmap } from "@/app/actions/roadmap"

export const DeleteRoadmapButton = ({ roadmapId }: { roadmapId: string }) => {
    const [isDeleting, setIsDeleting] = useState(false)
    const router = useRouter()

    const onDelete = async () => {
        setIsDeleting(true)
        await deleteRoadmap(roadmapId)
        setIsDeleting(false)

    }

    return (
        <AlertDialog>
            <AlertDialogTrigger
                render={
                    <Button
                        variant="destructive"
                        size="sm"
                        className="gap-2 font-mono uppercase text-[10px] tracking-widest"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete Roadmap
                    </Button>
                }
            />

            <AlertDialogContent className="bg-card border-border font-mono">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-primary uppercase tracking-tighter italic">
                        Confirm Trajectory Deletion?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-xs text-muted-foreground uppercase">
                        This action is irreversible. Node data will be wiped.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="text-xs uppercase">Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        render={
                            <Button
                                onClick={onDelete}
                                disabled={isDeleting}
                                variant="destructive"
                                className="bg-red-500 hover:bg-red-600 text-white text-xs uppercase"
                            >
                                {isDeleting ? <Loader2 className="h-3 w-3 animate-spin mr-2" /> : null}
                                Confirm Delete
                            </Button>
                        }
                    />
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}