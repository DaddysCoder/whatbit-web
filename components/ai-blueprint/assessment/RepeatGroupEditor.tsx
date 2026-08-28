"use client";

import { useState } from "react";
import type { ToolRecord, UseCaseRecord, UseStatus } from "@/lib/ai-blueprint/assessment/types";
import styles from "./assessment.module.css";

export interface ToolEditorProps {
  type: "tool";
  items: ToolRecord[];
  onAdd: (tool: ToolRecord) => void;
  onUpdate: (id: string, updated: Partial<ToolRecord>) => void;
  onRemove: (id: string) => void;
  maxItems?: number;
  minItems?: number;
  error?: string;
}

export interface UseCaseEditorProps {
  type: "use_case";
  items: UseCaseRecord[];
  availableTools: ToolRecord[];
  onAdd: (useCase: UseCaseRecord) => void;
  onUpdate: (id: string, updated: Partial<UseCaseRecord>) => void;
  onRemove: (id: string) => void;
  maxItems?: number;
  minItems?: number;
  error?: string;
}

type RepeatGroupEditorProps = ToolEditorProps | UseCaseEditorProps;

const TOOL_STATUS_LABELS: Record<string, string> = {
  in_use: "In use",
  trial: "Trial",
  planned: "Planned",
  retired: "No longer used",
};

const TOOL_ACCOUNT_LABELS: Record<string, string> = {
  org_paid: "Organisation-managed paid",
  org_free: "Organisation-managed free",
  personal: "Personal account",
  embedded: "Embedded in another system",
  not_sure: "Not sure",
};

const USE_CASE_STATUS_LABELS: Record<string, string> = {
  live: "Live",
  trial: "Trial",
  planned: "Planned",
  paused: "Paused",
};

