"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useDemoCase } from "@/lib/demo-case-context";
import {
  OUTCOME_OPTIONS,
  PRODUCT_SERVICE_OPTIONS,
  DEMO_CASE_ID,
} from "@/lib/content/intake-options";
import { pp, PrimaryButton } from "@/components/proof-path/shell";

export default function NewCaseWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const step = Math.min(4, Math.max(1, Number(searchParams.get("step") ?? "1")));
  const { caseFields, setCaseField } = useDemoCase();

  const goStep = (next: number) => router.push(`/cases/new?step=${next}`);

  if (step === 1) {
    return (
      <div>
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: pp.accent,
            marginBottom: 6,
          }}
        >
          Understand — Step 1 of 4
        </div>
        <h1 style={{ fontSize: 22, margin: "0 0 6px" }}>
          Is this about a product or a service?
        </h1>
        <p style={{ fontSize: 15, color: pp.subtle, margin: "0 0 20px" }}>
          Let&apos;s take this one step at a time.
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            marginBottom: 20,
          }}
        >
          {PRODUCT_SERVICE_OPTIONS.map((label) => {
            const selected = caseFields.productService === label;
            return (
              <button
                key={label}
                type="button"
                onClick={() => setCaseField("productService", label)}
                style={{
                  textAlign: "left",
                  padding: "14px 16px",
                  borderRadius: 12,
                  border: `1.5px solid ${selected ? pp.accent : "#C9BFA9"}`,
                  background: selected ? "#DCEFE7" : pp.warm,
                  fontSize: 16,
                  fontWeight: 600,
                  color: pp.ink,
                  cursor: "pointer",
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link
            href="/dashboard"
            style={{
              background: "none",
              border: "none",
              color: pp.subtle,
              fontSize: 14,
              textDecoration: "none",
            }}
          >
            Save and leave
          </Link>
          <PrimaryButton onClick={() => goStep(2)}>Continue</PrimaryButton>
        </div>
      </div>
    );
  }

  if (step === 2) {
    const fields = [
      { key: "item" as const, label: "What did you buy?" },
      { key: "retailer" as const, label: "Who was it bought from?" },
      { key: "when" as const, label: "Approximately when?" },
      { key: "method" as const, label: "How was it purchased?" },
      { key: "location" as const, label: "Where are you located?" },
    ];
    return (
      <div>
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: pp.accent,
            marginBottom: 6,
          }}
        >
          Understand — Step 2 of 4
        </div>
        <h1 style={{ fontSize: 22, margin: "0 0 20px" }}>
          Tell us about the purchase
        </h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            marginBottom: 24,
          }}
        >
          {fields.map(({ key, label }) => (
            <div key={key}>
              <label
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  display: "block",
                  marginBottom: 6,
                }}
              >
                {label}
              </label>
              <input
                value={caseFields[key]}
                onChange={(e) => setCaseField(key, e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  fontSize: 16,
                  border: `1.5px solid ${pp.borderInput}`,
                  borderRadius: 12,
                }}
              />
            </div>
          ))}
          <div style={{ fontSize: 13, color: pp.subtle }}>
            Don&apos;t know one of these? Leave it blank and choose{" "}
            <strong>I&apos;m not sure</strong> when asked — it won&apos;t stop
            you continuing.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <button
            type="button"
            onClick={() => goStep(1)}
            style={{
              background: "none",
              border: "none",
              color: pp.subtle,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            Back
          </button>
          <PrimaryButton onClick={() => goStep(3)}>Continue</PrimaryButton>
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div>
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: pp.accent,
            marginBottom: 6,
          }}
        >
          Understand — Step 3 of 4
        </div>
        <h1 style={{ fontSize: 22, margin: "0 0 18px" }}>What went wrong?</h1>
        <textarea
          value={caseFields.whatHappened}
          onChange={(e) => setCaseField("whatHappened", e.target.value)}
          rows={6}
          style={{
            width: "100%",
            padding: 14,
            fontSize: 16,
            border: `1.5px solid ${pp.borderInput}`,
            borderRadius: 12,
            marginBottom: 24,
            resize: "vertical",
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <button
            type="button"
            onClick={() => goStep(2)}
            style={{
              background: "none",
              border: "none",
              color: pp.subtle,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            Back
          </button>
          <PrimaryButton onClick={() => goStep(4)}>Continue</PrimaryButton>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: pp.accent,
          marginBottom: 6,
        }}
      >
        Understand — Step 4 of 4
      </div>
      <h1 style={{ fontSize: 22, margin: "0 0 6px" }}>
        What would you like to happen?
      </h1>
      <p style={{ fontSize: 15, color: pp.subtle, margin: "0 0 20px" }}>
        This is what you&apos;d prefer — not a legal entitlement.
      </p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          marginBottom: 26,
        }}
      >
        {OUTCOME_OPTIONS.map((label) => {
          const selected = caseFields.outcome === label;
          return (
            <button
              key={label}
              type="button"
              onClick={() => setCaseField("outcome", label)}
              style={{
                padding: "10px 16px",
                borderRadius: 999,
                border: `1.5px solid ${selected ? pp.accent : "#C9BFA9"}`,
                background: selected ? "#DCEFE7" : pp.warm,
                fontSize: 15,
                fontWeight: 600,
                color: pp.ink,
                cursor: "pointer",
              }}
            >
              {label}
            </button>
          );
        })}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <button
          type="button"
          onClick={() => goStep(3)}
          style={{
            background: "none",
            border: "none",
            color: pp.subtle,
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          Back
        </button>
        <PrimaryButton
          onClick={() => router.push(`/cases/${DEMO_CASE_ID}`)}
        >
          Create case
        </PrimaryButton>
      </div>
    </div>
  );
}
