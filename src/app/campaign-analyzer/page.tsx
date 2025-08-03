"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function CampaignAnalyzer() {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [adText, setAdText] = useState("");
  const [adAnalysis, setAdAnalysis] = useState<string | null>(null);
  const [adLoading, setAdLoading] = useState(false);
  const [adError, setAdError] = useState<string | null>(null);
  const [showPaywall, setShowPaywall] = useState(false);
  const [showMainPaywall, setShowMainPaywall] = useState(false);
  const router = useRouter();

  // Function to format analysis text with better styling
  const formatAnalysis = (text: string) => {
    // Split by common section indicators and numbers
    const sections = text.split(/(?=🎯|📊|💡|🚀|✅|⚠️|📈|🎨|💰|🎪|\d+\.|•|✓|🔍|📝|🎯|💡|🚀|✅|⚠️|📈|🎨|💰|🎪)/);
    
    return (
      <div style={{ lineHeight: '1.6' }}>
        {sections.map((section, index) => {
          if (!section.trim()) return null;
          
          // Check if it's a section header (starts with emoji or number)
          const isHeader = /^[🎯📊💡🚀✅⚠️📈🎨💰🎪]/.test(section) || /^\d+\./.test(section) || /^•/.test(section) || /^✓/.test(section) || /^🔍/.test(section) || /^📝/.test(section);
          
          if (isHeader) {
            return (
              <div key={index} style={{ 
                marginTop: index > 0 ? '2rem' : '0',
                marginBottom: '1rem',
                padding: '1rem',
                background: '#f0f8ff',
                borderRadius: '8px',
                border: '2px solid #0070f3'
              }}>
                <h3 style={{ 
                  fontSize: '1.2rem', 
                  fontWeight: 700, 
                  color: '#0070f3',
                  margin: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  {section.match(/^[🎯📊💡🚀✅⚠️📈🎨💰🎪🔍📝]|^\d+\.|^•|^✓/)?.[0] || '📋'}
                  {section.replace(/^[🎯📊💡🚀✅⚠️📈🎨💰🎪🔍📝]\s*|^\d+\.\s*|^•\s*|^✓\s*/, '')}
                </h3>
              </div>
            );
          } else {
            return (
              <div key={index} style={{ 
                marginBottom: '1.5rem',
                padding: '1.25rem',
                background: '#ffffff',
                borderRadius: '8px',
                border: '1px solid #e1e5e9',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                <p style={{ 
                  margin: 0, 
                  color: '#333',
                  fontSize: '1rem',
                  lineHeight: '1.7',
                  fontWeight: 400
                }}>
                  {section.trim()}
                </p>
              </div>
            );
          }
        })}
      </div>
    );
  };

  // Check localStorage for free analysis usage
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const used = localStorage.getItem("adgenius_link_analysis_used");
      const mainUsed = localStorage.getItem("adgenius_main_analysis_used");
      setShowPaywall(used === "1");
      setShowMainPaywall(mainUsed === "1");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setAnalysis(null);
    setError(null);
    
    // Check if user has used their free main analysis
    if (typeof window !== "undefined") {
      const mainUsed = localStorage.getItem("adgenius_main_analysis_used");
      if (mainUsed === "1") {
        setShowMainPaywall(true);
        setLoading(false);
        return;
      }
    }
    
    const form = e.currentTarget;
    const product = (form.elements[0] as HTMLInputElement).value;
    const platform = (form.elements[1] as HTMLSelectElement).value;
    const campaign = (form.elements[2] as HTMLTextAreaElement).value;

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product, platform, campaign }),
      });
      const data = await res.json();
      if (res.ok) {
        setAnalysis(data.analysis);
        // Set the flag after successful analysis
        if (typeof window !== "undefined") {
          localStorage.setItem("adgenius_main_analysis_used", "1");
        }
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch (err) {
      setError("Failed to connect to the server.");
    }
    setLoading(false);
  };

  const handleAdAnalysis = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAdAnalysis(null);
    setAdError(null);
    setAdLoading(true);
    if (typeof window !== "undefined") {
      const used = localStorage.getItem("adgenius_link_analysis_used");
      // Block if already used (remove the !adAnalysis condition)
      if (used === "1") {
        setShowPaywall(true);
        setAdLoading(false);
        return;
      }
    }
    try {
      const res = await fetch("/api/analyze-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adText }),
      });
      const data = await res.json();
      if (res.ok) {
        setAdAnalysis(data.analysis);
        // Set the flag after successful analysis
        if (typeof window !== "undefined") {
          localStorage.setItem("adgenius_link_analysis_used", "1");
        }
      } else {
        setAdError(data.error || "Something went wrong.");
      }
    } catch (err) {
      setAdError("Failed to connect to the server.");
    }
    setAdLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>Campaign Analyzer</h1>
      
      {/* Development Reset Button */}
      <div style={{ marginBottom: '1rem', padding: '8px', background: '#f0f0f0', borderRadius: '4px', fontSize: '0.9rem' }}>
        <strong>Dev Tools:</strong> 
        <button 
          onClick={() => {
            localStorage.removeItem("adgenius_link_analysis_used");
            localStorage.removeItem("adgenius_main_analysis_used");
            setShowPaywall(false);
            setShowMainPaywall(false);
            setAnalysis(null);
            setAdAnalysis(null);
            alert("Reset complete! You can now test the free analysis again.");
          }}
          style={{ marginLeft: '8px', padding: '4px 8px', background: '#ff6b6b', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Reset Free Trials
        </button>
      </div>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
        <input type="text" placeholder="Product Name" required style={{ padding: 8, border: '1px solid #ccc', borderRadius: 4 }} />
        <select required style={{ padding: 8, border: '1px solid #ccc', borderRadius: 4 }}>
          <option value="">Select Platform</option>
          <option value="facebook">Facebook</option>
          <option value="instagram">Instagram</option>
          <option value="google">Google</option>
          <option value="tiktok">TikTok</option>
          <option value="linkedin">LinkedIn</option>
        </select>
        <textarea placeholder="Describe your campaign (budget, audience, results, etc.)" rows={4} required style={{ padding: 8, border: '1px solid #ccc', borderRadius: 4 }} />
        <button type="submit" style={{ padding: '10px 20px', background: '#0070f3', color: '#fff', border: 'none', borderRadius: 4, fontWeight: 600, cursor: 'pointer' }} disabled={loading}>
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </form>
      <div style={{ minHeight: 120, background: '#f9f9f9', border: '1px solid #eee', borderRadius: 4, padding: 16 }}>
        {showMainPaywall ? (
          <div style={{ textAlign: 'center' }}>
            <span style={{ color: '#0070f3', fontWeight: 500, display: 'block', marginBottom: '1rem' }}>
              You have used your free campaign analysis.
            </span>
            <button
              onClick={() => router.push('/upgrade')}
              style={{ padding: '10px 20px', background: '#0070f3', color: '#fff', border: 'none', borderRadius: 4, fontWeight: 600, cursor: 'pointer' }}
            >
              Upgrade to Continue
            </button>
          </div>
        ) : loading ? (
          <em>Analyzing...</em>
        ) : error ? (
          <span style={{ color: 'red' }}>{error}</span>
        ) : !loading && !error && analysis ? (
          formatAnalysis(analysis)
        ) : (
          <em>AI analysis and suggestions will appear here.</em>
        )}
      </div>
      {/* New Section: Paste Ad Text for Analysis */}
      <div style={{ border: '1px solid #0070f3', borderRadius: 6, padding: '1.5rem', marginTop: '2rem', background: '#f5faff' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '1rem' }}>Analyze an Existing Ad</h2>
        <form onSubmit={handleAdAnalysis} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1rem' }}>
          <textarea
            placeholder="Paste the full transcript of the ad (including all spoken words, text overlays, and descriptions)"
            required
            value={adText}
            onChange={e => setAdText(e.target.value)}
            style={{ padding: 8, border: '1px solid #ccc', borderRadius: 4, minHeight: 80 }}
            disabled={showPaywall}
          />
          <button
            type="submit"
            style={{ padding: '10px 20px', background: '#0070f3', color: '#fff', border: 'none', borderRadius: 4, fontWeight: 600, cursor: showPaywall ? 'not-allowed' : 'pointer' }}
            disabled={adLoading || showPaywall}
          >
            {adLoading ? "Analyzing..." : "Analyze"}
          </button>
        </form>
        <div style={{ minHeight: 60, background: '#f9f9f9', border: '1px solid #eee', borderRadius: 4, padding: 12 }}>
          {showPaywall ? (
            <span style={{ color: '#0070f3', fontWeight: 500 }}>
              You have used your free analysis. <br />
              <button
                onClick={() => router.push('/upgrade')}
                style={{ marginTop: 12, padding: '10px 20px', background: '#0070f3', color: '#fff', border: 'none', borderRadius: 4, fontWeight: 600, cursor: 'pointer' }}
              >
                Upgrade
              </button>
            </span>
          ) : adLoading ? (
            <em>Analyzing...</em>
          ) : adError ? (
            <span style={{ color: 'red' }}>{adError}</span>
          ) : adAnalysis ? (
            formatAnalysis(adAnalysis)
          ) : (
            <em>Paste the full transcript of the ad and get a detailed analysis of what works well and why.</em>
          )}
        </div>
      </div>
    </div>
  );
} 