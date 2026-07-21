"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const professions = [
  "Consultants",
  "Structural Engineers",
  "Architects",
  "Chartered Accountants",
  "Project Managers",
  "Business Advisors",
];

const outcomes = [
  "Win More Projects",
  "Deliver Projects Better",
  "Strengthen Client Relationships",
  "Retain Organizational Knowledge",
  "Improve Productivity",
  "Innovate Faster",
];

const faqs = [
  {
    q: "What is an AI Team?",
    a: "An AI Team is a group of AI-powered team mates designed around a business outcome. The Business Development AI Team is designed to help consultants win more projects.",
  },
  {
    q: "How is UToldAI different from ChatGPT?",
    a: "ChatGPT gives access to powerful AI capabilities. UToldAI organizes AI into teams, team mates and workspaces designed around business outcomes.",
  },
  {
    q: "How is UToldAI different from Microsoft Copilot?",
    a: "Copilot helps improve work inside Microsoft apps. UToldAI focuses on business outcomes and brings together AI team mates, guidance and workspaces for specific organizational goals.",
  },
  {
    q: "Can I edit the proposal output?",
    a: "Yes. Every proposal section is editable. You can improve individual sections, rewrite them, add sections or remove sections.",
  },
  {
    q: "Will the AI Team improve over time?",
    a: "Yes. As the AI Team works with your organization, it is designed to learn preferences such as proposal structure, scope style, commercial preferences and common client types.",
  },
];

function reportGoogleAdsConversion(callback: () => void) {
  let completed = false;

  const finish = () => {
    if (completed) return;

    completed = true;
    callback();
  };

  if (typeof window === "undefined" || !window.gtag) {
    finish();
    return;
  }

  window.gtag("event", "conversion", {
    send_to: "AW-17958950446/OXBRCPnXw9McEK6sv_NC",
    event_callback: finish,
  });

  // Continue even if Google does not invoke the callback.
  window.setTimeout(finish, 1200);
}

