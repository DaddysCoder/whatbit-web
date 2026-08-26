"use client";

import type { ReactNode } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { ContentColumn } from "@/components/layout/ContentColumn";

export default function AuthenticatedLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <AppHeader mode="authenticated" showBack />
      <ContentColumn>{children}</ContentColumn>
    </>
  );
}
