import React, { useState } from "react";
import type { ToolRecord, UseCaseRecord, UseStatus } from "../types";

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

export const RepeatGroupEditor: React.FC<RepeatGroupEditorProps> = (props) => {
  const { type, items, onRemove, error, maxItems = 10, minItems = 1 } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states for Tool
  const [toolName, setToolName] = useState("");
  const [toolProvider, setToolProvider] = useState("");
  const [toolStatus, setToolStatus] = useState<"in_use" | "trial" | "planned" | "retired">("in_use");
  const [toolAccountType, setToolAccountType] = useState("org_paid");
  const [toolApproval, setToolApproval] = useState("general_approval");
  const [toolBusinessAreas, setToolBusinessAreas] = useState<string[]>([]);
  const [toolPurpose, setToolPurpose] = useState("");

  // Form states for Use Case
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

  const renderToolItem = (tool: ToolRecord, idx: number) => {
    const statusLabels: Record<string, string> = {
      in_use: "In use",
      trial: "Trial",
      planned: "Planned",
      retired: "No longer used",
    };

    const accountLabels: Record<string, string> = {
      org_paid: "Organisation-managed paid",
      org_free: "Organisation-managed free",
      personal: "Personal account",
      embedded: "Embedded in another system",
      not_sure: "Not sure",
    };

    return (
      <div
        key={tool.tool_id}
        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white rounded-xl border border-[var(--color-line)] gap-3 shadow-2xs hover:border-[var(--color-accent)]/50 transition-all"
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono font-medium text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded">
              #{idx + 1}
            </span>
            <span className="font-semibold text-base text-[var(--color-ink)]">{tool.name}</span>
            {tool.provider && (
              <span className="text-xs text-stone-500">({tool.provider})</span>
            )}
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                tool.status === "in_use"
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : tool.status === "trial"
                  ? "bg-amber-50 text-amber-700 border border-amber-200"
                  : "bg-stone-100 text-stone-600 border border-stone-200"
              }`}
            >
              {statusLabels[tool.status] || tool.status}
            </span>
          </div>
          <p className="text-xs text-stone-600 line-clamp-2">{tool.purpose}</p>
          <div className="flex items-center gap-2 text-xs text-stone-500 flex-wrap pt-0.5">
            <span>Account: {accountLabels[tool.account_type] || tool.account_type}</span>
            {tool.business_areas && tool.business_areas.length > 0 && (
              <>
                <span>•</span>
                <span>Areas: {tool.business_areas.join(", ")}</span>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
          <button
            type="button"
            onClick={() => openEditModal(tool)}
            className="px-3 py-1.5 text-xs font-medium text-[var(--color-accent)] hover:bg-[var(--color-accent-soft)] rounded-lg transition-colors cursor-pointer border border-[var(--color-accent)]/30"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => onRemove(tool.tool_id)}
            className="px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer border border-red-200"
          >
            Remove
          </button>
        </div>
      </div>
    );
  };

  const renderUseCaseItem = (uc: UseCaseRecord, idx: number) => {
    const availableTools = (props as UseCaseEditorProps).availableTools || [];
    const linkedToolNames = uc.linked_tool_ids
      .map((id) => availableTools.find((t) => t.tool_id === id)?.name || id)
      .join(", ");

    const statusBadges: Record<string, string> = {
      live: "Live",
      trial: "Trial",
      planned: "Planned",
      paused: "Paused",
    };

    return (
      <div
        key={uc.use_case_id}
        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white rounded-xl border border-[var(--color-line)] gap-3 shadow-2xs hover:border-[var(--color-accent)]/50 transition-all"
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono font-medium text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded">
              Use Case #{idx + 1}
            </span>
            <span className="font-semibold text-base text-[var(--color-ink)]">{uc.name}</span>
            <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-blue-50 text-blue-700 border border-blue-200">
              {statusBadges[uc.status] || uc.status}
            </span>
          </div>
          <p className="text-xs text-stone-600 line-clamp-2">{uc.business_purpose}</p>
          <div className="flex items-center gap-2 text-xs text-stone-500 flex-wrap pt-0.5">
            <span>Team: {uc.team}</span>
            {linkedToolNames && (
              <>
                <span>•</span>
                <span className="font-medium text-stone-700">Tools: {linkedToolNames}</span>
              </>
            )}
            {uc.accountable_person && (
              <>
                <span>•</span>
                <span>Owner: {uc.accountable_person}</span>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
          <button
            type="button"
            onClick={() => openEditModal(uc)}
            className="px-3 py-1.5 text-xs font-medium text-[var(--color-accent)] hover:bg-[var(--color-accent-soft)] rounded-lg transition-colors cursor-pointer border border-[var(--color-accent)]/30"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => onRemove(uc.use_case_id)}
            className="px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer border border-red-200"
          >
            Remove
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Header with counter and Add button */}
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-medium text-stone-600">
          {items.length} of {maxItems} {type === "tool" ? "tools" : "material use cases"} recorded
          {minItems > 0 && items.length < minItems && (
            <span className="text-amber-700 font-medium ml-1">({minItems} required)</span>
          )}
        </span>
        {items.length < maxItems && (
          <button
            type="button"
            onClick={openAddModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-sm font-semibold text-white bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 rounded-lg shadow-xs transition-all cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
            </svg>
            Add {type === "tool" ? "Tool" : "Use Case"}
          </button>
        )}
      </div>

      {error && <p className="text-xs font-medium text-red-600">{error}</p>}

      {/* Items list */}
      {items.length === 0 ? (
        <div className="p-8 text-center bg-stone-50/80 rounded-xl border border-dashed border-[var(--color-line)]">
          <p className="text-sm text-stone-600 mb-3">
            {type === "tool"
              ? "No AI tools recorded yet. Please add at least one current or planned tool."
              : "No material use cases added yet. Select your primary AI use case to proceed."}
          </p>
          <button
            type="button"
            onClick={openAddModal}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-[var(--color-accent)] bg-[var(--color-accent-soft)] hover:bg-[var(--color-accent-soft)]/80 rounded-lg transition-colors cursor-pointer"
          >
            + Add First {type === "tool" ? "Tool" : "Use Case"}
          </button>
        </div>
      ) : (
        <div className="space-y-2.5">
          {items.map((item, idx) =>
            type === "tool"
              ? renderToolItem(item as ToolRecord, idx)
              : renderUseCaseItem(item as UseCaseRecord, idx),
          )}
        </div>
      )}

      {/* Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[var(--color-line)] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h3 className="text-lg font-bold text-[var(--color-ink)]">
                {editingId ? "Edit" : "Add"} {type === "tool" ? "AI Tool / System" : "Material AI Use Case"}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-stone-400 hover:text-stone-600 text-xl font-bold p-1 leading-none"
              >
                &times;
              </button>
            </div>

            {formError && (
              <div className="mt-3 p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200">
                {formError}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4 mt-4 text-sm">
              {type === "tool" ? (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Tool or Product Name *
                    </label>
                    <input
                      type="text"
                      value={toolName}
                      onChange={(e) => setToolName(e.target.value)}
                      placeholder="e.g. ChatGPT, Microsoft 365 Copilot, Claude, Otter.ai"
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Provider (optional)
                    </label>
                    <input
                      type="text"
                      value={toolProvider}
                      onChange={(e) => setToolProvider(e.target.value)}
                      placeholder="e.g. OpenAI, Microsoft, Anthropic"
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Status</label>
                      <select
                        value={toolStatus}
                        onChange={(e) => setToolStatus(e.target.value as any)}
                        className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none bg-white"
                      >
                        <option value="in_use">In use</option>
                        <option value="trial">Trial</option>
                        <option value="planned">Planned</option>
                        <option value="retired">No longer used</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Account Type</label>
                      <select
                        value={toolAccountType}
                        onChange={(e) => setToolAccountType(e.target.value)}
                        className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none bg-white"
                      >
                        <option value="org_paid">Organisation-managed paid</option>
                        <option value="org_free">Organisation-managed free</option>
                        <option value="personal">Personal account</option>
                        <option value="embedded">Embedded in another system</option>
                        <option value="not_sure">Not sure</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Approval Status</label>
                    <select
                      value={toolApproval}
                      onChange={(e) => setToolApproval(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none bg-white"
                    >
                      <option value="named_owner">Named owner</option>
                      <option value="general_approval">General approval</option>
                      <option value="not_formally_approved">Not formally approved</option>
                      <option value="not_sure">Not sure</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Short Purpose / Intended Use *
                    </label>
                    <textarea
                      rows={2}
                      value={toolPurpose}
                      onChange={(e) => setToolPurpose(e.target.value)}
                      placeholder="e.g. Drafting client emails, summarizing board meetings, coding assistance"
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none"
                      required
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Use Case Name *
                    </label>
                    <input
                      type="text"
                      value={ucName}
                      onChange={(e) => setUcName(e.target.value)}
                      placeholder="e.g. Customer support inquiry drafting, Hiring candidate review"
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Linked AI Tools (select from tools entered in Q06)
                    </label>
                    <div className="space-y-1.5 max-h-36 overflow-y-auto p-2 border border-stone-200 rounded-lg bg-stone-50">
                      {(props as UseCaseEditorProps).availableTools.length === 0 ? (
                        <p className="text-xs text-stone-500">No tools recorded yet.</p>
                      ) : (
                        (props as UseCaseEditorProps).availableTools.map((t) => {
                          const isChecked = ucLinkedTools.includes(t.tool_id);
                          return (
                            <label
                              key={t.tool_id}
                              className="flex items-center gap-2 text-xs text-stone-700 cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => {
                                  if (isChecked) {
                                    setUcLinkedTools(ucLinkedTools.filter((id) => id !== t.tool_id));
                                  } else {
                                    setUcLinkedTools([...ucLinkedTools, t.tool_id]);
                                  }
                                }}
                                className="rounded text-[var(--color-accent)]"
                              />
                              <span>{t.name}</span>
                            </label>
                          );
                        })
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Business Purpose *
                    </label>
                    <textarea
                      rows={2}
                      value={ucPurpose}
                      onChange={(e) => setUcPurpose(e.target.value)}
                      placeholder="What business problem or workflow does this use case address?"
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Team / Department *
                      </label>
                      <input
                        type="text"
                        value={ucTeam}
                        onChange={(e) => setUcTeam(e.target.value)}
                        placeholder="e.g. Sales, Customer Care, HR"
                        className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Current Status</label>
                      <select
                        value={ucStatus}
                        onChange={(e) => setUcStatus(e.target.value as UseStatus)}
                        className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none bg-white"
                      >
                        <option value="live">Live</option>
                        <option value="trial">Trial</option>
                        <option value="planned">Planned</option>
                        <option value="paused">Paused</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Who uses or receives output? *
                    </label>
                    <input
                      type="text"
                      value={ucUsers}
                      onChange={(e) => setUcUsers(e.target.value)}
                      placeholder="e.g. Internal team, direct to customers, external clients"
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Accountable Person (optional)
                    </label>
                    <input
                      type="text"
                      value={ucAccountable}
                      onChange={(e) => setUcAccountable(e.target.value)}
                      placeholder="Name or role of person accountable"
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none"
                    />
                  </div>
                </>
              )}

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 rounded-lg shadow-xs transition-all cursor-pointer"
                >
                  Save {type === "tool" ? "Tool" : "Use Case"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
