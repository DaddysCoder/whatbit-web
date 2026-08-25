"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { ContentColumn } from "@/components/layout/ContentColumn";

type PublicPageShellProps = {
  children: ReactNode;
};

export function PublicPageShell({ children }: PublicPageShellProps) {
  const pathname = usePathname();
  const showBack = pathname !== "/";

  return (
    <>
      <AppHeader mode="public" showBack={showBack} />
      <ContentColumn>{children}</ContentColumn>
    </>
  );
}
