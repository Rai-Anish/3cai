import * as z from "zod"

export const authSchema = z.object({
  email: z.string().email("Invalid email address."),
  password: z.string().min(8, "Security requirement: 8+ characters."),
  name: z.string().optional(),
  confirmPassword: z.string().optional(),
})

export type AuthFormValues = z.infer<typeof authSchema>

// SIGN IN: Validates only the subset
export const signInSchema = authSchema.pick({ email: true, password: true })

// SIGN UP: Validates everything
export const signUpSchema = authSchema.extend({
  name: z.string().min(2, "Name is required for the directory."),
  confirmPassword: z.string().min(1, "Please confirm your password."),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
})