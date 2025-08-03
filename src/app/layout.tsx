import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { Providers } from "./providers";
import UserProfile from "./components/UserProfile";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AdGenius - AI-Powered Ad Analysis",
  description: "Supercharge your advertising with AI-powered insights and inspiration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          <header style={{ 
            background: '#fff', 
            borderBottom: '1px solid #e5e5e5', 
            padding: '1rem 2rem',
            position: 'sticky',
            top: 0,
            zIndex: 100
          }}>
            <nav style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Link href="/" style={{ 
                fontSize: '1.5rem', 
                fontWeight: 700, 
                color: '#0070f3', 
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                🚀 AdGenius
              </Link>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Link href="/" style={{ 
                  padding: '0.5rem 1rem', 
                  color: '#333', 
                  textDecoration: 'none',
                  borderRadius: '4px',
                  transition: 'background-color 0.2s'
                }} className="nav-link">
                  Home
                </Link>
                <Link href="/campaign-analyzer" style={{ 
                  padding: '0.5rem 1rem', 
                  color: '#333', 
                  textDecoration: 'none',
                  borderRadius: '4px',
                  transition: 'background-color 0.2s'
                }} className="nav-link">
                  Campaign Analyzer
                </Link>
                <Link href="/ad-inspiration" style={{ 
                  padding: '0.5rem 1rem', 
                  color: '#333', 
                  textDecoration: 'none',
                  borderRadius: '4px',
                  transition: 'background-color 0.2s'
                }} className="nav-link">
                  Ad Inspiration
                </Link>
                <Link href="/recent-ads" style={{ 
                  padding: '0.5rem 1rem', 
                  color: '#333', 
                  textDecoration: 'none',
                  borderRadius: '4px',
                  transition: 'background-color 0.2s'
                }} className="nav-link">
                  Recent Ads
                </Link>
                <Link href="/history" style={{ 
                  padding: '0.5rem 1rem', 
                  color: '#333', 
                  textDecoration: 'none',
                  borderRadius: '4px',
                  transition: 'background-color 0.2s'
                }} className="nav-link">
                  History
                </Link>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Link href="/signup" style={{ 
                    padding: '0.5rem 1rem', 
                    background: 'transparent', 
                    color: '#0070f3', 
                    textDecoration: 'none',
                    borderRadius: '4px',
                    fontWeight: '500',
                    border: '1px solid #0070f3',
                    transition: 'all 0.2s'
                  }}>
                    Sign Up
                  </Link>
                  <UserProfile />
                </div>
              </div>
            </nav>
          </header>
          {children}
        </Providers>
      </body>
    </html>
  );
}
