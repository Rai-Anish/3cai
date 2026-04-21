"use client";

import Link from "next/link";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, signUpSchema, type AuthFormValues } from "../_schemas/auth-schema";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";

import { AuthField } from "./auth-field";
import { SocialAuth } from "./social-auth";

interface AuthFormProps {
  type: "sign-in" | "sign-up";
  onSubmit: (values: AuthFormValues) => Promise<void>;
}

export function AuthForm({ type, onSubmit }: AuthFormProps) {
  const isSignUp = type === "sign-up";

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(isSignUp ? signUpSchema : signInSchema) as Resolver<AuthFormValues>,
    defaultValues: { email: "", password: "", confirmPassword: "", name: "" },
    mode: "onChange",
  });

  const { isSubmitting } = form.formState;

  return (
    <Card className="w-full max-w-md mx-auto border-none bg-card/50 backdrop-blur-xl shadow-neon transition-all duration-300">
      <CardHeader className="pb-5">
        <CardTitle className="font-mono text-2xl uppercase tracking-tighter">
          {isSignUp ? "Create Account" : "Sign In"}
        </CardTitle>
        <CardDescription className="text-xs">
          {isSignUp 
            ? "Scale your professional potential." 
            : "Access career and design tools."}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FieldGroup className="space-y-4">
            {isSignUp && (
              <AuthField 
                name="name" 
                label="Username" 
                placeholder="John Rai" 
                control={form.control} 
                disabled={isSubmitting} 
              />
            )}
            <AuthField 
              name="email" 
              label="Email" 
              type="email" 
              placeholder="john@proton.me" 
              control={form.control} 
              disabled={isSubmitting} 
            />
            <AuthField 
              name="password" 
              label="Password" 
              type="password" 
              placeholder="••••••••" 
              control={form.control} 
              disabled={isSubmitting} 
            />
            {isSignUp && (
              <AuthField 
                name="confirmPassword" 
                label="Confirm Password" 
                type="password" 
                placeholder="••••••••" 
                control={form.control} 
                disabled={isSubmitting} 
              />
            )}
          </FieldGroup>

          <Button 
            type="submit" 
            disabled={isSubmitting} 
            className="w-full bg-primary text-primary-foreground font-mono font-bold hover:shadow-[0_0_20px_rgba(187,253,0,0.3)] transition-all active:scale-[0.98]"
          >
            {isSubmitting ? "PROCESSING..." : isSignUp ? "CREATE ACCOUNT" : "Login"}
          </Button>
        </form>

        <div className="flex items-center gap-4 py-2">
          <Separator orientation="horizontal" className="flex-1 h-px bg-foreground/20" />
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Or</span>
          <Separator orientation="horizontal" className="flex-1 h-px bg-foreground/20" />
        </div>

        <SocialAuth disabled={isSubmitting} />

        <div className="text-center text-xs font-mono">
          <Link 
            href={isSignUp ? "/sign-in" : "/sign-up"} 
            className="text-muted-foreground hover:text-primary transition-colors uppercase tracking-tight"
          >
            {isSignUp 
              ? "Already have an account? SIGN IN" 
              : "Don't have an account? SIGN UP"}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}