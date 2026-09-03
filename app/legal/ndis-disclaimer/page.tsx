import type { Metadata } from "next";
import { DocPage } from "@/components/DocPage";

export const metadata: Metadata = {
  title: "NDIS, Clinical Content & Pricing Disclaimer — WhatBit",
  description:
    "WhatBit's independence from the NDIA and NDIS Commission, and how clinical content and NDIS pricing information should be used.",
};

export default function Page() {
  return (
    <DocPage
      eyebrow="NDIS, CLINICAL CONTENT & PRICING DISCLAIMER"
      title="Independent of the NDIA, and not a substitute for professional judgement."
      blocks={[
        {
          text: "WhatBit is an independent platform and is not affiliated with, endorsed by, sponsored by, or operated by the National Disability Insurance Agency (NDIA), the NDIS Quality and Safeguards Commission, or the National Disability Insurance Scheme (NDIS).",
        },
        {
          text: "WhatBit may provide templates, assessment tools, prompts, reference materials and workflow support relevant to disability services, behaviour support and allied health practice. This may include content informed by publicly available NDIS and NDIS Commission guidance, practice standards, behaviour support requirements and other regulatory materials.",
        },
        {
          text: "These resources are designed to support professional practice and documentation. They do not replace a practitioner's professional judgement, clinical assessment, organisational procedures, supervision, legal obligations, or responsibility to ensure that services and documentation comply with current legislation, regulatory requirements and applicable professional standards.",
        },
        {
          text: "Where WhatBit provides behaviour support, restrictive practice or risk-related assessment tools, users remain responsible for determining whether the tool is appropriate for the individual, completing sufficient assessment, verifying information, exercising professional judgement and meeting any applicable authorisation, consent, reporting, review and safeguarding requirements.",
        },
        {
          text: "Where WhatBit displays NDIS-related pricing, support items, limits or claiming information, this information is derived from publicly available NDIA pricing materials, including the NDIS Pricing Arrangements and Price Limits and associated Support Catalogue.",
        },
        {
          text: "NDIS pricing, policy, guidance and regulatory requirements may change. WhatBit identifies the source and/or version of reference information used where practicable, but users should verify current requirements against the latest official NDIA and NDIS Commission publications before relying on the information for clinical, regulatory, billing, claiming or service-delivery decisions.",
        },
      ]}
      cta={{ href: "/contact", label: "Questions about this disclaimer →" }}
    />
  );
}
