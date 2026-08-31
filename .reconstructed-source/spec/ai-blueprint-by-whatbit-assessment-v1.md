# AI Blueprint by WHATBIT — Responsible AI Readiness Assessment V1 Product Specification

**Version:** 1.1  
**Framework check date:** 28 August 2026  
**Product:** AI Blueprint by WHATBIT  
**Category:** Productised, human-reviewed responsible AI readiness assessment for Australian SMEs  
**Customer time promise:** About 15–20 minutes for most businesses completing one material AI use case; additional use cases are optional  

## 1. Product boundary

This assessment helps an organisation identify its AI use, information flows, material impacts and practical governance gaps. It produces an **attention level**, not a legal conclusion, certification, audit opinion or claim of AI compliance.

Customer-facing wording:

> AI Blueprint by WHATBIT is a practical responsible AI readiness assessment. It is not legal, privacy, cyber security, employment, clinical or financial advice; it is not certification; and it does not determine whether an organisation is compliant with law. The result reflects the information provided and the use cases reviewed at the assessment date.

Use only these customer-facing outcomes:

- **Low** — the reviewed uses appear relatively contained and foundational controls are mostly present.
- **Moderate** — one or more uses or control gaps need planned attention.
- **Higher Attention** — the context, potential impact, autonomy, data, an incident or a material control gap warrants prompt, deeper review.

Never describe the outcome as safe, compliant, certified, passed, failed, risk-free or approved.

## 2. Current Australian Government basis

The primary framework is the National AI Centre's current **Guidance for AI Adoption**, refreshed in May 2026. It replaced/evolved the earlier 10 voluntary guardrails into six essential practices:

1. Decide who is accountable.
2. Understand impacts and plan accordingly.
3. Measure and manage risks.
4. Share essential information.
5. Test and monitor.
6. Maintain human control.

The Foundations guidance is designed for organisations starting with AI, using it in lower-risk ways or new to AI governance. The Implementation guidance is the escalation path for complex or higher-risk use. The assessment also adopts the National AI Centre's seven AI screening themes: data sensitivity; autonomous end-user interaction; autonomy at scale; effects on vulnerable or marginalised groups; regulated or legally significant uses; difficulty contesting or reversing harm; and general-purpose/adaptable systems.

Supporting official guidance used:

- OAIC guidance on commercially available AI products for personal information, privacy-by-design, due diligence, transparency, accuracy and human oversight.
- ASD's ACSC guidance for small businesses on AI-related data leakage, unreliable or manipulated output and AI supply-chain risk.
- National AI Centre guidance on transparency for AI-generated content.

The framework is intentionally proportionate. An identical tool may be lower attention when drafting internal marketing copy and higher attention when screening job applicants or advising a person about health, finance or services.

## 3. Assessment flow

1. Organisation profile and scope.
2. Quick AI tool inventory.
3. Select the **most material current or planned use case**.
4. Complete the use-case module once; optionally add up to two more material use cases.
5. Complete organisation-wide controls.
6. Automated triage creates flags and draft recommendations.
7. WHATBIT reviewer checks context, contradictions and evidence.
8. Customer receives the reviewed result, action plan and customised document pack.

The first use case is required. A second or third is optional. If a customer has more than three materially different uses, the report must state that the assessment sampled the most material uses and recommend an expanded review or AI register workshop.

## 4. Exact customer assessment

### Answer conventions

- `single_select`: one option.
- `multi_select`: any applicable options; use mutually exclusive `none` or `unsure` controls in the form.
- `short_text`: normally 120 characters.
- `long_text`: normally 800 characters.
- `repeat_group`: structured records, with a stated limit.
- `file_optional`: optional supporting evidence; do not require customers to upload confidential records.
- **E** is internal exposure weight; **G** is internal control-gap weight. Neither is shown to customers.
- **S1–S7** are official-screening-aligned flags. **U1–U8** are manual-review urgency flags.

### A. Organisation and scope

| ID | Exact question | Answer type and exact options | Branching and internal triggers | Output/control mapping |
|---|---|---|---|---|
| Q01 | **What organisation is this assessment for?** | Fields: legal or trading name; ABN (optional); website (optional); main Australian state or territory; one-sentence description of products/services. | No score. | Report identity; policy and register headers. |
| Q02 | **About how large is the organisation?** | `single_select`: Sole trader; 2–5 people; 6–19; 20–49; 50–199; 200+; Not sure. Include employees and regular contractors. | No score. Used to scale controls and wording. | Training cadence, role design and review frequency. |
| Q03 | **Which areas best describe your work?** | `multi_select`: Professional/consulting services; Retail/hospitality; Technology/software; Marketing/media/creative; Construction/trades; Education/training; Health/clinical; Disability/aged care/community services; Child-related services; Recruitment/employment; Finance/credit/insurance; Legal services; Government/public services; Critical infrastructure/essential services; Other. | E+2 if any of education, health, disability/aged care, child-related, recruitment, finance/insurance, legal, government, critical/essential. Context flag only; never determines outcome alone. | Sector-specific reviewer prompts and referral notes. |
| Q04 | **Who is completing this assessment?** | Fields: name; role; email; `single_select`: Owner/director; Senior manager; AI/technology lead; Privacy/security/risk role; Team member; External adviser; Other. Then: **Can you confirm organisation-wide practices?** Yes; Partly; No. | If Partly/No, add `limited_knowledge` flag and require reviewer to qualify findings. | Respondent and limitations section. |
| Q05 | **Are any special rules or formal obligations likely to apply to the organisation or the AI uses being reviewed?** | `multi_select`: Privacy Act / Australian Privacy Principles; Health records or clinical obligations; NDIS/disability service obligations; Employment/workplace obligations; Consumer credit/financial services/insurance obligations; Child safety; Government contract/procurement requirements; Professional standards or registration; Contractual confidentiality/data-residency requirements; Other; None known; Not sure. | E+2 if any substantive option; E+1 and reviewer flag if Not sure in a sector from Q03. **S5** if regulated area or potential legal effect. | Legal-specialist referral prompt; obligations register placeholder. Do not decide applicability. |

