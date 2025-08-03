'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface AdInspirationItem {
  id: string;
  type: string;
  title: string;
  description: string;
  date: string;
  data: {
    platform: string;
    industry: string;
    product: string;
    results: any[];
  };
}

export default function RecentAdsPage() {
  const [recentAds, setRecentAds] = useState<AdInspirationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedAd, setSelectedAd] = useState<AdInspirationItem | null>(null);

  useEffect(() => {
    fetchRecentAds();
  }, []);

  const fetchRecentAds = async () => {
    try {
      const res = await fetch('/api/history');
      if (res.ok) {
        const data = await res.json();
        const adInspirations = data.history.filter((item: any) => item.type === 'ad-inspiration');
        setRecentAds(adInspirations.slice(0, 10)); // Show last 10
      } else {
        setError('Failed to fetch recent ads');
      }
    } catch (err) {
      setError('Failed to fetch recent ads');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ maxWidth: 1200, margin: '2rem auto', padding: '0 1rem' }}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div style={{ fontSize: '1.2rem', color: '#666' }}>Loading recent successful ads...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ maxWidth: 1200, margin: '2rem auto', padding: '0 1rem' }}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>
          <Link href="/ad-inspiration" style={{
            padding: '10px 20px',
            background: '#0070f3',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '6px',
            fontWeight: '500'
          }}>
            Back to Ad Inspiration
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1200, margin: '2rem auto', padding: '0 1rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <Link href="/ad-inspiration" style={{
          color: '#0070f3',
          textDecoration: 'none',
          fontSize: '0.9rem',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '1rem'
        }}>
          ← Back to Ad Inspiration
        </Link>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>
          Recent Successful Ads
        </h1>
        <p style={{ color: '#666', fontSize: '1.1rem' }}>
          Your most recent ad inspiration campaigns and their successful ads
        </p>
      </div>

      {recentAds.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '4rem 2rem',
          background: '#f8f9fa',
          borderRadius: '12px',
          border: '2px dashed #ddd'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💡</div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem' }}>
            No recent ads yet
          </h3>
          <p style={{ color: '#666', marginBottom: '1.5rem' }}>
            Generate some ad inspiration to see your successful ads here
          </p>
          <Link href="/ad-inspiration" style={{
            padding: '10px 20px',
            background: '#0070f3',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '6px',
            fontWeight: '500'
          }}>
            Generate Ad Inspiration
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {recentAds.map((item) => (
            <div key={item.id} style={{
              padding: '1.5rem',
              border: '1px solid #e5e5e5',
              borderRadius: '8px',
              background: 'white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                    {item.title}
                  </h3>
                  <p style={{ color: '#666', marginBottom: '0.5rem' }}>
                    {item.description}
                  </p>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.9rem', color: '#666' }}>
                    <span><strong>Platform:</strong> {item.data.platform}</span>
                    <span><strong>Industry:</strong> {item.data.industry}</span>
                    <span><strong>Product:</strong> {item.data.product}</span>
                    <span><strong>Date:</strong> {new Date(item.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end' }}>
                  <span style={{
                    fontSize: '0.8rem',
                    background: '#e8f5e8',
                    color: '#2d5a2d',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontWeight: '500'
                  }}>
                    {item.data.results?.length || 0} ads found
                  </span>
                  <Link href={`/ad-inspiration/${item.id}`} style={{
                    fontSize: '0.9rem',
                    background: '#0070f3',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    fontWeight: '500',
                    display: 'inline-block'
                  }}>
                    View & Analyze Ads →
                  </Link>
                </div>
              </div>

              {/* Quick Preview of Top Ads */}
              {item.data.results && item.data.results.length > 0 && (
                <div style={{ 
                  background: '#f8f9fa', 
                  padding: '1rem', 
                  borderRadius: '6px',
                  marginTop: '1rem'
                }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                    Top Performing Ads Preview:
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {item.data.results.slice(0, 3).map((ad: any, index: number) => (
                      <div key={index} style={{
                        padding: '0.5rem',
                        background: 'white',
                        borderRadius: '4px',
                        border: '1px solid #e5e5e5'
                      }}>
                        <div style={{ fontSize: '0.9rem', fontWeight: '500', marginBottom: '0.25rem' }}>
                          {ad.title}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.25rem' }}>
                          {ad.snippet}
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.75rem' }}>
                          <span style={{
                            background: '#e8f5e8',
                            color: '#2d5a2d',
                            padding: '2px 4px',
                            borderRadius: '3px'
                          }}>
                            CTR: {ad.ctr?.toFixed(1)}%
                          </span>
                          <span style={{
                            background: '#fff3cd',
                            color: '#856404',
                            padding: '2px 4px',
                            borderRadius: '3px'
                          }}>
                            Conv: {ad.conversionRate?.toFixed(1)}%
                          </span>
                          <span style={{
                            background: '#d1ecf1',
                            color: '#0c5460',
                            padding: '2px 4px',
                            borderRadius: '3px'
                          }}>
                            CPC: ${ad.costPerClick?.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  {item.data.results.length > 3 && (
                    <div style={{ 
                      textAlign: 'center', 
                      marginTop: '0.5rem',
                      fontSize: '0.8rem',
                      color: '#666'
                    }}>
                      +{item.data.results.length - 3} more ads...
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div style={{ 
        marginTop: '2rem', 
        padding: '1rem', 
        background: '#f8f9fa', 
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <p style={{ color: '#666', marginBottom: '0.5rem' }}>
          Want to see all your ad history?
        </p>
        <Link href="/history" style={{
          color: '#0070f3',
          textDecoration: 'underline',
          fontSize: '0.9rem'
        }}>
          View Complete History →
        </Link>
      </div>
    </div>
  );
} 