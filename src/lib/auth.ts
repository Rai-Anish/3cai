import { pool } from "@/db/dbConnect";
import { betterAuth } from "better-auth";
import { emailOTP } from "better-auth/plugins"

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,

    database: pool,

    emailAndPassword: { 
    enabled: true,
    maxPasswordLength: 50,
    minPasswordLength: 8,
    passwordRegex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    requireEmailVerification: true, 
  }, 

  socialProviders: { 
    google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    github: { 
      clientId: process.env.GITHUB_CLIENT_ID as string, 
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
    }, 
  },
  
  plugins: [
     emailOTP({ 
            async sendVerificationOTP({ email, otp, type }) { 
                if (type === "sign-in") { 
                    // Send the OTP for sign in
                } else if (type === "email-verification") { 
                    // Send the OTP for email verification
                } else { 
                    // Send the OTP for password reset
                } 
            }, 
        }) 
]  
})