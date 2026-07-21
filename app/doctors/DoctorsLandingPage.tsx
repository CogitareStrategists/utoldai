"use client";

import { FormEvent, useMemo, useState } from "react";
import styles from "./doctors.module.css";

type FormState = {
  doctorName: string;
  email: string;
  mobile: string;
  clinicName: string;
  specialty: string;
  city: string;
  budget: string;
  preferredContactMethod: string;
  message: string;
};

const initialForm: FormState = {
  doctorName: "",
  email: "",
  mobile: "",
  clinicName: "",
  specialty: "",
  city: "",
  budget: "",
  preferredContactMethod: "WhatsApp",
  message: "",
};

function getTrackingParams() {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get("utm_source") || "",
    utmMedium: params.get("utm_medium") || "",
    utmCampaign: params.get("utm_campaign") || "",
    gclid: params.get("gclid") || "",
  };
}

export default function DoctorsLandingPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const whatsappUrl = useMemo(
    () =>
      "https://wa.me/919182626500?text=" +
      encodeURIComponent(
        "Hello UToldAI, I would like to discuss a website and AI solution for my clinic."
      ),
    []
  );

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/doctors/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, ...getTrackingParams() }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "We could not save your request.");
      }

      setSuccess(true);
      setForm(initialForm);

      const browserWindow = window as typeof window & {
        gtag?: (...args: unknown[]) => void;
      };
      browserWindow.gtag?.("event", "generate_lead", {
        lead_source: "doctors_landing_page",
      });
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className={styles.page}>
      <div className={styles.topStrip}>
        Digital growth solutions designed for doctors and clinics
      </div>

      <header className={styles.header}>
        <div className={styles.container + " " + styles.headerInner}>
          <a href="/" className={styles.brand} aria-label="UToldAI home">
            UTold<span>AI</span>
          </a>
          <a href="#consultation" className={styles.headerCta}>
            Book a Free Consultation
          </a>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.container + " " + styles.heroGrid}>
          <div>
            <div className={styles.eyebrow}>Built for modern medical practices</div>
            <h1>
              Grow your clinic with a better website and an <span>AI-powered front desk</span>
            </h1>
            <p className={styles.heroCopy}>
              Help patients discover your practice, respond to enquiries faster and manage
              follow-ups with a connected website, AI receptionist and patient CRM.
            </p>
            <div className={styles.heroActions}>
              <a href="#consultation" className={styles.primaryButton}>
                Book a Free Consultation
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className={styles.secondaryButton}
              >
                Talk on WhatsApp
              </a>
            </div>
            <div className={styles.assurances}>
              <span>✓ No obligation</span>
              <span>✓ Solutions tailored to your clinic</span>
              <span>✓ Based in Hyderabad</span>
            </div>
          </div>

          <div className={styles.heroCard}>
            <div className={styles.mockHeader}>
              <span /> <span /> <span />
            </div>
            <div className={styles.mockBody}>
              <div className={styles.mockTitle}>Your clinic, available online</div>
              <div className={styles.patientMessage}>Can I book an appointment for tomorrow?</div>
              <div className={styles.aiMessage}>
                Certainly. Please share your preferred time and mobile number.
              </div>
              <div className={styles.metricRow}>
                <div><strong>24/7</strong><small>Enquiry response</small></div>
                <div><strong>1 place</strong><small>Patient follow-ups</small></div>
                <div><strong>Mobile</strong><small>Friendly website</small></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <span>Three connected solutions</span>
            <h2>Everything your clinic needs to improve its digital patient experience</h2>
          </div>
          <div className={styles.cards}>
            <article className={styles.card}>
              <div className={styles.icon}>01</div>
              <h3>Professional Clinic Website</h3>
              <p>Present your expertise, services, timings, location and patient information clearly.</p>
            </article>
            <article className={styles.card}>
              <div className={styles.icon}>02</div>
              <h3>AI Receptionist</h3>
              <p>Answer routine enquiries, capture patient details and guide people to the next step.</p>
            </article>
            <article className={styles.card}>
              <div className={styles.icon}>03</div>
              <h3>Patient CRM</h3>
              <p>Keep enquiries and follow-ups organised so interested patients do not get missed.</p>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.benefitSection}>
        <div className={styles.container + " " + styles.benefitGrid}>
          <div>
            <div className={styles.sectionHeading + " " + styles.leftHeading}>
              <span>Practical business outcomes</span>
              <h2>Spend less time handling repetitive enquiries and more time on patient care</h2>
            </div>
          </div>
          <div className={styles.benefitList}>
            <div><b>Be easier to find</b><p>Give prospective patients a credible destination when they search for you.</p></div>
            <div><b>Respond faster</b><p>Offer immediate guidance even when your staff is busy or the clinic is closed.</p></div>
            <div><b>Follow up consistently</b><p>Keep new enquiries organised and visible to your team.</p></div>
            <div><b>Build patient confidence</b><p>Use clear, professional communication across every digital touchpoint.</p></div>
          </div>
        </div>
      </section>

      <section id="consultation" className={styles.formSection}>
        <div className={styles.container + " " + styles.formGrid}>
          <div className={styles.formIntro}>
            <span>Free consultation</span>
            <h2>Tell us a little about your clinic</h2>
            <p>
              We will understand your current setup and suggest a practical starting point based on
              your needs and budget.
            </p>
            <div className={styles.contactNote}>
              Prefer WhatsApp? <a href={whatsappUrl} target="_blank" rel="noreferrer">Message us directly</a>.
            </div>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.twoColumns}>
              <label>
                Doctor name <em>*</em>
                <input
                  value={form.doctorName}
                  onChange={(e) => updateField("doctorName", e.target.value)}
                  required
                  autoComplete="name"
                  placeholder="Dr. Your Name"
                />
              </label>
              <label>
                Mobile number <em>*</em>
                <input
                  value={form.mobile}
                  onChange={(e) => updateField("mobile", e.target.value)}
                  required
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="10-digit mobile number"
                />
              </label>
            </div>

            <label>
              Email address <em>*</em>
              <input
                type="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                required
                autoComplete="email"
                placeholder="doctor@example.com"
              />
            </label>

            <div className={styles.twoColumns}>
              <label>
                Clinic name
                <input
                  value={form.clinicName}
                  onChange={(e) => updateField("clinicName", e.target.value)}
                  placeholder="Your clinic or hospital"
                />
              </label>
              <label>
                Specialty
                <input
                  value={form.specialty}
                  onChange={(e) => updateField("specialty", e.target.value)}
                  placeholder="e.g. Dermatology"
                />
              </label>
            </div>

            <div className={styles.twoColumns}>
              <label>
                City
                <input
                  value={form.city}
                  onChange={(e) => updateField("city", e.target.value)}
                  placeholder="e.g. Hyderabad"
                />
              </label>
              <label>
                Approximate budget
                <select value={form.budget} onChange={(e) => updateField("budget", e.target.value)}>
                  <option value="">Select a range</option>
                  <option value="Less than ₹10,000">Less than ₹10,000</option>
                  <option value="₹10,000 – ₹25,000">₹10,000 – ₹25,000</option>
                  <option value="₹25,000 – ₹50,000">₹25,000 – ₹50,000</option>
                  <option value="₹50,000 – ₹1,00,000">₹50,000 – ₹1,00,000</option>
                  <option value="More than ₹1,00,000">More than ₹1,00,000</option>
                  <option value="Not sure / Let's discuss">Not sure / Let&apos;s discuss</option>
                </select>
              </label>
            </div>

            <label>
              Preferred contact method
              <select
                value={form.preferredContactMethod}
                onChange={(e) => updateField("preferredContactMethod", e.target.value)}
              >
                <option value="WhatsApp">WhatsApp</option>
                <option value="Phone Call">Phone Call</option>
                <option value="Email">Email</option>
              </select>
            </label>

            <label>
              What would you like help with?
              <textarea
                value={form.message}
                onChange={(e) => updateField("message", e.target.value)}
                rows={4}
                placeholder="Tell us about your current website, enquiry process or patient follow-up needs."
              />
            </label>

            {error && <p className={styles.error}>{error}</p>}
            {success && (
              <div className={styles.success} role="status">
                Thank you. Your consultation request has been received. We will contact you shortly.
              </div>
            )}

            <button type="submit" className={styles.submitButton} disabled={submitting}>
              {submitting ? "Submitting..." : "Book My Free Consultation"}
            </button>
            <small className={styles.privacyNote}>
              By submitting, you agree that UToldAI may contact you about this enquiry.
            </small>
          </form>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.container + " " + styles.footerInner}>
          <div className={styles.brand}>UTold<span>AI</span></div>
          <p>Websites, AI applications and automation solutions for growing businesses.</p>
        </div>
      </footer>
    </main>
  );
}
