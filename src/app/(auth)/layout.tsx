import React from 'react'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "3CAI Sign In",
  description: "Access your AI Resume Analyzer and Career Tools.",
};

interface AuthLayoutProps {
  children: React.ReactNode
}


export default function AuthLayout({ children }: AuthLayoutProps){
  return (
    <div className='flex justify-center items-center w-full h-full 2xl:h-225'>
        {children}
    </div>
  )
}