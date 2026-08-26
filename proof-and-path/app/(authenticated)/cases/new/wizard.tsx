"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  finishIntakeAction,
  getCaseForEditAction,
  updateCaseAction,
} from "@/lib/actions/app-actions";
import {
  OUTCOME_OPTIONS,
  PRODUCT_SERVICE_OPTIONS,
} from "@/lib/content/intake-options";
import { pp, PrimaryButton } from "@/components/proof-path/shell";

export default function NewCaseWizard({ caseId }: { caseId: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const step = Math.min(4, Math.max(1, Number(searchParams.get("step") ?? "1")));

  const [fields, setFields] = useState({
    productServiceType: "",
    item: "",
    retailer: "",
    whenApprox: "",
    method: "",
    location: "",
    whatHappened: "",
    desiredOutcome: "",
  });

  useEffect(() => {
    getCaseForEditAction(caseId).then((record) => {
      if (!record) return;
      setFields({
        productServiceType: record.productServiceType ?? "",
        item: record.item ?? "",
        retailer: record.retailer ?? "",
        whenApprox: record.whenApprox ?? "",
        method: record.method ?? "",
        location: record.location ?? "",
        whatHappened: record.whatHappened ?? "",
        desiredOutcome: record.desiredOutcome ?? "",
      });
    });
  }, [caseId]);

  const persist = async (patch: Partial<typeof fields>, nextStep?: number) => {
    await updateCaseAction(caseId, {
      ...patch,
      intakeStep: nextStep ?? step,
    });
  };

  const goStep = async (next: number, patch?: Partial<typeof fields>) => {
    if (patch) await persist(patch, next);
    router.push(`/cases/${caseId}?step=${next}`);
  };

  if (step === 1) {
    return (
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: pp.accent, marginBottom: 6 }}>
          Understand — Step 1 of 4
        </div>
        <h1 style={{ fontSize: 22, margin: "0 0 6px" }}>
          Is this about a product or a service?
        </h1>
        <p style={{ fontSize: 15, color: pp.subtle, margin: "0 0 20px" }}>
          Let&apos;s take this one step at a time.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
          {PRODUCT_SERVICE_OPTIONS.map((label) => {
            const selected = fields.productServiceType === label;
            return (
              <button
                key={label}
                type="button"
                onClick={() =>
                  setFields((f) => ({
                    ...f,
                    productServiceType: label.toLowerCase().includes("not sure")
                      ? "unsure"
                      : label.toLowerCase(),
                  }))
                }
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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/dashboard" style={{ color: pp.subtle, fontSize: 14 }}>
            Save and leave
          </Link>
          <PrimaryButton onClick={() => goStep(2, { productServiceType: fields.productServiceType })}>
            Continue
          </PrimaryButton>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: pp.accent, marginBottom: 6 }}>
          Understand — Step 2 of 4
        </div>
        <h1 style={{ fontSize: 22, margin: "0 0 20px" }}>Tell us about the purchase</h1>
        {(
          [
            ["item", "What did you buy?"],
            ["retailer", "Who was it bought from?"],
            ["whenApprox", "Approximately when?"],
            ["method", "How was it purchased?"],
            ["location", "Where are you located?"],
          ] as const
        ).map(([key, label]) => (
          <div key={key} style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 14, fontWeight: 600, display: "block", marginBottom: 6 }}>
              {label}
            </label>
            <input
              value={fields[key]}
              onChange={(e) => setFields((f) => ({ ...f, [key]: e.target.value }))}
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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button type="button" onClick={() => goStep(1)} style={{ background: "none", border: "none", color: pp.subtle }}>
            Back
          </button>
          <PrimaryButton
            onClick={() =>
              goStep(3, {
                item: fields.item,
                retailer: fields.retailer,
                whenApprox: fields.whenApprox,
                method: fields.method,
                location: fields.location,
              })
            }
          >
            Continue
          </PrimaryButton>
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: pp.accent, marginBottom: 6 }}>
          Understand — Step 3 of 4
        </div>
        <h1 style={{ fontSize: 22, margin: "0 0 18px" }}>What went wrong?</h1>
        <textarea
          value={fields.whatHappened}
          onChange={(e) => setFields((f) => ({ ...f, whatHappened: e.target.value }))}
          rows={6}
          style={{
            width: "100%",
            padding: 14,
            fontSize: 16,
            border: `1.5px solid ${pp.borderInput}`,
            borderRadius: 12,
            marginBottom: 24,
          }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button type="button" onClick={() => goStep(2)} style={{ background: "none", border: "none", color: pp.subtle }}>
            Back
          </button>
          <PrimaryButton onClick={() => goStep(4, { whatHappened: fields.whatHappened })}>
            Continue
          </PrimaryButton>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ fontSize: 13, fontWeight: 600, color: pp.accent, marginBottom: 6 }}>
        Understand — Step 4 of 4
      </div>
      <h1 style={{ fontSize: 22, margin: "0 0 6px" }}>What would you like to happen?</h1>
      <p style={{ fontSize: 15, color: pp.subtle, margin: "0 0 20px" }}>
        This is what you&apos;d prefer — not a legal entitlement.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 26 }}>
        {OUTCOME_OPTIONS.map((label) => {
          const selected = fields.desiredOutcome === label;
          return (
            <button
              key={label}
              type="button"
              onClick={() => setFields((f) => ({ ...f, desiredOutcome: label }))}
              style={{
                padding: "10px 16px",
                borderRadius: 999,
                border: `1.5px solid ${selected ? pp.accent : "#C9BFA9"}`,
                background: selected ? "#DCEFE7" : pp.warm,
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {label}
            </button>
          );
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button type="button" onClick={() => goStep(3)} style={{ background: "none", border: "none", color: pp.subtle }}>
          Back
        </button>
        <PrimaryButton
          onClick={async () => {
            await updateCaseAction(caseId, { desiredOutcome: fields.desiredOutcome });
            await finishIntakeAction(caseId);
          }}
        >
          Create case
        </PrimaryButton>
      </div>
    </div>
  );
}
