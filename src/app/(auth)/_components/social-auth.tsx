"use client";

import { FaGithub, FaGoogle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export function SocialAuth({ disabled }: { disabled?: boolean }) {
  const handleSocial = async (provider: "google" | "github") => {
    await authClient.signIn.social({
      provider,
      callbackURL: "/workspace",
      fetchOptions: {
        onError: (ctx) => {
          toast.error(ctx.error.message || "Auth failed");
        },
      },
    });
  };

  return (
    <div className="flex flex-wrap gap-3 pb-3">
      <Button
        variant="outline"
        disabled={disabled}
        onClick={() => handleSocial("google")}
        className="bg-background/40 border-none hover:bg-background/60 font-mono text-xs flex-1 min-w-35"
      >
        <FaGoogle className="mr-2 h-4 w-4 text-primary" />Continue with Google
      </Button>
      <Button
        variant="outline"
        disabled={disabled}
        onClick={() => handleSocial("github")}
        className="bg-background/40 border-none hover:bg-background/60 font-mono text-xs flex-1 min-w-35"
      >
        <FaGithub className="mr-2 h-4 w-4 text-secondary" />Continue with GitHub
      </Button>
    </div>
  );
}
