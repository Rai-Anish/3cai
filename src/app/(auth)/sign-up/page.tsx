"use client";

import { AuthForm } from "../_components/auth-form";
import { useAuthHandler } from "../_hooks/use-auth-handler";

export default function SignUpPage() {
  const { handleAuth } = useAuthHandler("sign-up");

  return (
    <main className="">
        <AuthForm type="sign-up" onSubmit={handleAuth} />
    </main>
  );
}
