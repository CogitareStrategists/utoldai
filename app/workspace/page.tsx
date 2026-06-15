"use client";

import { useMemo, useState } from "react";
import styles from "./workspace.module.css";

type View = "dashboard" | "create-proposal" | "proposal-editor";
type Section = { id: string; title: string; content: string };
type ProposalDetails = { clientName: string; projectName: string; location: string; builtUpArea: string; scopeRequired: string };

const business = {
  company: "Vishwakarma Consultants & Constructions",
  owner: "Praveen",
  fullName: "Praveen Chary K",
  qualification: "M.Tech Structures",
  location: "Mahabubnagar | Hyderabad",
  initials: "VC",
};

const recentDocuments = [
  { type: "Proposal", title: "ABC Builders - G+5 Residential Apartment", date: "Today" },
  { type: "Quotation", title: "XYZ Developers - Commercial Building", date: "Yesterday" },
  { type: "Company Profile", title: "Vishwakarma Profile - Client Submission", date: "Last week" },
];

function createId(prefix = "section") {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

function inferDetails(intent: string): ProposalDetails {
  const clean = intent.trim() || "G+5 Residential Apartment";
  let clientName = "ABC Builders";
  if (clean.toLowerCase().includes(" for ")) {
    clientName = clean.split(/ for /i)[1]?.trim() || clientName;
  }
  return {
    clientName,
    projectName: clean,
    location: "",
    builtUpArea: "",
    scopeRequired: clean.toLowerCase().includes("audit") ? "Structural Audit" : "Structural Design Consultancy",
  };
}

function createSections(intent: string, details: ProposalDetails): Section[] {
  const project = details.projectName || intent || "the proposed project";
  const client = details.clientName || "the client";
  const loc = details.location ? ` located at ${details.location}` : "";
  const area = details.builtUpArea ? ` with an approximate built-up area of ${details.builtUpArea}` : "";
  return [
    {
      id: createId("intro"),
      title: "Introduction",
      content: `We are pleased to submit this proposal for ${details.scopeRequired.toLowerCase()} for ${project}${loc}. ${business.company} provides professional structural, architectural and construction consultancy support for residential and commercial projects.`,
    },
    {
      id: createId("understanding"),
      title: "Project Understanding",
      content: `Based on the initial requirement shared by ${client}, the project involves consultancy support for ${project}${area}. The final scope will be refined after reviewing drawings, project details and site-specific requirements.`,
    },
    {
      id: createId("scope"),
      title: "Scope of Work",
      content: "The proposed scope includes structural analysis, RCC design support, coordination with architectural drawings, preparation of design drawings, design assumptions and clarification support during execution.",
    },
    {
      id: createId("deliverables"),
      title: "Deliverables",
      content: "The deliverables may include structural design drawings, design basis notes, coordination comments, revision support as mutually agreed and technical guidance during project execution.",
    },
    {
      id: createId("commercials"),
      title: "Commercials",
      content: "Professional fees will be finalized based on project area, complexity and agreed scope of work. A detailed commercial offer can be shared after reviewing complete project inputs.",
    },
    {
      id: createId("payment"),
      title: "Payment Terms",
      content: "Suggested payment terms: 50% advance on confirmation, 40% on primary submission and 10% on final handover.",
    },
    {
      id: createId("exclusions"),
      title: "Exclusions",
      content: "Government fees, third-party testing, survey charges, major design changes after approval and services not specifically mentioned in the scope are excluded.",
    },
  ];
}

function improve(content: string, action: "professional" | "detail" | "technical" | "short", company: string) {
  const base = content.trim();
  if (action === "professional") return `${base}\n\nProfessional refinement:\nThis section has been improved to sound more client-ready, structured and aligned with ${company}'s professional positioning.`;
  if (action === "detail") return `${base}\n\nAdditional details:\nThis section can also mention assumptions, required inputs from the client, coordination requirements, review expectations and responsibility boundaries.`;
  if (action === "technical") return `${base}\n\nTechnical enhancement:\nThe work will consider structural safety, design practicality, constructability, coordination with architectural intent and relevant engineering standards wherever applicable.`;
  return `${base.split(/[.!?]/)[0] || base}.`;
}

export default function WorkspacePage() {
  const [view, setView] = useState<View>("dashboard");
  const [intent, setIntent] = useState("G+5 Residential Apartment for ABC Builders");
  const [details, setDetails] = useState<ProposalDetails>(() => inferDetails("G+5 Residential Apartment for ABC Builders"));
  const [sections, setSections] = useState<Section[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [customInstruction, setCustomInstruction] = useState("");
  const [saved, setSaved] = useState("");

  const selected = useMemo(() => sections.find((s) => s.id === selectedId) || sections[0], [sections, selectedId]);
  const missing = [
    !details.location ? "Project Location" : "",
    !details.builtUpArea ? "Built-up Area" : "",
    !details.scopeRequired ? "Design Scope" : "",
  ].filter(Boolean);

  function startProposal() {
    const d = inferDetails(intent);
    const generated = createSections(intent, d);
    setDetails(d);
    setSections(generated);
    setSelectedId(generated[0].id);
    setView("proposal-editor");
  }

  function updateSection(id: string, patch: Partial<Section>) {
    setSections((current) => current.map((s) => s.id === id ? { ...s, ...patch } : s));
  }

  function addSection() {
    const s = { id: createId("custom"), title: "New Section", content: "Write your section content here, or use AI to improve it." };
    setSections((current) => [...current, s]);
    setSelectedId(s.id);
  }

  function removeSection(id: string) {
    setSections((current) => {
      const next = current.filter((s) => s.id !== id);
      if (selectedId === id) setSelectedId(next[0]?.id || "");
      return next;
    });
  }

  function moveSection(id: string, direction: "up" | "down") {
    setSections((current) => {
      const i = current.findIndex((s) => s.id === id);
      const j = direction === "up" ? i - 1 : i + 1;
      if (i < 0 || j < 0 || j >= current.length) return current;
      const next = [...current];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  }

  function applyAI(action: "professional" | "detail" | "technical" | "short") {
    if (!selected) return;
    updateSection(selected.id, { content: improve(selected.content, action, business.company) });
  }

  function applyCustom() {
    if (!selected || !customInstruction.trim()) return;
    updateSection(selected.id, { content: `${selected.content}\n\nYour instruction:\n${customInstruction.trim()}\n\nUpdated version:\nThis section has been revised to reflect your instruction while keeping the proposal professional, clear and suitable for client submission.` });
    setCustomInstruction("");
  }

  function updateProposalWithDetails() {
    const generated = createSections(intent, details);
    setSections(generated);
    setSelectedId(generated[0].id);
    setShowDetails(false);
  }

  function saveDraft() {
    setSaved("Draft saved");
    setTimeout(() => setSaved(""), 2000);
  }

  if (view === "dashboard") {
    return (
      <main className={styles.page}>
        <header className={styles.topbar}>
          <a href="/" className={styles.brand}><span className={styles.logo}>{business.initials}</span><span>{business.company}</span></a>
          <div className={styles.topActions}><a href="/" className={styles.secondaryButton}>Landing Page</a><a href="https://wa.me/919182626500" className={styles.primaryButton}>WhatsApp Us</a></div>
        </header>

        <section className={styles.dashboardHero}>
          <div className={styles.businessIdentity}>
            <span className={styles.bigLogo}>{business.initials}</span>
            <div><p>Your Business Profile</p><h1>Good Morning, {business.owner} 👋</h1><span>{business.fullName} • {business.qualification} • {business.location}</span></div>
          </div>
          <h2>What would you like to create today?</h2>
          <div className={styles.createGrid}>
            <button onClick={() => setView("create-proposal")}><span>📄</span><strong>Proposal</strong><small>Create client-ready proposals using your business profile.</small></button>
            <button><span>💰</span><strong>Quotation</strong><small>Prepare fee quotations and commercial offers.</small></button>
            <button><span>🏢</span><strong>Company Profile</strong><small>Build professional company profiles and capability notes.</small></button>
            <button><span>🌐</span><strong>Website Content</strong><small>Create content for business profiles and service pages.</small></button>
            <button><span>✉️</span><strong>Client Communication</strong><small>Draft emails, follow-ups and client messages.</small></button>
          </div>
        </section>

        <section className={styles.recentSection}>
          <div className={styles.sectionHeading}><h2>Recent Documents</h2><p>Continue from where you left off.</p></div>
          <div className={styles.recentList}>
            {recentDocuments.map((doc) => <button key={doc.title}><span>{doc.type}</span><strong>{doc.title}</strong><small>{doc.date}</small></button>)}
          </div>
        </section>
      </main>
    );
  }

  if (view === "create-proposal") {
    return (
      <main className={styles.page}>
        <header className={styles.topbar}><button className={styles.backButton} onClick={() => setView("dashboard")}>← Back</button><a href="/" className={styles.brand}><span className={styles.logo}>{business.initials}</span><span>{business.company}</span></a></header>
        <section className={styles.intentCard}>
          <p className={styles.eyebrow}>Create New Proposal</p>
          <h1>What are you preparing a proposal for?</h1>
          <p>Describe the requirement in one line. Your AI team will create the first draft instantly.</p>
          <textarea value={intent} onChange={(e) => setIntent(e.target.value)} placeholder="Example: G+5 Residential Apartment for ABC Builders" />
          <div className={styles.examples}>
            <button onClick={() => setIntent("G+5 Residential Apartment for ABC Builders")}>G+5 Residential Apartment</button>
            <button onClick={() => setIntent("Structural Audit for an Existing Commercial Building")}>Structural Audit</button>
            <button onClick={() => setIntent("Villa Project for a private client in Hyderabad")}>Villa Project</button>
            <button onClick={() => setIntent("Commercial Building Structural Design for XYZ Developers")}>Commercial Building</button>
          </div>
          <button className={styles.primaryButton} onClick={startProposal}>Create Proposal</button>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <header className={styles.topbar}>
        <button className={styles.backButton} onClick={() => setView("dashboard")}>← Dashboard</button>
        <a href="/" className={styles.brand}><span className={styles.logo}>{business.initials}</span><span>{business.company}</span></a>
        <div className={styles.topActions}>{saved && <span className={styles.saved}>{saved}</span>}<button className={styles.secondaryButton} onClick={saveDraft}>Save Draft</button></div>
      </header>

      <section className={styles.proposalTop}>
        <div><p className={styles.eyebrow}>Proposal Draft</p><h1>{details.clientName} – {details.projectName}</h1><p>Your AI team created a first draft. Now improve it section by section while staying in control.</p></div>
        {missing.length > 0 && <div className={styles.improveCard}><h3>Help me improve this proposal</h3><p>I can make this proposal more accurate if I know:</p><ul>{missing.map((m) => <li key={m}>⚠ {m}</li>)}</ul><button onClick={() => setShowDetails(true)}>Add Details</button></div>}
      </section>

      {showDetails && (
        <section className={styles.detailsDrawer}>
          <div><h2>Add Proposal Details</h2><p>Optional details help your AI team create a more accurate proposal.</p></div>
          <div className={styles.detailsGrid}>
            <label>Client Name<input value={details.clientName} onChange={(e) => setDetails({ ...details, clientName: e.target.value })} /></label>
            <label>Project Name<input value={details.projectName} onChange={(e) => setDetails({ ...details, projectName: e.target.value })} /></label>
            <label>Project Location<input value={details.location} onChange={(e) => setDetails({ ...details, location: e.target.value })} placeholder="Hyderabad" /></label>
            <label>Built-up Area<input value={details.builtUpArea} onChange={(e) => setDetails({ ...details, builtUpArea: e.target.value })} placeholder="15,000 sq.ft" /></label>
            <label className={styles.full}>Scope Required<input value={details.scopeRequired} onChange={(e) => setDetails({ ...details, scopeRequired: e.target.value })} /></label>
          </div>
          <div className={styles.drawerActions}><button className={styles.secondaryButton} onClick={() => setShowDetails(false)}>Cancel</button><button className={styles.primaryButton} onClick={updateProposalWithDetails}>Update Proposal</button></div>
        </section>
      )}

      <section className={styles.editorShell}>
        <aside className={styles.sectionsPanel}>
          <div className={styles.sectionHeadingSmall}>Proposal Sections</div>
          {sections.map((section) => <button key={section.id} className={selected?.id === section.id ? styles.activeSection : ""} onClick={() => setSelectedId(section.id)}>{section.title}</button>)}
          <button className={styles.addSectionButton} onClick={addSection}>+ Add Section</button>
        </aside>

        <section className={styles.contentPanel}>
          {selected && <>
            <div className={styles.sectionTop}>
              <input value={selected.title} onChange={(e) => updateSection(selected.id, { title: e.target.value })} />
              <div><button onClick={() => moveSection(selected.id, "up")}>↑</button><button onClick={() => moveSection(selected.id, "down")}>↓</button><button onClick={() => removeSection(selected.id)}>Remove</button></div>
            </div>
            <textarea value={selected.content} onChange={(e) => updateSection(selected.id, { content: e.target.value })} />
            <div className={styles.aiActions}><p>Improve this section</p><div><button onClick={() => applyAI("professional")}>✨ Make More Professional</button><button onClick={() => applyAI("detail")}>✨ Add More Detail</button><button onClick={() => applyAI("technical")}>✨ Make More Technical</button><button onClick={() => applyAI("short")}>✨ Shorten</button></div></div>
            <div className={styles.askAI}><label>Ask AI to improve this section</label><textarea value={customInstruction} onChange={(e) => setCustomInstruction(e.target.value)} placeholder="Example: Add coordination with architect, make it suitable for a premium builder, include assumptions..." /><button className={styles.primaryButton} onClick={applyCustom}>Apply Instruction</button></div>
          </>}
        </section>
      </section>
    </main>
  );
}
