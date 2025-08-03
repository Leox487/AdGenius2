"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function UserProfile() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div style={{ 
        padding: '0.5rem 1rem', 
        color: '#666',
        fontSize: '0.9rem'
      }}>
        Loading...
      </div>
    );
  }

  if (status === "authenticated" && session?.user) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          background: '#f8f9fa',
          borderRadius: '20px',
          fontSize: '0.9rem'
        }}>
          <span style={{ color: '#0070f3' }}>👤</span>
          <span style={{ color: '#333' }}>
            {session.user.name || session.user.email}
          </span>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          style={{
            padding: '0.5rem 1rem',
            background: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '0.9rem',
            cursor: 'pointer',
            fontWeight: '500'
          }}
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <Link href="/signin" style={{ 
      padding: '0.5rem 1rem', 
      background: '#0070f3', 
      color: 'white', 
      textDecoration: 'none',
      borderRadius: '4px',
      fontWeight: '500',
      transition: 'background-color 0.2s'
    }}>
      Sign In
    </Link>
  );
} 