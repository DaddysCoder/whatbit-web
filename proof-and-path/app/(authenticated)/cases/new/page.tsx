import { Suspense } from "react";
import NewCaseWizard from "./wizard";

export default function NewCasePage() {
  return (
    <Suspense
      fallback={
        <div style={{ fontSize: 15, color: "#6B7280" }}>Loading intake…</div>
      }
    >
      <NewCaseWizard />
    </Suspense>
  );
}