export default function Home() {
  const router = useRouter();

  const [professionIndex, setProfessionIndex] = useState(0);
  const [showExperience, setShowExperience] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    organization: "",
  });

  useEffect(() => {
    const timer = window.setInterval(() => {
      setProfessionIndex(
        (current) => (current + 1) % professions.length
      );
    }, 2200);

    return () => window.clearInterval(timer);
  }, []);

  async function startExperience(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim();
    const organization = form.organization.trim();

    if (!name || !email || isSubmitting) return;

    setIsSubmitting(true);
    setFormError("");

    const submittedForm = {
      name,
      email,
      organization,
    };

    try {
      const response = await fetch("/api/experience/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submittedForm),
      });

      if (!response.ok) {
        throw new Error(`Submission failed with status ${response.status}`);
      }

      sessionStorage.setItem(
        "utoldai_user",
        JSON.stringify(submittedForm)
      );

      reportGoogleAdsConversion(() => {
        router.push("/team");
      });
    } catch (error) {
      console.error("Failed to save experience entry:", error);

      setFormError(
        "We could not submit your details. Please try again."
      );

      setIsSubmitting(false);
    }
  }

  function openExperienceForm() {
    setFormError("");
    setShowExperience(true);
  }

  function closeExperienceForm() {
    if (isSubmitting) return;

    setFormError("");
    setShowExperience(false);
  }

  return (
    <main className={styles.page}>
      <header className={styles.nav}>
        <Link href="/" className={styles.brand}>
          <span>U</span>
          <b>UToldAI</b>
        </Link>

        <div className={styles.navActions}>
          <a
            className={styles.linkButton}
            href="https://wa.me/919182626500"
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp Us
          </a>

          <button
            type="button"
            className={styles.primaryButton}
            onClick={openExperienceForm}
          >
            Experience the AI Team
          </button>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <p className={styles.eyebrow}>
            AI Teams For Consultants, Advisors and Professional Services Firms
          </p>

          <h1>
            Achieve Your Business Outcomes With AI Teams You Can Rely On
          </h1>

          <p className={styles.subhead}>
            Work alongside AI Teams designed to help your organization win
            more projects, strengthen client relationships and achieve
            meaningful business outcomes.
          </p>

          <div className={styles.actions}>
            <a
              className={styles.primaryButton}
              href="https://wa.me/919182626500"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp Us
            </a>

            <button
              type="button"
              className={styles.secondaryButton}
              onClick={openExperienceForm}
            >
              Experience the AI Team
            </button>
          </div>
        </div>

        <aside className={styles.heroCard}>
          <p>AI Teams For</p>

          <div
            className={styles.rotatingText}
            key={professions[professionIndex]}
          >
            {professions[professionIndex]}
          </div>

          <span>
            Designed for professionals who want to achieve meaningful business
            outcomes with AI Teams.
          </span>
        </aside>
      </section>

      <section className={styles.story}>
        <p className={styles.eyebrow}>Why we exist</p>

        <h2>The future of work is changing.</h2>

        <p>
          Organizations everywhere are navigating a transition where human
          expertise and AI capability must learn to work together.
        </p>

        <p>
          We believe in a future where human progress and AI capability evolve
          together.
        </p>

        <p>
          That is why UToldAI is building reliable AI Teams that organizations
          rely on to achieve their business outcomes.
        </p>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionTitle}>
          <p className={styles.eyebrow}>Business outcomes</p>

          <h2>
            Business Outcomes We Help Organizations Achieve
          </h2>
        </div>

        <div className={styles.outcomeGrid}>
          {outcomes.map((item) => (
            <article key={item}>
              <span>✓</span>
              <h3>{item}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.teamSection}>
        <div>
          <p className={styles.eyebrow}>Featured AI Team</p>

          <h2>Business Development AI Team</h2>

          <p>
            Designed to help consultants win more projects by supporting
            proposal creation, commercial preparation, client communication
            and knowledge reuse.
          </p>
        </div>

        <div className={styles.associateGrid}>
          <article className={styles.associateActive}>
            <div className={styles.associateIcon}>✍️</div>

            <div className={styles.associateContent}>
              <b className={styles.activeBadge}>● Active</b>
              <h3>Proposal Associate</h3>
              <p>
                Creates, reviews and improves client-ready proposals.
              </p>
            </div>

            <div className={styles.associateAction}>
              <span className={styles.includedBadge}>
                ✓ Included in your plan
              </span>

              <button
                type="button"
                className={styles.openAssociateButton}
                onClick={openExperienceForm}
              >
                Open Associate →
              </button>
            </div>
          </article>

          <article>
            <div className={styles.associateIcon}>🧮</div>

            <div className={styles.associateContent}>
              <b>🔒 Advanced Plan</b>
              <h3>Commercial Associate</h3>
              <p>Prepares quotations and commercial offers.</p>
            </div>

            <div className={styles.associateAction}>
              <span className={styles.advancedBadge}>
                🔒 Available with Advanced Plan
              </span>
            </div>
          </article>

          <article>
            <div className={styles.associateIcon}>✉️</div>

            <div className={styles.associateContent}>
              <b>🔒 Advanced Plan</b>
              <h3>Client Communication Associate</h3>
              <p>Drafts submission emails and follow-ups.</p>
            </div>

            <div className={styles.associateAction}>
              <span className={styles.advancedBadge}>
                🔒 Available with Advanced Plan
              </span>
            </div>
          </article>

          <article>
            <div className={styles.associateIcon}>📖</div>

            <div className={styles.associateContent}>
              <b>🔒 Advanced Plan</b>
              <h3>Knowledge Associate</h3>
              <p>
                Reuses past projects and content to accelerate proposal
                development.
              </p>
            </div>

            <div className={styles.associateAction}>
              <span className={styles.advancedBadge}>
                🔒 Available with Advanced Plan
              </span>
            </div>
          </article>
        </div>

        <button
          type="button"
          className={styles.primaryButton}
          onClick={openExperienceForm}
        >
          Experience the AI Team
        </button>
      </section>

      <section className={styles.faq}>
        <div className={styles.sectionTitle}>
          <p className={styles.eyebrow}>FAQ</p>
          <h2>Common Questions</h2>
        </div>

        <div className={styles.faqList}>
          {faqs.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        <b>UToldAI</b>

        <a
          href="https://wa.me/919182626500"
          target="_blank"
          rel="noreferrer"
        >
          WhatsApp Us
        </a>

        <span>admin@utoldai.com</span>
      </footer>

      {showExperience && (
        <div className={styles.modalBackdrop}>
          <form className={styles.modal} onSubmit={startExperience}>
            <button
              type="button"
              className={styles.close}
              onClick={closeExperienceForm}
              aria-label="Close form"
              disabled={isSubmitting}
            >
              ×
            </button>

            <p className={styles.eyebrow}>
              Experience the AI Team
            </p>

            <h2>
              Start with the Business Development AI Team
            </h2>

            <p>
              Enter your details to experience the Proposal Associate, the
              first active member of the team.
            </p>

            <label>
              Name *
              <input
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
                required
                disabled={isSubmitting}
              />
            </label>

            <label>
              Email *
              <input
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
                required
                disabled={isSubmitting}
              />
            </label>

            <label>
              Organization <span>(optional)</span>
              <input
                value={form.organization}
                onChange={(e) =>
                  setForm({
                    ...form,
                    organization: e.target.value,
                  })
                }
                disabled={isSubmitting}
              />
            </label>

            {formError && (
              <p role="alert">
                {formError}
              </p>
            )}

            <button
              type="submit"
              className={styles.primaryButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Please wait..." : "Continue"}
            </button>
          </form>
        </div>
      )}
    </main>
  );
}