### B. AI inventory

| ID | Exact question | Answer type and exact options | Branching and internal triggers | Output/control mapping |
|---|---|---|---|---|
| Q06 | **Which AI tools or AI-enabled systems are currently used or planned?** | `repeat_group`, 1–10. Per tool: tool/product name; provider (if known); status: In use / Trial / Planned / No longer used; account: Organisation-managed paid account / Organisation-managed free account / Personal account / Embedded in another system / Not sure; approved by: Named owner / General approval / Not formally approved / Not sure; business areas using it; short purpose. Include examples: chatbots, Copilot features, transcription, image/content tools, CRM/HR/accounting features, automated recommendations and agents. | Tool on personal account: G+2. Not formally approved/Not sure: G+1 each, capped G+3. If no current tools, permit one planned tool and label report `pre-adoption`. | **C04 AI register**, **C09 approved-tool list**, vendor review. Populates `tools[]`. |
| Q07 | **Could staff be using AI for work without the organisation knowing or approving each tool?** | `single_select`: No, unlikely; Possibly; Yes; Not sure; Not applicable—only I use the tools. | Possibly G+1; Yes/Not sure G+3 and `shadow_ai`; if Q12 later contains sensitive data, trigger **U1**. | **C03 AI acceptable-use rules**, C09 approved tools, C18 training/audit. |
| Q08 | **What is AI currently used for across the organisation?** | `multi_select`: Brainstorming/research; Drafting/editing/summarising; Images/audio/video; Meeting notes/transcription; Coding/software; Data analysis/forecasting; Internal search/knowledge; Marketing/sales; Customer service/chat; HR/recruitment/performance; Finance/credit/insurance; Health/clinical/disability/community services; Security/fraud; Eligibility/prioritisation/allocation; Automated actions/agents; Other. | Categories guide use-case selection. No direct score; high-impact choices create reviewer prompt if not selected in Q09. | AI register purposes; completeness check. |
| Q09 | **Choose the AI use that could matter most if it produced a wrong, unfair, private or unexpected result.** | `repeat_group`, 1 required and up to 3. Per use case: name; linked tool(s); business purpose; team; current status: Planned / Trial / Live / Paused; who uses or receives output; accountable person if known. Helper: “Choose impact, not frequency. A rare hiring, health, finance or service-access use may matter more than daily drafting.” | Q10–Q19 repeat for each use case. If high-impact Q08 category omitted from Q09, reviewer completeness flag. | Populates `use_cases[]`, report scope and system-level register. |

### C. Per-use-case module — repeat Q10–Q19

| ID | Exact question | Answer type and exact options | Branching and internal triggers | Output/control mapping |
|---|---|---|---|---|
| Q10 | **How often and at what scale is this AI use expected to operate?** | Two fields. Frequency: Rarely/one-off; Monthly; Weekly; Daily; Continuously/automatically; Not sure. Reach per month: Internal only, fewer than 10 people; 10–99 people/items; 100–999; 1,000+; Not sure. | Continuously E+2. Reach 100–999 E+1; 1,000+ E+2. Large scale combines with Q11 autonomous action to set **S3**. | Monitoring frequency and sampling plan. |
| Q11 | **What can the AI do in this use?** | `multi_select`: Create a draft for a person to review; Summarise/classify/rank information; Recommend an outcome or next step; Communicate directly with people; Update records or systems; Make bookings, purchases, payments or other transactions; Trigger another system or tool; Browse the internet or retrieve external content; Operate through open-ended instructions for more than one purpose; None of these/other. Then: **Does it act before a person approves the specific output or action?** Never; Sometimes; Usually/always; Not sure. | Recommend E+2. Direct communication/update/trigger E+3. Transaction E+4. Open-ended multi-purpose E+1 and **S7**. Sometimes pre-approval E+2; usually/always E+4. **S2** for direct autonomous interaction. **S3** when actions occur at scale or across systems. Payment, external message, deletion or record change without approval/logging may trigger **U4**. | **C12 human-review workflow**, C13 override/permissions, C22 agent/action constraints. |
| Q12 | **What information can the AI access, receive in prompts, recordings or files, or create as output?** | `multi_select`: Public information; Ordinary internal business information; Commercially confidential information or intellectual property; Personal information about customers/clients; Personal information about workers/applicants; Sensitive information (for example health, disability, biometric, racial or ethnic origin, political/religious beliefs, sexual orientation or criminal-record information); Financial/account/payment details; Children’s information; Passwords, API keys or security credentials; None; Not sure. | Confidential E+2. Personal E+2. Sensitive/financial/children/credentials E+4. **S1** for any personal, sensitive or confidential data. Credentials create **U1**. Show Q13 and Q14 when any non-public data/personal category selected. | **C06 data-input rules**, C07 privacy review, C11 security controls, register data fields. |
| Q13 | **Which safeguards apply before this information is used with AI?** | Conditional `multi_select`: Identifying details are removed or replaced; Only the minimum necessary information is used; The tool is approved for this data; A contract or enterprise setting restricts provider use/training; Access is limited by role; The person has been notified or consent obtained where required; A privacy/security review was completed; Staff are told not to enter this category; Other; None; Not sure. Also: **Is any personal or sensitive information entered into a publicly available or personal-account AI tool?** No; Yes; Not sure. | None/Not sure G+3. Public/personal tool Yes + personal/sensitive = **U1**; Not sure = reviewer escalation. Do not infer legal validity of consent. | C06, **C07 privacy/PIA review**, C10 vendor terms, C11. |
| Q14 | **Does the AI collect, create, predict or infer information about an identifiable person?** | `single_select`: No; Yes, but only low-impact drafts/inferences; Yes, used to support an action or decision; Yes, stored as part of the person’s record; Not sure. Conditional text: what is inferred/created, where it is stored and how accuracy is checked. | Low-impact E+1. Supports action/stored E+3. Not sure E+1/G+1. If sensitive inference, regulated context or significant decision: **U2** reviewer check. | C07 privacy review, **C14 output verification**, C17 record labelling/provenance. |
| Q15 | **Does a customer, client, worker or member of the public interact directly with this AI or receive its unreviewed content?** | `single_select`: No; Yes, but only within a narrow script and a person can take over; Yes, it generates varied answers with a clear human escalation path; Yes, it generates varied answers without reliable human escalation; Not sure. | Narrow E+1. Varied with escalation E+2 and **S2**. Varied without escalation E+4, **S2**, potential **U3** when content concerns health/legal/finance/service access. | **C15 transparency notice**, C12 oversight, C16 complaints/escalation. |
| Q16 | **Does this AI make, recommend, rank or materially influence decisions about people?** | `single_select`: No; Administrative support only, with no material influence; It gives a recommendation that a person reviews before deciding; It ranks, shortlists or prioritises people; It normally determines the outcome; Not sure. Conditional text: describe decision, decision-maker and evidence reviewed. | Recommendation E+2. Rank/shortlist E+3. Determines E+4. **S5** where decision has legal/significant effect or is regulated. Determines outcome in a high-impact domain without prior human review triggers **U2**. | C05 impact assessment, C12 decision-review protocol, C14 verification/bias testing, C16 challenge/redress. |
| Q17 | **Could this use affect any of the following?** | `multi_select`: Health, clinical care or disability support; Physical safety or workplace safety; Employment, recruitment, performance or discipline; Credit, insurance, payment or financial position; Legal rights or access to justice; Eligibility, priority or access to an essential/public/community service; Education admission, assessment or discipline; Housing/accommodation; Reputation or important opportunities; No material impact expected; Not sure; Other. | Any listed impact E+4 (apply once per use case, not per box) and `high_impact_domain`. **S5** for regulated/legal effects. Not sure E+1. | C05 full impact/risk assessment, specialist referral, enhanced testing and oversight. |
| Q18 | **Could this use affect people who may face greater difficulty understanding, avoiding or challenging the outcome?** | `multi_select`: Children/young people; Older people; People with disability; People with limited English or digital access; Aboriginal or Torres Strait Islander peoples/communities; People experiencing financial hardship, crisis or dependency on a service; Other vulnerable, marginalised or underrepresented group; No; Not sure. Conditional text: affected group and how their needs were considered. | Any group E+4 and **S4**. If combined with Q16 material decision or Q17 high-impact and no documented impact review, **U7**. Not sure E+1. | **C05 stakeholder impact assessment**, accessibility/fairness actions, engagement plan. |
| Q19 | **If the AI is wrong or behaves unexpectedly, how serious and reversible could the effect be?** | `single_select`: Minor and easy to correct before anyone is affected; Noticeable but readily corrected with little lasting effect; Material effect requiring time, money or formal correction; Serious, hard to reverse or difficult to provide redress; Not sure. Then: **Can an affected person question the use or outcome and reach a person?** Yes, clearly; Sometimes/indirectly; No; Not sure; Not applicable. | Material E+2. Serious E+4 and **S6**. No/Not sure contestability adds G+3 if people affected. Serious plus no/unknown channel triggers **U3**. | **C16 challenge/complaints**, incident and remediation plan, decision records. |

