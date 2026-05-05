"use client"

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export const SignOutButton = ({className}:{className?:string}) => {
  const router = useRouter();

  const handleSignOut = async () =>
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  return (
    <Button
      onClick={handleSignOut}
      variant={"outline"}
      className={cn(className, "border-accent text-accent")}
    >
      Sign Out
    </Button>
  )
}