"use client";

import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import type { Case, EvidenceItem, SupportPermissions } from "@/lib/types";
import {
  useLargeText,
  type LargeTextContextValue,
} from "@/lib/hooks/useLargeText";

const DEMO_CASE: Case = {
  id: "demo-case-1",
  title: "Wrong size — jeans, Kmart",
  status: "gathering_evidence",
  statusLabel: "Gathering evidence",
  productServiceType: "product",
  item: "A pair of jeans",
  retailer: "Kmart",
  when: "3 weeks ago",
  method: "In store",
  location: "VIC",
  whatHappened:
    "Bought the wrong size and would like to exchange or return them. I can't find my receipt.",
  outcome: "Replacement",
  intakeStep: 4,
  currentProgressStep: "gather",
  nextAction: "Add proof of purchase",
  dueDate: "Friday 28 August",
  createdAt: "2026-08-20T00:00:00.000Z",
  updatedAt: "2026-08-24T00:00:00.000Z",
};

const DEMO_EVIDENCE: EvidenceItem[] = [
  {
    id: "receipt",
    name: "Receipt or order confirmation",
    level: "Needed",
    why: "Shows what you bought, when, and from where.",
    status: "missing",
  },
  {
    id: "altproof",
    name: "Alternative proof of purchase (bank statement, packaging, loyalty account)",
    level: "Needed",
    why: "Can help show your purchase even without a receipt.",
    status: "missing",
  },
  {
    id: "photo",
    name: "Photo of the item",
    level: "Useful",
    why: "Shows the item and the size issue.",
    status: "confirmed",
  },
  {
    id: "tag",
    name: "Photo of the size label or tag",
    level: "Useful",
    why: "Confirms the size you received.",
    status: "confirmed",
  },
  {
    id: "correspondence",
    name: "Previous messages with the store",
    level: "Optional",
    why: "Useful if you've already contacted Kmart about this.",
    status: "not_added",
  },
];

const DEMO_PERMISSIONS: SupportPermissions = {
  view: true,
  edit: true,
  upload: true,
  export: false,
};

export interface DemoCaseContextValue {
  demoCase: Case;
  evidence: EvidenceItem[];
  permissions: SupportPermissions;
}

const LargeTextContext = createContext<LargeTextContextValue | null>(null);
const DemoCaseContext = createContext<DemoCaseContextValue | null>(null);

export function useLargeTextContext(): LargeTextContextValue {
  const context = useContext(LargeTextContext);
  if (!context) {
    throw new Error("useLargeTextContext must be used within AppProviders");
  }
  return context;
}

export function useDemoCaseContext(): DemoCaseContextValue {
  const context = useContext(DemoCaseContext);
  if (!context) {
    throw new Error("useDemoCaseContext must be used within AppProviders");
  }
  return context;
}

export interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  const largeText = useLargeText();

  const demoCaseValue = useMemo<DemoCaseContextValue>(
    () => ({
      demoCase: DEMO_CASE,
      evidence: DEMO_EVIDENCE,
      permissions: DEMO_PERMISSIONS,
    }),
    [],
  );

  return (
    <LargeTextContext.Provider value={largeText}>
      <DemoCaseContext.Provider value={demoCaseValue}>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {children}
        </div>
      </DemoCaseContext.Provider>
    </LargeTextContext.Provider>
  );
}
