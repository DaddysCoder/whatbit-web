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

export type DsService = {
  title: string;
  frontBody: string[];
  backHeading: string;
  backIntro?: string[];
  items: string[];
  backClosing?: string[];
};

export const DS_SERVICES: DsService[] = [
  {
    title: "Web & digital products",
    frontBody: [
      "We design and build digital things that have a job to do.",
      "Public websites, service information, interactive tools, portals and small purpose-built applications — designed around what people need to find, understand or complete.",
      "We work from the information and user journey outwards, rather than starting with a template and trying to squeeze the problem into it.",
    ],
    backHeading: "On the technical side",
    backIntro: ["Depending on the project, we can handle the full build and operating environment, including:"],
    items: [
      "Responsive front-end development",
      "Application and API development",
      "Structured content and CMS implementation",
      "PostgreSQL databases and persistent data storage",
      "Authentication and user access",
      "Secure file handling and uploads",
      "Integrations with existing systems and third-party services",
      "Cloud deployment and infrastructure configuration",
      "Custom domains, DNS and HTTPS",
      "Hosting, backups and environment management",
      "Analytics and operational monitoring",
      "Browser, device and functional testing",
      "Ongoing maintenance, updates and support",
      "Technical documentation and handover",
    ],
    backClosing: [
      "Technology is selected around the job, the level of risk and who needs to maintain it afterwards — not because we have one stack we force onto everything.",
    ],
  },
  {
    title: "Engagement & participation",
    frontBody: [
      "Make it easier for people to have a say — and easier for organisations to do something useful with what they hear.",
      "We design consultation and participation experiences that make the purpose clear, reduce unnecessary friction and give people more practical ways to respond.",
      "That can include community consultation, surveys, submissions, feedback tools, project engagement pages and purpose-built digital participation experiences.",
    ],
    backHeading: "Behind the interaction",
    backIntro: [
      "Good engagement needs more than a form embedded on a webpage. We can design the system around the full participation loop:",
      "Invite → Participate → Understand → Decide → Report back",
      "That can include:",
    ],
    items: [
      "Consultation and engagement pathway design",
      "Online surveys and structured feedback forms",
      "Conditional questions and participant journeys",
      "Anonymous or identified participation models",
      "Consent and privacy considerations",
      "Accessible and mobile-friendly participation",
      "Structured response capture",
      "Data export and analysis-ready outputs",
      "Dashboards or internal review views",
      "Categorisation and thematic organisation of responses",
      "Moderation and submission workflows where required",
      "Acknowledgement and follow-up pathways",
      "Consultation findings and public reporting",
      "Version control and approval processes",
      "Hosting and maintenance of engagement tools",
    ],
    backClosing: [
      "The goal is not simply to collect responses. It is to create a traceable path between what was asked, what people said and what happened next.",
    ],
  },
  {
    title: "Accessible information",
    frontBody: [
      "Important information should not become harder to use because of the way it has been designed or delivered.",
      "We help organisations turn complex information into clearer, more usable digital and accessible-format experiences.",
      "That might mean restructuring a difficult webpage, redesigning a document, building an interactive alternative to a long PDF, or creating several ways for people to access the same information.",
    ],
    backHeading: "Accessibility in the actual build",
    backIntro: [
      "We treat accessibility as part of the content, interaction and technology — not a check at the end.",
      "Depending on the project, that can include:",
    ],
    items: [
      "Accessible information architecture and navigation",
      "Plain-language content restructuring",
      "Semantic HTML and meaningful heading structures",
      "Keyboard-accessible interaction",
      "Screen-reader considerations",
      "Focus states and logical focus order",
      "Colour contrast and non-colour cues",
      "Accessible forms, labels and error states",
      "Captions, transcripts and media alternatives",
      "Reduced-motion considerations",
      "Responsive text and zoom behaviour",
      "Accessible tables and data presentation",
      "Downloadable accessible-format resources",
      "Alternatives to inaccessible PDFs where appropriate",
      "Low-bandwidth and mobile access considerations",
      "Testing against agreed WCAG requirements",
      "Accessibility guidance for future content updates",
    ],
    backClosing: [
      "We can also work with separately scoped qualified providers where specialist translation or interpreting is required.",
      "Accessibility targets and testing requirements are agreed for the project so there is a clear standard to design and build against.",
    ],
  },
  {
    title: "Content & communication",
    frontBody: [
      "Sometimes the technology is fine. The information inside it is the problem.",
      "We help organisations work out what needs to be said, where it belongs and how people should move through it.",
      "That includes large or messy websites, service information, policy-heavy content, public information, project communications and material that has accumulated across different teams and systems over time.",
    ],
    backHeading: "Underneath the words",
    backIntro: ["Content work can include:"],
    items: [
      "Content audits and inventories",
      "Information architecture",
      "Navigation and taxonomy design",
      "Content modelling",
      "Page and content hierarchy",
      "Plain-language rewriting",
      "Web copy and service information",
      "Communications strategy and planning",
      "Audience and user-pathway mapping",
      "Reusable content patterns and templates",
      "Structured content for CMS environments",
      "Metadata and tagging structures",
      "Content migration planning",
      "Duplicated or outdated content identification",
      "Ownership and approval workflows",
      "Publishing governance",
      "Version control",
      "Review and expiry processes",
      "Content standards and writing guidance",
      "Handover documentation and team training",
    ],
    backClosing: [
      "For larger information environments, we can also design the underlying structure so content is easier to search, retrieve, reuse, update and govern rather than continuing to grow as disconnected pages and documents.",
      "The end result should not just read better on launch day. It should be easier for the organisation to keep correct six months later.",
    ],
  },
];

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
  meta: string;
  featured?: boolean;
};

