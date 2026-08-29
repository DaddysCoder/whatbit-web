import type { DocBlock } from "@/components/DocPage";
import { AI_BLUEPRINT_EFFECTIVE_DATE, AI_BLUEPRINT_LEGAL_EMAIL } from "./ai-blueprint-legal";

export const AI_BLUEPRINT_TERMS_METADATA = {
  title: "Service terms — AI Blueprint by WhatBit",
  description: "Service terms for AI Blueprint by WhatBit.",
  eyebrow: "AI BLUEPRINT",
  titleText: "Service terms.",
  lede: `Last updated ${AI_BLUEPRINT_EFFECTIVE_DATE}. Plain-language summary of what you're buying and what WHATBIT commits to.`,
};

export const AI_BLUEPRINT_TERMS_BLOCKS: DocBlock[] = [
  {
    heading: "What you're buying",
    text: "AI Blueprint is a fixed-scope readiness product: one online assessment, one AI Readiness Report reviewed by a person before it's sent to you, and one nine-document governance toolkit, built from your answers. It is a one-time engagement, not an ongoing subscription or advisory relationship.",
  },
  {
    heading: "What it is not",
    text: "AI Blueprint is not legal advice, not a certification, and not an assurance of regulatory compliance. It does not constitute an audit under any recognised standard. WHATBIT is a software and advisory practice, not a law firm, and nothing in your report or toolkit should be treated as a legal opinion.",
  },
  {
    heading: "Your responsibilities",
    text: "The quality of your report depends on the accuracy and completeness of the answers you give in the assessment. You're responsible for describing your actual AI use as best you understand it, and for reviewing the delivered documents before relying on or distributing them internally.",
  },
  {
    heading: "Turnaround",
    text: "We aim to deliver your report and toolkit within 5 business days of receiving your completed assessment. This is a target, not a guarantee — if a delay looks likely, we'll tell you.",
  },
  {
    heading: "Cancellation and refunds",
    text: `You can cancel and request a full refund any time before you submit your completed assessment for review. Once your assessment has been submitted and review has started, the fee is non-refundable, reflecting the time already committed to your report. This does not affect any right or remedy you have under the Australian Consumer Law that cannot lawfully be excluded.`,
  },
  {
    heading: "Founding Client round",
    text: "Founding Client pricing (A$495) applies to the first five clients only and reflects an early-access, product-shaping engagement. Once five spots are filled, this pricing round closes and later clients are quoted current pricing.",
  },
  {
    heading: "Contact",
    text: `Questions about these terms: ${AI_BLUEPRINT_LEGAL_EMAIL}. See also our assessment privacy notice.`,
  },
];

export const AI_BLUEPRINT_PRIVACY_METADATA = {
  title: "Assessment privacy notice — AI Blueprint by WhatBit",
  description: "How AI Blueprint handles the information you provide in your assessment.",
  eyebrow: "AI BLUEPRINT",
  titleText: "Assessment privacy notice.",
  lede: `Last updated ${AI_BLUEPRINT_EFFECTIVE_DATE}. Covers the data you give us in the AI Blueprint assessment specifically.`,
};

export const AI_BLUEPRINT_PRIVACY_BLOCKS: DocBlock[] = [
  {
    heading: "What we collect",
    text: "Your contact details (name, business name, email, phone), and your answers to the assessment — which AI tools your business uses, roughly what data goes through them, who's responsible, and the material use case you describe. We don't ask for or want the underlying client or participant data itself, only a description of how it's used.",
  },
  {
    heading: "Why we collect it",
    text: "Solely to produce your AI Readiness Report and toolkit, and to contact you about your order. We don't use your answers for marketing, and we don't sell or share them with third parties for their own purposes.",
  },
  {
    heading: "Where it's stored",
    text: "Assessment responses are stored in WHATBIT's systems, hosted with reputable Australian or Australian-compliant cloud providers, and are only accessible to the reviewer working on your report and the minimum admin staff needed to run the service.",
  },
  {
    heading: "AI models and your data",
    text: "Your answers are not used to train any third-party or WHATBIT AI model by default. Where we use AI tools internally to help draft parts of your report, outputs are always reviewed and finalised by a person before delivery.",
  },
  {
    heading: "Retention and deletion",
    text: "We retain your assessment answers and report for as long as reasonably needed to support you (for example, if you ask us to revisit or update your toolkit), and otherwise delete or de-identify them within 24 months of delivery. You can ask us to delete your data earlier at any time.",
  },
  {
    heading: "Your rights",
    text: "You can ask to see, correct, or delete the information we hold about you and your assessment at any time. Get in touch and we'll action it promptly.",
  },
  {
    heading: "Contact",
    text: `Privacy questions or requests: ${AI_BLUEPRINT_LEGAL_EMAIL}. See also our service terms.`,
  },
];