### D. Organisation-wide governance and human control

| ID | Exact question | Answer type and exact options | Branching and internal triggers | Output/control mapping |
|---|---|---|---|---|
| Q20 | **Is a senior person clearly accountable for how AI is used across the organisation?** | `single_select`: Yes, named and communicated; Yes, informally; Being assigned; No; Not sure. Optional name/role. | Informal/being assigned G+1; No/Not sure G+3. If live high-impact use and no identifiable owner: **U6**. | **C01 overall accountable owner** and governance statement. |
| Q21 | **Does each material AI system or use have a person responsible for its operation and outcomes?** | `single_select`: Yes, documented for all; For some; Informally only; No; Not sure. | Some/informal G+1; No/Not sure G+2. | **C02 system/use-case owners**, AI register. |
| Q22 | **When AI output could affect a person, customer, safety, money, rights or an important business decision, when does a capable person review it?** | `single_select`: Before it is used or acted on; Before use for higher-impact cases only; Sampled or checked after use; Only when a concern is raised; No defined review; Not applicable; Not sure. | Higher-impact only G+1 if criteria documented, otherwise reviewer check. After use G+3. Concern only/no defined/not sure G+4. High-impact automated outcome = **U2**. | **C12 meaningful human-review procedure**, roles and thresholds. |
| Q23 | **Can an authorised person pause, override, roll back or safely stop each material AI use?** | `single_select`: Yes, tested and understood; Yes, but not tested/documented; Only partly; No; Not sure. Then: **Is there a workable non-AI fallback for critical functions?** Yes; Partly; No; Not applicable; Not sure. | Untested G+1; partly G+2; no/not sure G+4. Missing critical fallback G+2. | **C13 intervention/override**, **C21 continuity/fallback**. |
| Q24 | **How are AI outputs checked before they are relied on?** | `multi_select`: Checked against reliable source material; Reviewed by a person with relevant subject knowledge; Calculations/data are independently checked; Citations/links are opened and verified; Bias/fairness is checked where people may be affected; A second approval is required for higher-impact outputs; A documented checklist is used; Only informal checking; No regular checking; Not sure. | Only informal G+2. No/Not sure G+4. If high-impact and no subject-qualified review, **U8**. | **C14 output-verification standard**, testing criteria. |

### E. People, transparency and contestability

