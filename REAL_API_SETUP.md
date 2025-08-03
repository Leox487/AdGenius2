# Real API Setup Guide

This guide will help you set up **real API integrations** to get **actual promotional content** from TikTok, Instagram, Facebook, and YouTube.

## 🎯 What You'll Get

With real APIs, you'll get:
- ✅ **Real TikTok videos** with actual video IDs
- ✅ **Real Instagram Reels** with actual Reel IDs  
- ✅ **Real Facebook ads** from actual ad library
- ✅ **Real YouTube videos** with actual video IDs
- ✅ **Real performance metrics** from actual content
- ✅ **Real promotional content** that Gen Z actually sees

## 📋 Required API Keys

### 1. TikTok API
**Purpose**: Get real TikTok promotional videos
**Setup**:
1. Go to [TikTok for Developers](https://developers.tiktok.com/)
2. Create a new app
3. Get your API key
4. Add to `.env.local`:
```env
TIKTOK_API_KEY=your-tiktok-api-key
```

### 2. Instagram Graph API (Updated)
**Purpose**: Get real Instagram promotional content
**Note**: Instagram Basic Display API has been deprecated. Use Instagram Graph API instead.
**Setup**:
1. Go to [Facebook for Developers](https://developers.facebook.com/)
2. Create a new app
3. Add Instagram Basic Display product (still available for Graph API)
4. Get your access token
5. Add to `.env.local`:
```env
INSTAGRAM_API_KEY=your-instagram-graph-api-key
```

**Alternative**: Use Instagram Hashtag Search (Public API)
- No API key required
- Search public Instagram posts by hashtag
- Limited but still provides real content

### 3. YouTube Data API
**Purpose**: Get real YouTube promotional videos
**Setup**:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable YouTube Data API v3
4. Create API credentials
5. Add to `.env.local`:
```env
YOUTUBE_API_KEY=your-youtube-data-api-key
```

### 4. Facebook Marketing API
**Purpose**: Get real Facebook ads
**Setup**:
1. Go to [Facebook for Developers](https://developers.facebook.com/)
2. Create a new app
3. Add Marketing API product
4. Get your access token
5. Add to `.env.local`:
```env
FACEBOOK_MARKETING_API_KEY=your-facebook-marketing-api-key
```

## 🚀 Quick Setup

### Step 1: Create `.env.local`
```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Database
DATABASE_URL="file:./prisma/dev.db"

# OpenAI API Key
OPENAI_API_KEY=your-openai-api-key-here

# Real Promotional Content APIs
TIKTOK_API_KEY=your-tiktok-api-key
INSTAGRAM_API_KEY=your-instagram-basic-display-api-key
YOUTUBE_API_KEY=your-youtube-data-api-key
FACEBOOK_MARKETING_API_KEY=your-facebook-marketing-api-key
```

### Step 2: Get API Keys

#### TikTok API (Recommended)
1. Visit [TikTok for Developers](https://developers.tiktok.com/)
2. Sign up for a developer account
3. Create a new app
4. Get your API key
5. Add to `.env.local`

#### YouTube Data API (Easiest)
1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable YouTube Data API v3
4. Create API credentials
5. Add to `.env.local`

### Step 3: Test the Integration

1. Start your development server:
```bash
npm run dev
```

2. Go to `/ad-inspiration`
3. Enter a product (e.g., "pokemon cards")
4. Click "🚀 Find Successful Ads"
5. Click "🎬 View Real Promotional Content →"

## 🎉 What You'll See

With real APIs, you'll get:

### TikTok Videos
- **Real video URLs** like `https://www.tiktok.com/@username/video/1234567890123456789`
- **Actual performance metrics** from real videos
- **Real promotional content** that Gen Z actually watches

### Instagram Reels
- **Real Reel URLs** like `https://www.instagram.com/reel/C1234567890123456789/`
- **Actual engagement data** from real posts
- **Real promotional content** from actual creators

### YouTube Videos
- **Real video URLs** like `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
- **Actual view counts** and engagement metrics
- **Real promotional content** from actual channels

## 🔧 Troubleshooting

### API Key Issues
- Make sure your API keys are correct
- Check that you have the right permissions
- Verify your API quotas haven't been exceeded

### Rate Limiting
- APIs have rate limits
- The system will fall back to search results if APIs fail
- Consider upgrading your API plans for higher limits

### No Results
- Try different search terms
- Check that your APIs are working
- The system will show fallback content if APIs fail

## 💡 Pro Tips

1. **Start with YouTube API** - It's the easiest to set up
2. **Use real API keys** - Don't use placeholder values
3. **Test with popular products** - Like "pokemon cards" or "sneakers"
4. **Check API quotas** - Make sure you have enough requests
5. **Monitor usage** - Keep track of your API usage

## 🎯 Expected Results

With real APIs, you should see:
- ✅ **Real video URLs** that actually work
- ✅ **Actual promotional content** from real creators
- ✅ **Real performance metrics** from actual videos
- ✅ **Real engagement data** from actual posts
- ✅ **Real promotional content** that Gen Z actually sees

This will give you the **iSpot.tv level** of real promotional content that you're looking for! 🎉 