export const DS_WORK: WorkExample[] = [
  {
    image: "/assets/ds/Screenshot 2026-09-03 102022.png",
    alt: "Proof & Path product screen offering to start a case or see how the service works, with a search bar for asking questions and a How it works section below.",
    badge: "PRODUCT / APPLICATION DEVELOPMENT",
    badgeTone: "concept",
    title: "Proof & Path",
    body: "A consumer-navigation product that turns a stressful purchase problem into one clear path: understand, gather, prepare, act, track, escalate. We took Proof & Path from concept through UX, product architecture and a working application, including accounts, evidence handling, document exports, timelines and the privacy and data systems underneath it.",
    meta: "Product strategy · UX & interaction design · Application development · Workflow design · Product architecture · Client handover",
    featured: true,
  },
  {
    image: "/assets/ds/hedland-happenings.png",
    alt: "Hedland Happenings activity result card suggesting a swim at South Hedland Aquatic Centre, with a twist idea and an optional keepsake.",
    badge: "COMMUNITY PROJECT",
    badgeTone: "concept",
    title: "Hedland Happenings",
    body: "Regional communities are full of things to do, but finding useful, current information can still mean jumping between calendars, social pages and word of mouth. Hedland Happenings brings local events and everyday activity ideas into one simple, mobile-first experience designed around the question people actually ask: what can we do today? It combines local information with a guided activity builder, helping turn an ordinary day into something easier to plan, explore and enjoy.",
    meta: "Independent regional community project",
  },
  {
    image: "/assets/ds/i-choose-how.png",
    alt: "I Choose How app screen letting someone choose a topic, such as consent or a service agreement, to explore.",
    badge: "ACCESSIBILITY PROJECT",
    badgeTone: "concept",
    title: "I Choose How",
    body: "Most digital information assumes everyone wants to read, understand and respond in the same way. I Choose How explores a different model: letting the person choose how information is presented and how they want to engage with it. Reading, listening, visual pathways, supported responses and extra time are treated as part of the experience itself — demonstrating how accessibility can shape the structure of a digital service rather than being added after the design is finished.",
    meta: "Accessibility and inclusive interaction design",
  },
  {
    image: "/assets/ds/newman-map.png",
    alt: "Interactive map interface layering current, proposed and future views of a place with guided explanations.",
    badge: "COMMUNITY EXPERIENCE",
    badgeTone: "concept",
    title: "Making change easier to see",
    body: "Community projects can become difficult to understand when plans, existing places, future changes and supporting information are spread across reports and static documents. We built an interactive prototype exploring a clearer way to communicate that story — combining maps, visual layers and guided explanations so people can move between what exists now, what is proposed and what it could mean for the place around them. The concept demonstrates how complex public information can become a more understandable, visual and explorable digital experience.",
    meta: "Place-based digital storytelling prototype",
  },
];