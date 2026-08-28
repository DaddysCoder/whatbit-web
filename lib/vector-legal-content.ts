import type { DocBlock } from "@/components/DocPage";
import {
  VECTOR_GOVERNING_STATE,
  VECTOR_LEGAL_EFFECTIVE_DATE,
  VECTOR_LEGAL_EMAIL,
  VECTOR_LEGAL_OPERATOR,
  VECTOR_PRIVACY_EMAIL,
} from "./vector-legal";

export const VECTOR_TERMS_BLOCKS: DocBlock[] = [
  {
    text: `These Terms of Service apply to your use of Vector, a WhatBit forms product operated by ${VECTOR_LEGAL_OPERATOR}. By using Vector, you agree to these terms.`,
  },
  {
    heading: "What Vector is",
    text: "Vector provides structured online forms for referral, practitioner triage and source and consultation records. It helps organise information into usable records and exports. Vector is a documentation and workflow tool. It is not legal, clinical, medical, NDIS compliance, employment or professional advice.",
  },
  {
    heading: "Free and paid access",
    text: `Vector Free lets you use the three launch forms online without a subscription. Vector paid is an optional subscription that unlocks finished-document features such as DOCX export, print or save as PDF, organisation branding, saved company details and the support template library. The current advertised Vector price is A$9 per month unless a different price is clearly shown to you in Stripe Checkout before purchase. Subscriptions renew automatically until cancelled. Billing and payment collection are handled by Stripe. You can manage or cancel an active subscription through the Stripe customer portal linked from Vector.`,
  },
  {
    heading: "Paid outputs",
    text: "A paid subscription gives access to the paid features made available during the subscription period. It does not purchase professional advice or guarantee that an exported document will be accepted by any participant, provider, regulator, auditor or other third party. We may improve or replace export formats over time while keeping the core purpose of the paid tier substantially consistent.",
  },
  {
    heading: "Your information and responsibility",
    text: "You retain responsibility for information you enter into Vector and for any document you export, print, share or submit. You must have the right to use any information you provide and must not use Vector to unlawfully collect, store or disclose another person's information. Review exported records for accuracy, completeness and appropriateness before relying on them in professional practice.",
  },
  {
    heading: "Local data",
    text: "Vector is designed so substantial working data can remain in the browser on the device you are using. You are responsible for device access, backups where needed, and any professional record-keeping obligations that apply to you. Clearing browser data or using a different device may remove locally stored information unless you have exported or backed it up elsewhere.",
  },
  {
    heading: "Availability and changes",
    text: `${VECTOR_LEGAL_OPERATOR} may update, improve, temporarily suspend or change Vector as the product develops, including where third-party services, security requirements or laws change.`,
  },
  {
    heading: "Acceptable use",
    text: "You must not misuse Vector, attempt to bypass its security, interfere with its operation, access data you are not authorised to access, or use the service for unlawful activity.",
  },
  {
    heading: "No guarantee of accuracy or uninterrupted service",
    text: `Vector is provided on an as-available basis and may contain errors or experience interruptions. To the extent permitted by law, ${VECTOR_LEGAL_OPERATOR} does not guarantee that Vector will always be available, error-free or appropriate for every professional or commercial purpose. Nothing in these terms excludes rights or remedies that cannot legally be excluded, including applicable rights under Australian consumer law.`,
  },
  {
    heading: "Limitation of responsibility",
    text: `To the extent permitted by law, ${VECTOR_LEGAL_OPERATOR} is not responsible for losses arising solely from reliance on user-entered information, exported documents, third-party services, service interruptions or changes to product features where users should reasonably verify that information independently.`,
  },
  {
    heading: "Governing law",
    text: `These terms are governed by the laws of ${VECTOR_GOVERNING_STATE}, Australia. You submit to the non-exclusive jurisdiction of the courts of ${VECTOR_GOVERNING_STATE}.`,
  },
  {
    heading: "Changes to these terms",
    text: "These terms may be updated as Vector develops. The current version will remain available at this URL with its latest update date.",
  },
  {
    heading: "Contact",
    text: `Questions about these terms can be sent to ${VECTOR_LEGAL_EMAIL}.`,
  },
];

