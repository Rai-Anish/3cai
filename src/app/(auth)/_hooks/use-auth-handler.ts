"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { type AuthFormValues } from "../_schemas/auth-schema";
import { toast } from "sonner";

const AUTH_ERRORS: Record<string, string> = {
  "403": "Please verify your email before signing in.",
  "token expired": "Your session expired. Please sign in again.",
  "invalid credentials": "Incorrect email or password.",
  "user already exists": "An account with this email already exists.",
};

function resolveErrorMessage(error: {
  status?: number;
  message?: string;
}): string {
  if (error.status === 403) return AUTH_ERRORS["403"];

  const msg = error.message?.toLowerCase() ?? "";
  for (const [key, value] of Object.entries(AUTH_ERRORS)) {
    if (msg.includes(key)) return value;
  }

  return error.message ?? "Authentication failed. Please try again.";
}

export function useAuthHandler(type: "sign-in" | "sign-up") {
  const router = useRouter();
  const isSignUp = type === "sign-up";

  const handleAuth = async (values: AuthFormValues): Promise<void> => {
    const { email, password, name } = values;

    const { data, error } = isSignUp
      ? await authClient.signUp.email({
          email,
          password,
          name: name ?? email.split("@")[0],
          callbackURL:"/verify-account" 
        })
      : await authClient.signIn.email({ email, password});

    if (error) {
      toast.error(resolveErrorMessage(error));
      return;
    }

    if (data) {
      if (isSignUp) {
        router.push(`/verify-account?email=${encodeURIComponent(email)}`);
      } else {
        router.push("/workspace");
        router.refresh();
      }
    }
  };

  return { handleAuth };
}