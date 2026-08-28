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
    text: `These Terms of Use apply to your access and use of Vector, a WhatBit forms product operated by ${VECTOR_LEGAL_OPERATOR} ("we", "us" or "our"). By accessing or using Vector, you agree to these Terms of Use. If you do not agree, do not use Vector.`,
  },
  {
    heading: "What Vector is",
    text: "Vector provides structured online forms for referral, practitioner triage, and source and consultation records. It helps organise information into usable records and exports. Vector is a documentation and workflow tool only. It is not legal, clinical, medical, NDIS compliance, employment, or other professional advice, and it does not replace professional judgement, supervision, or the policies of your organisation.",
  },
  {
    heading: "Free and paid features",
    text: "Vector Free lets you use the three launch forms online without a subscription: Referral, Practitioner Triage, and Source and Consultation Register. You can complete those forms in the browser without creating a traditional account. Vector paid is an optional subscription that unlocks finished-document features, including DOCX export, print or save as PDF, organisation branding, saved company details, and access to the support template library. The features available on each tier may be updated over time, but we will keep the core purpose of the free and paid tiers substantially consistent.",
  },
  {
    heading: "Subscription price",
    text: "The current advertised Vector subscription price is A$9 per month unless a different price is clearly shown to you in Stripe Checkout before you purchase. Prices are shown in Australian dollars and include GST where applicable. Subscriptions renew automatically each billing period until cancelled. We may offer promotional or introductory pricing from time to time; any such pricing will be shown clearly before you subscribe.",
  },
  {
    heading: "Payment processing",
    text: "Vector paid subscriptions are processed by Stripe. When you choose to upgrade, you are redirected to Stripe Checkout or the Stripe customer portal to enter payment details and manage billing. We do not store full payment card numbers on our systems. Stripe collects and processes billing details, contact details, payment-method information, and ordinary transaction records under Stripe's own terms and privacy practices. Your use of Stripe is also subject to Stripe's terms and policies.",
  },
  {
    heading: "Cancelling your subscription",
    text: "You can manage or cancel an active Vector paid subscription through the Stripe customer portal linked from Vector. Cancellation takes effect at the end of the current paid billing period unless Stripe or your bank processes the change differently. After cancellation, you retain access to paid features until the end of the period you have already paid for, and you can continue using Vector Free features afterwards. Cancelling a subscription does not by itself remove locally stored form information in your browser.",
  },
  {
    heading: "Refunds and Australian Consumer Law",
    text: `Nothing in these Terms of Use excludes, restricts, or modifies any rights or remedies you may have under the Australian Consumer Law or other applicable law that cannot lawfully be excluded. If Vector paid fails to meet a consumer guarantee under the Australian Consumer Law, you may be entitled to a remedy such as a refund, replacement, or compensation. Refund requests outside those statutory rights are handled case by case at our discretion. Contact us at ${VECTOR_LEGAL_EMAIL} if you believe a subscription charge was made in error.`,
  },
  {
    heading: "Practitioner responsibility",
    text: "If you use Vector in professional practice, you remain responsible for the information you enter, the records you create, and any document you export, print, share, or submit. You must have the right to use any information you provide and must not use Vector to unlawfully collect, store, or disclose another person's information. Review exported records for accuracy, completeness, and appropriateness before relying on them. Vector does not verify your entries, approve your documents, or confirm that a record meets any professional, regulatory, contractual, or funding requirement.",
  },
  {
    heading: "No emergency or crisis service",
    text: "Vector is not an emergency, crisis, or urgent-help service. It is not monitored for emergencies and cannot dispatch help. If you or someone else is in immediate danger, contact emergency services on 000 in Australia or use an appropriate local emergency number. Do not use Vector to communicate time-critical safety concerns.",
  },
  {
    heading: "Regulatory information",
    text: "Vector may be used in contexts where practitioners work under professional, funding, or regulatory obligations, including in disability, health, education, or human-services settings. Vector does not determine whether a particular form, export, or workflow satisfies any external rule, standard, audit requirement, or scheme condition. You remain responsible for knowing and meeting the obligations that apply to your role, organisation, and jurisdiction.",
  },
  {
    heading: "Participant and client information",
    text: "Vector forms may invite you to enter information about participants, clients, families, staff, or other individuals. Enter only information you genuinely need for the record you are creating and that you are authorised to handle. Avoid entering identifying or sensitive information unless necessary for your professional purpose. You are responsible for deciding what to record, export, store elsewhere, and share outside Vector.",
  },
  {
    heading: "Local storage and loss of data",
    text: "Vector is designed so substantial working data can remain in the browser on the device you are using. You are responsible for device access, backups where needed, and any professional record-keeping obligations that apply to you. Clearing browser data, using private browsing, switching browsers or devices, or uninstalling software may remove locally stored information unless you have exported or backed it up elsewhere. We do not intentionally maintain a general-purpose server-side database of completed form contents for ordinary free use.",
  },
  {
    heading: "Accounts and paid access",
    text: "You can start using Vector Free without creating a traditional account. For Vector paid, we use a server-generated account identifier linked to your browser session through a secure, HTTP-only cookie so paid features can be recognised during an authorised session. Until full sign-in is added, paid access is tied to that browser session rather than to an email address alone. An email address by itself is not proof that someone owns a paid subscription.",
  },
  {
    heading: "Acceptable use",
    text: "You must not misuse Vector, attempt to bypass its security, interfere with its operation, probe or scan it for vulnerabilities, access data you are not authorised to access, reverse engineer it except where permitted by law, or use the service for unlawful, harmful, misleading, or abusive activity. You must not use Vector to build competing datasets, scrape the service, or overload its infrastructure.",
  },
  {
    heading: "Your content",
    text: "You retain responsibility for information and materials you enter into Vector, configure for export, or generate through the service, including organisation branding and saved company details. You grant us a limited licence to host, process, transmit, and display that information only as needed to operate Vector and provide the features you request, such as export, billing verification, and technical delivery. We do not claim ownership of your form contents or exported documents.",
  },
  {
    heading: "Vector intellectual property",
    text: `Vector, its software, design, documentation, templates, and other materials made available by ${VECTOR_LEGAL_OPERATOR} or WhatBit are protected by intellectual property laws. Except for the limited right to use Vector according to these Terms of Use, no licence is granted to you. You must not copy, modify, distribute, sell, or create derivative works from Vector except as permitted by law or with our written permission.`,
  },
  {
    heading: "Availability and maintenance",
    text: `Vector is provided on an as-available basis and may contain errors or experience interruptions because of maintenance, updates, network issues, browser limitations, third-party services, or events outside our reasonable control. To the extent permitted by law, ${VECTOR_LEGAL_OPERATOR} does not guarantee that Vector will always be available, error-free, or appropriate for every professional or commercial purpose.`,
  },
  {
    heading: "Product changes",
    text: `${VECTOR_LEGAL_OPERATOR} may update, improve, temporarily suspend, or change Vector as the product develops, including where third-party services, security requirements, browser capabilities, or laws change. We may add, modify, or remove features. Where a change materially reduces core functionality of a paid feature you rely on, we will take reasonable steps to preserve the essential purpose of the paid tier or provide notice where practicable.`,
  },
  {
    heading: "Price changes",
    text: "We may change subscription prices for new purchases or renewals. If a price change affects an existing subscription, we will give you reasonable notice before it applies to a renewal and you may cancel before the new price takes effect. The price shown to you in Stripe Checkout before purchase is the price that applies to that purchase.",
  },
  {
    heading: "Third-party services",
    text: "Vector relies on third-party services to operate, including Stripe for billing and Cloudflare and other hosting or delivery providers for internet infrastructure. Those providers may process information under their own terms and policies. We are not responsible for third-party services outside our reasonable control, but we choose providers that help us deliver Vector securely and reliably.",
  },
  {
    heading: "Disclaimer and liability",
    text: `To the extent permitted by law, ${VECTOR_LEGAL_OPERATOR} is not responsible for losses arising solely from reliance on user-entered information, exported documents, third-party services, service interruptions, local data loss, or changes to product features where users should reasonably verify information independently. Nothing in these Terms of Use limits liability that cannot lawfully be limited, including under the Australian Consumer Law.`,
  },
  {
    heading: "Suspension or termination",
    text: `We may suspend or terminate access to Vector, including paid access, if you materially breach these Terms of Use, misuse the service, create risk for us or others, or where required by law or a competent authority. Where reasonable, we will give notice before suspension or termination, but we may act immediately where necessary to protect people, systems, or legal compliance. You may stop using Vector at any time.`,
  },
  {
    heading: "Changes to these Terms",
    text: "We may update these Terms of Use as Vector develops. The current version will remain available at this URL with its latest update date. If we make a material change, we will take reasonable steps to bring it to your attention. Continued use of Vector after an update takes effect means you accept the updated Terms of Use.",
  },
  {
    heading: "Governing law",
    text: `These Terms of Use are governed by the laws of ${VECTOR_GOVERNING_STATE}, Australia. You submit to the non-exclusive jurisdiction of the courts of ${VECTOR_GOVERNING_STATE}.`,
  },
  {
    heading: "Contact",
    text: `Questions about these Terms of Use can be sent to ${VECTOR_LEGAL_EMAIL}.`,
  },
];

