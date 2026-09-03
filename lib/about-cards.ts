export type AboutBodyLine = {
  text: string;
  variant?: "p" | "lead" | "italicQuote";
};

export type AboutGridItem = {
  label: string;
  accent: string;
  bg: string;
  radius: string;
  body: string;
};

export type AboutTriadItem = {
  title: string;
  body: string;
  radius: string;
  offset?: number;
};

export type AboutCard =
  | {
      kind: "quote";
      accent: string;
      accentRgb: string;
      lines: [string, string, string];
      quote: string;
      width: string;
      radius: number;
      border: string | null;
    }
  | {
      kind: "grid";
      number: string;
      accent: string;
      accentRgb: string;
      eyebrow: string;
      heading: string;
      body: string[];
      items: AboutGridItem[];
      width: string;
      radius: number;
      border: string | null;
    }
  | {
      kind: "triad";
      number: string;
      accent: string;
      accentRgb: string;
      eyebrow: string;
      heading: string;
      items: AboutTriadItem[];
      width: string;
      radius: number;
    }
  | {
      kind: "story";
      number: string;
      accent: string;
      accentRgb: string;
      eyebrow: string;
      heading: string;
      body: AboutBodyLine[];
      media?: "light" | "dark";
      link?: { label: string; href: string };
      width: string;
      radius: number;
      border: string | null;
    }
  | {
      kind: "founders";
      number: string;
      accent: string;
      accentRgb: string;
      eyebrow: string;
      intro: string[];
      closing: string;
      width: string;
      radius: number;
    };

export const ABOUT_CARDS: AboutCard[] = [
  {
    kind: "quote",
    accent: "#7B2FF7",
    accentRgb: "123,47,247",
    lines: ["FIND", "THE BIT", "THAT MATTERS"],
    quote: "Find the bit that matters.",
    width: "min(480px,80vw)",
    radius: 20,
    border: "1px solid rgba(255,255,255,0.06)",
  },
  {
    kind: "grid",
    number: "01",
    accent: "#1FBFA3",
    accentRgb: "31,191,163",
    eyebrow: "WHAT WE DO",
    heading: "Different problems need different kinds of answers.",
    body: [
      "WhatBit works across products, client projects, research and experiments.",
      "Some projects begin with a specific operational problem and grow into reusable tools. Others stay deliberately small: one workflow improved, one calculation made reliable, one piece of information made easier to understand.",
      "We are less interested in which category a piece of work belongs to than whether it solves something worth solving.",
    ],
    items: [
      {
        label: "PRODUCTS",
        accent: "#7B2FF7",
        bg: "#FAF7FF",
        radius: "16px 16px 16px 4px",
        body: "Digital products, internal tools and decision-support systems built around real operational problems.",
      },
      {
        label: "CLIENT WORK",
        accent: "#0E8F71",
        bg: "#F3FCFA",
        radius: "16px 16px 4px 16px",
        body: "Web, digital systems, service design, accessible experiences, workflows and practical technology projects.",
      },
      {
        label: "RESEARCH",
        accent: "#E8542E",
        bg: "#FEF6F0",
        radius: "4px 16px 16px 16px",
        body: "Investigation, evidence, modelling and deep problem analysis before deciding what should be built.",
      },
      {
        label: "EXPERIMENTS",
        accent: "#8B5CF6",
        bg: "#F5F3FE",
        radius: "16px 4px 16px 16px",
        body: "Prototypes, AI systems, automation and new technical approaches tested before they become real products.",
      },
    ],
    width: "min(720px,92vw)",
    radius: 22,
    border: "1px solid rgba(0,0,0,0.06)",
  },
  {
    kind: "triad",
    number: "02",
    accent: "#F2925C",
    accentRgb: "242,146,92",
    eyebrow: "HOW WE WORK",
    heading: "Useful beats impressive.",
    items: [
      {
        title: "01 — Start with the real problem",
        radius: "24px 24px 24px 4px",
        body: "We do not begin with a product and look for somewhere to put it. We investigate first. What is happening? Where is the friction? What assumptions are hiding inside the current approach? Sometimes the most valuable thing we can do is challenge the original brief.",
      },
      {
        title: "02 — Useful beats impressive",
        radius: "4px 24px 24px 24px",
        offset: 32,
        body: "We like ambitious ideas and new technology. We also think there is an enormous difference between something that demos well and something that remains useful three weeks later. If it does not make something clearer, faster, safer, easier or more effective in the real world, the cleverness is mostly decoration.",
      },
      {
        title: "03 — Keep humans in the important bits",
        radius: "24px 4px 24px 24px",
        body: "AI can research, organise, calculate, compare, test, generate and monitor at extraordinary speed. That does not make it responsible for the decision. Where context, judgement, ethics, taste, expertise or accountability matter, a person should remain meaningfully involved.",
      },
    ],
    width: "min(600px,88vw)",
    radius: 24,
  },
  {
    kind: "quote",
    accent: "#F2925C",
    accentRgb: "242,146,92",
    lines: ["USEFUL", "BEATS", "IMPRESSIVE"],
    quote: "Useful beats impressive.",
    width: "min(520px,82vw)",
    radius: 24,
    border: null,
  },
  {
    kind: "story",
    number: "03",
    accent: "#E8542E",
    accentRgb: "232,84,46",
    eyebrow: "HOW IDEAS START",
    heading: "Most of our work starts with an irritation.",
    body: [
      {
        text: "Something takes too long. Information is sitting in the wrong place. A process technically works but requires an unreasonable amount of human effort to hold it together. A decision is being made without enough visibility.",
      },
      { text: "Surely there is a better way to do this.", variant: "italicQuote" },
      {
        text: "That sentence is usually worth investigating. We pull the problem apart, work out which pieces matter, test the assumptions and build the smallest useful version we can.",
      },
      { text: "If it works, we keep going. If it does not, we would rather learn that quickly." },
    ],
    media: "light",
    width: "min(680px,90vw)",
    radius: 12,
    border: "1px solid rgba(0,0,0,0.08)",
  },
  {
    kind: "story",
    number: "04",
    accent: "#0E8F71",
    accentRgb: "14,143,113",
    eyebrow: "ELSEWHERE",
    heading: "A small human team. A much larger field of capability.",
    body: [
      { text: "Behind WhatBit sits Elsewhere — our internal layer of specialised AI systems, models, agents, experiments and automations." },
      {
        text: "Different systems do different jobs. Some research. Some build. Some test. Some organise. Some analyse large amounts of information. Some exist almost entirely to tell us when one of our ideas is bad.",
      },
      {
        text: "Elsewhere lets a very small human team explore a much broader field of capability without pretending technology removes the need for judgement.",
      },
      {
        text: "The humans remain responsible for the direction, decisions, relationships, quality and what ultimately leaves the building. Or the cloud. Or Elsewhere.",
      },
    ],
    link: { label: "Explore Elsewhere →", href: "/elsewhere" },
    media: "dark",
    width: "min(700px,92vw)",
    radius: 20,
    border: "1px solid rgba(0,0,0,0.06)",
  },
  {
    kind: "founders",
    number: "05",
    accent: "#7B2FF7",
    accentRgb: "123,47,247",
    eyebrow: "THE HUMAN PART",
    intro: [
      "Technology is central to WhatBit. So are people.",
      "Ultimately, someone has to understand the problem. Someone has to care whether the solution is useful. Someone has to notice the thing the data did not capture. Someone has to decide when the technically elegant answer is the wrong one. And someone has to be accountable for what gets built.",
      "That remains us.",
      "WhatBit is led by Pol and Josh, who tend to approach the same problem from very different directions.",
    ],
    closing: "The overlap is where WhatBit tends to happen.",
    width: "min(920px,96vw)",
    radius: 0,
  },
  {
    kind: "story",
    number: "06",
    accent: "#1FBFA3",
    accentRgb: "31,191,163",
    eyebrow: "WHAT WE ARE BUILDING",
    heading: "A small company designed for a different kind of capability.",
    body: [
      {
        text: "For most of modern business history, increasing capability meant increasing headcount. More work required more people. More people required more layers. More layers required more coordination.",
      },
      {
        text: "Technology is changing part of that equation. A small team can now access capabilities that previously required far larger organisations: software development, research, analysis, testing, design exploration, monitoring and automation.",
      },
      { text: "We are interested in what becomes possible when you build a company around that reality from the beginning." },
      {
        text: "Not a giant organisation made slightly more efficient by AI. A small human core that knows how to use powerful tools properly, stays responsible for the important decisions, and remains close enough to the work to notice when something does not make sense.",
      },
      { text: "That is the company we are trying to build.", variant: "lead" },
    ],
    media: "light",
    width: "min(680px,90vw)",
    radius: 14,
    border: "1px solid rgba(0,0,0,0.08)",
  },
];

