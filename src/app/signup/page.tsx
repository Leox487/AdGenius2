"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleGoogleSignUp = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await signIn("google", { callbackUrl: "/" });
      if (result?.error) {
        setError("Google sign-up failed. Please try again.");
      }
    } catch (error) {
      setError("An error occurred during sign-up.");
    }
    setLoading(false);
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    try {
      // For demo purposes, we'll simulate a successful registration
      // In a real app, you'd make an API call to create the user
      setSuccess("Account created successfully! You can now sign in.");
      
      // Clear form
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      
      // Redirect to sign in after 2 seconds
      setTimeout(() => {
        router.push("/signin");
      }, 2000);
      
    } catch (error) {
      setError("An error occurred during registration.");
    }
    setLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '450px',
        margin: '1rem'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ 
            fontSize: '2rem', 
            fontWeight: '700', 
            color: '#333',
            marginBottom: '0.5rem'
          }}>
            Create Your Account
          </h1>
          <p style={{ color: '#666', fontSize: '1rem' }}>
            Join AdGenius and start optimizing your ads
          </p>
        </div>

        {/* Google Sign Up Button */}
        <button
          onClick={handleGoogleSignUp}
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            background: '#fff',
            border: '2px solid #ddd',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginBottom: '1rem',
            fontSize: '1rem',
            fontWeight: '500'
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          {loading ? 'Creating account...' : 'Sign up with Google'}
        </button>

        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          margin: '1rem 0',
          color: '#666'
        }}>
          <div style={{ flex: 1, height: '1px', background: '#ddd' }}></div>
          <span style={{ padding: '0 1rem', fontSize: '0.9rem' }}>or</span>
          <div style={{ flex: 1, height: '1px', background: '#ddd' }}></div>
        </div>

        {/* Email/Password Registration Form */}
        <form onSubmit={handleEmailSignUp}>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #ddd',
                borderRadius: '8px',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #ddd',
                borderRadius: '8px',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #ddd',
                borderRadius: '8px',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #ddd',
                borderRadius: '8px',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
            />
          </div>
          
          {error && (
            <div style={{ 
              color: '#dc3545', 
              fontSize: '0.9rem', 
              marginBottom: '1rem',
              textAlign: 'center',
              padding: '8px',
              background: '#f8d7da',
              borderRadius: '4px',
              border: '1px solid #f5c6cb'
            }}>
              {error}
            </div>
          )}

          {success && (
            <div style={{ 
              color: '#155724', 
              fontSize: '0.9rem', 
              marginBottom: '1rem',
              textAlign: 'center',
              padding: '8px',
              background: '#d4edda',
              borderRadius: '4px',
              border: '1px solid #c3e6cb'
            }}>
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              background: '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginBottom: '1rem'
            }}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div style={{ 
          textAlign: 'center',
          fontSize: '0.9rem',
          color: '#666'
        }}>
          <p>Already have an account?{' '}
            <Link href="/signin" style={{ 
              color: '#0070f3', 
              textDecoration: 'none',
              fontWeight: '500'
            }}>
              Sign in here
            </Link>
          </p>
        </div>

        <div style={{ 
          marginTop: '1rem', 
          padding: '12px',
          background: '#f8f9fa',
          borderRadius: '6px',
          fontSize: '0.8rem',
          color: '#666',
          textAlign: 'center'
        }}>
          <p style={{ margin: 0 }}>
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
} 