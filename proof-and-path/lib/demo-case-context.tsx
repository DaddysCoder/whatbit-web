"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  DEMO_DRAFT_TEXT,
  DEMO_CASE_ID,
  PROGRESS_LABELS,
  type DraftStyle,
} from "@/lib/content/intake-options";
import {
  DEMO_EVIDENCE_INITIAL,
  EVIDENCE_TEMPLATES,
  type EvidenceId,
} from "@/lib/content/evidence-templates";

export type UploadState =
  | "idle"
  | "uploading"
  | "checking"
  | "reading"
  | "review"
  | "error";

export type EvidenceMap = Record<EvidenceId, boolean>;

export type Permissions = {
  view: boolean;
  edit: boolean;
  upload: boolean;
  export: boolean;
};

export type TimelineEvent = {
  title: string;
  date: string;
};

export type CaseFields = {
  productService: string;
  item: string;
  retailer: string;
  when: string;
  method: string;
  location: string;
  whatHappened: string;
  outcome: string;
};

type DemoCaseContextValue = {
  caseId: string;
  caseFields: CaseFields;
  setCaseField: <K extends keyof CaseFields>(key: K, value: CaseFields[K]) => void;
  evidence: EvidenceMap;
  confirmEvidence: (id: EvidenceId) => void;
  uploadState: UploadState;
  uploadProgressPct: string;
  uploadStageLabel: string;
  simulateUploadGood: () => void;
  simulateUploadBad: () => void;
  resetUpload: () => void;
  confirmExtraction: () => void;
  draftText: string;
  setDraftText: (text: string) => void;
  draftStyle: DraftStyle;
  setDraftStyle: (style: DraftStyle) => void;
  isDraftGenerating: boolean;
  generateDraft: () => void;
  confirmDraft: () => void;
  timelineEvents: TimelineEvent[];
  addContactEvent: () => void;
  baseTimelineEvents: TimelineEvent[];
  permissions: Permissions;
  togglePermission: (key: keyof Permissions) => void;
  supportActive: boolean;
  sendInvite: () => void;
  revokeSupport: () => void;
  progressSteps: { label: string; mark: string; color: string }[];
  evidenceSummary: string;
  getEvidenceItems: () => Array<
    (typeof EVIDENCE_TEMPLATES)[number] & {
      statusLabel: string;
      statusBg: string;
      statusColor: string;
      confirmed: boolean;
    }
  >;
  hasFollowUp: boolean;
  timelineSummary: string;
  draftConfirmed: boolean;
};

const DemoCaseContext = createContext<DemoCaseContextValue | null>(null);

const UPLOAD_STAGE_LABELS: Record<string, string> = {
  uploading: "Uploading…",
  checking: "Checking file…",
  reading: "Reading document…",
};

const UPLOAD_PROGRESS: Record<string, string> = {
  uploading: "30%",
  checking: "60%",
  reading: "90%",
  review: "100%",
};

const DEFAULT_CASE_FIELDS: CaseFields = {
  productService: "Product",
  item: "A pair of jeans",
  retailer: "Kmart",
  when: "3 weeks ago",
  method: "In store",
  location: "VIC",
  whatHappened:
    "Bought the wrong size and would like to exchange or return them. I can't find my receipt.",
  outcome: "Replacement",
};

const DEFAULT_PERMISSIONS: Permissions = {
  view: true,
  edit: true,
  upload: true,
  export: false,
};

const BASE_TIMELINE: TimelineEvent[] = [
  { title: "Contacted Kmart", date: "24 August 2026" },
];

