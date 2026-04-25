import React from 'react'
import { cn } from '@/lib/utils';

type Props = {
  children: React.ReactNode;
  className?: string;
}

export const DashboardContainer = ({ children, className }: Props) => {
  return (
    <div className={cn(`max-w-7xl mx-auto md:p-8 p-4`, className)}>
      {children}
    </div>
  )
}