"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Link from "next/link";

interface HistoryItem {
  id: string;
  type: string;
  title: string;
  description: string;
  date: string;
  data: any;
}

export default function History() {
  const { data: session, status } = useSession();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      fetchHistory();
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [session, status]);

  const fetchHistory = async () => {
    try {
      const response = await fetch("/api/history");
      if (response.ok) {
        const data = await response.json();
        setHistory(data.history);
      }
    } catch (error) {
      console.error("Failed to fetch history:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "ad-inspiration":
        return "💡";
      case "campaign-analysis":
        return "📊";
      case "link-analysis":
        return "🔗";
      case "ad-analysis":
        return "🎯";
      default:
        return "📝";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "ad-inspiration":
        return "Ad Inspiration";
      case "campaign-analysis":
        return "Campaign Analysis";
      case "link-analysis":
        return "Link Analysis";
      case "ad-analysis":
        return "Ad Analysis";
      default:
        return "Activity";
    }
  };

  const filteredHistory = activeTab === "all" 
    ? history 
    : history.filter(item => item.type === activeTab);

  if (status === "loading") {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <div style={{ fontSize: '1.2rem', color: '#666' }}>Loading...</div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#333' }}>
          Sign in to view your history
        </h1>
        <p style={{ color: '#666', fontSize: '1.1rem' }}>
          Your ad analysis and inspiration history will appear here
        </p>
        <Link href="/signin" style={{
          padding: '12px 24px',
          background: '#0070f3',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '8px',
          fontWeight: '600'
        }}>
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>
          Your Activity History
        </h1>
        <p style={{ color: '#666', fontSize: '1.1rem' }}>
          Track all your ad analysis and inspiration activities
        </p>
      </div>

      {/* Filter Tabs */}
      <div style={{ 
        display: 'flex', 
        gap: '0.5rem', 
        marginBottom: '2rem',
        flexWrap: 'wrap'
      }}>
        {[
          { key: "all", label: "All Activities" },
          { key: "ad-inspiration", label: "Ad Inspiration" },
          { key: "campaign-analysis", label: "Campaign Analysis" },
          { key: "link-analysis", label: "Link Analysis" },
          { key: "ad-analysis", label: "Ad Analysis" }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              padding: '8px 16px',
              background: activeTab === tab.key ? '#0070f3' : '#f8f9fa',
              color: activeTab === tab.key ? 'white' : '#333',
              border: '1px solid #ddd',
              borderRadius: '20px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: '500'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div style={{ fontSize: '1.2rem', color: '#666' }}>Loading your history...</div>
        </div>
      ) : filteredHistory.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '4rem 2rem',
          background: '#f8f9fa',
          borderRadius: '12px',
          border: '2px dashed #ddd'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem' }}>
            No activities yet
          </h3>
          <p style={{ color: '#666', marginBottom: '1.5rem' }}>
            Start using our tools to see your activity history here
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/ad-inspiration" style={{
              padding: '10px 20px',
              background: '#0070f3',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '6px',
              fontWeight: '500'
            }}>
              Get Ad Inspiration
            </Link>
            <Link href="/campaign-analyzer" style={{
              padding: '10px 20px',
              background: 'transparent',
              color: '#0070f3',
              textDecoration: 'none',
              borderRadius: '6px',
              fontWeight: '500',
              border: '1px solid #0070f3'
            }}>
              Analyze Campaign
            </Link>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filteredHistory.map((item) => (
            <div
              key={item.id}
              style={{
                padding: '1.5rem',
                border: '1px solid #e5e5e5',
                borderRadius: '8px',
                background: 'white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ 
                  fontSize: '2rem', 
                  marginTop: '0.25rem' 
                }}>
                  {getTypeIcon(item.type)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem',
                    marginBottom: '0.5rem'
                  }}>
                    <span style={{ 
                      fontSize: '0.8rem', 
                      background: '#f0f0f0', 
                      padding: '4px 8px', 
                      borderRadius: '12px',
                      color: '#666'
                    }}>
                      {getTypeLabel(item.type)}
                    </span>
                    <span style={{ 
                      fontSize: '0.8rem', 
                      color: '#999' 
                    }}>
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 style={{ 
                    fontSize: '1.2rem', 
                    fontWeight: '600', 
                    marginBottom: '0.5rem',
                    color: '#333'
                  }}>
                    {item.title}
                  </h3>
                  <p style={{ 
                    color: '#666', 
                    marginBottom: '1rem',
                    lineHeight: '1.5'
                  }}>
                    {item.description}
                  </p>
                  
                  {/* Show additional details based on type */}
                  {item.type === "ad-inspiration" && item.data && (
                    <div style={{ 
                      background: '#f8f9fa', 
                      padding: '1rem', 
                      borderRadius: '6px',
                      fontSize: '0.9rem'
                    }}>
                      <div style={{ marginBottom: '0.5rem' }}>
                        <strong>Platform:</strong> {item.data.platform} | 
                        <strong> Industry:</strong> {item.data.industry} | 
                        <strong> Product:</strong> {item.data.product}
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <span style={{
                          fontSize: '0.8rem',
                          background: '#e8f5e8',
                          color: '#2d5a2d',
                          padding: '2px 6px',
                          borderRadius: '4px'
                        }}>
                          {item.data.results?.length || 0} ads found
                        </span>
                        <Link href={`/ad-inspiration/${item.id}`} style={{
                          fontSize: '0.8rem',
                          background: '#0070f3',
                          color: 'white',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          textDecoration: 'none',
                          fontWeight: '500'
                        }}>
                          View & Analyze Ads →
                        </Link>
                      </div>
                    </div>
                  )}
                  
                  {item.type === "ad-analysis" && item.data && (
                    <div style={{ 
                      background: '#eaf6ff', 
                      padding: '1rem', 
                      borderRadius: '6px',
                      fontSize: '0.9rem',
                      color: '#333'
                    }}>
                      <strong>Analysis:</strong> {item.data.analysis.substring(0, 200)}...
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 