| ID | Exact question | Answer type and exact options | Branching and internal triggers | Output/control mapping |
|---|---|---|---|---|
| Q25 | **Are there clear rules about who may use AI, which tools they may use and what information they must not enter?** | `single_select`: Yes, written and communicated; Partly/in draft; Verbal or informal only; No; Not sure. Conditional multi-select: Organisation accounts; MFA/SSO; role-based access; periodic access removal; logs/audit trail; none/not sure. | Partial/informal G+1; no/not sure G+3. Sensitive data plus no access control adds G+2. | **C03 acceptable-use policy**, C09 tool/access list, C11 security. |
| Q26 | **What practical AI training have staff and contractors received?** | `single_select`: Role-specific training with records; Basic training for everyone who uses AI; Informal tips only; None; Not sure; Not applicable—sole operator. Conditional: topics covered—data/privacy, verification, bias, security/prompt injection, approved tools, incidents, human oversight. | Informal G+1; none/not sure G+2; high-impact use without relevant training adds G+2. | **C18 AI literacy and training plan**. |
| Q27 | **When people interact with AI, receive AI-generated content or are materially affected by AI-assisted decisions, are they told clearly?** | `single_select`: Yes, consistently and appropriately; For some uses; Only if asked; No; Not sure; Not applicable. Conditional: describe label/notice and where it appears. | For some G+1; only if asked/no/not sure G+3 where Q15/Q16 applies. Customer-facing high-impact without disclosure may trigger **U3**. | **C15 transparency/disclosure**, privacy notice update, content-labelling rule. |
| Q28 | **Can affected people report a problem, question an AI-assisted outcome and receive a meaningful human response?** | `single_select`: Yes, clear process with owner and response pathway; General complaints channel only; Informal process; No; Not sure; Not applicable. | General/informal G+1; no/not sure G+3 when people affected. | **C16 contestability and complaints process**, escalation contact. |

### F. Vendors, privacy, security, testing and records

| ID | Exact question | Answer type and exact options | Branching and internal triggers | Output/control mapping |
|---|---|---|---|---|
| Q29 | **Before approving an AI vendor or tool, what does the organisation check?** | `multi_select`: Intended use and limitations; Data ownership and permitted use; Whether inputs/outputs train the provider’s models; Storage location and retention/deletion; Who can access data and any subprocessors; Security controls and incident history; Breach/incident notification terms; Testing evidence and known limitations; Ability to export/delete data and exit the service; Contract/service terms; Vendor reputation; No defined review; Not sure. | Fewer than 3 substantive checks G+2; no defined/not sure G+3. Sensitive data plus unknown training/access/retention sets reviewer escalation and may set **U1**. | **C10 vendor due-diligence checklist**, contract questions, vendor register. |
| Q30 | **Which data and security controls are used for AI tools?** | `multi_select`: Organisation-managed accounts; MFA/SSO; Least-privilege or role-based access; Encryption in transit/at rest confirmed; Logging/audit trail; Data minimisation/de-identification; Retention/deletion settings; Backups/versioning where needed; Secrets/credentials blocked from prompts; Connected apps/plugins reviewed; Security updates/vendor notices monitored; Incident response includes AI; None; Not sure. | None/not sure G+4. For sensitive/financial/children/confidential data, fewer than four relevant controls adds G+2. Credentials permitted in prompts = **U1**. | **C11 AI security baseline**, C06 data rules, C19 incident process. |
| Q31 | **Was each material AI use tested for its intended purpose before it went live?** | `single_select`: Yes, against documented acceptance criteria; Yes, with practical examples but not documented; Vendor evidence only; Limited/ad hoc testing; No; Not sure; Not live yet. Conditional `multi_select`: accuracy; harmful/unsafe output; bias/fairness; privacy/data leakage; security/prompt injection; edge cases; accessibility; escalation/override; load/scale; other. | Practical undocumented G+1; vendor only/limited G+2; no/not sure G+4. Higher-impact use lacking relevant testing sets reviewer escalation. Planned use gets a pre-deployment testing action, not a gap for not yet testing. | **C14/C20 testing and acceptance plan**, evidence record. |
| Q32 | **After deployment, how is AI performance and behaviour monitored and reviewed?** | `multi_select`: Named owner reviews it; User feedback/complaints monitored; Output samples checked; Accuracy/error trends tracked; Bias/fairness reviewed; Vendor/model changes tracked; Security/privacy events monitored; Formal review date/cadence; Reassessment after changes/incidents; Only ad hoc checks; No monitoring; Not sure; Not live yet. | Only ad hoc G+1; no/not sure G+3. High-impact live use with no monitoring adds G+2. | **C20 monitoring/review schedule**, metrics, reassessment triggers. |
| Q33 | **Has any AI use caused or nearly caused a problem?** | `single_select`: No known issue; Minor issue resolved; Significant issue resolved; Current or unresolved issue; Possible issue—not enough information; Not sure. Conditional `multi_select`: inaccurate/misleading output; privacy/data exposure; security event; unfair/bias concern; harmful/inappropriate content; unauthorised use; wrong decision/action; complaint; financial/reputational loss; other. Conditional text: date, affected use, containment, owner and current status. | Minor E+1. Significant E+2. Current/unresolved or possible serious issue = **U5**; G+4 if no response process. Not sure G+1. Form must tell customer not to upload affected personal/confidential data. | **C19 AI incident response and log**, remediation and specialist referral. |
| Q34 | **Which relevant records, policies or processes already exist?** | `multi_select`: AI policy/acceptable-use rules; AI register/tool inventory; Risk or impact assessment; Privacy policy/notices; Privacy impact assessment process; Information-security/cyber policy; Data classification/handling rules; Vendor/procurement review; Incident/data-breach response; Complaints/review process; Staff training records; Testing/monitoring records; Business continuity plan; None; Not sure. Optional `file_optional`: upload redacted documents or provide links later. | No AI policy G+2. No AI register G+2. None/not sure G+4. Do not penalise absence of specialised standalone documents where equivalent controls exist elsewhere; reviewer adjusts. | Determines document-pack modules and reuse of existing controls. |
| Q35 | **What would make this assessment most useful for you?** | `multi_select`: Know what to fix first; Set staff rules; Create an AI register; Review privacy/data handling; Improve vendor selection; Improve human review/testing; Prepare for customers/tenders; Respond to a concern/incident; Plan a new AI use; Other. Optional: **Anything else the reviewer should know?** `long_text`. | No score. If incident selected but Q33 says no issue, contradiction prompt. | Prioritises report narrative and customised pack. |

## 5. Branching rules

