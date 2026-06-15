"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import styles from "./workspace.module.css";

type ProposalInput = {
  client: string;
  opportunity: string;
  scope: string;
  location: string;
  area: string;
  timeline: string;
  companyName?: string;
};

type TextBlock = { id: string; type: "text"; title: string; content: string };
type CoverBlock = { id: string; type: "cover"; title: string; subtitle: string; preparedFor: string; preparedBy: string; companyLogo?: string; clientLogo?: string };
type TableBlock = { id: string; type: "table"; title: string; columns: string[]; rows: string[][] };
type ProposalBlock = TextBlock | CoverBlock | TableBlock;

const fallbackInput: ProposalInput = {
  client: "ABC Builders",
  opportunity: "G+5 Residential Apartment",
  scope: "Structural Design Consultancy",
  location: "",
  area: "",
  timeline: "",
  companyName: "Your Consultancy",
};

function id() {
  return Math.random().toString(36).slice(2, 9);
}

function timelineRows(input: ProposalInput) {
  const weeks = input.timeline || "3 weeks";
  return [
    ["1", "Input review, drawings study and design basis finalization", "Week 1"],
    ["2", "Structural analysis, design development and coordination", weeks.includes("2") ? "Week 2" : "Week 2"],
    ["3", "Drawing preparation, review comments and final submission", weeks.includes("3") ? "Week 3" : "Final week"],
  ];
}

function commercialRows() {
  return [
    ["Advance", "40%", "On project confirmation"],
    ["Primary Submission", "40%", "On submission of primary structural drawings"],
    ["Final Handover", "20%", "On final deliverables and closure"],
  ];
}

function fallbackBlocks(input: ProposalInput, branding: { companyLogo?: string; clientLogo?: string }): ProposalBlock[] {
  const location = input.location ? ` located at ${input.location}` : "";
  const area = input.area ? ` with an approximate built-up area of ${input.area}` : "";

  return [
    {
      id: id(),
      type: "cover",
      title: input.scope || "Consultancy Proposal",
      subtitle: input.opportunity,
      preparedFor: input.client,
      preparedBy: input.companyName || "Your Consultancy",
      companyLogo: branding.companyLogo,
      clientLogo: branding.clientLogo,
    },
    {
      id: id(),
      type: "text",
      title: "Cover Letter",
      content: `Dear ${input.client},\n\nWe are pleased to submit this proposal for ${input.scope} for the proposed ${input.opportunity}${location}.`,
    },
    {
      id: id(),
      type: "text",
      title: "Project Understanding",
      content: `Based on the initial requirement, we understand that ${input.client} requires professional consultancy support for ${input.opportunity}${area}.`,
    },
    {
      id: id(),
      type: "text",
      title: "Scope of Services",
      content: "The proposed scope includes structural analysis, design support, coordination with architectural drawings, preparation of structural drawings and clarification support during execution.",
    },
    {
      id: id(),
      type: "text",
      title: "Deliverables",
      content: "The deliverables may include structural drawings, design basis notes, coordination comments and revision support as mutually agreed.",
    },
    {
      id: id(),
      type: "table",
      title: "Project Timeline",
      columns: ["Phase", "Activity", "Duration"],
      rows: timelineRows(input),
    },
    {
      id: id(),
      type: "table",
      title: "Commercial Payment Schedule",
      columns: ["Milestone", "Fee Split", "Payment Trigger"],
      rows: commercialRows(),
    },
    {
      id: id(),
      type: "text",
      title: "Terms & Conditions",
      content: "Professional fees are subject to final scope confirmation. Government fees, statutory payments and third-party charges are excluded unless explicitly agreed.",
    },
  ];
}