export function RepeatGroupEditor(props: RepeatGroupEditorProps) {
  const { type, items, onRemove, error, maxItems = 10, minItems = 1 } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [toolName, setToolName] = useState("");
  const [toolProvider, setToolProvider] = useState("");
  const [toolStatus, setToolStatus] = useState<"in_use" | "trial" | "planned" | "retired">("in_use");
  const [toolAccountType, setToolAccountType] = useState("org_paid");
  const [toolApproval, setToolApproval] = useState("general_approval");
  const [toolBusinessAreas, setToolBusinessAreas] = useState<string[]>([]);
  const [toolPurpose, setToolPurpose] = useState("");

  const [ucName, setUcName] = useState("");
  const [ucLinkedTools, setUcLinkedTools] = useState<string[]>([]);
  const [ucPurpose, setUcPurpose] = useState("");
  const [ucTeam, setUcTeam] = useState("");
  const [ucStatus, setUcStatus] = useState<UseStatus>("live");
  const [ucUsers, setUcUsers] = useState("");
  const [ucAccountable, setUcAccountable] = useState("");

  const [formError, setFormError] = useState("");

  const openAddModal = () => {
    setEditingId(null);
    setFormError("");
    if (type === "tool") {
      setToolName("");
      setToolProvider("");
      setToolStatus("in_use");
      setToolAccountType("org_paid");
      setToolApproval("general_approval");
      setToolBusinessAreas([]);
      setToolPurpose("");
    } else {
      setUcName("");
      setUcLinkedTools([]);
      setUcPurpose("");
      setUcTeam("");
      setUcStatus("live");
      setUcUsers("");
      setUcAccountable("");
    }
    setIsModalOpen(true);
  };

  const openEditModal = (item: ToolRecord | UseCaseRecord) => {
    setFormError("");
    if (type === "tool") {
      const t = item as ToolRecord;
      setEditingId(t.tool_id);
      setToolName(t.name);
      setToolProvider(t.provider || "");
      setToolStatus(t.status);
      setToolAccountType(t.account_type);
      setToolApproval(t.approval_status);
      setToolBusinessAreas(t.business_areas || []);
      setToolPurpose(t.purpose || "");
    } else {
      const uc = item as UseCaseRecord;
      setEditingId(uc.use_case_id);
      setUcName(uc.name);
      setUcLinkedTools(uc.linked_tool_ids || []);
      setUcPurpose(uc.business_purpose || "");
      setUcTeam(uc.team || "");
      setUcStatus(uc.status || "live");
      setUcUsers(uc.users_or_recipients || "");
      setUcAccountable(uc.accountable_person || "");
    }
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (type === "tool") {
      if (!toolName.trim()) {
        setFormError("Please enter the tool or system name.");
        return;
      }
      if (!toolPurpose.trim()) {
        setFormError("Please enter a short purpose.");
        return;
      }

      if (editingId) {
        props.onUpdate(editingId, {
          name: toolName.trim(),
          provider: toolProvider.trim() || undefined,
          status: toolStatus,
          account_type: toolAccountType,
          approval_status: toolApproval,
          business_areas: toolBusinessAreas,
          purpose: toolPurpose.trim(),
        });
      } else {
        const newTool: ToolRecord = {
          tool_id: `tool-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          name: toolName.trim(),
          provider: toolProvider.trim() || undefined,
          status: toolStatus,
          account_type: toolAccountType,
          approval_status: toolApproval,
          business_areas: toolBusinessAreas,
          purpose: toolPurpose.trim(),
        };
        props.onAdd(newTool);
      }
    } else {
      if (!ucName.trim()) {
        setFormError("Please enter a name for this use case.");
        return;
      }
      if (!ucPurpose.trim()) {
        setFormError("Please specify the business purpose.");
        return;
      }
      if (!ucTeam.trim()) {
        setFormError("Please specify the team or department.");
        return;
      }
      if (!ucUsers.trim()) {
        setFormError("Please specify who uses or receives output.");
        return;
      }

      if (editingId) {
        props.onUpdate(editingId, {
          name: ucName.trim(),
          linked_tool_ids: ucLinkedTools,
          business_purpose: ucPurpose.trim(),
          team: ucTeam.trim(),
          status: ucStatus,
          users_or_recipients: ucUsers.trim(),
          accountable_person: ucAccountable.trim() || undefined,
        });
      } else {
        const newUc: UseCaseRecord = {
          use_case_id: `uc-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          name: ucName.trim(),
          linked_tool_ids: ucLinkedTools,
          business_purpose: ucPurpose.trim(),
          team: ucTeam.trim(),
          status: ucStatus,
          users_or_recipients: ucUsers.trim(),
          accountable_person: ucAccountable.trim() || undefined,
          answers: {},
        };
        props.onAdd(newUc);
      }
    }

    setIsModalOpen(false);
  };

  const renderToolItem = (tool: ToolRecord, idx: number) => (
    <div key={tool.tool_id} className={styles.itemRow}>
      <div>
        <div className={styles.itemMeta}>
          <span className={styles.itemIndex}>#{idx + 1}</span>
          <span className={styles.itemName}>{tool.name}</span>
          {tool.provider && <span className={styles.reviewKey}>({tool.provider})</span>}
          <span
            className={styles.itemStatus}
            style={
              tool.status === "in_use"
                ? { background: "#eaf6f0", color: "#1f7a4d", borderColor: "#cdeadb" }
                : tool.status === "trial"
                  ? { background: "#fdf3e0", color: "#8a6116", borderColor: "#f5e2b8" }
                  : { background: "#f2f0f0", color: "#57534e", borderColor: "#e7e5e4" }
            }
          >
            {TOOL_STATUS_LABELS[tool.status] || tool.status}
          </span>
        </div>
        <p className={styles.itemPurpose}>{tool.purpose}</p>
        <div className={styles.itemSub}>
          <span>Account: {TOOL_ACCOUNT_LABELS[tool.account_type] || tool.account_type}</span>
          {tool.business_areas && tool.business_areas.length > 0 && <span>Areas: {tool.business_areas.join(", ")}</span>}
        </div>
      </div>
      <div className={styles.itemActions}>
        <button type="button" onClick={() => openEditModal(tool)} className={styles.buttonGhost}>
          Edit
        </button>
        <button type="button" onClick={() => onRemove(tool.tool_id)} className={styles.buttonDanger}>
          Remove
        </button>
      </div>
    </div>
  );

  const renderUseCaseItem = (uc: UseCaseRecord, idx: number) => {
    const availableTools = (props as UseCaseEditorProps).availableTools || [];
    const linkedToolNames = uc.linked_tool_ids.map((id) => availableTools.find((t) => t.tool_id === id)?.name || id).join(", ");

    return (
      <div key={uc.use_case_id} className={styles.itemRow}>
        <div>
          <div className={styles.itemMeta}>
            <span className={styles.itemIndex}>Use Case #{idx + 1}</span>
            <span className={styles.itemName}>{uc.name}</span>
            <span className={styles.itemStatus} style={{ background: "#eaf1fb", color: "#1a5fb4", borderColor: "#cfe0f7" }}>
              {USE_CASE_STATUS_LABELS[uc.status] || uc.status}
            </span>
          </div>
          <p className={styles.itemPurpose}>{uc.business_purpose}</p>
          <div className={styles.itemSub}>
            <span>Team: {uc.team}</span>
            {linkedToolNames && <span>Tools: {linkedToolNames}</span>}
            {uc.accountable_person && <span>Owner: {uc.accountable_person}</span>}
          </div>
        </div>
        <div className={styles.itemActions}>
          <button type="button" onClick={() => openEditModal(uc)} className={styles.buttonGhost}>
            Edit
          </button>
          <button type="button" onClick={() => onRemove(uc.use_case_id)} className={styles.buttonDanger}>
            Remove
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className={styles.repeatHeader}>
        <span className={styles.repeatCount}>
          {items.length} of {maxItems} {type === "tool" ? "tools" : "material use cases"} recorded
          {minItems > 0 && items.length < minItems && <span className={styles.repeatRequired}>({minItems} required)</span>}
        </span>
        {items.length < maxItems && (
          <button type="button" onClick={openAddModal} className={styles.buttonPrimary}>
            + Add {type === "tool" ? "Tool" : "Use Case"}
          </button>
        )}
      </div>

      {error && <p className={styles.errorText}>{error}</p>}

      {items.length === 0 ? (
        <div className={styles.emptyState}>
          <p className={styles.subcopy}>
            {type === "tool"
              ? "No AI tools recorded yet. Please add at least one current or planned tool."
              : "No material use cases added yet. Select your primary AI use case to proceed."}
          </p>
          <div style={{ marginTop: 12 }}>
            <button type="button" onClick={openAddModal} className={styles.buttonGhost}>
              + Add First {type === "tool" ? "Tool" : "Use Case"}
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.itemList}>
          {items.map((item, idx) => (type === "tool" ? renderToolItem(item as ToolRecord, idx) : renderUseCaseItem(item as UseCaseRecord, idx)))}
        </div>
      )}

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHead}>
              <h3 className={styles.modalTitle}>
                {editingId ? "Edit" : "Add"} {type === "tool" ? "AI Tool / System" : "Material AI Use Case"}
              </h3>
              <button type="button" onClick={() => setIsModalOpen(false)} className={styles.modalClose}>
                &times;
              </button>
            </div>

            {formError && <div className={styles.modalFormError}>{formError}</div>}

            <form onSubmit={handleSave} className={styles.modalForm}>
              {type === "tool" ? (
                <>
                  <div>
                    <label className={styles.fieldLabel}>Tool or Product Name *</label>
                    <input
                      type="text"
                      value={toolName}
                      onChange={(e) => setToolName(e.target.value)}
                      placeholder="e.g. ChatGPT, Microsoft 365 Copilot, Claude, Otter.ai"
                      className={styles.textInput}
                      required
                    />
                  </div>

                  <div>
                    <label className={styles.fieldLabel}>Provider (optional)</label>
                    <input
                      type="text"
                      value={toolProvider}
                      onChange={(e) => setToolProvider(e.target.value)}
                      placeholder="e.g. OpenAI, Microsoft, Anthropic"
                      className={styles.textInput}
                    />
                  </div>

                  <div className={styles.twoCol}>
                    <div>
                      <label className={styles.fieldLabel}>Status</label>
                      <select value={toolStatus} onChange={(e) => setToolStatus(e.target.value as typeof toolStatus)} className={styles.select}>
                        <option value="in_use">In use</option>
                        <option value="trial">Trial</option>
                        <option value="planned">Planned</option>
                        <option value="retired">No longer used</option>
                      </select>
                    </div>

                    <div>
                      <label className={styles.fieldLabel}>Account Type</label>
                      <select value={toolAccountType} onChange={(e) => setToolAccountType(e.target.value)} className={styles.select}>
                        <option value="org_paid">Organisation-managed paid</option>
                        <option value="org_free">Organisation-managed free</option>
                        <option value="personal">Personal account</option>
                        <option value="embedded">Embedded in another system</option>
                        <option value="not_sure">Not sure</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className={styles.fieldLabel}>Approval Status</label>
                    <select value={toolApproval} onChange={(e) => setToolApproval(e.target.value)} className={styles.select}>
                      <option value="named_owner">Named owner</option>
                      <option value="general_approval">General approval</option>
                      <option value="not_formally_approved">Not formally approved</option>
                      <option value="not_sure">Not sure</option>
                    </select>
                  </div>

                  <div>
                    <label className={styles.fieldLabel}>Short Purpose / Intended Use *</label>
                    <textarea
                      rows={2}
                      value={toolPurpose}
                      onChange={(e) => setToolPurpose(e.target.value)}
                      placeholder="e.g. Drafting client emails, summarizing board meetings, coding assistance"
                      className={styles.textarea}
                      required
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className={styles.fieldLabel}>Use Case Name *</label>
                    <input
                      type="text"
                      value={ucName}
                      onChange={(e) => setUcName(e.target.value)}
                      placeholder="e.g. Customer support inquiry drafting, Hiring candidate review"
                      className={styles.textInput}
                      required
                    />
                  </div>

                  <div>
                    <label className={styles.fieldLabel}>Linked AI Tools (select from tools entered in Q06)</label>
                    <div className={styles.checkboxList}>
                      {(props as UseCaseEditorProps).availableTools.length === 0 ? (
                        <p className={styles.subcopy}>No tools recorded yet.</p>
                      ) : (
                        (props as UseCaseEditorProps).availableTools.map((t) => {
                          const isChecked = ucLinkedTools.includes(t.tool_id);
                          return (
                            <label key={t.tool_id} className={styles.checkboxRow}>
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() =>
                                  setUcLinkedTools(isChecked ? ucLinkedTools.filter((id) => id !== t.tool_id) : [...ucLinkedTools, t.tool_id])
                                }
                              />
                              <span>{t.name}</span>
                            </label>
                          );
                        })
                      )}
                    </div>
                  </div>

                  <div>
                    <label className={styles.fieldLabel}>Business Purpose *</label>
                    <textarea
                      rows={2}
                      value={ucPurpose}
                      onChange={(e) => setUcPurpose(e.target.value)}
                      placeholder="What business problem or workflow does this use case address?"
                      className={styles.textarea}
                      required
                    />
                  </div>

                  <div className={styles.twoCol}>
                    <div>
                      <label className={styles.fieldLabel}>Team / Department *</label>
                      <input
                        type="text"
                        value={ucTeam}
                        onChange={(e) => setUcTeam(e.target.value)}
                        placeholder="e.g. Sales, Customer Care, HR"
                        className={styles.textInput}
                        required
                      />
                    </div>

                    <div>
                      <label className={styles.fieldLabel}>Current Status</label>
                      <select value={ucStatus} onChange={(e) => setUcStatus(e.target.value as UseStatus)} className={styles.select}>
                        <option value="live">Live</option>
                        <option value="trial">Trial</option>
                        <option value="planned">Planned</option>
                        <option value="paused">Paused</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className={styles.fieldLabel}>Who uses or receives output? *</label>
                    <input
                      type="text"
                      value={ucUsers}
                      onChange={(e) => setUcUsers(e.target.value)}
                      placeholder="e.g. Internal team, direct to customers, external clients"
                      className={styles.textInput}
                      required
                    />
                  </div>

                  <div>
                    <label className={styles.fieldLabel}>Accountable Person (optional)</label>
                    <input
                      type="text"
                      value={ucAccountable}
                      onChange={(e) => setUcAccountable(e.target.value)}
                      placeholder="Name or role of person accountable"
                      className={styles.textInput}
                    />
                  </div>
                </>
              )}

              <div className={styles.modalActions}>
                <button type="button" onClick={() => setIsModalOpen(false)} className={styles.buttonSecondary}>
                  Cancel
                </button>
                <button type="submit" className={styles.buttonPrimary}>
                  Save {type === "tool" ? "Tool" : "Use Case"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