1. Q10–Q19 repeat for each selected material use case. One is required; two more are optional.
2. Show Q13 when Q12 contains anything other than public information or `None`.
3. Show Q14 when Q12 includes personal, worker, sensitive, financial or children’s information, or when Q16 concerns people.
4. Show Q15 follow-up text only when the answer is not `No`.
5. Show Q16 decision description when the answer is recommendation, ranking, determination or unsure.
6. Show Q18 explanation when any group or `Not sure` is selected.
7. Show Q19 contestability whenever Q15, Q16, Q17 or Q18 indicates people may be affected.
8. Show access-control details in Q25 when there is more than one user or any sensitive data.
9. Show Q33 incident details only for a known, possible or unresolved issue.
10. If a U flag is triggered, do **not** show alarming automated language. Show: “Your answers indicate an area that the WHATBIT reviewer will examine closely.”
11. If the respondent cannot confirm organisation-wide practices (Q04), label organisation-level findings `based on limited respondent visibility`.
12. Do not ask the customer to paste personal, sensitive, confidential or incident data into free-text fields.

## 6. Triage, weighting and outcome logic

### 6.1 Design principle

Weighting is an internal consistency aid. It is not a scientific risk calculation, probability estimate or compliance score. The reviewer may change the draft outcome only with a recorded reason.

Compute separately for each material use case:

- **Exposure weight (E):** stakes and context—data, autonomy, scale, affected people and reversibility.
- **Control-gap weight (G):** missing or uncertain accountability, safeguards, oversight, verification, testing, monitoring and records.

Organisation-wide gaps apply to every use case. Cap duplicated scoring where one answer expresses the same underlying issue. For example, Q17 adds E+4 once even if several high-impact domains are selected.

### 6.2 Exposure band

| Internal E total | Draft band | Meaning |
|---:|---|---|
| 0–4 | Contained | Internal or low-stakes use with limited data/autonomy/impact. |
| 5–11 | Material | Meaningful data, interaction, decision support, scale or stakeholder impact. |
| 12+ | Elevated | High-impact, sensitive, autonomous, difficult-to-reverse or vulnerable-group context. |

### 6.3 Control-gap band

| Internal G total | Draft band | Meaning |
|---:|---|---|
| 0–5 | Supported | Core controls appear present, subject to evidence and review. |
| 6–13 | Developing | Several controls are partial, informal or uncertain. |
| 14+ | Material gaps | Important controls are absent, unknown or not operating. |

### 6.4 Draft attention matrix

| Exposure \ control gaps | Supported | Developing | Material gaps |
|---|---|---|---|
| Contained | **Low** | **Moderate** | **Higher Attention** |
| Material | **Moderate** | **Moderate** | **Higher Attention** |
| Elevated | **Higher Attention** | **Higher Attention** | **Higher Attention** |

Rules:

- Any U flag makes the draft outcome **Higher Attention pending reviewer confirmation**.
- The organisation outcome is the highest confirmed use-case outcome; never average use cases.
- A confirmed live incident may dominate the outcome even if the underlying use was otherwise contained.
- A strong control environment does not reduce an inherently elevated/high-impact use below Higher Attention; it changes the recommendations and residual concerns.
- A planned use may receive Higher Attention because of context, but the wording should focus on pre-deployment requirements rather than present failure.
- Low requires no U flag, no unresolved contradiction, no high-impact domain, and no official S4/S5/S6 combination.

### 6.5 Official-screening-aligned flags

| Flag | Theme | Main source questions |
|---|---|---|
| S1 | Personal, sensitive or confidential information | Q12–Q14 |
| S2 | Direct end-user interaction without meaningful oversight | Q11, Q15 |
| S3 | Autonomous action at scale / difficult intervention | Q10–Q11, Q23 |
| S4 | Vulnerable, marginalised or underrepresented groups | Q18 |
| S5 | Regulated area or legal/significant effect | Q05, Q16–Q17 |
| S6 | Harm difficult to contest, reverse or redress | Q19, Q28 |
| S7 | General-purpose or readily adaptable/open-ended system | Q06, Q11 |

One S flag means additional governance attention may be needed; it does not by itself prove Higher Attention or unacceptable use. The combination and controls matter.

## 7. Mandatory human-review escalation

The following are not automatic legal conclusions. They require prompt WHATBIT review and may require the report to recommend pausing, containing or limiting the use until an appropriately qualified specialist has reviewed it.

| Flag | Escalation condition | Minimum reviewer action |
|---|---|---|
| U1 | Sensitive/personal/confidential information or credentials entered into a public/personal/unapproved tool; or provider training/access/retention is unknown for such data. | Clarify actual data, account tier and vendor terms. Recommend immediate containment/data-input restriction. Consider privacy/cyber referral and incident pathway. |
| U2 | AI normally determines or materially influences a health, safety, employment, finance, legal, education, housing or service-access outcome without capable human review before action. | Confirm decision flow and human authority. Recommend pause/approval gate, impact assessment, testing and relevant legal/professional review. |
| U3 | Customer/public-facing AI gives higher-impact information or outcomes without clear disclosure, human escalation, challenge or redress. | Verify interface and notices. Recommend disclosure, escalation and complaints controls before continued higher-impact use. |
| U4 | Agent or autonomous system can send external communications, alter important records, make payments/purchases, delete data or trigger systems without scoped permissions, approval gates and logs. | Confirm permissions and actions. Recommend least privilege, sandboxing, action allow-list, approval gates, logging and emergency stop. |
| U5 | Current/unresolved privacy, security, harmful-output, bias, wrong-decision or other material incident. | Do not investigate substantive personal/confidential data in this form. Confirm containment and responsible owner; recommend incident/breach/legal/cyber process as appropriate. |
| U6 | No identifiable accountable owner for a live high-impact or autonomous AI use. | Require accountable senior owner and system owner before further deployment or expansion. |
| U7 | Use affects vulnerable/marginalised people in a higher-stakes context without a documented stakeholder impact review or meaningful engagement. | Recommend impact assessment, accessibility/fairness review and stakeholder input before expansion. |
| U8 | AI-generated health, legal, financial, safety, employment or service-access information is treated as final without review by a suitably capable/qualified person. | Recommend mandatory qualified review, clear limitations and prohibition on unsupervised final advice/action. |

Referral language:

> This issue falls outside a general readiness assessment and may require advice from a qualified privacy, cyber security, legal, employment, financial, clinical or other sector specialist. WHATBIT has not determined that a breach or non-compliance has occurred.

