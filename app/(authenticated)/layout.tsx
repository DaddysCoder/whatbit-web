"use client";

import type { ReactNode } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { ContentColumn } from "@/components/layout/ContentColumn";
import { DemoCaseProvider } from "@/lib/demo-case-context";

export default function AuthenticatedLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <DemoCaseProvider>
      <AppHeader mode="authenticated" showBack />
      <ContentColumn>{children}</ContentColumn>
    </DemoCaseProvider>
  );
}
