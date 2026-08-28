export type AboutBodyLine = {
  text: string;
  variant?: "p" | "lead" | "leadStrong" | "italic" | "italicQuote" | "section";
  boldPrefix?: string;
  italicSuffix?: string;
};

export type AboutValueItem = {
  title: string;
  body: string;
  italicSuffix?: string;
};

export type AboutCard =
  | {
      kind: "story";
      number: string;
      accent: string;
      accentRgb: string;
      eyebrow: string;
      heading?: string;
      width: string;
      radius: number;
      border: string | null;
      body: AboutBodyLine[];
    }
  | {
      kind: "values";
      number: string;
      accent: string;
      accentRgb: string;
      eyebrow: string;
      width: string;
      radius: number;
      border: string | null;
      items: AboutValueItem[];
    }
  | {
      kind: "quote";
      accentRgb: string;
      lines: [string, string, string];
      quote: string;
      quoteColor: string;
      width: string;
      radius: number;
      border: string | null;
    };

export const ABOUT_CARDS: AboutCard[] = [
  {
    kind: "story",
    number: "01",
    accent: "#7B2FF7",
    accentRgb: "123,47,247",
    eyebrow: "WHY WE EXIST",
    width: "min(620px,88vw)",
    radius: 28,
    border: null,
    body: [
      { text: "We build useful things for problems that are usually more complicated than they first appear." },
      {
        text: "Sometimes that means software. Sometimes it means automation, research, process redesign, modelling, a new digital tool, or simply finding a much shorter path through something that has become unnecessarily difficult.",
      },
      { text: "The format changes. The principle does not." },
      {
        text: "Work out what is really happening. Find the bit that matters. Build around that. That is WhatBit.",
        variant: "lead",
      },
      { text: "A surprising amount of work begins with the wrong question." },
      {
        text: "A business asks for automation when the underlying process does not make sense. Someone asks for a new system when three existing systems could already do the job if they were connected properly. A team assumes they need more people when the real problem is information moving badly between the people they already have.",
      },
      {
        text: "A complicated workflow grows another step, another spreadsheet, another meeting and another workaround until nobody can quite remember why it works that way.",
      },
      {
        text: "We are interested in that point — the moment where you stop treating the visible problem as the whole problem and start asking:",
      },
      { text: "What is actually causing this?", variant: "italic" },
      { text: "WhatBit exists to investigate that question and then do something useful with the answer." },
    ],
  },
  {
    kind: "quote",
    accentRgb: "123,47,247",
    lines: ["FIND", "THE BIT", "THAT MATTERS"],
    quote: "Find the bit that matters.",
    quoteColor: "#7B2FF7",
    width: "min(480px,80vw)",
    radius: 20,
    border: "1px solid rgba(255,255,255,0.06)",
  },
  {
    kind: "story",
    number: "02",
    accent: "#1FBFA3",
    accentRgb: "31,191,163",
    eyebrow: "OUR MISSION & WHAT WE BELIEVE",
    heading: "Make complicated problems easier to see — and useful solutions easier to build.",
    width: "min(680px,90vw)",
    radius: 18,
    border: "1px solid rgba(0,0,0,0.07)",
    body: [
      {
        text: "Our mission is to help people and organisations understand what is actually getting in their way, then use the right combination of research, technology, design and human judgement to make it better.",
      },
      { text: "Not everything needs AI. Not everything needs software. Not everything needs to be rebuilt." },
      {
        text: "We are interested in finding the smallest intervention capable of creating a meaningful improvement — and making it strong enough to survive outside a presentation deck.",
      },
      {
        text: "Technology is getting extraordinarily capable. That does not mean every problem should become a technology problem.",
      },
      {
        text: "The value is not in using the most advanced tool available. The value is in knowing where to use it, where not to use it, and what still requires a person to think. That distinction matters to us.",
      },
      {
        text: "We use AI extensively, but we do not believe judgement, responsibility, creativity or human relationships should disappear simply because more of the underlying work can be automated.",
      },
      {
        text: "Quite the opposite. The more capable the tools become, the more deliberate we should be about what remains human.",
      },
    ],
  },
  {
    kind: "values",
    number: "03",
    accent: "#F2925C",
    accentRgb: "242,146,92",
    eyebrow: "OUR VALUES",
    width: "min(600px,88vw)",
    radius: 28,
    border: null,
    items: [
      {
        title: "01 — Start with the real problem",
        body: "We do not begin with a product and look for somewhere to put it. We investigate first. What is happening? Where is the friction? What assumptions are hiding inside the current approach? Sometimes the most valuable thing we can do is challenge the original brief.",
      },
      {
        title: "02 — Useful beats impressive",
        body: "We like ambitious ideas and new technology. We also think there is an enormous difference between something that demos well and something that remains useful three weeks later. If it does not make work clearer, faster, safer, easier or more effective in the real world, the cleverness is mostly decoration.",
      },
      {
        title: "03 — Use the shortest path that works",
        body: "More complexity is not automatically more sophisticated. We actively look for unnecessary layers, duplicate work and processes that exist mainly because they have always existed. Sometimes the right answer is a new system. Sometimes it is one good connection between two old ones. We are equally happy with either.",
      },
      {
        title: "04 — Show the working",
        body: "We do not like black boxes. When technology influences a decision, calculation or recommendation, people should be able to understand what went into it — particularly when AI is involved. We want systems that expose assumptions, uncertainty and reasoning boundaries rather than asking people to trust an answer because the computer produced it.",
      },
      {
        title: "05 — Keep humans in the important bits",
        body: "AI can research, organise, calculate, compare, test, generate and monitor at extraordinary speed. That does not make it responsible for the decision. Where context, judgement, ethics, taste, expertise or accountability matter, a person should remain meaningfully involved.",
      },
      {
        title: "06 — Build across boundaries",
        body: "Real problems rarely respect departments. A workflow problem can also be a design problem. A technology problem may actually be an incentive problem. We are comfortable moving between disciplines when the problem requires it — we would rather follow the problem than defend a category.",
      },
      {
        title: "07 — Say when something does not make sense",
        body: "Not every idea is good because it is ours. Not every client request should be built exactly as requested. We would rather identify a weak assumption early than spend months making it expensive. Good problem solving occasionally requires being willing to say:",
        italicSuffix: "we don't think that's the problem.",
      },
    ],
  },
  {
    kind: "quote",
    accentRgb: "242,146,92",
    lines: ["USEFUL", "BEATS", "IMPRESSIVE"],
    quote: "Useful beats impressive.",
    quoteColor: "#F2925C",
    width: "min(520px,82vw)",
    radius: 24,
    border: null,
  },
  {
    kind: "story",
    number: "04",
    accent: "#E8542E",
    accentRgb: "232,84,46",
    eyebrow: "WHAT WE BUILD & HOW IDEAS START",
    width: "min(660px,90vw)",
    radius: 12,
    border: "1px solid rgba(0,0,0,0.08)",
    body: [
      {
        text: "WhatBit works across a growing mix of products, client projects, research and experiments. Some projects begin with a very specific operational problem and grow into reusable tools. Others remain deliberately small: one workflow improved, one calculation made reliable, one piece of information made easier to understand.",
      },
      {
        text: "Our work can include: digital products and internal tools, AI-assisted workflows, automation and system integration, research and investigation, decision-support tools, operational modelling, service and process design, rapid prototypes and experiments, and complex problem analysis.",
      },
      {
        text: "We are less interested in which category a piece of work belongs to than whether it solves something worth solving.",
      },
      {
        text: "Most of our work starts with an irritation. Something takes too long. Information is sitting in the wrong place. A process technically works but requires an unreasonable amount of human effort to hold it together. A decision is being made without enough visibility.",
      },
      { text: "Surely there is a better way to do this.", variant: "italicQuote" },
      {
        text: "That sentence is usually worth investigating. We pull the problem apart, work out which pieces matter, test the assumptions and build the smallest useful version we can. If it works, we keep going. If it does not, we would rather learn that quickly.",
      },
    ],
  },
  {
    kind: "story",
    number: "05",
    accent: "#8B5CF6",
    accentRgb: "139,92,246",
    eyebrow: "OUR APPROACH TO AI",
    width: "min(560px,88vw)",
    radius: 26,
    border: null,
    body: [
      {
        text: "We are optimistic about AI without being particularly interested in pretending it is magic. It is an extraordinary new layer of capability.",
      },
      {
        text: "Used well, it can dramatically increase the amount of research, experimentation, analysis and implementation a small team can undertake. Used badly, it can generate a tremendous amount of nonsense very quickly.",
      },
      { text: "Our approach is therefore fairly simple:" },
      {
        text: "Use machines for what machines are increasingly excellent at, and keep people responsible for what still requires people.",
        variant: "lead",
      },
      { text: "We experiment heavily. We verify important work. We use different systems for different jobs." },
      {
        text: "And we do not believe “AI-powered” is, by itself, a product feature worth advertising. The result still has to be good.",
      },
    ],
  },
  {
    kind: "quote",
    accentRgb: "139,92,246",
    lines: ["SHOW", "THE", "WORKING"],
    quote: "Show the working.",
    quoteColor: "#8B5CF6",
    width: "min(500px,82vw)",
    radius: 16,
    border: "1px solid rgba(255,255,255,0.08)",
  },
  {
    kind: "story",
    number: "06",
    accent: "#0E8F71",
    accentRgb: "14,143,113",
    eyebrow: "THE ELSEWHERE DEPARTMENT",
    width: "min(700px,92vw)",
    radius: 20,
    border: "1px solid rgba(0,0,0,0.06)",
    body: [
      { text: "WhatBit has two people. That is not quite the whole story.", variant: "leadStrong" },
      {
        text: "Behind the visible company sits what we call The Elsewhere Department — our internal layer of specialised AI systems, models, agents and automations. Different systems do different jobs.",
      },
      {
        text: "Some research. Some build. Some test. Some organise. Some analyse large amounts of information. Some are particularly useful for challenging an idea before we become too attached to it.",
      },
      {
        text: "Together, they allow a very small human team to work with a surprisingly broad field of capability.",
      },
      { text: "Why “Elsewhere”?", variant: "section" },
      {
        text: "Before WhatBit became WhatBit, Elsewhere was one of the names we seriously considered for the company. We liked the idea too much to completely abandon it. It also turned out to be a fairly good description of where a growing amount of our work happens — not entirely inside a traditional organisation, not entirely inside a piece of software. Somewhere between human judgement, machines, systems and an increasing number of processes happening beyond the visible edge of the company. So Elsewhere stayed. Just in a different department.",
      },
      { text: "What it is not", variant: "section" },
      {
        text: "It is not a collection of pretend employees. It is not an attempt to remove people from everything we do. And it is not a belief that one AI system should run a company. Elsewhere is infrastructure — a flexible layer of specialised capability that can be brought into a problem when useful. The human team remains responsible for direction, decisions, relationships, quality and what ultimately leaves the building. Or the cloud. Or Elsewhere.",
      },
      { text: "Small team. Larger field of capability.", variant: "section" },
      {
        text: "For most of modern business history, increasing capability meant increasing headcount. More work required more people. More people required more layers. More layers required more coordination.",
      },
      {
        text: "AI changes part of that equation. A small team can now access capabilities that previously required far larger organisations: software development, research, analysis, testing, design exploration, monitoring and automation.",
      },
      {
        text: "We are interested in what becomes possible when you build a company around that reality from the beginning. Not a giant organisation made slightly more efficient by AI — a small human core designed to work with it properly.",
      },
    ],
  },
  {
    kind: "story",
    number: "07",
    accent: "#7B2FF7",
    accentRgb: "123,47,247",
    eyebrow: "THE HUMAN PART — POL & JOSH",
    width: "min(600px,88vw)",
    radius: 28,
    border: null,
    body: [
      { text: "Technology is central to WhatBit. So are people." },
      {
        text: "Ultimately, someone has to understand the problem. Someone has to care whether the solution is useful. Someone has to notice the thing the data did not capture. Someone has to decide when the technically elegant answer is the wrong one. And someone has to be accountable for what gets built.",
      },
      { text: "That remains us.", variant: "lead" },
      { text: "WhatBit is led by Pol and Josh, combining different ways of looking at the same problem." },
      {
        text: " work centres on investigation, behavioural science, research, product thinking and finding patterns across complicated systems.",
        boldPrefix: "Pol's",
      },
      {
        text: " brings a practical implementation and operational lens: how something works, what it takes to deliver it, and whether the idea survives contact with the real world.",
        boldPrefix: "Josh",
      },
      {
        text: "The overlap is where WhatBit tends to happen. One side keeps asking why. The other keeps asking how. Neither question is particularly useful without the other.",
      },
    ],
  },
  {
    kind: "story",
    number: "08",
    accent: "#1FBFA3",
    accentRgb: "31,191,163",
    eyebrow: "WHAT WE ARE TRYING TO BUILD",
    width: "min(580px,86vw)",
    radius: 14,
    border: "1px solid rgba(0,0,0,0.08)",
    body: [
      {
        text: "We want WhatBit to become the kind of company people come to when the problem does not fit neatly inside one discipline.",
      },
      {
        text: "When there is a complicated system nobody has quite untangled. When an organisation knows something is inefficient but cannot identify exactly where. When a useful idea exists but needs to become something real.",
      },
      { text: "Or when there is simply a sense that:" },
      { text: "there has to be a better way to do this.", variant: "italic" },
      {
        text: "We may not already know the answer. That is usually the interesting part. We know how to go looking for it.",
      },
    ],
  },
];

export const ABOUT_DOT_COLORS = [
  "#7B2FF7",
  "#7B2FF7",
  "#1FBFA3",
  "#F2925C",
  "#F2925C",
  "#E8542E",
  "#8B5CF6",
  "#8B5CF6",
  "#0E8F71",
  "#7B2FF7",
  "#1FBFA3",
];