export const ABOUT_DOT_COLORS = [
  "#7B2FF7",
  "#1FBFA3",
  "#F2925C",
  "#8B5CF6",
  "#E8542E",
  "#0E8F71",
  "#7B2FF7",
  "#1FBFA3",
];

export const FOUNDERS = {
  pol: {
    name: "Pol",
    role: "CO-FOUNDER — PRODUCT, APPLIED SCIENCE & EXPERIENCE",
    accent: "#7B2FF7",
    shadowRgb: "123,47,247",
    photo: "/assets/about/founder-pol.jpg",
    bio: [
      "Pol works on the point where an idea has to become useful to an actual person.",
      "Her background in behavioural science, psychology and complex human services shapes how she approaches technology: what does the evidence say, how do people really behave, and will this still make sense outside the room where it was designed?",
      "At WhatBit, she works across product direction, front-end development, experience and applied research — taking complicated ideas and turning them into interfaces, workflows and products people can understand and actually use.",
      "She is usually the one pulling an idea back toward the human at the centre of it: reducing unnecessary complexity, testing assumptions against the real world and making sure the clever part is solving the right problem.",
    ],
  },
  josh: {
    name: "Josh",
    role: "CO-FOUNDER — RESEARCH & PRODUCT DEVELOPMENT",
    accent: "#1FBFA3",
    shadowRgb: "31,191,163",
    photo: "/assets/about/founder-josh.jpg",
    bio: [
      "Josh tends to go further into the problem.",
      "He works across deep research, product development, systems and experimentation — investigating how things work, following technical possibilities, finding connections between ideas and developing the underlying logic behind WhatBit's products.",
      "He is particularly good at the part before an idea becomes obvious: the long research dives, strange questions, competing approaches and occasionally slightly alarming amount of detail required to understand what might actually be possible.",
      "Where Pol tends to ask whether an idea holds up in the real world, Josh tends to ask whether we've gone far enough into the problem yet.",
    ],
  },
};
