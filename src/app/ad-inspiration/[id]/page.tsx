'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface AdResult {
  title: string;
  snippet: string;
  successFactors: string[];
  copy: string;
  visualElements: string;
  targetAudience: string;
  results: string;
  platform: string;
  industry: string;
  productCategory: string;
  ctr: number;
  conversionRate: number;
  costPerClick: number;
  actualResults: string;
  whySuccessful: string;
  platformSpecificTips: string[];
  relevanceScore?: number;
  semanticTags?: string[];
  realLink?: string;
  adId?: string;
  advertiser?: string;
  spend?: number;
  impressions?: number;
  clicks?: number;
  conversions?: number;
}

interface AdInspirationData {
  id: string;
  platform: string;
  industry: string;
  product: string;
  results: AdResult[];
  createdAt: string;
}

export default function AdInspirationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [data, setData] = useState<AdInspirationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedAd, setSelectedAd] = useState<AdResult | null>(null);
  const [analysis, setAnalysis] = useState('');
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchAdInspiration();
    }
  }, [params.id]);

  const fetchAdInspiration = async () => {
    try {
      const response = await fetch(`/api/ad-inspiration/${params.id}`);
      if (response.ok) {
        const result = await response.json();
        setData(result);
        // Auto-select the first ad if available
        if (result.results && result.results.length > 0) {
          setSelectedAd(result.results[0]);
        }
      } else {
        setError('Failed to fetch ad inspiration');
      }
    } catch (err) {
      setError('Failed to fetch ad inspiration');
    } finally {
      setLoading(false);
    }
  };

  const analyzeAd = async (ad: AdResult) => {
    setAnalyzing(true);
    setAnalysis('');
    try {
      const response = await fetch('/api/ad-inspiration-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          adTitle: ad.title,
          adCopy: ad.copy,
          adSnippet: ad.snippet,
          platform: ad.platform,
          industry: ad.industry,
          successFactors: ad.successFactors,
          whySuccessful: ad.whySuccessful,
          ctr: ad.ctr,
          conversionRate: ad.conversionRate,
          costPerClick: ad.costPerClick
        }),
      });
      const result = await response.json();
      if (result.analysis) {
        setAnalysis(result.analysis);
      } else {
        setError('Failed to analyze ad');
      }
    } catch (err) {
      setError('Failed to analyze ad');
    } finally {
      setAnalyzing(false);
    }
  };

  if (loading) {
    return (
      <div style={{ maxWidth: 1200, margin: '2rem auto', padding: '0 1rem' }}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div style={{ fontSize: '1.2rem', color: '#666' }}>Loading ad inspiration...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ maxWidth: 1200, margin: '2rem auto', padding: '0 1rem' }}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>
          <Link href="/history" style={{
            padding: '10px 20px',
            background: '#0070f3',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '6px',
            fontWeight: '500'
          }}>
            Back to History
          </Link>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{ maxWidth: 1200, margin: '2rem auto', padding: '0 1rem' }}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div style={{ color: 'red', marginBottom: '1rem' }}>Ad inspiration not found</div>
          <Link href="/history" style={{
            padding: '10px 20px',
            background: '#0070f3',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '6px',
            fontWeight: '500'
          }}>
            Back to History
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1200, margin: '2rem auto', padding: '0 1rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <Link href="/history" style={{
          color: '#0070f3',
          textDecoration: 'none',
          fontSize: '0.9rem',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '1rem'
        }}>
          ← Back to History
        </Link>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>
          Ad Inspiration Analysis
        </h1>
        <div style={{ color: '#666', fontSize: '1.1rem', marginBottom: '1rem' }}>
          Product: <strong>{data.product}</strong> | Platform: <strong>{data.platform}</strong> | Industry: <strong>{data.industry}</strong>
        </div>
        <div style={{ color: '#999', fontSize: '0.9rem' }}>
          Created: {new Date(data.createdAt).toLocaleDateString()}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        {/* Ad List */}
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
            Successful Ads ({data.results.length})
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {data.results.map((ad, index) => (
              <div
                key={index}
                style={{
                  padding: '1rem',
                  border: selectedAd === ad ? '2px solid #0070f3' : '1px solid #e5e5e5',
                  borderRadius: '8px',
                  background: selectedAd === ad ? '#f0f8ff' : 'white',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onClick={() => setSelectedAd(ad)}
              >
                <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                  {ad.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>
                  {ad.snippet}
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{
                    fontSize: '0.8rem',
                    background: '#e8f5e8',
                    color: '#2d5a2d',
                    padding: '2px 6px',
                    borderRadius: '4px'
                  }}>
                    CTR: {ad.ctr.toFixed(1)}%
                  </span>
                  <span style={{
                    fontSize: '0.8rem',
                    background: '#fff3cd',
                    color: '#856404',
                    padding: '2px 6px',
                    borderRadius: '4px'
                  }}>
                    Conv: {ad.conversionRate.toFixed(1)}%
                  </span>
                  <span style={{
                    fontSize: '0.8rem',
                    background: '#d1ecf1',
                    color: '#0c5460',
                    padding: '2px 6px',
                    borderRadius: '4px'
                  }}>
                    CPC: ${ad.costPerClick.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ad Analysis */}
        <div>
          {selectedAd ? (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600' }}>
                  Ad Analysis
                </h2>
                <button
                  onClick={() => analyzeAd(selectedAd)}
                  disabled={analyzing}
                  style={{
                    padding: '8px 16px',
                    background: '#0070f3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: analyzing ? 'not-allowed' : 'pointer',
                    opacity: analyzing ? 0.6 : 1
                  }}
                >
                  {analyzing ? 'Analyzing...' : 'Analyze This Ad'}
                </button>
              </div>

              {/* Ad Details */}
              <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e5e5e5', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem' }}>
                  {selectedAd.title}
                </h3>
                <p style={{ color: '#666', marginBottom: '1rem', lineHeight: '1.5' }}>
                  {selectedAd.copy}
                </p>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <strong>Platform:</strong> {selectedAd.platform}
                  </div>
                  <div>
                    <strong>Target Audience:</strong> {selectedAd.targetAudience}
                  </div>
                  <div>
                    <strong>Visual Elements:</strong> {selectedAd.visualElements}
                  </div>
                  <div>
                    <strong>Advertiser:</strong> {selectedAd.advertiser || 'Unknown'}
                  </div>
                </div>

                {/* Performance Metrics */}
                <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '6px', marginBottom: '1rem' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>Performance Metrics</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                    <div>
                      <div style={{ fontSize: '0.9rem', color: '#666' }}>Click-Through Rate</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: '600', color: '#2d5a2d' }}>{selectedAd.ctr.toFixed(1)}%</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.9rem', color: '#666' }}>Conversion Rate</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: '600', color: '#856404' }}>{selectedAd.conversionRate.toFixed(1)}%</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.9rem', color: '#666' }}>Cost Per Click</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: '600', color: '#0c5460' }}>${selectedAd.costPerClick.toFixed(2)}</div>
                    </div>
                    {selectedAd.spend && (
                      <div>
                        <div style={{ fontSize: '0.9rem', color: '#666' }}>Total Spend</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: '600', color: '#721c24' }}>${selectedAd.spend.toLocaleString()}</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Success Factors */}
                <div style={{ marginBottom: '1rem' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>Success Factors</h4>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {selectedAd.successFactors.map((factor, index) => (
                      <span
                        key={index}
                        style={{
                          fontSize: '0.8rem',
                          background: '#e3f2fd',
                          color: '#1565c0',
                          padding: '4px 8px',
                          borderRadius: '12px'
                        }}
                      >
                        {factor}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Why Successful */}
                <div style={{ marginBottom: '1rem' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>Why This Ad Works</h4>
                  <p style={{ color: '#666', lineHeight: '1.5' }}>{selectedAd.whySuccessful}</p>
                </div>

                {/* Platform Tips */}
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>Platform-Specific Tips</h4>
                  <ul style={{ color: '#666', lineHeight: '1.5', paddingLeft: '1rem' }}>
                    {selectedAd.platformSpecificTips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </div>

                {/* External Link */}
                {selectedAd.realLink && (
                  <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #e5e5e5' }}>
                    <a
                      href={selectedAd.realLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: '#0070f3',
                        textDecoration: 'underline',
                        fontSize: '0.9rem'
                      }}
                    >
                      View Original Ad →
                    </a>
                  </div>
                )}
              </div>

              {/* Analysis Results */}
              {analysis && (
                <div style={{ background: '#f0f8ff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #b3d9ff' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem', color: '#0056b3' }}>
                    AI Analysis
                  </h3>
                  <div style={{ color: '#333', lineHeight: '1.6' }}>
                    {analysis.split('\n').map((paragraph, index) => (
                      <p key={index} style={{ marginBottom: '0.5rem' }}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {error && (
                <div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>
              )}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
              Select an ad from the list to view its analysis
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 