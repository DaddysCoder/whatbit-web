"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";
import { useDemoCase } from "@/lib/demo-case-context";
import { caseHref, pp } from "@/components/proof-path/shell";

export default function EvidenceUploadPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const {
    uploadState,
    uploadStageLabel,
    uploadProgressPct,
    simulateUploadGood,
    simulateUploadBad,
    resetUpload,
  } = useDemoCase();

  useEffect(() => {
    if (uploadState === "review") {
      router.push(caseHref(id, "/evidence/review"));
    }
  }, [uploadState, router, id]);

  const uploadIdle = uploadState === "idle";
  const uploadInProgress = ["uploading", "checking", "reading"].includes(
    uploadState,
  );
  const uploadError = uploadState === "error";

  return (
    <div>
      <h1 style={{ fontSize: 22, margin: "0 0 18px" }}>Add evidence</h1>

      {uploadIdle ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            marginBottom: 18,
          }}
        >
          <button
            type="button"
            onClick={simulateUploadGood}
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
            onClick={simulateUploadGood}
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
            onClick={simulateUploadBad}
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
            href={caseHref(id, "/evidence")}
            style={{
              padding: 14,
              borderRadius: 16,
              border: "none",
              background: "none",
              color: pp.muted,
              fontSize: 14,
              textAlign: "center",
              textDecoration: "none",
            }}
          >
            Describe it instead, without a file
          </Link>
        </div>
      ) : null}

      {uploadInProgress ? (
        <div style={{ padding: "30px 0", textAlign: "center" }}>
          <div
            style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}
          >
            {uploadStageLabel}
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
                width: uploadProgressPct,
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
            <div
              style={{
                fontWeight: 700,
                color: pp.danger,
                marginBottom: 6,
              }}
            >
              This file couldn&apos;t be read
            </div>
            <div
              style={{
                fontSize: 14,
                color: "#5C2E27",
                lineHeight: 1.5,
              }}
            >
              Try a clearer photo or a different file type.
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <button
              type="button"
              onClick={simulateUploadGood}
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
              onClick={resetUpload}
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
            <Link
              href={caseHref(id, "/evidence")}
              style={{
                padding: 14,
                borderRadius: 12,
                border: "none",
                background: "none",
                color: pp.muted,
                fontSize: 14,
                textAlign: "center",
                textDecoration: "none",
              }}
            >
              Describe it instead
            </Link>
          </div>
        </>
      ) : null}
    </div>
  );
}
