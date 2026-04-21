"use client";

import { useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { LuEye, LuEyeOff } from "react-icons/lu"; // Using Lucide set for a cleaner "tactical" look
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AuthFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  placeholder: string;
  type?: string;
  control: Control<T>;
  disabled?: boolean;
}

export function AuthField<T extends FieldValues>({
  name,
  label,
  placeholder,
  type = "text",
  control,
  disabled,
}: AuthFieldProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  // Check if this is a password field to enable toggle logic
  const isPasswordField = type === "password";
  const inputType = isPasswordField && showPassword ? "text" : type;

  return (
    <div className="space-y-2 group">
      <Label htmlFor={name} className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground group-focus-within:text-primary transition-colors">
        {label}
      </Label>
      
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <div className="space-y-1">
            <div className="relative flex items-center">
              <Input
                {...field}
                id={name}
                type={inputType}
                placeholder={placeholder}
                disabled={disabled}
                className="bg-background/50 border-none font-mono text-sm h-11 pr-10 focus-visible:ring-1 focus-visible:ring-primary/50 transition-all shadow-inner"
              />
              
              {isPasswordField && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={disabled}
                  className="absolute right-3 text-muted-foreground hover:text-primary transition-colors focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <LuEyeOff className="h-4 w-4" />
                  ) : (
                    <LuEye className="h-4 w-4" />
                  )}
                </button>
              )}
            </div>
            
            {fieldState.error && (
              <p className=" font-mono text-rose-400 text-destructive  animate-in fade-in slide-in-from-top-1">
                {fieldState.error.message}
              </p>
            )}
          </div>
        )}
      />
    </div>
  );
}