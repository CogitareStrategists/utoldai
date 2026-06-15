"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./create.module.css";

type FormState = {
  client: string;
  opportunity: string;
  scope: string;
  location: string;
  area: string;
  timeline: string;
  companyName: string;
};

function assess(form: FormState) {
  const missing = [];
  if (!form.location.trim()) missing.push("Project location");
  if (!form.area.trim()) missing.push("Built-up area");
  if (!form.timeline.trim()) missing.push("Expected timeline");
  const score = 100 - missing.length * 12 - (!form.scope.trim() ? 18 : 0);

  return {
    score: Math.max(52, score),
    missing,
    risks: [
      !form.area.trim() ? "Commercials may remain broad without built-up area." : "",
      !form.timeline.trim() ? "Timeline commitments may sound generic." : "",
      form.scope.toLowerCase().includes("structural") ? "" : "Scope may need clearer technical definition.",
    ].filter(Boolean),
    recommendations: [
      "Clarify expected deliverables before submission.",
      "Highlight relevant residential or similar project experience.",
      "Emphasize coordination support with architect and client team.",
    ],
  };
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function CreateProposalPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({
    client: "ABC Builders",
    opportunity: "G+5 Residential Apartment",
    scope: "Structural Design Consultancy",
    location: "",
    area: "",
    timeline: "",
    companyName: "Your Consultancy",
  });
  const [companyLogo, setCompanyLogo] = useState("");
  const [clientLogo, setClientLogo] = useState("");
  const [showAssessment, setShowAssessment] = useState(false);
  const assessment = useMemo(() => assess(form), [form]);

  async function handleLogo(file: File | undefined, type: "company" | "client") {
    if (!file) return;
    const dataUrl = await readFileAsDataUrl(file);
    if (type === "company") setCompanyLogo(dataUrl);
    if (type === "client") setClientLogo(dataUrl);
  }

  function generateProposal() {
    sessionStorage.setItem("proposal_input", JSON.stringify(form));
    sessionStorage.setItem("proposal_assessment", JSON.stringify(assessment));
    sessionStorage.setItem("proposal_branding", JSON.stringify({ companyLogo, clientLogo }));
    router.push("/team/proposal/workspace");
  }

  return (
    <main className={styles.page}>
      <header className={styles.nav}>
        <Link href="/team/proposal" className={styles.back}>← Proposal Associate</Link>
        <Link href="/" className={styles.brand}><span>U</span><b>UToldAI</b></Link>
      </header>

      <section className={styles.shell}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>Opportunity brief</p>
          <h1>Let's understand the opportunity first.</h1>
          <p>
            A proactive teammate should assess the opportunity before creating the proposal.
            Share what you know. Missing details are okay.
          </p>
          <div className={styles.note}>
            <b>Proposal Builder</b>
            <span>Add your logo and client logo to create a branded cover page. Timeline and commercials will be assembled as proposal tables.</span>
          </div>
        </div>

        <form className={styles.form} onSubmit={(e) => { e.preventDefault(); setShowAssessment(true); }}>
          <label>Company / Consultancy Name
            <input value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })} required />
          </label>

          <div className={styles.uploadGrid}>
            <label className={styles.uploadBox}>
              Company Logo <span>(optional)</span>
              <input type="file" accept="image/*" onChange={(e) => handleLogo(e.target.files?.[0], "company")} />
              {companyLogo ? <img src={companyLogo} alt="Company logo preview" /> : <small>Upload logo</small>}
            </label>

            <label className={styles.uploadBox}>
              Client Logo <span>(optional)</span>
              <input type="file" accept="image/*" onChange={(e) => handleLogo(e.target.files?.[0], "client")} />
              {clientLogo ? <img src={clientLogo} alt="Client logo preview" /> : <small>Upload logo</small>}
            </label>
          </div>

          <label>Client Name
            <input value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} required />
          </label>

          <label>Opportunity / Project
            <input value={form.opportunity} onChange={(e) => setForm({ ...form, opportunity: e.target.value })} required />
          </label>

          <label>Scope Required
            <input value={form.scope} onChange={(e) => setForm({ ...form, scope: e.target.value })} required />
          </label>

          <label>Project Location <span>(optional)</span>
            <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Hyderabad" />
          </label>

          <label>Built-up Area <span>(optional)</span>
            <input value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} placeholder="15,000 sq.ft" />
          </label>

          <label>Expected Timeline <span>(optional)</span>
            <input value={form.timeline} onChange={(e) => setForm({ ...form, timeline: e.target.value })} placeholder="3 weeks" />
          </label>

          <button>Review Opportunity</button>
        </form>
      </section>

      {showAssessment && (
        <section className={styles.assessment}>
          <div className={styles.assessmentTop}>
            <div>
              <p className={styles.eyebrow}>Proposal Associate Assessment</p>
              <h2>Opportunity Readiness: {assessment.score}%</h2>
              <p>This assessment shows where the proposal can be strengthened before submission.</p>
            </div>
            <button onClick={generateProposal}>Generate Proposal</button>
          </div>

          <div className={styles.assessmentGrid}>
            <article>
              <h3>Missing Information</h3>
              {assessment.missing.length ? assessment.missing.map((item) => <p key={item}>□ {item}</p>) : <p>✓ Core opportunity details are available.</p>}
            </article>
            <article>
              <h3>Potential Risks</h3>
              {assessment.risks.length ? assessment.risks.map((item) => <p key={item}>⚠ {item}</p>) : <p>✓ No major proposal risks detected.</p>}
            </article>
            <article>
              <h3>Recommendations</h3>
              {assessment.recommendations.map((item) => <p key={item}>→ {item}</p>)}
            </article>
          </div>
        </section>
      )}
    </main>
  );
}
