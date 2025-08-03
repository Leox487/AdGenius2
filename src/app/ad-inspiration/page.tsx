'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const PLATFORMS = ['Facebook', 'Instagram', 'Google', 'TikTok', 'All'];
const CATEGORIES = [
  'Apparel', 'Beauty', 'Electronics', 'Home', 'Fitness', 'Food', 'Toys', 'Other'
];

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

export default function AdInspirationPage() {
  const [platform, setPlatform] = useState('All');
  const [product, setProduct] = useState('');
  const [category, setCategory] = useState('Apparel');
  const [adResults, setAdResults] = useState<AdResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    setAdResults([]);
    
    try {
      const res = await fetch('/api/ad-inspiration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          platform: platform.toLowerCase(), 
          product, 
          industry: category.toLowerCase() 
        }),
      });
      
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setAdResults(data.results || []);
      }
    } catch (err) {
      setError('Failed to generate ad inspiration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 1200, margin: '2rem auto', padding: '0 1rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>
          Ad Inspiration Generator
        </h1>
        <p style={{ color: '#666', fontSize: '1.1rem' }}>
          Discover real, successful ads for your product with detailed metrics and analysis
        </p>
      </div>

      {/* Input Form */}
      <div style={{
        background: '#f8f9fa',
        padding: '2rem',
        borderRadius: '12px',
        marginBottom: '2rem'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Product
            </label>
          <input
            type="text"
            value={product}
            onChange={e => setProduct(e.target.value)}
              placeholder="e.g., hats, Pokemon cards, sneakers"
              style={{ 
                width: '100%', 
                padding: '12px', 
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '1rem'
              }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Platform
        </label>
            <select 
              value={platform} 
              onChange={e => setPlatform(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '12px', 
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '1rem'
              }}
            >
              {PLATFORMS.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
      </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Industry
            </label>
            <select 
              value={category} 
              onChange={e => setCategory(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '12px', 
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '1rem'
              }}
            >
            {CATEGORIES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          </div>
      </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button 
            onClick={handleGenerate} 
            disabled={loading || !product}
            style={{
              padding: '12px 24px',
              background: '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '1rem',
              fontWeight: '500',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1
            }}
          >
            {loading ? '🔍 Finding Successful Ads...' : '🚀 Find Successful Ads'}
        </button>
          
        <Link
          href="/recent-ads"
          style={{
              padding: '12px 24px',
            background: 'transparent',
            color: '#0070f3',
            border: '1px solid #0070f3',
            borderRadius: '6px',
            textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: '500'
          }}
        >
            📊 View Recent Successful Ads
        </Link>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div style={{ 
          padding: '1rem', 
          background: '#fee', 
          border: '1px solid #fcc',
          borderRadius: '6px',
          color: '#c33',
          marginBottom: '1rem'
        }}>
          {error}
        </div>
      )}

      {/* Results Display */}
      {adResults.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '600', marginBottom: '1rem' }}>
            🎯 Successful Ads for "{product}"
          </h2>
          <p style={{ color: '#666', marginBottom: '1.5rem' }}>
            Found {adResults.length} relevant ads with real performance metrics
          </p>
          
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {adResults.map((ad, index) => (
              <div key={index} style={{
                border: '1px solid #e5e5e5',
                borderRadius: '12px',
                background: 'white',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                {/* Ad Header */}
                <div style={{
                  background: '#f8f9fa',
                  padding: '1rem',
                  borderBottom: '1px solid #e5e5e5'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                        {ad.title}
                      </h3>
                      <p style={{ color: '#666', fontSize: '0.9rem' }}>
                        {ad.advertiser || 'Various advertisers'} • {ad.platform} • {ad.industry}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{
                        background: '#e8f5e8',
                        color: '#2d5a2d',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: '500'
                      }}>
                        {ad.relevanceScore?.toFixed(0) || 85}% Relevant
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ad Content */}
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ marginBottom: '1rem' }}>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                      Ad Copy
                    </h4>
                    <p style={{ color: '#333', lineHeight: '1.6' }}>
                      {ad.copy}
                    </p>
                  </div>

                  {/* Performance Metrics */}
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
                    gap: '1rem',
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{ textAlign: 'center', padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#28a745' }}>
                        {(ad.ctr || 0).toFixed(1)}%
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#666' }}>Click Rate</div>
                    </div>
                    <div style={{ textAlign: 'center', padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#007bff' }}>
                        {(ad.conversionRate || 0).toFixed(1)}%
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#666' }}>Conversion</div>
                    </div>
                    <div style={{ textAlign: 'center', padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#ffc107' }}>
                        ${(ad.costPerClick || 0).toFixed(2)}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#666' }}>Cost per Click</div>
                    </div>
                    <div style={{ textAlign: 'center', padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#dc3545' }}>
                        {ad.spend?.toLocaleString() || 'N/A'}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#666' }}>Total Spend</div>
                    </div>
                  </div>

                  {/* Why Successful */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                      🎯 Why This Ad Was Successful
                    </h4>
                    <p style={{ color: '#333', lineHeight: '1.6' }}>
                      {ad.whySuccessful || 'This ad was successful due to effective targeting and compelling messaging.'}
                    </p>
                  </div>

                  {/* Success Factors */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                      ✅ Key Success Factors
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {(ad.successFactors || []).map((factor, idx) => (
                        <span key={idx} style={{
                          background: '#e8f5e8',
                          color: '#2d5a2d',
                          padding: '4px 12px',
                          borderRadius: '20px',
                          fontSize: '0.8rem',
                          fontWeight: '500'
                        }}>
                          {factor}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Platform Tips */}
                  <div style={{ marginBottom: '1rem' }}>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                      💡 Platform-Specific Tips
                    </h4>
                    <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                      {(ad.platformSpecificTips || []).map((tip, idx) => (
                        <li key={idx} style={{ marginBottom: '0.25rem', color: '#333' }}>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Links */}
                  {ad.realLink && (
                    <div style={{ 
                      marginTop: '1rem', 
                      padding: '1rem', 
                      background: '#e8f5e8', 
                      borderRadius: '8px',
                      textAlign: 'center',
                      border: '2px solid #28a745'
                    }}>
                      <a
                        href={ad.realLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: '#155724',
                          textDecoration: 'none',
                          fontWeight: '600',
                          fontSize: '1.1rem',
                          padding: '12px 24px',
                          background: '#d4edda',
                          borderRadius: '8px',
                          border: '1px solid #c3e6cb',
                          display: 'inline-block',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}
                      >
                        🎬 View Real Promotional Content →
                      </a>
                      <div style={{ 
                        fontSize: '0.8rem', 
                        color: '#155724', 
                        marginTop: '0.5rem',
                        fontStyle: 'italic'
                      }}>
                        Click to see actual ads, videos, and promotional content
                      </div>
                    </div>
                  )}

                  {/* Additional Real Ad Sources */}
                  <div style={{ 
                    marginTop: '1rem', 
                    padding: '1rem', 
                    background: '#f8f9fa', 
                    borderRadius: '8px',
                    border: '1px solid #e9ecef'
                  }}>
                    <h5 style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', color: '#495057' }}>
                      🔍 Explore More Real Promotional Content
                    </h5>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', fontSize: '0.8rem' }}>
                      <a
                        href={`https://www.tiktok.com/search?q=${encodeURIComponent(product)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: '#000000',
                          textDecoration: 'none',
                          padding: '6px 12px',
                          background: 'white',
                          borderRadius: '6px',
                          border: '1px solid #e9ecef',
                          fontWeight: '500'
                        }}
                      >
                        🎵 TikTok Promotions
                      </a>
                      <a
                        href={`https://www.instagram.com/explore/tags/${product.replace(/\s+/g, '')}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: '#e4405f',
                          textDecoration: 'none',
                          padding: '6px 12px',
                          background: 'white',
                          borderRadius: '6px',
                          border: '1px solid #e9ecef',
                          fontWeight: '500'
                        }}
                      >
                        📸 Instagram Promotions
                      </a>
                      <a
                        href={`https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=US&q=${encodeURIComponent(product)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: '#1877f2',
                          textDecoration: 'none',
                          padding: '6px 12px',
                          background: 'white',
                          borderRadius: '6px',
                          border: '1px solid #e9ecef',
                          fontWeight: '500'
                        }}
                      >
                        📘 Facebook Promotions
                      </a>
                      <a
                        href={`https://www.youtube.com/results?search_query=${encodeURIComponent(product)}+promotional+ads`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: '#ff0000',
                          textDecoration: 'none',
                          padding: '6px 12px',
                          background: 'white',
                          borderRadius: '6px',
                          border: '1px solid #e9ecef',
                          fontWeight: '500'
                        }}
                      >
                        📺 YouTube Promotions
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer Links */}
      {product && (
        <div style={{ 
          marginTop: '2rem', 
          padding: '1rem', 
          background: '#f8f9fa', 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <p style={{ color: '#666', marginBottom: '0.5rem' }}>
            Want to see more real ads for "{product}"?
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href={`https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=US&q=${encodeURIComponent(product)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#1877f2', textDecoration: 'underline' }}
            >
              🔍 Facebook Ad Library
            </a>
            <Link
              href="/history"
              style={{ color: '#0070f3', textDecoration: 'underline' }}
            >
              📊 Your Ad History
            </Link>
          </div>
        </div>
      )}
    </div>
  );
} 