export const VECTOR_PRIVACY_BLOCKS: DocBlock[] = [
  {
    text: `This Privacy Policy explains how Vector, operated by ${VECTOR_LEGAL_OPERATOR} on behalf of WhatBit ("we", "us" or "our"), handles information when you use the service. Effective ${VECTOR_LEGAL_EFFECTIVE_DATE}.`,
  },
  {
    heading: "Information entered into Vector forms",
    text: "Vector may handle information you enter directly into the forms, including referral details, triage information, consultation records, organisation branding, saved company details, and other fields needed to complete or export a document. You control what you enter. We do not intentionally use ordinary form field values for advertising, cross-site tracking, or unrelated profiling.",
  },
  {
    heading: "Local browser storage",
    text: "Substantial portions of Vector working data are intended to remain locally in your browser on the device being used. This may include draft form values, branding preferences, and similar working state. Clearing browser data, using a private browsing mode, or switching devices may remove locally stored information unless you have exported it elsewhere. Vector does not intentionally maintain a general-purpose server-side database of completed form contents for ordinary free use.",
  },
  {
    heading: "Information WHATBIT may collect",
    text: `${VECTOR_LEGAL_OPERATOR}, as operator of Vector for WhatBit, may collect limited information needed to run the service, process subscriptions, respond to support requests, maintain security, and improve reliability. This may include account identifiers, billing-related metadata, support messages, and technical delivery information. We do not sell personal information.`,
  },
  {
    heading: "Billing information",
    text: "Vector paid subscriptions are processed by Stripe. When you choose to upgrade, Stripe may collect and process billing details, contact details, payment-method information, and ordinary transaction information under Stripe's own privacy practices. We store only the identifiers and subscription metadata needed to verify whether the current browser session is entitled to paid features. Form contents and exported document data are not intentionally placed into Stripe customer or subscription metadata.",
  },
  {
    heading: "Organisation branding",
    text: "If you use paid organisation branding features, Vector may store branding settings such as organisation name, colours, contact line, footer text, and related export preferences so they can be applied to documents you generate. Logo or image uploads, if offered, are stored only as needed to provide the branding feature. You should not upload branding assets you do not have the right to use.",
  },
  {
    heading: "Technical information",
    text: "Like any website or web application, Vector is delivered through internet infrastructure that may process ordinary request information such as IP address, browser type, requested URL, timestamps, referrer, and technical error information for security, delivery, and troubleshooting. Vector does not intentionally include ordinary form field values in those delivery requests.",
  },
  {
    heading: "Support communications",
    text: `If you contact us about Vector, we collect the information you choose to provide, such as your name, email address, message content, and any attachments or screenshots needed to investigate the issue. We use that information to respond, maintain records of the enquiry, and improve the service. Support messages may be retained for a reasonable period.`,
  },
  {
    heading: "Why we use personal information",
    text: "We use personal information to provide and operate Vector, verify paid entitlements, process billing through Stripe, maintain security, troubleshoot errors, respond to enquiries, comply with law, and improve reliability. We use it only for purposes connected to operating Vector or related WhatBit services, not for unrelated marketing unless you separately consent.",
  },
  {
    heading: "Third-party service providers",
    text: "We share information with service providers only where necessary to operate the requested functionality. This includes Stripe for subscription billing and payment processing and Cloudflare and similar providers for hosting, content delivery, security, and performance. Those providers handle information under their own terms and privacy policies and are permitted to use it only to provide services to us or as otherwise required by law.",
  },
  {
    heading: "Overseas processing",
    text: "Some of our service providers, including Stripe and Cloudflare, may process or store information outside Australia. Where information is handled overseas, we take reasonable steps to ensure that providers handle it in a way that is consistent with applicable privacy requirements and the purpose for which it was collected.",
  },
  {
    heading: "Security",
    text: "We use reasonable technical and organisational measures designed to protect information handled by Vector, including secure transport, access controls, and careful use of third-party providers. No method of transmission or storage is completely secure. You are responsible for securing the devices and browsers you use to access Vector and for decisions about what information you enter, export, or share.",
  },
  {
    heading: "Data retention",
    text: "We retain information only for as long as needed to operate Vector, meet legal obligations, resolve disputes, and maintain billing and support records. Subscription and billing metadata may be retained for accounting and audit purposes. Locally stored form information remains on your device until you remove it through your browser or device settings.",
  },
  {
    heading: "Access and correction",
    text: `You may request access to personal information we hold about you and ask us to correct information that is inaccurate, out of date, incomplete, irrelevant, or misleading, subject to exceptions under applicable law. Because much Vector working data may remain in your browser, you can also review, edit, or remove much of it directly in Vector or through your browser settings. Contact ${VECTOR_PRIVACY_EMAIL} to make a request.`,
  },
  {
    heading: "Privacy complaints",
    text: `If you have a concern about how we have handled personal information, contact us at ${VECTOR_PRIVACY_EMAIL} and we will try to resolve it. If you are not satisfied with our response, you may be able to complain to the Office of the Australian Information Commissioner (OAIC) or another relevant regulator.`,
  },
  {
    heading: "Data breaches",
    text: "If we become aware of a data breach involving personal information that we hold and that is likely to result in serious harm, we will assess the breach and, where required by law, notify affected individuals and relevant regulators. Our response will depend on the nature of the incident and our legal obligations at the time.",
  },
  {
    heading: "Children and participant information",
    text: "Vector is a professional documentation tool, not a service directed at children for personal use. If you enter information about children, young people, or other participants in the course of professional work, you remain responsible for having a lawful basis to collect and handle that information and for meeting the privacy and record-keeping obligations that apply to your organisation.",
  },
  {
    heading: "Changes to this Policy",
    text: "We may update this Privacy Policy when Vector's features or data practices change. The current version will remain available at this URL with its latest update date. If we make a material change, we will take reasonable steps to bring it to your attention.",
  },
  {
    heading: "Contact",
    text: `Privacy questions can be sent to ${VECTOR_PRIVACY_EMAIL}.`,
  },
];

export const VECTOR_TERMS_METADATA = {
  title: "Terms — Vector by WhatBit",
  description: "Terms of Use for Vector by WhatBit.",
  eyebrow: "VECTOR · TERMS",
  titleText: "Terms of Use",
  lede: `Effective ${VECTOR_LEGAL_EFFECTIVE_DATE}. These terms apply to your use of Vector.`,
};

export const VECTOR_PRIVACY_METADATA = {
  title: "Privacy — Vector by WhatBit",
  description: "Privacy Policy for Vector by WhatBit.",
  eyebrow: "VECTOR · PRIVACY",
  titleText: "Privacy Policy",
  lede: `Effective ${VECTOR_LEGAL_EFFECTIVE_DATE}. How Vector handles information when you use the service.`,
};
