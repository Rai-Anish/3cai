import React from "react";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/navbar";
import { auth } from "@/lib/auth";

import { headers } from "next/headers";
import { Container } from "@/components/container";

// Destructure children from the props object
export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  return (
    <>
      <Navbar session={session} />
      <Container>
        {children}
        <Footer />
      </Container>
    </>
  );
}
