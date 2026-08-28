import type { Metadata } from "next";
import { DocPage } from "@/components/DocPage";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookie & Tracking Notice — WhatBit",
  description: "How WhatBit uses cookies, browser storage and similar technologies.",
};

export default function Page() {
  return (
    <DocPage
      eyebrow="COOKIE & TRACKING NOTICE"
      title="What your browser keeps."
      lede="This notice explains how cookies, browser storage and similar technologies may be used on whatbit.dev and WhatBit products. Different products may use different storage methods, so product-specific notices prevail where they are more precise."
      blocks={[
        {
          heading: "Main WhatBit website",
          text: "The main WhatBit website is primarily an informational and contact website. We do not describe advertising or behavioural tracking as active unless it has actually been implemented. If analytics, advertising pixels or other non-essential tracking are introduced, this notice and any required consent mechanism will be updated before relying on them.",
        },
        {
          heading: "Necessary cookies and browser storage",
          text: "Some website or product features may use cookies, session storage or local storage that are reasonably necessary for functions such as security, session recognition, preferences, paid entitlements or maintaining temporary working state. Blocking necessary storage may prevent parts of a product from working correctly.",
        },
        {
          heading: "Local product data",
          text: "Some WhatBit products are intentionally designed so working information remains in the user's browser rather than being stored in a WhatBit server-side database. Clearing browser data, using private browsing, changing browser or device, or ending a session may remove locally stored information. Product-specific privacy information explains this where material.",
        },
        {
          heading: "Third-party services",
          text: "Third-party services used for functions such as payments, authentication, hosting, communications or embedded content may set or read their own cookies or similar identifiers when their functionality is used. Their handling is subject to their own terms and privacy practices as well as our obligations when selecting and using them.",
        },
        {
          heading: "Analytics and measurement",
          text: "If WhatBit introduces analytics or performance measurement that uses cookies or similar identifiers beyond what is necessary to operate the service, we will describe the tool and purpose accurately and implement any consent or choice mechanism required for the intended use and users.",
        },
        {
          heading: "Your browser controls",
          text: "Most browsers allow you to view, block or delete cookies and site storage. Changing those settings may affect login, preferences, paid access or locally stored working information. Product-specific settings may also be available where relevant.",
        },
        {
          heading: "Questions",
          text: `Questions about cookies, browser storage or tracking can be sent through the WhatBit contact form or to ${CONTACT_EMAIL}.`,
        },
        {
          heading: "Updates",
          text: "We will update this notice when our use of cookies, analytics, advertising technology, authentication, payment tools or browser storage materially changes.",
        },
      ]}
      cta={{ href: "/privacy", label: "Read the Privacy Policy →" }}
    />
  );
}
