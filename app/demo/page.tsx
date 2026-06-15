"use client";

import { useMemo, useState } from "react";
import styles from "./demo.module.css";

type AssistantKey = "proposal" | "quotation" | "profile" | "presence" | "communication";

type Assistant = {
  key: AssistantKey;
  name: string;
  icon: string;
  description: string;
  placeholder: string;
  examples: string[];
};

const assistants: Assistant[] = [
  {
    key: "proposal",
    name: "Proposal Assistant",
    icon: "📄",
    description: "Creates professional proposals using your company knowledge.",
    placeholder: "Example: Create a proposal for structural design consultancy for a G+5 apartment in Hyderabad.",
    examples: [
      "Create a proposal for structural design consultancy for a G+5 apartment in Hyderabad.",
      "Create a proposal for proof checking services for a commercial complex.",
      "Prepare a scope of work for RCC structural design services."
    ]
  },
  {
    key: "quotation",
    name: "Quotation Assistant",
    icon: "💰",
    description: "Prepares fee quotations and commercial offers.",
    placeholder: "Example: Create a quotation for RCC design services for a 20,000 sq.ft residential project.",
    examples: [
      "Create a quotation for RCC design services for a 20,000 sq.ft residential project.",
      "Prepare a commercial offer for structural audit of an existing building.",
      "Create a fee breakup for architectural and structural design services."
    ]
  },
  {
    key: "profile",
    name: "Company Profile Assistant",
    icon: "🏢",
    description: "Builds company profiles, capability statements and service profiles.",
    placeholder: "Example: Create a 2-page company profile for Vishwakarma Consultants.",
    examples: [
      "Create a 2-page company profile for Vishwakarma Consultants.",
      "Prepare a capability statement for structural and architectural services.",
      "Create a short company introduction for client submission."
    ]
  },
  {
    key: "presence",
    name: "Digital Presence Assistant",
    icon: "🌐",
    description: "Creates website, portfolio and business profile content.",
    placeholder: "Example: Create homepage content for Vishwakarma Consultants.",
    examples: [
      "Create homepage content for Vishwakarma Consultants.",
      "Create a service page for structural design consultancy.",
      "Create a project summary for a residential building portfolio."
    ]
  },
  {
    key: "communication",
    name: "Communication Assistant",
    icon: "✉️",
    description: "Drafts professional emails, follow-ups and client messages.",
    placeholder: "Example: Draft a follow-up email for a proposal submitted last week.",
    examples: [
      "Draft a follow-up email for a proposal submitted last week.",
      "Create a covering letter for submitting a structural design proposal.",
      "Write a WhatsApp message introducing our consultancy services."
    ]
  }
];

const businessContext = {
  company: "Vishwakarma Consultants & Constructions",
  owner: "Praveen Chary K",
  qualification: "M.Tech Structures",
  locations: "Mahabubnagar | Hyderabad",
  services: [
    "Structural Design",
    "Architectural Design",
    "Municipal Permissions",
    "2D & 3D Elevations",
    "Estimation & Costing",
    "Vastu Consultation",
    "Construction & Contracting"
  ],
  strengths: [
    "Design-to-execution support",
    "Residential and commercial project experience",
    "Structural and architectural consultancy under one roof",
    "Local expertise across Telangana"
  ]
};

function getProjectLabel(prompt: string) {
  const text = prompt.trim();
  if (!text) return "G+5 Residential Apartment Project";
  if (text.length > 78) return `${text.slice(0, 78)}...`;
  return text;
}

function ProposalPreview({ prompt }: { prompt: string }) {
  return (
    <div className={styles.documentPreview}>
      <div className={styles.documentHeader}>
        <div>
          <div className={styles.docLabel}>Proposal Preview</div>
          <h3>Structural Design Consultancy Proposal</h3>
          <p>{getProjectLabel(prompt)}</p>
        </div>
        <div className={styles.logoBadge}>VC</div>
      </div>

      <div className={styles.metaGrid}>
        <div><span>Prepared By</span><strong>{businessContext.company}</strong></div>
        <div><span>Consultant</span><strong>{businessContext.owner}</strong></div>
        <div><span>Location</span><strong>{businessContext.locations}</strong></div>
        <div><span>Status</span><strong>Draft Ready</strong></div>
      </div>

      <div className={styles.previewSection}>
        <h4>Scope of Work</h4>
        <ul>
          <li>Structural analysis and design for the proposed project</li>
          <li>RCC / steel design support based on project requirement</li>
          <li>Coordination with architectural drawings and project inputs</li>
          <li>Design drawings, assumptions and technical documentation</li>
        </ul>
      </div>

      <div className={styles.previewSection}>
        <h4>Professional Approach</h4>
        <p>
          The design approach will focus on safety, constructability, cost-conscious
          detailing and practical execution support.
        </p>
      </div>

      <div className={styles.previewActions}>
        <button>Download PDF</button>
        <button>Edit Proposal</button>
        <button>Send to Client</button>
      </div>
    </div>
  );
}

