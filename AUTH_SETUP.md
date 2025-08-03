# Authentication Setup Guide

## Overview
This application now includes authentication with Google OAuth and email/password login using NextAuth.js.

## Features
- ✅ Google OAuth authentication
- ✅ Email/password authentication (demo credentials)
- ✅ Session management
- ✅ User profile display
- ✅ Sign out functionality

## Setup Instructions

### 1. Environment Variables
Create a `.env.local` file in the root directory with the following variables:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-change-this-in-production

# Google OAuth (you'll need to set these up in Google Cloud Console)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### 2. Google OAuth Setup
To enable Google authentication:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" and create an OAuth 2.0 Client ID
5. Add `http://localhost:3000/api/auth/callback/google` to the authorized redirect URIs
6. Copy the Client ID and Client Secret to your `.env.local` file

### 3. Demo Credentials
For testing the email/password authentication, use:
- **Email:** demo@example.com
- **Password:** demo123

### 4. Running the Application
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Pages
- **Home:** `/` - Main dashboard
- **Sign In:** `/signin` - Authentication page
- **Sign Up:** `/signup` - Registration page
- **Campaign Analyzer:** `/campaign-analyzer` - Ad campaign analysis
- **Ad Inspiration:** `/ad-inspiration` - Ad inspiration and analysis

## Authentication Flow
1. Users can sign up with Google OAuth or email/password registration
2. Users can sign in with Google OAuth or email/password
3. After successful authentication, users are redirected to the home page
4. The navigation bar shows user profile information when signed in
5. Users can sign out using the "Sign Out" button

## Security Notes
- Change the `NEXTAUTH_SECRET` in production
- Implement proper user database for email/password authentication
- Add proper validation and error handling
- Consider adding email verification for new accounts 