import type { Metadata } from "next";
import { DocPage } from "@/components/DocPage";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use — WhatBit",
  description: "Terms for the WhatBit website and general WhatBit services.",
};

export default function Page() {
  return (
    <DocPage
      eyebrow="TERMS OF USE"
      title="The useful rules."
      lede="WhatBit is a brand operated by Primitive AI Labs Limited (trading as Primitive AI), ABN 45 537 386 346, ACN 701 195 708. These terms apply to the WhatBit website and general WhatBit services unless a product-specific set of terms or signed client agreement applies."
      blocks={[
        {
          heading: "Website information",
          text: "The website describes WhatBit, products, experiments and services. Pages marked beta, preview, in development, prototype or similar may change and should not be treated as a promise of finished functionality. We aim to keep material information accurate but do not guarantee every page is complete or error-free.",
        },
        {
          heading: "Accounts and access",
          text: "Some products may be usable without an account; others may require an account, session identifier or third-party sign-in. You are responsible for safeguarding your authorised access method and for activity carried out through it. Product-specific account rules prevail where they are more precise.",
        },
        {
          heading: "Subscriptions and payment",
          text: "Where a WhatBit product offers a paid subscription, the price and billing period shown before purchase apply. Payment may be processed by Stripe or another identified payment provider. Subscriptions may renew automatically where that is clearly disclosed before purchase. Product-specific terms explain any specific trial, entitlement, billing or account behaviour.",
        },
        {
          heading: "Cancellation",
          text: "Recurring subscriptions can be cancelled using the method provided for the relevant product or payment account. Unless product-specific terms state otherwise, cancellation prevents future renewal and paid access may continue until the end of the period already paid for.",
        },
        {
          heading: "Refunds and Australian Consumer Law",
          text: "Nothing in these terms excludes, restricts or modifies rights or remedies under the Australian Consumer Law or another law that cannot lawfully be excluded. If a product or service fails to meet an applicable consumer guarantee, you may be entitled to a remedy. Other refund requests are handled according to the applicable product or client terms and the circumstances.",
        },
        {
          heading: "Acceptable use",
          text: "Do not misuse WhatBit services, attempt unauthorised access, interfere with operation, knowingly introduce malicious material, use the services for unlawful or harmful activity, overload or scrape services in a way that materially disrupts them, or access information you are not authorised to access.",
        },
        {
          heading: "Your information and content",
          text: "You are responsible for information and content you provide and must have the right to provide it. WhatBit does not claim ownership of your client or project content merely because a tool processes it. Product-specific privacy and storage behaviour is described in the applicable privacy notice; do not assume every WhatBit product handles data in the same way.",
        },
        {
          heading: "Intellectual property",
          text: "WhatBit products, software, designs, documentation, templates, branding and other materials are protected by intellectual-property laws. Except for rights expressly granted by a product licence, subscription or client agreement, no ownership is transferred. Open-source and third-party components remain subject to their applicable licences and terms.",
        },
        {
          heading: "Professional and high-impact use",
          text: "WhatBit tools may support documentation, workflow, analysis, planning or professional work, but they do not replace professional judgement, legal advice, clinical advice, regulatory obligations, supervision or emergency services unless a specific service expressly states otherwise. Users remain responsible for reviewing outputs before relying on them in a high-impact context.",
        },
        {
          heading: "AI-assisted features",
          text: "Some products or services may use AI-assisted functionality. AI can produce incorrect, incomplete or biased outputs. Material outputs should be reviewed proportionate to their use. Product-specific notices will describe material AI and data handling where relevant. Do not provide restricted information to a feature unless its use is authorised and appropriate.",
        },
        {
          heading: "Accessibility",
          text: `WhatBit aims to design with accessibility in mind and uses current WCAG guidance as a reference where relevant. We do not claim certification or full conformance unless a specific product has evidence supporting that claim. Accessibility feedback can be sent to ${CONTACT_EMAIL}.`,
        },
        {
          heading: "Third-party services",
          text: "WhatBit relies on third-party infrastructure and services for functions such as hosting, security, payments, communications or product integrations. Those services may have their own terms and privacy practices. We are not responsible for third-party systems outside our reasonable control, while remaining responsible for obligations that law does not allow us to exclude.",
        },
        {
          heading: "Availability and changes",
          text: "Services may be updated, improved, suspended or changed as products develop, technology changes or maintenance is required. We do not guarantee uninterrupted or error-free operation. For paid services, material changes to core paid functionality will be handled consistently with applicable product terms, law and reasonable notice where appropriate.",
        },
        {
          heading: "Liability",
          text: "To the maximum extent permitted by law, Primitive AI is not liable for losses arising solely from user-entered information, misuse, unauthorised modification, third-party outages, local data loss or use contrary to instructions where the loss could not reasonably have been prevented by us. Nothing in these terms limits liability that cannot lawfully be limited.",
        },
        {
          heading: "Privacy and communications",
          text: `Our Privacy Policy explains how the WhatBit website handles personal information. Product-specific privacy notices may apply to individual products. Contact: ${CONTACT_EMAIL}.`,
        },
        {
          heading: "Complaints",
          text: `Complaints about service, billing, accessibility, privacy or another WhatBit matter can be sent to ${CONTACT_EMAIL} or submitted through the contact form and will be handled under the Primitive AI complaints framework.`,
        },
        {
          heading: "Changes to these terms",
          text: "We may update these terms as WhatBit changes. The current version will remain published here. If a change materially affects an existing paid subscription, we will take reasonable steps to provide notice where required.",
        },
        {
          heading: "Governing law",
          text: "These terms are governed by the laws of Western Australia, Australia, and you submit to the non-exclusive jurisdiction of the courts of Western Australia.",
        },
      ]}
      cta={{ href: "/contact", label: "Questions about these terms →" }}
    />
  );
}
