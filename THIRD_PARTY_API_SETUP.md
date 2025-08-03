# Third-Party API Setup for Real Ad Discovery

## 🚀 Overview

The AdGenius app now integrates with real third-party APIs to provide actual, current ads based on your search queries. This replaces the static database with live data from multiple sources.

## 🔑 Required API Keys

### 1. Google Custom Search API
**Purpose**: Get real Google Ads and search results
**Setup**:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Custom Search API"
4. Create credentials (API Key)
5. Go to [Google Custom Search](https://cse.google.com/)
6te a custom search engine
7your Search Engine ID

**Environment Variables**:
```
GOOGLE_ADS_API_KEY=your-google-api-key
GOOGLE_CUSTOM_SEARCH_ID=your-search-engine-id
```

### 2. Facebook Marketing API
**Purpose**: Get real Facebook Ads from the Ad Library
**Setup**:
1acebook Developers](https://developers.facebook.com/)
2. Create a new app3Add "Marketing API" product
4. Generate an access token
5. Request permissions for ads_archive

**Environment Variables**:
```
FACEBOOK_MARKETING_API_KEY=your-facebook-access-token
```

###3rush API
**Purpose**: Competitor analysis and keyword research
**Setup**:
1. Sign up for [SEMrush](https://www.semrush.com/)
2. Go to API section
3. Generate API key4ote: Requires paid subscription

**Environment Variables**:
```
SEMRUSH_API_KEY=your-semrush-api-key
```

### 4. SpyFu API
**Purpose**: Ad intelligence and competitor research
**Setup**:
1. Sign up for [SpyFu](https://www.spyfu.com/)
2. Go to API section
3. Generate API key4ote: Requires paid subscription

**Environment Variables**:
```
SPYFU_API_KEY=your-spyfu-api-key
```

## 🛠️ Quick Setup (Free Tier)

For immediate testing without paid APIs:

1ogle Custom Search API** (Free tier:10 queries/day)
   - This is the easiest to set up
   - Provides real search results
   - Can be used to find actual ads2acebook Ad Library** (Free)
   - No API key required for basic access
   - Can scrape public ad data
   - Limited but useful for testing

## 📝 Environment File Setup

Create a `.env.local` file in your project root:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000XTAUTH_SECRET=your-secret-key-here-change-this-in-production

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Database
DATABASE_URL=file:./dev.db"

# Third-party API Keys
GOOGLE_ADS_API_KEY=your-google-api-key
GOOGLE_CUSTOM_SEARCH_ID=your-search-engine-id
FACEBOOK_MARKETING_API_KEY=your-facebook-api-key
SEMRUSH_API_KEY=your-semrush-api-key
SPYFU_API_KEY=your-spyfu-api-key
```

## 🧪 Testing Without API Keys

The system includes fallback methods that will work even without API keys:

- **Google Ads**: Returns mock Google search ads
- **Facebook Ads**: Returns mock Facebook ads
- **Competitor Analysis**: Returns mock competitor data
- **Market Intelligence**: Returns mock market insights

## 🚀 Production Deployment

For production use:
1*Get real API keys** from all services
2Set up proper rate limiting** to avoid API quotas
3. **Implement caching** to reduce API calls
4. **Monitor API usage** and costs5 up error handling** for API failures

## 💡 Alternative Free APIs

If you dont want to pay for SEMrush or SpyFu:

1*Google Trends API** (Free)
   - Get trending topics and search volume
   - Useful for content ideas

2 **Twitter API** (Free tier available)
   - Monitor brand mentions
   - Track trending topics
3. **Reddit API** (Free)
   - Find discussions about products
   - Identify pain points

## 🔧 Custom Integration

You can easily add more APIs by:

1. Adding new methods to `AdDiscoveryService`2 Updating the `getAllAds` method
3. Adding new environment variables
4. Updating the interface types

## 📊 Expected Results

With real APIs, you'll get:

- **Actual ad copy** from real campaigns
- **Real performance metrics** (CTR, CPC, etc.)
- **Current market data** and trends
- **Competitor insights** and strategies
- **Platform-specific optimization** tips

## 🎯 Next Steps

1up at least Google Custom Search API (free)2with your specific products
3. Add more APIs as needed
4. Monitor performance and relevance5 Optimize based on user feedback

The system is designed to work with any combination of APIs - you can start with just one and add more as your needs grow! 