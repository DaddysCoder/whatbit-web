"use client";

import Link from "next/link";
import { useState } from "react";
import { GlowCard } from "./motion/GlowCard";
import { Reveal, StaggerGroup, StaggerItem } from "./motion/Reveal";
import { SiteFooter } from "./SiteFooter";
import { SiteNav } from "./SiteNav";
import { CONTACT_MAILTO } from "@/lib/site";
import { cardEntranceVariants } from "@/lib/motion";
import styles from "./ArcPage.module.css";

const DEMO_MAILTO = `${CONTACT_MAILTO}?subject=${encodeURIComponent("Book a demo — Arc")}`;
const CONTACT_ARC_MAILTO = `${CONTACT_MAILTO}?subject=${encodeURIComponent("Arc")}`;

const CLIENT_WORKSPACE_ITEMS = [
  "client profile and key information",
  "practitioners and multidisciplinary team members",
  "goals, strengths and preferences",
  "communication needs",
  "assessments and clinical evidence",
  "appointments and service activity",
  "documents and correspondence",
  "consent and agreements",
  "risks, safeguards and important alerts",
  "plans, reviews and actions",
];

const TEAM_VISIBILITY_ITEMS = [
  "who is involved",
  "what each discipline is working on",
  "important findings",
  "current priorities",
  "outstanding actions",
  "changes over time",
];

const AUDIENCES = [
  {
    label: "For practitioners",
    body: "Spend more time understanding and supporting people, and less time reconstructing information across systems.",
  },
  {
    label: "For clinical leaders",
    body: "Improve consistency, supervision, review and visibility across complex caseloads.",
  },
  {
    label: "For organisations",
    body: "Connect clinical delivery with scheduling, workflow, governance, documentation and operational oversight.",
  },
];

const SERVICES = ["Allied health", "Behaviour support", "Disability services", "Complex and multidisciplinary care"];

const OPERATING_SYSTEM_ITEMS = [
  "Client management.",
  "Clinical documentation.",
  "Assessments.",
  "Evidence.",
  "Multidisciplinary collaboration.",
  "Scheduling.",
  "Governance.",
  "Practice operations.",
];

