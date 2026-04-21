"use client";

import { AuthForm } from "../_components/auth-form";
import { useAuthHandler } from "../_hooks/use-auth-handler";

export default function SignInPage() {
  const { handleAuth } = useAuthHandler("sign-in");

  return (
      <div>
        <AuthForm type="sign-in" onSubmit={handleAuth} />
      </div>
  );
}