## 8. Recommended control catalogue

Each control has a stable ID so answers can populate future documents without embedding document wording in the assessment.

| ID | Recommended control | Triggered mainly by | Minimum implementation evidence | Likely document-pack destination |
|---|---|---|---|---|
| C01 | Appoint overall responsible-AI owner | Q20 gap | Named role, authority, review cadence | AI Policy; Responsibility Schedule |
| C02 | Assign owner for every material AI system/use | Q09, Q21 | AI register owner field | AI Register; Role Schedule |
| C03 | Written acceptable-use and prohibited-use rules | Q07, Q25, Q34 | Approved policy, staff acknowledgement | AI Acceptable Use Policy; Staff Guide |
| C04 | Complete AI tool and use-case register | Q06, Q08–Q09, Q34 | Dated register including embedded AI | AI Register |
| C05 | Use-case screening and stakeholder impact assessment | Q16–Q19, S4–S6 | Assessment, affected groups, mitigations, decision | Risk/Impact Assessment |
| C06 | Data-input classification and minimisation rules | Q12–Q13, Q30 | Allowed/prohibited data table, de-identification steps | Data Handling Standard; Staff Guide |
| C07 | Privacy review / PIA and notices where relevant | Q12–Q14, Q27, Q29 | Applicability checked, data flow, purpose/notice/consent questions | Privacy Review Checklist; Notice Update Brief |
| C08 | Purpose and scope boundaries for each use | Q09–Q11 | Approved purpose, prohibited extensions | AI Register; Use-Case Card |
| C09 | Approved tools/accounts/access list | Q06–Q07, Q25 | Approved tool list, business accounts, offboarding | Approved AI Tools Register |
| C10 | Vendor due diligence and contract checks | Q13, Q29 | Completed vendor checklist, terms date, residual issues | Vendor Review Checklist |
| C11 | AI security baseline | Q12–Q13, Q25, Q30 | MFA, least privilege, logging, secrets block, plugin review | Security Addendum; Access Checklist |
| C12 | Meaningful human review and approval thresholds | Q11, Q15–Q17, Q22 | Named reviewer, timing, authority, evidence reviewed | Human Oversight Procedure |
| C13 | Intervention, override and emergency-stop process | Q11, Q23 | Tested pause/rollback/stop and contact | Human Oversight Procedure; Incident Plan |
| C14 | Output verification and acceptance criteria | Q14, Q16, Q24, Q31 | Verification checklist, source checks, qualified review | Output Verification Checklist; Test Plan |
| C15 | Transparent AI interaction/content/decision notices | Q15–Q16, Q27 | Plain-language labels/notices placed at interaction point | Transparency Statement; Notice Copy Brief |
| C16 | Challenge, complaints, escalation and redress | Q15–Q19, Q28 | Accessible channel, human contact, response and correction | Complaints/Contestability Procedure |
| C17 | Records identify AI-generated/inferred information and provenance | Q14, Q24, Q34 | Source/system/date/verification marker | Recordkeeping Standard; AI Register |
| C18 | Role-based AI literacy and refresher training | Q20, Q24–Q26 | Topics, attendance, refresh date | Training Plan; Staff Guide |
| C19 | AI incident reporting, containment and learning | Q30, Q33–Q34 | Incident log, triage owner, external referral criteria | AI Incident Response Procedure; Incident Log |
| C20 | Pre-deployment testing and ongoing monitoring | Q10, Q24, Q31–Q32 | Acceptance criteria, test evidence, metrics, cadence | Test & Monitoring Plan; Review Log |
| C21 | Non-AI fallback and continuity plan | Q23 | Tested manual/alternate pathway | Continuity Addendum |
| C22 | Agent/action constraints | Q11, U4 | Tool/action allow-list, scoped credentials, approvals, logs | Agent Controls Schedule |

### Control recommendation rules

1. Recommend a control when its trigger answer is absent, partial or unknown, or when the exposure context requires stronger evidence.
2. Order recommendations by: urgent containment; high-impact oversight; privacy/security; accountability; testing/monitoring; records and maturity improvements.
3. Do not recommend a new standalone document where an existing policy can be amended effectively.
4. For `Not sure`, recommend discovery/verification first, not an accusation of absence.
5. For planned systems, phrase controls as preconditions before launch.
6. For live Higher Attention systems, give an immediate action, a 30-day action and a longer-term action.

## 9. Implementation data structure

Store raw answers separately from computed flags and reviewer decisions. Preserve the exact assessment version and framework check date.

```ts
type AttentionLevel = "low" | "moderate" | "higher_attention";
type UseStatus = "planned" | "trial" | "live" | "paused";

interface AssessmentSubmissionV1 {
  schema_version: "whatbit_rai_readiness_v1";
  assessment_id: string;
  purchased_at?: string;
  started_at: string;
  submitted_at?: string;
  consented_to_scope: boolean;
  organisation: {
    legal_or_trading_name: string;
    abn?: string;
    website?: string;
    state_or_territory: string;
    description: string;
    size_band: string;
    sectors: string[];
    possible_obligations: string[];
  };
  respondent: {
    name: string;
    role: string;
    email: string;
    respondent_type: string;
    organisation_wide_visibility: "yes" | "partly" | "no";
  };
  tools: Array<{
    tool_id: string;
    name: string;
    provider?: string;
    status: "in_use" | "trial" | "planned" | "retired";
    account_type: string;
    approval_status: string;
    business_areas: string[];
    purpose: string;
  }>;
  organisation_answers: Record<string, unknown>; // Q07, Q08, Q20–Q35
  use_cases: Array<{
    use_case_id: string;
    name: string;
    linked_tool_ids: string[];
    business_purpose: string;
    team: string;
    status: UseStatus;
    users_or_recipients: string;
    accountable_person?: string;
    answers: Record<string, unknown>; // Q10–Q19
    computed?: ComputedUseCaseTriage;
    reviewer?: ReviewerUseCaseDecision;
  }>;
  attachments?: Array<{
    attachment_id: string;
    filename: string;
    description?: string;
    customer_confirmed_redacted: boolean;
  }>;
  computed: {
    contradiction_flags: string[];
    completeness_flags: string[];
    suggested_controls: string[]; // C01–C22
    draft_overall_attention: AttentionLevel;
  };
  reviewer?: {
    reviewer_name: string;
    reviewed_at: string;
    evidence_reviewed: string[];
    confirmed_overall_attention: AttentionLevel;
    adjustment_reason?: string;
    urgent_actions: string[];
    recommendations: Recommendation[];
    referrals_or_limitations: string[];
    quality_check_completed: boolean;
  };
}

interface ComputedUseCaseTriage {
  exposure_points: number;
  control_gap_points: number;
  exposure_band: "contained" | "material" | "elevated";
  gap_band: "supported" | "developing" | "material_gaps";
  screening_flags: Array<"S1" | "S2" | "S3" | "S4" | "S5" | "S6" | "S7">;
  urgent_flags: Array<"U1" | "U2" | "U3" | "U4" | "U5" | "U6" | "U7" | "U8">;
  draft_attention: AttentionLevel;
  recommended_control_ids: string[];
}

interface ReviewerUseCaseDecision {
  confirmed_attention: AttentionLevel;
  adjustment_reason?: string;
  key_reasons: string[];
  residual_unknowns: string[];
}

interface Recommendation {
  control_id: string;
  priority: "immediate" | "next_30_days" | "next_90_days";
  action: string;
  owner_role?: string;
  target_date?: string;
  source_question_ids: string[];
  status_at_assessment: "absent" | "partial" | "present_unverified" | "present_verified";
}
```