export function ArcPage() {
  const [email, setEmail] = useState("");
  const earlyAccessMailto = `${CONTACT_MAILTO}?subject=${encodeURIComponent(
    "Join early access — Arc"
  )}&body=${encodeURIComponent(email ? `Please notify ${email} when Arc reaches early access.` : "")}`;

  return (
    <div className={styles.page}>
      <SiteNav variant="inner" accent="#7C4FD1" ctaHref={DEMO_MAILTO} ctaLabel="Book a demo" />

      <section className={styles.hero}>
        <Reveal>
          <div className={styles.eyebrow}>ARC · BY WHATBIT</div>
          <h1 className={styles.title}>Clinical practice management, built around the work itself.</h1>
          <p className={styles.lede}>
            Arc is a secure clinical CRM and practice management platform for allied health, behaviour support and
            disability service organisations.
          </p>
          <p className={styles.lede}>
            It brings client information, clinical documentation, assessments, evidence, service delivery,
            scheduling, compliance and multidisciplinary workflows into one connected workspace.
          </p>
          <p className={styles.ledeStrong}>Less fragmentation. Better clinical context. Stronger practice operations.</p>
          <div className={styles.heroCtas}>
            <a href={DEMO_MAILTO} className={styles.btnPrimary}>
              Book a demo
            </a>
            <a href="#workspace" className={styles.btnSecondary}>
              Explore Arc
            </a>
          </div>
        </Reveal>
      </section>

      <div className={styles.body}>
        <section>
          <Reveal>
            <div className={styles.eyebrow}>THE PROBLEM</div>
            <h2 className={styles.h2}>One platform instead of a patchwork of systems</h2>
            <p className={styles.copy}>
              Clinical teams are often forced to work across generic CRMs, calendars, spreadsheets, document
              templates, email, file storage and separate compliance systems.
            </p>
            <p className={styles.copy}>
              The result is duplicated administration, fragmented client information and important clinical context
              spread across multiple places.
            </p>
            <p className={styles.copy}>
              Arc is designed differently. It connects the clinical and operational work around each person — so
              practitioners, teams and organisations can work from a shared, structured record.
            </p>
          </Reveal>
        </section>

        <section id="workspace">
          <Reveal>
            <div className={styles.eyebrow}>BUILT FOR REAL CLINICAL WORKFLOWS</div>
            <h2 className={styles.h2}>Client workspace</h2>
            <p className={styles.copy}>A single place for the information surrounding each client. Bring together:</p>
          </Reveal>
          <StaggerGroup className={styles.chipGrid} fast>
            {CLIENT_WORKSPACE_ITEMS.map((item) => (
              <StaggerItem key={item} className={styles.chip}>
                {item}
              </StaggerItem>
            ))}
          </StaggerGroup>
          <Reveal>
            <p className={styles.copy}>
              The record develops with the person instead of becoming another collection of disconnected files.
            </p>
          </Reveal>
        </section>

        <section>
          <Reveal>
            <div className={styles.eyebrow}>ASSESSMENTS</div>
            <h2 className={styles.h2}>Assessments that remain connected to care</h2>
            <p className={styles.copy}>
              Arc supports structured clinical assessment without reducing professional reasoning to a form.
            </p>
            <p className={styles.copy}>
              Practitioners can collect information progressively, connect observations and evidence, collaborate
              across disciplines and carry relevant findings forward into planning and documentation.
            </p>
            <p className={styles.copyStrong}>
              Clinical judgement remains with the practitioner. Arc helps organise the evidence around it.
            </p>
          </Reveal>
        </section>

        <section>
          <Reveal>
            <div className={styles.eyebrow}>DOCUMENTATION</div>
            <h2 className={styles.h2}>Documentation without losing context</h2>
            <p className={styles.copy}>
              Clinical notes, assessments, reports and supporting evidence sit within the same client environment.
              That means practitioners can spend less time searching through files and reconstructing history before
              they can do meaningful work.
            </p>
            <p className={styles.copy}>
              Structured information can also be reused appropriately across workflows, reducing repetitive
              administration while maintaining traceability to its source.
            </p>
          </Reveal>
        </section>

        <section>
          <Reveal>
            <div className={styles.eyebrow}>MULTIDISCIPLINARY BY DESIGN</div>
            <h2 className={styles.h2}>Complex care rarely belongs to one practitioner.</h2>
            <p className={styles.copy}>
              Arc gives multidisciplinary teams a shared workspace while maintaining clear responsibilities,
              permissions and professional boundaries. Teams can understand:
            </p>
          </Reveal>
          <StaggerGroup className={styles.chipGrid} fast>
            {TEAM_VISIBILITY_ITEMS.map((item) => (
              <StaggerItem key={item} className={styles.chip}>
                {item}
              </StaggerItem>
            ))}
          </StaggerGroup>
          <Reveal>
            <p className={styles.copyStrong}>Better coordination without turning everyone into administrators.</p>
          </Reveal>
        </section>

        <section>
          <Reveal>
            <div className={styles.eyebrow}>EVIDENCE</div>
            <h2 className={styles.h2}>Evidence stays attached to the decision</h2>
            <p className={styles.copy}>
              Clinical information is more useful when its origin remains visible. Arc is being designed around
              traceable evidence, allowing information to remain connected to the assessment, observation, document
              or source that supports it.
            </p>
            <p className={styles.copy}>
              Instead of producing isolated documents, Arc helps create a longitudinal clinical record that can be
              reviewed, updated and understood over time.
            </p>
          </Reveal>
        </section>

        <section>
          <Reveal>
            <div className={styles.eyebrow}>PRACTICE MANAGEMENT MEETS CLINICAL WORK</div>
            <h2 className={styles.h2}>Arc starts with the client and connects the operational layer around them.</h2>
            <p className={styles.copy}>
              Most practice-management software starts with appointments and billing. Arc starts with the client.
            </p>
          </Reveal>
          <StaggerGroup className={styles.audienceGrid}>
            {AUDIENCES.map((a) => (
              <GlowCard key={a.label} className={styles.audienceCard} variants={cardEntranceVariants}>
                <div className={styles.audienceLabel}>{a.label}</div>
                <p className={styles.audienceBody}>{a.body}</p>
              </GlowCard>
            ))}
          </StaggerGroup>
        </section>

        <section>
          <Reveal>
            <div className={styles.eyebrow}>DESIGNED FOR COMPLEX SERVICES</div>
            <h2 className={styles.h2}>Arc is being developed for organisations delivering:</h2>
          </Reveal>
          <StaggerGroup className={styles.serviceGrid} fast>
            {SERVICES.map((s) => (
              <StaggerItem key={s} className={styles.serviceTag}>
                {s}
              </StaggerItem>
            ))}
          </StaggerGroup>
          <Reveal>
            <p className={styles.copy}>
              It is particularly suited to services where information develops over time, multiple people contribute
              to the record, and decisions need to remain understandable long after they were made.
            </p>
          </Reveal>
        </section>

        <section>
          <Reveal>
            <div className={styles.eyebrow}>SECURITY &amp; PRIVACY</div>
            <h2 className={styles.h2}>Security and privacy are part of the architecture</h2>
            <p className={styles.copy}>
              Clinical information deserves more than ordinary business-software security. Arc is being designed with
              privacy, access control, data protection and auditability as core platform requirements.
            </p>
            <p className={styles.copy}>
              Organisations need to know not only that information is stored, but who can access it, where it came
              from and how it has been used.
            </p>
            <Link href="/privacy" className={styles.inlineLink}>
              Learn about security and privacy →
            </Link>
          </Reveal>
        </section>

        <section>
          <Reveal>
            <div className={styles.eyebrow}>ASSISTANCE, NOT AUTONOMY</div>
            <h2 className={styles.h2}>Assistance, not autonomous clinical decision-making</h2>
            <p className={styles.copy}>
              Arc can use intelligent tools to reduce repetitive work, organise information and help practitioners
              navigate large clinical records. It is not designed to replace professional judgement.
            </p>
            <p className={styles.copyStrong}>
              The practitioner remains responsible for clinical interpretation and decision-making. The technology
              supports the work rather than pretending to be the clinician.
            </p>
          </Reveal>
        </section>

        <section className={styles.visionSection}>
          <Reveal>
            <div className={styles.eyebrow}>THE LONG-TERM GOAL</div>
            <h2 className={styles.h2}>A clinical operating system for modern practices</h2>
            <p className={styles.copy}>
              One connected environment for the clinical and operational work surrounding a person.
            </p>
          </Reveal>
          <StaggerGroup className={styles.osGrid} fast>
            {OPERATING_SYSTEM_ITEMS.map((item) => (
              <StaggerItem key={item} className={styles.osItem}>
                {item}
              </StaggerItem>
            ))}
          </StaggerGroup>
          <Reveal>
            <p className={styles.copy}>
              Without forcing organisations to assemble the workflow themselves from six different systems.
            </p>
          </Reveal>
        </section>
      </div>

      <div className={styles.teaserWrap}>
        <Reveal>
          <div className={styles.teaser}>
            <div>
              <div className={styles.teaserEyebrow}>SEE ARC IN PRACTICE</div>
              <div className={styles.teaserTitle}>
                See how Arc can bring your clinical and practice-management workflows together.
              </div>
            </div>
            <div className={styles.teaserCtas}>
              <a href={DEMO_MAILTO} className={styles.btnPrimaryDark}>
                Book a demo
              </a>
              <a href={CONTACT_ARC_MAILTO} className={styles.btnSecondaryDark}>
                Contact us
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      <div className={styles.notify}>
        <Reveal>
          <h2 className={styles.notifyTitle}>Join early access</h2>
          <p className={styles.notifyCopy}>
            Leave your email and we&apos;ll let you know as Arc becomes available to allied health, behaviour support
            and disability service organisations.
          </p>
          <form
            className={styles.form}
            onSubmit={(e) => {
              e.preventDefault();
              // eslint-disable-next-line @next/next/no-location-assign-relative-destination -- mailto: link, not an internal route
              window.location.href = earlyAccessMailto;
            }}
          >
            <input
              type="email"
              required
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
            />
            <a href={earlyAccessMailto} className={styles.notifyBtn}>
              Join early access
            </a>
          </form>
        </Reveal>
      </div>

      <div className={styles.footer}>
        <SiteFooter variant="minimal" accent="#7C4FD1" />
      </div>
    </div>
  );
}
