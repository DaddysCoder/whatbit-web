import type { Metadata } from "next";
import { DocPage } from "@/components/DocPage";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy — WhatBit",
  description: "How WhatBit and Primitive AI handle personal information, privacy, security, retention and complaints.",
};

export default function Page() {
  return (
    <DocPage
      eyebrow="PRIVACY POLICY"
      title="Privacy, without the mystery."
      lede="WhatBit is operated by Primitive AI Labs Limited (trading as Primitive AI). This notice explains how personal information is handled across the WhatBit website and services. Effective 26 August 2026."
      blocks={[
        {
          heading: "Our approach",
          text: "Primitive AI respects the privacy of people whose information it handles. We aim to collect only information reasonably required for a legitimate business, project or service purpose, and we use the Australian Privacy Principles as an appropriate benchmark for responsible personal-information handling where relevant to our activities.",
        },
        {
          heading: "Information you give us",
          text: "If you use the WhatBit contact form, we collect the name, email address, contact reason and message you choose to provide. If you contact us another way, we receive the information contained in that communication. Individual WhatBit products may collect or process additional information where their features require it; where that is material, the product will provide its own privacy information.",
        },
        {
          heading: "Why we use it",
          text: "We use information we receive to respond to enquiries, provide and support our products and services, manage client or commercial relationships, maintain security, troubleshoot problems, meet legal or contractual obligations, and improve the reliability and usefulness of our services. We do not sell personal information.",
        },
        {
          heading: "Contact-form delivery",
          text: "Messages submitted through the WhatBit contact form are sent to Primitive AI using an email-delivery service. The information in the form is transmitted for that purpose and may be processed by the relevant technology provider as necessary to deliver the message. Please do not include passwords, API keys, payment-card numbers, health information or other highly sensitive information in an ordinary website enquiry unless it is genuinely necessary and you are authorised to provide it.",
        },
        {
          heading: "Technical information",
          text: "Like most websites, our hosting and security infrastructure may process ordinary technical information needed to deliver and protect the site, such as IP address, browser and device information, requested pages, timestamps, security events and technical errors. We do not intentionally place contact-form message contents in public URLs.",
        },
        {
          heading: "Third-party services and overseas processing",
          text: "We use technology providers for functions such as hosting, security, communications and, for some products, payment processing. Some providers may process or store limited business, contact or technical information outside Australia. We consider the nature of the information, provider terms, privacy and security controls, and the purpose of the service when selecting and using providers.",
        },
        {
          heading: "Security",
          text: "We use reasonable technical and organisational safeguards proportionate to the information involved, including access controls, secure transport, strong authentication where supported, careful supplier selection and information minimisation. No website, device, transmission method or storage system can be guaranteed to be completely secure.",
        },
        {
          heading: "Retention and deletion",
          text: "We do not keep personal information indefinitely merely because storage is available. Information may be retained for as long as reasonably needed to respond to an enquiry, provide a service, maintain appropriate business records, meet legal or contractual obligations, manage disputes, or protect security. When information is no longer reasonably required, secure deletion or de-identification is considered where appropriate.",
        },
        {
          heading: "Access and correction",
          text: `You can ask us about personal information we hold about you, or request correction where appropriate, by contacting ${CONTACT_EMAIL}. Some requests may be subject to lawful exceptions or practical limits depending on the information involved.`,
        },
        {
          heading: "Privacy incidents",
          text: "Suspected privacy or security incidents are assessed promptly. Where the Notifiable Data Breaches scheme or another legal notification requirement applies, Primitive AI will assess the incident and make required notifications.",
        },
        {
          heading: "Complaints and questions",
          text: `Privacy concerns or complaints can be sent to ${CONTACT_EMAIL}. We will review them in good faith and handle them proportionately. Our adopted Complaints and Feedback Handling Policy aims to acknowledge substantive complaints within 2 business days where practicable and resolve ordinary complaints within 10 business days where reasonably practicable.`,
        },
        {
          heading: "Changes to this notice",
          text: "We may update this notice when our products, technology providers, information practices or legal obligations materially change. The current version will remain available on this page.",
        },
      ]}
      cta={{ href: "/contact", label: "Contact WhatBit →" }}
    />
  );
}
