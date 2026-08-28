import React from "react";
import type { AssessmentSubmissionV1 } from "../../types";

interface PostSubmitScreenProps {
  submission: AssessmentSubmissionV1;
  onDownloadJson: () => void;
  onStartNew: () => void;
}

export const PostSubmitScreen: React.FC<PostSubmitScreenProps> = ({
  submission,
  onDownloadJson,
  onStartNew,
}) => {
  return (
    <div className="max-w-2xl mx-auto space-y-6 text-center py-6 sm:py-12">
      {/* Success Badge & Icon */}
      <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-2xl mx-auto flex items-center justify-center shadow-xs">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
          Assessment Submitted Successfully
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-ink)]">
          Responses Received for WHATBIT Review
        </h1>
        <p className="text-sm text-stone-600 max-w-lg mx-auto">
          Thank you for completing your responsible AI readiness assessment. Your submission has been
          logged for human review by our specialist team.
        </p>
      </div>

      {/* Submission details card */}
      <div className="bg-white rounded-2xl border border-[var(--color-line)] p-6 text-left shadow-xs space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 pb-2 border-b border-stone-100">
          Submission Summary
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
          <div>
            <span className="text-stone-500 block text-xs">Assessment Reference</span>
            <span className="font-mono font-semibold text-stone-900">{submission.assessment_id}</span>
          </div>
          <div>
            <span className="text-stone-500 block text-xs">Organisation</span>
            <span className="font-semibold text-stone-900">
              {submission.organisation.legal_or_trading_name || "N/A"}
            </span>
          </div>
          <div>
            <span className="text-stone-500 block text-xs">Submitted At</span>
            <span className="text-stone-700">
              {submission.submitted_at ? new Date(submission.submitted_at).toLocaleString() : "Just now"}
            </span>
          </div>
          <div>
            <span className="text-stone-500 block text-xs">Assessed Use Cases</span>
            <span className="font-semibold text-stone-900">
              {submission.use_cases.length} material use case{submission.use_cases.length > 1 ? "s" : ""}
            </span>
          </div>
        </div>

        <div className="pt-3 border-t border-stone-100 space-y-2">
          <h4 className="text-xs font-bold text-stone-900">What happens next?</h4>
          <ol className="text-xs text-stone-600 space-y-1.5 list-decimal list-inside leading-relaxed">
            <li>
              <strong>Specialist Review:</strong> A WHATBIT reviewer will analyze your responses,
              cross-referencing current National AI Centre guidance and Australian privacy standards.
            </li>
            <li>
              <strong>Tailored Readiness Report:</strong> You will receive a comprehensive, human-reviewed
              report detailing identified risks, material exposures, and prioritized action items.
            </li>
            <li>
              <strong>Custom Governance Pack:</strong> You will receive draft governance documents, AI register
              templates, and policy recommendations within <strong>5 business days</strong>.
            </li>
          </ol>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <button
          type="button"
          onClick={onDownloadJson}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl border border-stone-300 bg-white text-stone-800 hover:bg-stone-50 shadow-2xs transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download Copy of Answers (JSON)
        </button>

        <button
          type="button"
          onClick={() => window.print()}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl border border-stone-300 bg-white text-stone-800 hover:bg-stone-50 shadow-2xs transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Print Summary
        </button>

        <button
          type="button"
          onClick={onStartNew}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
        >
          Start New Assessment
        </button>
      </div>
    </div>
  );
};