function QuotationPreview({ prompt }: { prompt: string }) {
  const rows = [
    ["Structural Design Consultancy", "1", "₹25,000", "₹25,000"],
    ["Drawing Coordination Support", "1", "₹7,500", "₹7,500"],
    ["Revision & Clarification Support", "1", "₹5,000", "₹5,000"]
  ];
  return (
    <div className={styles.documentPreview}>
      <div className={styles.documentHeader}>
        <div>
          <div className={styles.docLabel}>Quotation Preview</div>
          <h3>Fee Quotation</h3>
          <p>{getProjectLabel(prompt)}</p>
        </div>
        <div className={styles.amountBadge}>₹37,500</div>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.quoteTable}>
          <thead>
            <tr>
              <th>Service</th>
              <th>Qty</th>
              <th>Rate</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row[0]}>
                {row.map((cell) => <td key={cell}>{cell}</td>)}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3}>Total Professional Fee</td>
              <td>₹37,500</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className={styles.previewSection}>
        <h4>Terms</h4>
        <p>50% advance, 40% on primary submission and 10% on final handover. Quotation valid for 15 days.</p>
      </div>

      <div className={styles.previewActions}>
        <button>Download Quotation</button>
        <button>Edit Amounts</button>
        <button>Copy Terms</button>
      </div>
    </div>
  );
}

function CompanyProfilePreview() {
  return (
    <div className={styles.profilePreview}>
      <div className={styles.profilePage}>
        <div className={styles.profileCover}>
          <div className={styles.logoBadge}>VC</div>
          <h3>{businessContext.company}</h3>
          <p>Structural • Architectural • Construction Consultancy</p>
        </div>
        <div className={styles.profileContent}>
          <h4>About Us</h4>
          <p>
            Professional consultancy firm led by {businessContext.owner}, {businessContext.qualification},
            providing integrated design-to-execution support.
          </p>
          <h4>Core Services</h4>
          <div className={styles.serviceChips}>
            {businessContext.services.slice(0, 6).map((service) => <span key={service}>{service}</span>)}
          </div>
        </div>
      </div>

      <div className={styles.profilePage}>
        <h4>Why Choose Us</h4>
        <ul>
          {businessContext.strengths.map((strength) => <li key={strength}>{strength}</li>)}
        </ul>
        <h4>Ideal For</h4>
        <p>Home owners, builders, architects, developers, contractors and institutions.</p>
        <div className={styles.previewActions}>
          <button>Download Profile PDF</button>
          <button>Update Projects</button>
        </div>
      </div>
    </div>
  );
}

