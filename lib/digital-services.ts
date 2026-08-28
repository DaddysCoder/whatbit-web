/** Approved copy from the Digital Services design handoff. Do not rewrite. */

export const DS_STEPS = [
  {
    n: "01",
    title: "Understand",
    body: "Clarify the audience, objectives, constraints, source information, accessibility requirements and measures of success.",
    artefact: "Brief",
  },
  {
    n: "02",
    title: "Structure",
    body: "Turn complex information, service steps or consultation requirements into a clear user journey and content model.",
    artefact: "Journey map",
  },
  {
    n: "03",
    title: "Design",
    body: "Prototype the experience early so people can test the logic before the project commits to unnecessary build complexity.",
    artefact: "Prototype",
  },
  {
    n: "04",
    title: "Build",
    body: "Develop responsive, maintainable digital products using technologies appropriate to the scope, risk and operating environment.",
    artefact: "Working build",
  },
  {
    n: "05",
    title: "Test",
    body: "Test functionality, content, accessibility, devices, browsers and real user pathways against the agreed requirements.",
    artefact: "Test record",
  },
  {
    n: "06",
    title: "Hand over",
    body: "Provide source assets, practical documentation, training and a clear path for ongoing maintenance or support.",
    artefact: "Handover pack",
  },
] as const;

export const DS_FLOW = [
  {
    n: "01",
    title: "Invite",
    body: "Use clear, audience-appropriate invitations that explain the purpose, timing and ways to take part.",
  },
  {
    n: "02",
    title: "Participate",
    body: "Offer accessible survey, feedback or guided-response pathways with clear consent and privacy information.",
  },
  {
    n: "03",
    title: "Understand",
    body: "Bring qualitative and quantitative input into a structure that supports careful analysis without erasing context.",
  },
  {
    n: "04",
    title: "Decide",
    body: "Connect the findings to documented criteria, responsibilities and decision points.",
  },
  {
    n: "05",
    title: "Report back",
    body: "Communicate what was heard, what changed, what did not change and what happens next.",
  },
] as const;

export const DS_SERVICES = [
  {
    title: "Web & digital products",
    body: "Websites and digital services that help people find their way, understand what matters and complete the task they came to do.",
    items: [
      "Website design, development and user experience",
      "Interactive tools and guided user journeys",
      "Responsive implementation across devices",
      "Hosting, maintenance and support options",
      "Information-led digital service design",
      "Technology choices matched to the project, team and long-term maintenance needs",
    ],
  },
  {
    title: "Engagement & participation",
    body: "Digital participation should be easy to enter, clear about its purpose and useful after responses have been collected.",
    items: [
      "Online consultation and feedback pathways",
      "Accessible surveys and response systems",
      "Interactive and structured feedback experiences",
      "Community-facing digital tools",
      "Stakeholder engagement workflows",
      "Reporting-back pathways that show people what happened next",
    ],
  },
  {
    title: "Accessible information",
    body: "Accessibility changes how information is structured, presented and acted on. We build it into the product from the beginning.",
    items: [
      "WCAG-informed design and testing",
      "Plain-language structure and information-first routes",
      "Semantic and keyboard-accessible interfaces",
      "Accessible digital content and document production",
      "Captions and transcripts where appropriate",
      "Reduced-motion and low-bandwidth alternatives",
      "Cognitive and communication accessibility considerations",
      "Alternative ways to receive information or provide a response",
    ],
  },
  {
    title: "Content & communication",
    body: "Clear content is part of the system. We plan what needs to be said, where it belongs, how it will be maintained and what the reader needs to do next.",
    items: [
      "Communications strategy and planning",
      "Information architecture and content models",
      "Copywriting, editing and public-facing content",
      "Complex information shaped into usable formats",
      "Content workflows, ownership and governance",
      "Reusable content patterns for changing information",
    ],
  },
] as const;

/**
 * The design HTML referenced eight operating conditions but omitted the array
 * from its script. These eight lines are reconstructed from approved adjacent
 * copy on the same page (accessibility, public-sector, engagement, handover).
 * Replace if the designer supplies the original list.
 */
