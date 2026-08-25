export type HowStep = {
  n: string;
  title: string;
  desc: string;
};

export const HOW_STEPS: HowStep[] = [
  { n: "1", title: "Understand", desc: "Tell us what happened." },
  { n: "2", title: "Gather", desc: "See what information could help." },
  { n: "3", title: "Prepare", desc: "Turn your confirmed facts into a clear request." },
  { n: "4", title: "Act", desc: "You choose what to send and when." },
  { n: "5", title: "Track", desc: "Keep responses, documents and follow-ups together." },
  {
    n: "6",
    title: "Escalate",
    desc: "If it isn't resolved, see sourced options for what may come next.",
  },
];