function DigitalPresencePreview() {
  const sections = [
    ["Hero Section", "Professional Structural, Architectural & Construction Consultancy"],
    ["About Section", "Led by Praveen Chary K, M.Tech Structures, serving clients across Telangana."],
    ["Services Section", "Structural Design, Architectural Design, Permissions, Estimation and Costing."],
    ["Portfolio Section", "Residential buildings, commercial projects, elevations and construction support."],
    ["Contact Section", "Call, WhatsApp and location details with clear enquiry buttons."]
  ];

  return (
    <div className={styles.websitePreview}>
      <div className={styles.browserBar}>
        <span></span><span></span><span></span>
        <strong>vishwakarmaconsultants.in</strong>
      </div>
      <div className={styles.webHero}>
        <h3>Professional Structural & Architectural Consultancy</h3>
        <p>Design-to-execution support for residential and commercial projects.</p>
        <button>Request Consultation</button>
      </div>
      <div className={styles.webSections}>
        {sections.map(([title, copy]) => (
          <div key={title} className={styles.webSectionCard}>
            <strong>{title}</strong>
            <p>{copy}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CommunicationPreview({ prompt }: { prompt: string }) {
  return (
    <div className={styles.emailPreview}>
      <div className={styles.emailToolbar}>
        <span></span><span></span><span></span>
        <strong>Email Draft</strong>
      </div>
      <div className={styles.emailFields}>
        <div><span>To</span><strong>Client / Builder / Architect</strong></div>
        <div><span>Subject</span><strong>Follow-up Regarding Your Project Requirement</strong></div>
      </div>
      <div className={styles.emailBody}>
        <p>Dear Sir/Madam,</p>
        <p>
          Thank you for considering {businessContext.company} for your project requirement.
          We would be happy to assist you with professional consultancy support.
        </p>
        <p>
          Based on your requirement, our team can help with structural design,
          architectural planning, permissions, estimation and execution-related guidance.
        </p>
        <p>Please share available drawings or site details so that we can suggest the next steps.</p>
        <p>
          Regards,<br />
          {businessContext.owner}<br />
          {businessContext.company}
        </p>
      </div>
      <div className={styles.previewActions}>
        <button>Copy Email</button>
        <button>Improve Tone</button>
        <button>Make Shorter</button>
      </div>
    </div>
  );
}

function OutputPreview({ type, prompt }: { type: AssistantKey; prompt: string }) {
  if (type === "proposal") return <ProposalPreview prompt={prompt} />;
  if (type === "quotation") return <QuotationPreview prompt={prompt} />;
  if (type === "profile") return <CompanyProfilePreview />;
  if (type === "presence") return <DigitalPresencePreview />;
  return <CommunicationPreview prompt={prompt} />;
}

export default function DemoWorkspacePage() {
  const [selected, setSelected] = useState<AssistantKey>("proposal");
  const [prompt, setPrompt] = useState(assistants[0].examples[0]);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const currentAssistant = useMemo(
    () => assistants.find((assistant) => assistant.key === selected)!,
    [selected]
  );

  function selectAssistant(key: AssistantKey) {
    const next = assistants.find((assistant) => assistant.key === key)!;
    setSelected(key);
    setPrompt(next.examples[0]);
    setHasGenerated(false);
  }

  function generateOutput() {
    setIsGenerating(true);
    setHasGenerated(false);
    window.setTimeout(() => {
      setHasGenerated(true);
      setIsGenerating(false);
    }, 650);
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <a href="/" className={styles.brand}>
          <span className={styles.logo}>U</span>
          <span>UtoldAI</span>
        </a>
        <div className={styles.headerActions}>
          <a href="/" className={styles.secondaryButton}>Landing Page</a>
          <a href="https://wa.me/919182626500" className={styles.primaryButton}>WhatsApp Us</a>
        </div>
      </header>

      <section className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>Demo Workspace</p>
          <h1>Your AI Team for {businessContext.company}</h1>
          <p>
            This demo shows how a personalized AI team can use a business profile,
            services, portfolio and branding to create business-ready outputs.
          </p>
        </div>
        <div className={styles.contextCard}>
          <div className={styles.contextTitle}>Business Context Loaded</div>
          <h2>{businessContext.company}</h2>
          <p>{businessContext.owner} • {businessContext.qualification}</p>
          <div className={styles.tags}>
            {businessContext.services.slice(0, 5).map((service) => (
              <span key={service}>{service}</span>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.workspace}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarTitle}>AI Assistants</div>
          {assistants.map((assistant) => (
            <button
              key={assistant.key}
              className={`${styles.assistantButton} ${
                selected === assistant.key ? styles.activeAssistant : ""
              }`}
              onClick={() => selectAssistant(assistant.key)}
            >
              <span>{assistant.icon}</span>
              <div>
                <strong>{assistant.name}</strong>
                <small>{assistant.description}</small>
              </div>
            </button>
          ))}
        </aside>

        <section className={styles.chatPanel}>
          <div className={styles.panelTop}>
            <div>
              <p className={styles.eyebrowSmall}>Selected Assistant</p>
              <h2>{currentAssistant.icon} {currentAssistant.name}</h2>
              <p>{currentAssistant.description}</p>
            </div>
          </div>

          <div className={styles.examples}>
            {currentAssistant.examples.map((example) => (
              <button key={example} onClick={() => setPrompt(example)}>
                {example}
              </button>
            ))}
          </div>

          <label className={styles.inputLabel} htmlFor="prompt">
            Request
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            placeholder={currentAssistant.placeholder}
            className={styles.textarea}
          />

          <div className={styles.generateRow}>
            <button className={styles.primaryButton} onClick={generateOutput}>
              {isGenerating ? "Generating..." : "Generate Business Output"}
            </button>
            <span>Demo mode: output previews are sample layouts.</span>
          </div>
        </section>

        <aside className={styles.previewPanel}>
          <div className={styles.previewTitle}>
            <span>Output Preview</span>
            <strong>{currentAssistant.name}</strong>
          </div>

          {!hasGenerated && !isGenerating && (
            <div className={styles.previewEmpty}>
              <div>✨</div>
              <h3>Business-ready preview will appear here</h3>
              <p>Select an assistant and click generate to preview the deliverable.</p>
            </div>
          )}

          {isGenerating && (
            <div className={styles.loadingPreview}>
              <span></span><span></span><span></span>
              <p>Your AI team is preparing the preview...</p>
            </div>
          )}

          {hasGenerated && <OutputPreview type={selected} prompt={prompt} />}
        </aside>
      </section>
    </main>
  );
}
