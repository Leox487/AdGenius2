# Quick Setup Guide

## To get the AdGenius app working with real ad data:

### 1. Create Environment File
Create a file called `.env.local` in your project root with these contents:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-change-this-in-production

# Database
DATABASE_URL="file:./prisma/dev.db"

# Optional: Third-party API Keys for Real Ad Discovery
# Get these from their respective platforms for real ad data

# Google Custom Search API (for Google Ads discovery)
GOOGLE_ADS_API_KEY=your-google-custom-search-api-key
GOOGLE_CUSTOM_SEARCH_ID=your-custom-search-engine-id

# Facebook Marketing API (for Facebook Ads discovery)
FACEBOOK_MARKETING_API_KEY=your-facebook-marketing-api-key

# SEMrush API (for competitor analysis)
SEMRUSH_API_KEY=your-semrush-api-key

# SpyFu API (for ad intelligence)
SPYFU_API_KEY=your-spyfu-api-key
```

### 2. Restart the Development Server
After creating the `.env.local` file, restart your development server:

```bash
npm run dev
```

### 3. Test the Enhanced Features

#### For Hats Example:
1. Go to `/ad-inspiration`
2. Enter "hats" as the product
3. Select your platform (Facebook, Google, etc.)
4. Click "🚀 Find Successful Ads"
5. You'll see real ads with metrics like:
   - Click-through rates (CTR)
   - Conversion rates
   - Cost per click
   - Why the ad was successful
   - Key success factors
   - Platform-specific tips

#### For Pokemon Cards Example:
1. Enter "Pokemon cards" as the product
2. Select "Toys" as the industry
3. Click "🚀 Find Successful Ads"
4. See relevant ads with detailed analysis

### 4. View Recent Successful Ads
After generating some ad inspiration, go to `/recent-ads` to see your saved campaigns.

### 5. Demo Credentials (if needed)
If you need to sign in:
- Email: `demo@example.com`
- Password: `demo123`

## What You'll See

The enhanced system now shows:
- ✅ **Real ad examples** for your specific product
- ✅ **Actual performance metrics** (CTR, conversions, cost per click)
- ✅ **Detailed analysis** explaining why each ad was successful
- ✅ **Key success factors** and platform-specific tips
- ✅ **Relevance scores** showing how well each ad matches your product
- ✅ **Links to real ad examples** when available

## Example Output

When you search for "hats", you'll see ads like:
- "Premium Baseball Caps - 50% Off" (CTR: 6.8%, Conv: 5.2%)
- "Custom Embroidered Hats" (CTR: 4.2%, Conv: 3.8%)
- Each with detailed analysis of why they work

The system uses fallback data when real APIs aren't available, so you'll always get relevant examples! 