Implementation requirements:

- Store enumerated option codes, not display labels, but retain the form-version dictionary.
- Store each use case independently; never flatten or average them.
- Save `Not sure` distinctly from `No`.
- Keep calculations reproducible, with triggered question and option codes.
- Do not expose E/G points through the customer interface or report.
- Reviewer changes must append an audit event; do not overwrite the original automated draft silently.
- Encrypt submissions and attachments in transit and at rest; use least-privilege access and retention/deletion rules.
- Do not use customer responses to train a model by default. Any later secondary use requires a separately designed and reviewed process.

### 9.1 Canonical fields for the companion document library

The template-producing workflow should consume canonical reviewed fields, not raw answers or scores. This prevents a customer selecting an option from being turned directly into an unsupported policy claim.

| Canonical field | Derived from | Typical document use |
|---|---|---|
| `org.name`, `org.abn`, `org.website`, `org.location`, `org.description`, `org.size_band`, `org.sectors` | Q01–Q03 | All document headers and context clauses |
| `assessment.scope`, `assessment.limitations`, `assessment.review_date` | Q04, Q08–Q09, reviewer | Report, policy scope, review schedule |
| `governance.overall_owner` | Q20 plus reviewer confirmation | AI Policy responsibility clause |
| `governance.system_owners[]` | Q09, Q21 plus reviewer confirmation | AI Register and Responsibility Schedule |
| `ai_tools[]` | Q06–Q08 plus vendor review | AI/Approved Tools Register |
| `ai_use_cases[]` | Q09–Q19 plus reviewer confirmation | AI Register and Use-Case Cards |
| `data.allowed_categories[]`, `data.prohibited_categories[]`, `data.safeguards[]` | Q12–Q14, Q25, Q29–Q30 | Data Handling Standard and Staff Guide |
| `human_review.rules[]`, `human_review.approvers[]`, `human_review.override_steps[]` | Q11, Q16, Q22–Q24 | Human Oversight Procedure |
| `transparency.notices[]`, `transparency.placement[]` | Q15–Q16, Q27 | Transparency Statement and notice copy |
| `contestability.channel`, `contestability.owner`, `contestability.steps[]` | Q19, Q28 | Complaints/Contestability Procedure |
| `vendor.requirements[]`, `vendor.open_questions[]` | Q13, Q29–Q30 | Vendor Review Checklist and procurement schedule |
| `testing.acceptance_criteria[]`, `testing.monitoring[]`, `testing.review_triggers[]` | Q24, Q31–Q32 | Test & Monitoring Plan |
| `incident.categories[]`, `incident.response_steps[]`, `incident.contacts[]` | Q30, Q33–Q34 | AI Incident Response Procedure and log |
| `training.audiences[]`, `training.topics[]`, `training.cadence` | Q20, Q24–Q26 | Training Plan and Staff Guide |
| `actions.immediate[]`, `actions.days_30[]`, `actions.days_90[]` | Confirmed control gaps and reviewer | Report action plan |

For every canonical field, store `source_question_ids`, `review_status` and `confirmed_by`. If the customer has not supplied a fact—such as an owner name, complaints email, retention period or review date—the document must show a completion placeholder or reviewer query; it must never invent one.

## 10. Customer-facing results structure

### Page 1 — clear outcome

- Organisation and assessment date.
- **Overall attention level: Low / Moderate / Higher Attention.**
- Two-sentence meaning of the level.
- Three plain-English reasons, each tied to an actual answer.
- Scope: tools and material use cases reviewed.
- Prominent boundary: not legal advice, certification or compliance determination.

### Page 2 — AI use snapshot

- Tool inventory summary.
- Material use-case cards showing purpose, status, users/affected groups, main data categories, autonomy and named owner.
- Scope gaps: unapproved tools, unknown embedded AI or more uses requiring review.

### Page 3 — six-practice readiness view

For each current government practice, use one of:

- **Established** — a control is described and credible evidence is available.
- **Partly established** — some practice exists but needs strengthening or documentation.
- **Priority gap** — a material control is absent or unsuitable for the use.
- **Not confirmed** — insufficient information; do not present as absent.

Show one strength, one gap and the relevant action. Do not roll these into a percentage.

### Page 4 — priority action plan

1. **Immediate / before continued higher-impact use** — containment, pause, approval gate, owner, incident steps or specialist referral.
2. **Next 30 days** — foundational controls and highest-value fixes.
3. **Next 90 days** — testing, monitoring, training, vendor/contract and maturity actions.

Each action includes: what to do, why it matters, suggested owner, evidence of completion and linked control ID.