export const DS_CONDITIONS = [
  "Multiple reviewers, approval pathways and change control that affect how the work moves.",
  "Content that must stay accurate and maintainable after the launch team has moved on.",
  "Users with mixed digital confidence, assistive technology and smaller screens.",
  "Accessibility requirements agreed up front and tested with documented evidence.",
  "Privacy and data-handling decisions matched to the service being delivered.",
  "Low-bandwidth access and non-animated alternatives where they are needed.",
  "Public and community-facing work that has to be understandable and defensible.",
  "Handover to client teams who will own updates, documentation and ongoing support.",
] as const;

export const DS_A11Y_ITEMS = [
  "Semantic structure and meaningful reading order",
  "Keyboard-accessible controls and visible focus states",
  "Clear labels, instructions, errors and next steps",
  "Captions, transcripts and text alternatives where appropriate",
  "Reduced-motion options and non-animated alternatives",
  "Plain-language pathways and usable content hierarchy",
  "Options for low-bandwidth access and smaller screens",
  "Accessibility testing, remediation and content-authoring guidance for client teams",
] as const;

export const DS_PUBLIC_ITEMS = [
  "Clear scope, deliverables, dependencies and acceptance points",
  "Probity-aware project communication and auditable decisions",
  "Version control and structured stakeholder review",
  "Privacy and data-handling decisions matched to the service",
  "Accessibility requirements defined before build",
  "Transparent change control and approval pathways",
  "Maintainable deliverables with clear ownership",
  "Documentation that supports future staff and suppliers",
] as const;

export const DS_SUPPORT_ITEMS = [
  "Bug and defect rectification",
  "Planned maintenance and content updates",
  "Accessibility review and remediation",
  "Platform and security updates where applicable",
  "Analytics, service review and improvement recommendations",
  "Staff training and accessible content-authoring guidance",
  "Technical and content documentation",
  "Source-asset handover and agreed ongoing support options",
] as const;

export type WorkExample = {
  image: string;
  alt: string;
  badge: string;
  badgeTone: "concept" | "neutral";
  title: string;
  body: string;
  footer: "nolink" | "products";
};

export const DS_WORK: WorkExample[] = [
  {
    image: "/assets/ds/i-choose-how.png",
    alt: "I Choose How prototype offering Read it, Listen to it, Show me, Help me and more-time format choices.",
    badge: "PROTOTYPE / CONCEPT",
    badgeTone: "concept",
    title: "I Choose How",
    body: "An interaction concept exploring participant-controlled format choice, supported responses and different ways to receive and provide information. It demonstrates how accessibility can change the structure of an experience, not just its visual layer.",
    footer: "nolink",
  },
  {
    image: "/assets/ds/support-shift.png",
    alt: "Support Shift prototype presenting four possible staff responses at a branching scenario.",
    badge: "FOUNDER-BUILT INTERACTIVE PROTOTYPE",
    badgeTone: "concept",
    title: "Support Shift",
    body: "A branching interaction prototype that turns structured information into guided pathways. It demonstrates clear choices, purposeful interaction and support for users who may need different routes through the same information.",
    footer: "nolink",
  },
  {
    image: "/assets/ds/newman-map.png",
    alt: "Illustrative Newman map interface with concept, upgrade and existing-asset locations clearly differentiated.",
    badge: "INDEPENDENT ILLUSTRATIVE CONCEPT — NOT COMMISSIONED CLIENT WORK",
    badgeTone: "neutral",
    title: "Newman: Now and Next",
    body: "Created in a tender context to demonstrate place-based digital storytelling, maps, guided narratives and accessible alternatives. It is included as a design and prototyping example only; it is not a government or council case study.",
    footer: "nolink",
  },
  {
    image: "/assets/ds/products-montage.png",
    alt: "Pace, Trace and Frame product interfaces shown together.",
    badge: "PRODUCT PORTFOLIO",
    badgeTone: "concept",
    title: "WhatBit products",
    body: "Our product work demonstrates the same core approach: turning operational complexity into clear, responsive workflows with structured information and purposeful interaction. Individual product pages show what each product does and its current stage.",
    footer: "products",
  },
];