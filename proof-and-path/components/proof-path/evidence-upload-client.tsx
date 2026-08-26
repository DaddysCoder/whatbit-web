"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { uploadEvidenceAction } from "@/lib/actions/app-actions";
import { caseHref, pp } from "@/components/proof-path/shell";

type UploadPhase = "idle" | "uploading" | "checking" | "reading" | "error";

const STAGE_LABELS: Record<UploadPhase, string> = {
  idle: "",
  uploading: "Uploading…",
  checking: "Checking file…",
  reading: "Reading document…",
  error: "",
};

const STAGE_PROGRESS: Record<UploadPhase, string> = {
  idle: "0%",
  uploading: "30%",
  checking: "60%",
  reading: "90%",
  error: "0%",
};

export default function EvidenceUploadPage({ caseId }: { caseId: string }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [phase, setPhase] = useState<UploadPhase>("idle");

  const runUpload = async (file: File, simulateBad = false) => {
    setPhase("uploading");
    await delay(400);
    setPhase("checking");
    await delay(400);

    if (simulateBad || file.name.toLowerCase().includes("unreadable")) {
      setPhase("error");
      return;
    }

    setPhase("reading");
    await delay(400);

    const formData = new FormData();
    formData.set("file", file);
    const result = await uploadEvidenceAction(caseId, formData);

    if (!result.ok) {
      setPhase("error");
      return;
    }

    router.push(caseHref(caseId, "/evidence/review"));
  };

  const uploadIdle = phase === "idle";
  const uploadInProgress = ["uploading", "checking", "reading"].includes(phase);
  const uploadError = phase === "error";

  return (
    <div>
      <h1 style={{ fontSize: 22, margin: "0 0 18px" }}>Add evidence</h1>
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf,image/jpeg,image/png"
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void runUpload(file);
        }}
      />

      {uploadIdle ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 }}>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            style={{
              padding: 16,
              borderRadius: 16,
              border: `1.5px dashed ${pp.borderInput}`,
              background: pp.warm,
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Take or choose a photo
          </button>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            style={{
              padding: 16,
              borderRadius: 16,
              border: `1.5px dashed ${pp.borderInput}`,
              background: pp.warm,
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Choose a PDF, JPEG or PNG
          </button>
          <button
            type="button"
            onClick={() => runUpload(new File(["x"], "unreadable.bin"), true)}
            style={{
              padding: 14,
              borderRadius: 16,
              border: "none",
              background: "none",
              color: pp.danger,
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            (demo: simulate a file that can&apos;t be read)
          </button>
          <Link
            href={caseHref(caseId, "/evidence")}
            style={{
              padding: 14,
              borderRadius: 16,
              color: pp.muted,
              fontSize: 14,
              textAlign: "center",
            }}
          >
            Describe it instead, without a file
          </Link>
        </div>
      ) : null}

      {uploadInProgress ? (
        <div style={{ padding: "30px 0", textAlign: "center" }}>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>
            {STAGE_LABELS[phase]}
          </div>
          <div
            style={{
              width: "100%",
              height: 6,
              background: "rgba(28,36,48,0.08)",
              borderRadius: 99,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                background: pp.accent,
                width: STAGE_PROGRESS[phase],
                transition: "width 0.4s",
              }}
            />
          </div>
        </div>
      ) : null}

      {uploadError ? (
        <>
          <div
            style={{
              background: "#F7E6E2",
              border: "1px solid #E3B5A9",
              borderRadius: 16,
              padding: 16,
              marginBottom: 18,
            }}
          >
            <div style={{ fontWeight: 700, color: pp.danger, marginBottom: 6 }}>
              This file couldn&apos;t be read
            </div>
            <div style={{ fontSize: 14, color: "#5C2E27", lineHeight: 1.5 }}>
              Try a clearer photo or a different file type.
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <button
              type="button"
              onClick={() => {
                setPhase("idle");
                inputRef.current?.click();
              }}
              style={{
                padding: 14,
                borderRadius: 12,
                border: "none",
                background: pp.accent,
                color: "#fff",
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Try again
            </button>
            <button
              type="button"
              onClick={() => setPhase("idle")}
              style={{
                padding: 14,
                borderRadius: 12,
                border: `1.5px solid ${pp.borderInput}`,
                background: "none",
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Choose a different file
            </button>
            <Link href={caseHref(caseId, "/evidence")} style={{ padding: 14, textAlign: "center", color: pp.muted }}>
              Describe it instead
            </Link>
          </div>
        </>
      ) : null}
    </div>
  );
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
