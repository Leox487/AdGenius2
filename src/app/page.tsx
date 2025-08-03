"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <main style={{ flex: 1, maxWidth: 700, margin: '0 auto', padding: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>AdGenius</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
          Welcome to AdGenius! Supercharge your advertising with AI-powered insights and inspiration.
        </p>
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Tools</h2>
          <div style={{ marginTop: '1rem' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ marginBottom: 4 }}>Campaign Analyzer</h3>
              <p style={{ marginBottom: 4 }}>Analyze your ad campaign's effectiveness and get actionable suggestions to improve results.</p>
              <Link href="/campaign-analyzer" style={{ color: '#0070f3', textDecoration: 'underline' }}>Go to Campaign Analyzer →</Link>
            </div>
            <div>
              <h3 style={{ marginBottom: 4 }}>Ad Inspiration & Analysis</h3>
              <p style={{ marginBottom: 4 }}>Discover what works! Get examples of successful ads, trend analysis, and tailored suggestions for your product and platform.</p>
              <Link href="/ad-inspiration" style={{ color: '#0070f3', textDecoration: 'underline' }}>Go to Ad Inspiration & Analysis →</Link>
            </div>
          </div>
        </section>
        <section style={{ marginTop: '2rem' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Feedback</h2>
          <form style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <input type="text" placeholder="Your feedback..." style={{ flex: 1, padding: 8, border: '1px solid #ccc', borderRadius: 4 }} />
            <button type="submit" style={{ padding: '8px 16px', background: '#0070f3', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>Send</button>
          </form>
        </section>
      </main>
    </div>
  );
}
