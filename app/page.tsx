'use client';

import { FormEvent, useEffect, useState } from 'react';

const audiences = ['Consultants', 'Architects', 'Structural Engineers', 'CAs', 'Lawyers', 'Service Businesses'];

const GOOGLE_SHEET_WEB_APP_URL = process.env.NEXT_PUBLIC_GOOGLE_SHEET_WEB_APP_URL || '';

export default function Home() {
  const [audienceIndex, setAudienceIndex] = useState(0);
  const [changing, setChanging] = useState(false);
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error' | 'loading'; message: string }>({
    type: 'idle',
    message: '',
  });

  useEffect(() => {
    const interval = window.setInterval(() => {
      setChanging(true);
      window.setTimeout(() => {
        setAudienceIndex((current) => (current + 1) % audiences.length);
        setChanging(false);
      }, 220);
    }, 1800);

    return () => window.clearInterval(interval);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      submittedAt: new Date().toISOString(),
      name: String(formData.get('name') || ''),
      mobile: String(formData.get('mobile') || ''),
      business: String(formData.get('business') || ''),
      business_type: String(formData.get('business_type') || ''),
      message: String(formData.get('message') || ''),
      source: 'utoldai landing page',
    };

    if (!GOOGLE_SHEET_WEB_APP_URL) {
      setStatus({
        type: 'error',
        message: 'Google Sheet URL is not configured. Add NEXT_PUBLIC_GOOGLE_SHEET_WEB_APP_URL in Vercel.',
      });
      return;
    }

    try {
      setStatus({ type: 'loading', message: 'Submitting your request...' });

      await fetch(GOOGLE_SHEET_WEB_APP_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      });

      setStatus({ type: 'success', message: 'Thank you! Your demo request has been submitted.' });
      form.reset();
    } catch (error) {
      console.error(error);
      setStatus({
        type: 'error',
        message: 'Something went wrong. Please WhatsApp us at +91 9182626500.',
      });
    }
  }

  return (
    <>
      <header className="container nav">
        <a className="brand" href="#">
          <span className="mark">U</span>UtoldAI
        </a>
        <nav className="navlinks">
          <a href="#team">AI Team</a>
          <a href="#how">How It Works</a>
          <a href="#benefits">Benefits</a>
          <a href="#demo">Demo</a>
        </nav>
        <a className="btn btn-secondary" href="tel:+919182626500">Call Us</a>
      </header>

      <main>
        <section className="hero">
          <div className="container hero-grid">
            <div>
              <div className="eyebrow">Personalized AI Teams for service businesses</div>
              <h1 className="headline">
                AI Teams for<br />
                <span className={`gradient rotator ${changing ? 'is-changing' : ''}`}>{audiences[audienceIndex]}</span>
              </h1>
              <p>Get AI assistants that work for your business using your services, experience, branding and company knowledge.</p>
              <div className="price-pill">Starting at just <strong>₹500/month</strong></div>
              <div className="actions">
                <a className="btn btn-primary" href="#demo">Request Demo</a>
                <a
                  className="btn btn-secondary"
                  href="https://wa.me/919182626500?text=Hi%20UtoldAI%2C%20I%20want%20to%20request%20a%20demo%20for%20AI%20Teams"
                  target="_blank"
                  rel="noopener"
                >
                  WhatsApp Us
                </a>
              </div>
              <div className="fine">One-time onboarding is customized based on your business needs.</div>
            </div>
            <div className="visual">
              <div className="mock">
                <div className="dots"><span className="dot"></span><span className="dot"></span><span className="dot"></span></div>
                <div className="ai-card"><small>Proposal Assistant</small><strong>Create a professional proposal for a new client enquiry</strong></div>
                <div className="ai-card"><small>Digital Presence Assistant</small><strong>Convert services and portfolio into profile content</strong></div>
                <div className="ai-card"><small>Communication Assistant</small><strong>Draft a client follow-up message</strong></div>
                <div className="output"><div className="line"></div><div className="line"></div><div className="line"></div></div>
                <div className="check">✓ Output ready in your business style</div>
              </div>
            </div>
          </div>
        </section>

        <section id="team">
          <div className="container">
            <div className="title"><h2>Meet Your AI Team</h2><p>Version 1 focuses on assistants that are useful for consultants and service businesses from day one.</p></div>
            <div className="grid assistants">
              <div className="card"><div className="icon">📄</div><h3>Proposal Assistant</h3><p>Creates professional proposals using your company details, services and standard scope.</p></div>
              <div className="card"><div className="icon">💰</div><h3>Quotation Assistant</h3><p>Prepares fee quotations and commercial offers in a consistent format.</p></div>
              <div className="card"><div className="icon">🏢</div><h3>Company Profile Assistant</h3><p>Builds and updates company profiles, service profiles and capability statements.</p></div>
              <div className="card"><div className="icon">🌐</div><h3>Digital Presence Assistant</h3><p>Creates business profile, portfolio and website content from your information.</p></div>
              <div className="card"><div className="icon">✉️</div><h3>Communication Assistant</h3><p>Drafts emails, introductions, follow-ups, covering letters and client messages.</p></div>
            </div>
          </div>
        </section>

        <section id="how">
          <div className="container split">
            <div className="panel">
              <h2>Train Your AI Team Once</h2>
              <p>Your AI team works better when it understands your business.</p>
              <div className="list">
                <div className="item"><span className="tick">✓</span>Your services and expertise</div>
                <div className="item"><span className="tick">✓</span>Your experience and portfolio</div>
                <div className="item"><span className="tick">✓</span>Your branding and tone</div>
                <div className="item"><span className="tick">✓</span>Your company profile and standard information</div>
              </div>
            </div>
            <div className="panel">
              <h2>Then Let It Work For You</h2>
              <p>Use your assistants whenever you need better quality output, faster.</p>
              <div className="list">
                <div className="item"><span className="tick">✓</span>Create proposals and quotations</div>
                <div className="item"><span className="tick">✓</span>Generate company and business profiles</div>
                <div className="item"><span className="tick">✓</span>Prepare website and portfolio content</div>
                <div className="item"><span className="tick">✓</span>Draft client communications</div>
              </div>
            </div>
          </div>
        </section>

        <section id="benefits">
          <div className="container">
            <div className="title"><h2>Why Businesses Are Building AI Teams</h2><p>Small teams can now produce better-quality business output without hiring multiple specialists.</p></div>
            <div className="grid benefits">
              <div className="benefit"><span className="tick">✓</span>Improve productivity</div>
              <div className="benefit"><span className="tick">✓</span>Deliver better quality</div>
              <div className="benefit"><span className="tick">✓</span>Reduce repetitive work</div>
              <div className="benefit"><span className="tick">✓</span>Strengthen professional presence</div>
              <div className="benefit"><span className="tick">✓</span>Respond faster to opportunities</div>
              <div className="benefit"><span className="tick">✓</span>Scale without hiring</div>
            </div>
          </div>
        </section>

        <section id="demo">
          <div className="container">
            <div className="demo">
              <h2>Ready To Meet Your AI Team?</h2>
              <p>Request a demo and see how personalized AI assistants can work for your business.</p>
              <form className="form" onSubmit={handleSubmit}>
                <input name="name" placeholder="Your Name" required />
                <input name="mobile" placeholder="Mobile Number" required />
                <input name="business" placeholder="Business / Firm Name" />
                <select name="business_type" required defaultValue="">
                  <option value="" disabled>Select Business Type</option>
                  <option>Consultant</option>
                  <option>Architect</option>
                  <option>Structural Engineer</option>
                  <option>Chartered Accountant</option>
                  <option>Lawyer</option>
                  <option>Other Service Business</option>
                </select>
                <textarea className="full" name="message" placeholder="What would you like your AI team to help with?"></textarea>
                <button className="btn btn-primary full" type="submit" disabled={status.type === 'loading'}>
                  {status.type === 'loading' ? 'Submitting...' : 'Request Demo'}
                </button>
                <div className={`form-status ${status.type === 'success' ? 'success' : status.type === 'error' ? 'error' : ''}`}>
                  {status.message}
                </div>
              </form>
              <div className="contact-row"><span>🌐 utoldai.com</span><span>📞 +91 9182626500</span><span>✉️ admin@utoldai.com</span></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="footer-brand"><span className="mark">U</span>UtoldAI</div>
              <p>AI Teams that work for your business.</p>
            </div>
            <div className="footer-links">
              <a href="#team">AI Team</a>
              <a href="#how">How It Works</a>
              <a href="#benefits">Benefits</a>
              <a href="#demo">Request Demo</a>
            </div>
            <div className="footer-contact">
              <a href="tel:+919182626500">📞 +91 9182626500</a>
              <a href="mailto:admin@utoldai.com">✉️ admin@utoldai.com</a>
              <span>🌐 www.utoldai.com</span>
            </div>
          </div>
          <div className="footer-small">© {new Date().getFullYear()} UtoldAI. All rights reserved.</div>
        </div>
      </footer>
    </>
  );
}
