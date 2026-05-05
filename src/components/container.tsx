import React from 'react'
import { cn } from '@/lib/utils';

type Props = {
  children: React.ReactNode;
  className?: string;
  // Added 'as' prop to allow <Container as="section"> for SEO
  as?: React.ElementType;
}

export const Container = ({ children, className, as: Component = "div" }: Props) => {
  return (
    <Component className={cn("md:mx-auto overflow-x-hidden  w-full md:max-w-450", className)}>
      {children}
    </Component>
  )
}