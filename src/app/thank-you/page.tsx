import React from "react";
import Link from "next/link";

export default function ThankYou() {
  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '2rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem', color: '#0070f3' }}>Thank You!</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
        Your purchase was successful.<br />
        You can now use more ad analyses!
      </p>
      <Link href="/campaign-analyzer">
        <button style={{ padding: '10px 20px', background: '#0070f3', color: '#fff', border: 'none', borderRadius: 4, fontWeight: 600, cursor: 'pointer' }}>
          Return to Campaign Analyzer
        </button>
      </Link>
    </div>
  );
} 