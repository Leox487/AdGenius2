"use client";
import React, { useState } from "react";
import Link from "next/link";

const OPTIONS = [
  { quantity: 10, price: 700 },   // $7.00
  { quantity: 25, price: 1500 },  // $15.00
  { quantity: 50, price: 2500 },  // $25.00
];

const PRICE_PER_ANALYSIS = 70; // $0.70 per analysis

export default function Upgrade() {
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [customQty, setCustomQty] = useState<string>("0");
  const [customLoading, setCustomLoading] = useState(false);

  const handleBuy = async (quantity: number, price: number, idx?: number) => {
    if (typeof idx === 'number') setLoadingIndex(idx);
    else setCustomLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity, price }),
      });
      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "Failed to start checkout.");
      }
    } catch (err) {
      setError("Failed to connect to payment server.");
    }
    if (typeof idx === 'number') setLoadingIndex(null);
    else setCustomLoading(false);
  };

  const qtyNum = parseInt(customQty, 10);
  const customPrice = (!isNaN(qtyNum) && qtyNum > 0 ? qtyNum : 0) * PRICE_PER_ANALYSIS;

  return (
    <div style={{ width: '100vw', minHeight: '100vh', padding: '2rem', textAlign: 'center', position: 'relative', background: '#fafdff' }}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1.5rem', color: '#0070f3' }}>Upgrade Your Plan</h1>
        <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
          Choose how many extra ad analyses you want to unlock:
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
          {OPTIONS.map((opt, idx) => (
            <div key={opt.quantity} style={{ border: '1px solid #0070f3', borderRadius: 8, padding: '1.5rem 2rem', minWidth: 260, background: '#f5faff' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: 8 }}>{opt.quantity} Analyses</div>
              <div style={{ fontSize: '1.1rem', marginBottom: 16 }}>${(opt.price / 100).toFixed(2)}</div>
              <button
                onClick={() => handleBuy(opt.quantity, opt.price, idx)}
                style={{ padding: '10px 24px', background: '#0070f3', color: '#fff', border: 'none', borderRadius: 4, fontWeight: 600, cursor: loadingIndex === idx ? 'not-allowed' : 'pointer' }}
                disabled={loadingIndex === idx}
              >
                {loadingIndex === idx ? 'Redirecting...' : 'Buy Now'}
              </button>
            </div>
          ))}
          {/* Custom option */}
          <div style={{ border: '1px solid #0070f3', borderRadius: 8, padding: '1.5rem 2rem', minWidth: 260, background: '#f5faff', marginTop: 16 }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: 8 }}>Custom Amount</div>
            <div style={{ marginBottom: 12 }}>
              <input
                type="number"
                min={0}
                value={customQty}
                onChange={e => {
                  const val = e.target.value;
                  if (val === "" || /^\d+$/.test(val)) setCustomQty(val);
                }}
                style={{ width: 60, padding: 6, border: '1px solid #ccc', borderRadius: 4, marginRight: 8 }}
              />
              analyses
            </div>
            <div style={{ fontSize: '1.1rem', marginBottom: 16 }}>
              ${ (customPrice / 100).toFixed(2) }
            </div>
            <button
              onClick={() => handleBuy(qtyNum, customPrice)}
              style={{ padding: '10px 24px', background: '#0070f3', color: '#fff', border: 'none', borderRadius: 4, fontWeight: 600, cursor: customLoading ? 'not-allowed' : 'pointer' }}
              disabled={customLoading || !qtyNum}
            >
              {customLoading ? 'Redirecting...' : 'Buy Now'}
            </button>
          </div>
        </div>
        {error && <div style={{ color: 'red', marginTop: 24 }}>{error}</div>}
      </div>
    </div>
  );
} 