function textSectionsToBlocks(sections: any[], input: ProposalInput, branding: { companyLogo?: string; clientLogo?: string }): ProposalBlock[] {
  const textBlocks: TextBlock[] = (sections || [])
    .filter((section) => {
      const title = String(section.title || "").toLowerCase();
      return !title.includes("timeline") && !title.includes("commercial");
    })
    .map((section) => ({
      id: id(),
      type: "text",
      title: section.title,
      content: section.content,
    }));

  return [
    {
      id: id(),
      type: "cover",
      title: input.scope || "Consultancy Proposal",
      subtitle: input.opportunity,
      preparedFor: input.client,
      preparedBy: input.companyName || "Your Consultancy",
      companyLogo: branding.companyLogo,
      clientLogo: branding.clientLogo,
    },
    ...textBlocks,
    {
      id: id(),
      type: "table",
      title: "Project Timeline",
      columns: ["Phase", "Activity", "Duration"],
      rows: timelineRows(input),
    },
    {
      id: id(),
      type: "table",
      title: "Commercial Payment Schedule",
      columns: ["Milestone", "Fee Split", "Payment Trigger"],
      rows: commercialRows(),
    },
  ];
}

export default function ProposalWorkspacePage() {
  const [input, setInput] = useState<ProposalInput>(fallbackInput);
  const [blocks, setBlocks] = useState<ProposalBlock[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [loading, setLoading] = useState(false);
  const [custom, setCustom] = useState("");
  const [error, setError] = useState("");
  const [learning, setLearning] = useState<string[]>([
    "Preferred proposal structure will be learned as you work.",
    "Scope preferences will be learned from section improvements.",
    "Commercial preferences will be learned from repeated patterns.",
  ]);

  const selected = useMemo(() => blocks.find((s) => s.id === selectedId) || blocks[0], [blocks, selectedId]);

  useEffect(() => {
    const stored = sessionStorage.getItem("proposal_input");
    const parsed = stored ? JSON.parse(stored) : fallbackInput;
    const brandingStored = sessionStorage.getItem("proposal_branding");
    const parsedBranding = brandingStored ? JSON.parse(brandingStored) : {};
    setInput(parsed);
    createDraft(parsed, parsedBranding);
  }, []);

  async function createDraft(data: ProposalInput, proposalBranding: { companyLogo?: string; clientLogo?: string }) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/proposal/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("AI route failed");
      const json = await res.json();
      const next = textSectionsToBlocks(json.sections || [], data, proposalBranding);
      setBlocks(next.length ? next : fallbackBlocks(data, proposalBranding));
      setSelectedId(next[0]?.id || "");
    } catch {
      const next = fallbackBlocks(data, proposalBranding);
      setBlocks(next);
      setSelectedId(next[0].id);
      setError("Using sample proposal content. Add OPENAI_API_KEY to enable live AI generation.");
    } finally {
      setLoading(false);
    }
  }

  function updateBlock(blockId: string, patch: Partial<ProposalBlock>) {
    setBlocks((current) => current.map((block) => block.id === blockId ? ({ ...block, ...patch } as ProposalBlock) : block));
  }

  function updateTableCell(blockId: string, rowIndex: number, colIndex: number, value: string) {
    setBlocks((current) => current.map((block) => {
      if (block.id !== blockId || block.type !== "table") return block;
      const rows = block.rows.map((row, r) => row.map((cell, c) => r === rowIndex && c === colIndex ? value : cell));
      return { ...block, rows };
    }));
  }

  function addTableRow(blockId: string) {
    setBlocks((current) => current.map((block) => {
      if (block.id !== blockId || block.type !== "table") return block;
      return { ...block, rows: [...block.rows, block.columns.map(() => "")] };
    }));
  }

  function addTextSection() {
    const section: TextBlock = { id: id(), type: "text", title: "New Section", content: "Write your section content here." };
    setBlocks((current) => [...current, section]);
    setSelectedId(section.id);
  }

  function addTimelineTable() {
    const table: TableBlock = { id: id(), type: "table", title: "Additional Timeline", columns: ["Phase", "Activity", "Duration"], rows: [["", "", ""]] };
    setBlocks((current) => [...current, table]);
    setSelectedId(table.id);
  }

  function removeBlock(blockId: string) {
    setBlocks((current) => {
      const next = current.filter((s) => s.id !== blockId);
      if (blockId === selectedId) setSelectedId(next[0]?.id || "");
      return next;
    });
  }

  async function improve(instruction: string, learningNote?: string) {
    if (!selected || selected.type !== "text") return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/proposal/improve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: selected, instruction, proposalInput: input }),
      });
      if (!res.ok) throw new Error("AI route failed");
      const json = await res.json();
      updateBlock(selected.id, { content: json.content || selected.content } as Partial<TextBlock>);
    } catch {
      updateBlock(selected.id, { content: `${selected.content}\n\nImprovement note:\nThis section can be refined further for clarity, professional tone and client confidence. Add OPENAI_API_KEY to enable live AI improvement.` } as Partial<TextBlock>);
      setError("Using sample improvement content. Add OPENAI_API_KEY to enable live AI improvement.");
    } finally {
      if (learningNote) setLearning((items) => [learningNote, ...items.slice(0, 4)]);
      setLoading(false);
    }
  }

  function move(blockId: string, direction: "up" | "down") {
    setBlocks((current) => {
      const i = current.findIndex((s) => s.id === blockId);
      const j = direction === "up" ? i - 1 : i + 1;
      if (i < 0 || j < 0 || j >= current.length) return current;
      const next = [...current];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  }

  async function exportWord() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/proposal/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blocks, proposalInput: input }),
      });

      if (!res.ok) throw new Error("Export failed");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const safeClient = (input.client || "Client").replace(/[^a-z0-9-_ ]/gi, "").replace(/\s+/g, "_");
      const link = document.createElement("a");
      link.href = url;
      link.download = `Proposal_${safeClient}.docx`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch {
      setError("Export failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.page}>
      <header className={styles.nav}>
        <Link href="/team" className={styles.back}>← AI Team Home</Link>
        <Link href="/" className={styles.brand}><span>U</span><b>UToldAI</b></Link>
      </header>

      <section className={styles.top}>
        <div>
          <p className={styles.eyebrow}>Proposal Associate</p>
          <h1>Proposal for {input.client}</h1>
          <p>The first draft is assembled as a proposal document with a cover page, text sections and structured tables.</p>
          <button className={styles.exportButton} onClick={exportWord}>Export Word</button>
          {error && <span className={styles.error}>{error}</span>}
        </div>
        <aside>
          <b>Opportunity</b>
          <span>{input.opportunity}</span>
          <span>{input.scope}</span>
        </aside>
      </section>

      <section className={styles.insightStrip}>
        <article>
          <b>Associate Insights</b>
          <p>This appears to be a residential developer opportunity. Emphasize similar experience, coordination support and delivery confidence.</p>
        </article>
        <article>
          <b>Proposal Review</b>
          <p>The proposal now includes a branded cover page, timeline table and commercial payment schedule.</p>
        </article>
        <article>
          <b>Associate Learning</b>
          <p>As I work with your organization, I will learn preferred structures, scope language and client patterns.</p>
        </article>
      </section>

      <section className={styles.shell}>
        <aside className={styles.outline}>
          <b>Proposal Blocks</b>
          {blocks.map((block) => (
            <button key={block.id} className={selected?.id === block.id ? styles.active : ""} onClick={() => setSelectedId(block.id)}>
              {block.type === "cover" ? "Cover Page" : block.title}
            </button>
          ))}
          <button className={styles.add} onClick={addTextSection}>+ Add Text Section</button>
          <button className={styles.add} onClick={addTimelineTable}>+ Add Table</button>

          <div className={styles.learningBox}>
            <b>Learning Captured</b>
            {learning.map((item) => <p key={item}>• {item}</p>)}
          </div>
        </aside>

        <section className={styles.editor}>
          {loading && <div className={styles.loading}>Proposal Associate is working...</div>}

          {selected?.type === "cover" && (
            <div className={styles.coverPage}>
              <div className={styles.logoRow}>
                <div className={styles.logoSlot}>
                  {selected.companyLogo ? <img src={selected.companyLogo} alt="Company logo" /> : <span>{selected.preparedBy}</span>}
                </div>
                <div className={styles.logoSlot}>
                  {selected.clientLogo ? <img src={selected.clientLogo} alt="Client logo" /> : <span>{selected.preparedFor}</span>}
                </div>
              </div>

              <p className={styles.coverLabel}>Proposal</p>
              <input className={styles.coverTitle} value={selected.title} onChange={(e) => updateBlock(selected.id, { title: e.target.value } as Partial<CoverBlock>)} />
              <input className={styles.coverSubtitle} value={selected.subtitle} onChange={(e) => updateBlock(selected.id, { subtitle: e.target.value } as Partial<CoverBlock>)} />

              <div className={styles.coverMeta}>
                <label>Prepared For<input value={selected.preparedFor} onChange={(e) => updateBlock(selected.id, { preparedFor: e.target.value } as Partial<CoverBlock>)} /></label>
                <label>Prepared By<input value={selected.preparedBy} onChange={(e) => updateBlock(selected.id, { preparedBy: e.target.value } as Partial<CoverBlock>)} /></label>
              </div>
            </div>
          )}

          {selected?.type === "text" && (
            <>
              <div className={styles.sectionTop}>
                <input value={selected.title} onChange={(e) => updateBlock(selected.id, { title: e.target.value } as Partial<TextBlock>)} />
                <div>
                  <button onClick={() => move(selected.id, "up")}>↑</button>
                  <button onClick={() => move(selected.id, "down")}>↓</button>
                  <button onClick={() => removeBlock(selected.id)}>Remove</button>
                </div>
              </div>

              <textarea value={selected.content} onChange={(e) => updateBlock(selected.id, { content: e.target.value } as Partial<TextBlock>)} />

              <div className={styles.aiActions}>
                <p>Work With Proposal Associate</p>
                <div>
                  <button onClick={() => improve("Improve this section to increase proposal win probability.", "Preference observed: improvements should connect to win probability.")}>Improve Win Probability</button>
                  <button onClick={() => improve("Highlight the consultant's differentiators and credibility.", "Preference observed: differentiators matter in proposal sections.")}>Highlight Differentiators</button>
                  <button onClick={() => improve("Strengthen client confidence in this section.", "Preference observed: client confidence is important.")}>Strengthen Client Confidence</button>
                  <button onClick={() => improve("Address proposal risks and missing clarity in this section.", "Preference observed: risk-aware proposal review is valuable.")}>Address Proposal Risks</button>
                  <button onClick={() => improve("Make this more technical for a structural engineering proposal.", "Preference observed: technical depth preferred in scope sections.")}>Make More Technical</button>
                  <button onClick={() => improve("Add more relevant detail and clarity.", "Preference observed: detailed sections are preferred.")}>Add Detail</button>
                  <button onClick={() => improve("Make this concise without losing meaning.", "Preference observed: concise wording preferred where possible.")}>Shorten</button>
                </div>
              </div>

              <div className={styles.ask}>
                <label>Ask Proposal Associate</label>
                <textarea value={custom} onChange={(e) => setCustom(e.target.value)} placeholder="Example: Make this more persuasive for a real-estate developer." />
                <button onClick={() => { improve(custom || "Improve this section.", "Custom instruction used to improve a proposal section."); setCustom(""); }}>Apply Instruction</button>
              </div>
            </>
          )}

          {selected?.type === "table" && (
            <div className={styles.tableEditor}>
              <div className={styles.sectionTop}>
                <input value={selected.title} onChange={(e) => updateBlock(selected.id, { title: e.target.value } as Partial<TableBlock>)} />
                <div>
                  <button onClick={() => move(selected.id, "up")}>↑</button>
                  <button onClick={() => move(selected.id, "down")}>↓</button>
                  <button onClick={() => removeBlock(selected.id)}>Remove</button>
                </div>
              </div>

              <table>
                <thead>
                  <tr>
                    {selected.columns.map((column) => <th key={column}>{column}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {selected.rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, colIndex) => (
                        <td key={`${rowIndex}-${colIndex}`}>
                          <input value={cell} onChange={(e) => updateTableCell(selected.id, rowIndex, colIndex, e.target.value)} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>

              <button className={styles.tableButton} onClick={() => addTableRow(selected.id)}>+ Add Row</button>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