### Page 5 — customised document pack

- Documents supplied.
- Existing documents to amend rather than duplicate.
- Which assessment answers populated each document.
- Fields still requiring customer confirmation.

### Appendix

- Detailed use-case findings.
- Assumptions, unknowns and exclusions.
- Evidence reviewed.
- Official guidance basis and source links.
- Assessment limitations and recommended reassessment date/event.

Customer-facing result language examples:

- “The use is higher attention because it may influence access to a service and affects people who may find an outcome difficult to challenge. A capable person should review each recommendation before action.”
- “We could not confirm whether the provider uses submitted data for model training. Verify the applicable service terms before personal information is entered.”
- “This is a priority gap” rather than “You are non-compliant.”
- “No material issue was identified from the answers reviewed” rather than “This use is safe.”

## 11. Internal WHATBIT reviewer checklist

### Scope and completeness

- [ ] Customer accepted the product boundary and assessment scope.
- [ ] Organisation identity, respondent role and visibility are clear.
- [ ] Tool inventory includes embedded AI, personal accounts, free tools and retired tools relevant to incidents.
- [ ] The selected use case is genuinely the most material, not merely the most frequent.
- [ ] Any high-impact use selected in Q08 is either assessed or explicitly excluded.
- [ ] More than three material use cases is disclosed as a scope limitation.

### Trigger and outcome review

- [ ] Each S1–S7 flag is supported by the relevant answer.
- [ ] Each U1–U8 flag has been confirmed, cleared or qualified; no automated allegation remains.
- [ ] Duplicate E/G weights for the same issue were capped.
- [ ] `Not sure` was treated as uncertainty, not a confirmed failure.
- [ ] Each use case has its own result; overall result equals the highest confirmed attention level.
- [ ] Any reviewer adjustment to the draft level has a short evidence-based reason.
- [ ] Low is not assigned where a high-impact domain, urgent flag or material unknown remains.

### Sensitive and higher-impact review

- [ ] Actual data categories, account tier, provider access/training and retention are understood where sensitive data is involved.
- [ ] High-impact decisions have a named capable human reviewer before action, authority to reject the AI output and a documented basis for the final decision.
- [ ] Vulnerable or marginalised affected groups have been considered for accessibility, fairness, engagement and redress.
- [ ] Customer-facing AI has clear identification, scope limits, human escalation and appropriate collection/privacy notices.
- [ ] Agentic actions have least privilege, allow-listed actions, approval gates, logs and a tested stop mechanism.
- [ ] Any incident has an owner and containment pathway; WHATBIT does not collect unnecessary incident data.
- [ ] Specialist referral is included where legal/privacy/cyber/clinical/employment/financial interpretation is needed.

### Recommendations and pack

- [ ] Every Priority gap has at least one actionable control.
- [ ] Recommendations are proportionate to organisation size and actual use.
- [ ] Immediate actions are separated from 30-day and 90-day actions.
- [ ] Existing controls are reused or amended; the pack does not create conflicting duplicates.
- [ ] Every generated document field is supported by an answer or marked for confirmation.
- [ ] No invented owner, training, approval, test, incident status, legal obligation or vendor assurance appears.
- [ ] Claims about vendor terms are dated and linked to the applicable plan/account where possible.
- [ ] Customer language avoids pass/fail, safe, compliant, certified or guaranteed.

### Final quality control

- [ ] Organisation/tool/use-case names are consistent across report and documents.
- [ ] Findings distinguish facts, customer statements, reviewer observations and recommendations.
- [ ] Limitations, excluded uses and unanswered questions are visible.
- [ ] Official framework name and six practices are current as of issue date.
- [ ] Recommended reassessment trigger is included: material new tool/use; vendor/model change; incident; major workflow/data change; new affected group; or at least annual review for material uses.
- [ ] A second WHATBIT quality check is completed for every Higher Attention report before release.

## 12. Form UX and service-operation notes

- Use a single focused form, progress indicator and save/resume. Do not build a dashboard for V1.
- Start with a 2-minute inventory, then explain why the customer is selecting the “use that matters most.”
- Use examples in helper text, not jargon in the main question.
- Phrase the customer promise as **“About 15–20 minutes for most businesses.”** One material use case is required; additional use cases are optional and may take longer.
- Provide `Not sure` wherever a reasonable SME may not know; unknowns are useful findings.
- Avoid collecting actual client records, prompts, health information, employee files or credentials.
- Keep automated analysis invisible until human review. The post-submit screen should say the responses have been received for WHATBIT review, not show a definitive instant result.
- Aim for a human review time of 45–75 minutes for one normal SME submission; Higher Attention or incident cases may need rescoping.

## 13. Source-of-truth references

Primary sources checked on 28 August 2026:

1. National AI Centre, **Guidance for AI adoption: foundations** (current page; PDF published 5 May 2026): https://www.ai.gov.au/staying-safe-and-responsible/essential-ai-practices/guidance-ai-adoption-foundations
2. National AI Centre, **Guidance for AI adoption: implementation guidance**: https://www.ai.gov.au/staying-safe-and-responsible/essential-ai-practices/guidance-ai-adoption-implementation-guidance
3. National AI Centre, **AI screening questions** (seven-question screening tool; published 22 April 2026): https://www.ai.gov.au/practical-guides-and-learning/planning-tools-and-templates/ai-screening-questions
4. National AI Centre, **Be clear about AI-generated content**: https://www.ai.gov.au/staying-safe-and-responsible/essential-ai-practices/be-clear-about-ai-use
5. Office of the Australian Information Commissioner, **Guidance on privacy and the use of commercially available AI products** (updated 17 January 2025): https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/guidance-on-privacy-and-the-use-of-commercially-available-ai-products
6. Australian Signals Directorate's Australian Cyber Security Centre, **Artificial intelligence for small business: Managing cyber security risks** (published 14 January 2026): https://www.cyber.gov.au/business-government/secure-design/artificial-intelligence/artificial-intelligence-for-small-business

The earlier Voluntary AI Safety Standard remains useful background, but the current six-practice Guidance for AI Adoption is the primary framework for this product.
