import type { Metadata } from "next";
import { DocPage } from "@/components/DocPage";

export const metadata: Metadata = {
  title: "The Elsewhere Department — WhatBit",
  description:
    "WhatBit’s internal layer of specialised AI systems, models, agents and automations.",
};

export default function Page() {
  return (
    <DocPage
      eyebrow="THE ELSEWHERE DEPARTMENT"
      title="Small team. Larger field of capability."
      lede="WHATBIT has two people. That is not quite the whole story."
      accent="#0E8F71"
      blocks={[
        {
          text: "Behind the visible company sits what we call The Elsewhere Department — our internal layer of specialised AI systems, models, agents and automations. Different systems do different jobs.",
        },
        {
          text: "Some research. Some build. Some test. Some organise. Some analyse large amounts of information. Some are particularly useful for challenging an idea before we become too attached to it.",
        },
        {
          text: "Together, they allow a very small human team to work with a surprisingly broad field of capability.",
        },
        {
          heading: "Why “Elsewhere”?",
          text: "Before WHATBIT became WHATBIT, Elsewhere was one of the names we seriously considered for the company. We liked the idea too much to completely abandon it. It also turned out to be a fairly good description of where a growing amount of our work happens — not entirely inside a traditional organisation, not entirely inside a piece of software. Somewhere between human judgement, machines, systems and an increasing number of processes happening beyond the visible edge of the company. So Elsewhere stayed. Just in a different department.",
        },
        {
          heading: "What it is not",
          text: "It is not a collection of pretend employees. It is not an attempt to remove people from everything we do. And it is not a belief that one AI system should run a company. Elsewhere is infrastructure — a flexible layer of specialised capability that can be brought into a problem when useful. The human team remains responsible for direction, decisions, relationships, quality and what ultimately leaves the building. Or the cloud. Or Elsewhere.",
        },
        {
          heading: "Small team. Larger field of capability.",
          text: "For most of modern business history, increasing capability meant increasing headcount. More work required more people. More people required more layers. More layers required more coordination.",
        },
        {
          text: "AI changes part of that equation. A small team can now access capabilities that previously required far larger organisations: software development, research, analysis, testing, design exploration, monitoring and automation.",
        },
        {
          text: "We are interested in what becomes possible when you build a company around that reality from the beginning. Not a giant organisation made slightly more efficient by AI — a small human core designed to work with it properly.",
        },
      ]}
    />
  );
}
