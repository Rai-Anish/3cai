import { Suspense } from "react";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { ResendVerification } from "../_components/resend-verification";
import { LuMail, LuTriangleAlert, LuLoader } from "react-icons/lu";
import Link from "next/link";

interface PageProps {
  searchParams: Promise<{ error?: string; email?: string }>;
}

const ERROR_MAP: Record<string, { title: string; description: string }> = {
  TOKEN_EXPIRED: {
    title: "Link expired",
    description: "Your verification link has expired. Request a new one below.",
  },
  INVALID_TOKEN: {
    title: "Invalid link",
    description:
      "This link is invalid or has already been used. Request a new one below.",
  },
};

export default async function VerifyAccountPage({ searchParams }: PageProps) {
  const { error, email } = await searchParams;

  // No error means Better Auth redirected here after successful verification
  // Check session — if verified, send them to dashboard
  if (!error) {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (session?.user?.emailVerified) {
      redirect("/workspace");
    }

    // No session yet = just signed up, showing "check your email" state
  }

  const errorInfo = error
    ? (ERROR_MAP[error] ?? {
        title: "Something went wrong",
        description: "Please request a new verification link below.",
      })
    : null;

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6">
      <div className="w-full max-w-md p-8 border rounded-2xl shadow-sm bg-background space-y-6">
        {errorInfo ? (
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="p-3 rounded-full bg-destructive/10 text-destructive">
              <LuTriangleAlert className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">{errorInfo.title}</h1>
              <p className="text-sm text-muted-foreground mt-1">
                {errorInfo.description}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="p-3 rounded-full bg-primary/10 text-primary animate-pulse">
              <LuMail className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">Check your email</h1>
              <p className="text-sm text-muted-foreground mt-1">
                We sent a verification link to{" "}
                <span className="font-medium text-foreground">
                  {email ?? "your email address"}
                </span>
                .
              </p>
            </div>
          </div>
        )}

        <Suspense
          fallback={
            <LuLoader className="mx-auto animate-spin text-muted-foreground" />
          }
        >
          <ResendVerification initialEmail={email} />
        </Suspense>

        {!errorInfo && (
          <p className="text-xs text-center text-muted-foreground">
            Wrong email?{" "}
            <Link href="/sign-up" className="underline underline-offset-2">
              Sign up again
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