export function DemoCaseProvider({ children }: { children: ReactNode }) {
  const [caseFields, setCaseFields] = useState<CaseFields>(DEFAULT_CASE_FIELDS);
  const [evidence, setEvidence] = useState<EvidenceMap>({
    ...DEMO_EVIDENCE_INITIAL,
  });
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [draftText, setDraftText] = useState(DEMO_DRAFT_TEXT);
  const [draftStyle, setDraftStyle] = useState<DraftStyle>("Neutral");
  const [isDraftGenerating, setIsDraftGenerating] = useState(false);
  const [draftConfirmed, setDraftConfirmed] = useState(false);
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);
  const [permissions, setPermissions] =
    useState<Permissions>(DEFAULT_PERMISSIONS);
  const [supportActive, setSupportActive] = useState(false);
  const uploadTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const draftTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearUploadTimers = useCallback(() => {
    uploadTimers.current.forEach(clearTimeout);
    uploadTimers.current = [];
  }, []);

  const setCaseField = useCallback(
    <K extends keyof CaseFields>(key: K, value: CaseFields[K]) => {
      setCaseFields((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const confirmEvidence = useCallback((id: EvidenceId) => {
    setEvidence((prev) => ({ ...prev, [id]: true }));
  }, []);

  const resetUpload = useCallback(() => {
    clearUploadTimers();
    setUploadState("idle");
  }, [clearUploadTimers]);

  const simulateUploadGood = useCallback(() => {
    clearUploadTimers();
    setUploadState("uploading");
    uploadTimers.current = [
      setTimeout(() => setUploadState("checking"), 500),
      setTimeout(() => setUploadState("reading"), 1100),
      setTimeout(() => setUploadState("review"), 1800),
    ];
  }, [clearUploadTimers]);

  const simulateUploadBad = useCallback(() => {
    clearUploadTimers();
    setUploadState("uploading");
    uploadTimers.current = [
      setTimeout(() => setUploadState("checking"), 500),
      setTimeout(() => setUploadState("error"), 1100),
    ];
  }, [clearUploadTimers]);

  const confirmExtraction = useCallback(() => {
    setEvidence((prev) => ({ ...prev, altproof: true }));
    setUploadState("idle");
  }, []);

  const generateDraft = useCallback(() => {
    setIsDraftGenerating(true);
    if (draftTimer.current) clearTimeout(draftTimer.current);
    draftTimer.current = setTimeout(() => {
      setIsDraftGenerating(false);
    }, 1200);
  }, []);

  const confirmDraft = useCallback(() => {
    setDraftConfirmed(true);
  }, []);

  const addContactEvent = useCallback(() => {
    setTimelineEvents((prev) => [
      ...prev,
      { title: "Response recorded from Kmart", date: "Today" },
    ]);
  }, []);

  const togglePermission = useCallback((key: keyof Permissions) => {
    setPermissions((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const sendInvite = useCallback(() => {
    setSupportActive(true);
  }, []);

  const revokeSupport = useCallback(() => {
    setSupportActive(false);
  }, []);

  const getEvidenceItems = useCallback(() => {
    return EVIDENCE_TEMPLATES.map((template) => {
      const confirmed = evidence[template.id];
      const statusLabel = confirmed
        ? "Confirmed"
        : template.level === "Optional"
          ? "Not added"
          : "Missing";
      const statusBg = confirmed
        ? "#EEF3F0"
        : template.level === "Optional"
          ? "#EFEAE0"
          : "#FCF1DF";
      const statusColor = confirmed
        ? "#2F6E4B"
        : template.level === "Optional"
          ? "#6B7280"
          : "#8A5A16";
      return {
        ...template,
        confirmed,
        statusLabel,
        statusBg,
        statusColor,
      };
    });
  }, [evidence]);

  const evidenceItems = getEvidenceItems();
  const confirmedCount = evidenceItems.filter(
    (item) => item.statusLabel === "Confirmed",
  ).length;
  const missingNeeded = evidenceItems.filter(
    (item) => item.level === "Needed" && item.statusLabel === "Missing",
  ).length;
  const evidenceSummary = `${confirmedCount} confirmed, ${missingNeeded} needed missing`;

  const currentProgressIdx = 1;
  const progressSteps = PROGRESS_LABELS.map((label, i) => ({
    label,
    mark: i < currentProgressIdx ? "✓" : i === currentProgressIdx ? "→" : "○",
    color:
      i < currentProgressIdx ? "#2F6E4B" : i === currentProgressIdx ? "#1C2430" : "#9AA0A6",
  }));

  const timelineSummary =
    timelineEvents.length > 0
      ? `${timelineEvents.length} update`
      : "No responses recorded yet";

  const uploadStageLabel = UPLOAD_STAGE_LABELS[uploadState] ?? "";
  const uploadProgressPct = UPLOAD_PROGRESS[uploadState] ?? "0%";

  const value = useMemo<DemoCaseContextValue>(
    () => ({
      caseId: DEMO_CASE_ID,
      caseFields,
      setCaseField,
      evidence,
      confirmEvidence,
      uploadState,
      uploadProgressPct,
      uploadStageLabel,
      simulateUploadGood,
      simulateUploadBad,
      resetUpload,
      confirmExtraction,
      draftText,
      setDraftText,
      draftStyle,
      setDraftStyle,
      isDraftGenerating,
      generateDraft,
      confirmDraft,
      timelineEvents,
      addContactEvent,
      baseTimelineEvents: BASE_TIMELINE,
      permissions,
      togglePermission,
      supportActive,
      sendInvite,
      revokeSupport,
      progressSteps,
      evidenceSummary,
      getEvidenceItems,
      hasFollowUp: true,
      timelineSummary,
      draftConfirmed,
    }),
    [
      caseFields,
      setCaseField,
      evidence,
      confirmEvidence,
      uploadState,
      uploadProgressPct,
      uploadStageLabel,
      simulateUploadGood,
      simulateUploadBad,
      resetUpload,
      confirmExtraction,
      draftText,
      draftStyle,
      isDraftGenerating,
      generateDraft,
      confirmDraft,
      timelineEvents,
      addContactEvent,
      permissions,
      togglePermission,
      supportActive,
      sendInvite,
      revokeSupport,
      progressSteps,
      evidenceSummary,
      getEvidenceItems,
      timelineSummary,
      draftConfirmed,
    ],
  );

  return (
    <DemoCaseContext.Provider value={value}>{children}</DemoCaseContext.Provider>
  );
}

export function useDemoCase() {
  const context = useContext(DemoCaseContext);
  if (!context) {
    throw new Error("useDemoCase must be used within DemoCaseProvider");
  }
  return context;
}