export const VECTOR_PRIVACY_BLOCKS: DocBlock[] = [
  {
    text: `This Privacy Policy explains how Vector, operated by ${VECTOR_LEGAL_OPERATOR}, handles information when you use the service. Effective ${VECTOR_LEGAL_EFFECTIVE_DATE}.`,
  },
  {
    heading: "The short version",
    text: "Vector is designed so the core forms can be used without creating a traditional account. Much of the information you enter may remain in your browser on the device you are using. Paid billing is handled separately by Stripe.",
  },
  {
    heading: "Information you enter",
    text: "Vector may handle information you enter directly into the forms, including referral details, triage information, consultation records, organisation branding and other fields needed to complete or export a document. You should avoid entering identifying or sensitive information unless you genuinely need it for the record you are creating.",
  },
  {
    heading: "Where information is stored",
    text: "Substantial portions of Vector working data are intended to remain locally in your browser on the device being used. Clearing browser data, using a private browsing mode or switching devices may remove locally stored information unless you have exported it elsewhere. Vector does not intentionally maintain a general-purpose server-side database of completed form contents for ordinary free use.",
  },
  {
    heading: "Vector paid and Stripe",
    text: "Vector paid subscriptions are processed by Stripe. When you choose to upgrade, Stripe may collect and process billing details, contact details, payment-method information and ordinary transaction information under Stripe's own privacy practices. Vector stores only the identifiers needed to verify whether the current browser session is entitled to paid features. Form contents and exported document data are not intentionally placed into Stripe customer or subscription metadata.",
  },
  {
    heading: "Cookies and session identifiers",
    text: "Vector may use secure, HTTP-only cookies or similar browser session mechanisms to remember billing entitlement, protect checkout flows and keep paid features available during an authorised session. These are used to operate the service, not for advertising or cross-site tracking.",
  },
  {
    heading: "Hosting and technical information",
    text: "Like any website or web application, Vector is delivered through internet infrastructure that may process ordinary request information such as IP address, browser type, requested URL, timestamps and technical error information for security, delivery and troubleshooting. Vector does not intentionally include ordinary form field values in those delivery requests.",
  },
  {
    heading: "Sharing and sale of information",
    text: `${VECTOR_LEGAL_OPERATOR} does not sell personal information. Information is shared with service providers only where necessary to operate the requested functionality, including Stripe and hosting providers such as Cloudflare.`,
  },
  {
    heading: "Your responsibilities",
    text: "If you use Vector in professional practice, you remain responsible for your organisation's privacy, record-keeping and information-security obligations, including decisions about what information to enter, export, store or share.",
  },
  {
    heading: "Removing your data",
    text: "You can remove locally stored Vector data through your browser or device settings. Cancelling a paid subscription stops future renewal through Stripe but does not by itself erase locally stored form information.",
  },
  {
    heading: "Changes to this policy",
    text: "This policy may be updated when Vector's features or data practices change. The current version will remain available at this URL with its latest update date.",
  },
  {
    heading: "Contact",
    text: `Privacy questions can be sent to ${VECTOR_PRIVACY_EMAIL}.`,
  },
];

export const VECTOR_TERMS_METADATA = {
  title: "Terms — Vector by WhatBit",
  description: "Terms of Service for Vector by WhatBit.",
  eyebrow: "VECTOR · TERMS",
  titleText: "Terms of Service",
  lede: `Effective ${VECTOR_LEGAL_EFFECTIVE_DATE}. These terms apply to your use of Vector.`,
};

export const VECTOR_PRIVACY_METADATA = {
  title: "Privacy — Vector by WhatBit",
  description: "Privacy Policy for Vector by WhatBit.",
  eyebrow: "VECTOR · PRIVACY",
  titleText: "Privacy Policy",
  lede: `Effective ${VECTOR_LEGAL_EFFECTIVE_DATE}. How Vector handles information when you use the service.`,
};
