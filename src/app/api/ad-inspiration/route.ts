import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/db';
import { AdDiscoveryService } from '@/lib/ad-discovery-service';

export async function POST(req: NextRequest) {
  const { product, platform, industry } = await req.json();

  if (!product) {
    return NextResponse.json({ error: 'Product is required.' }, { status: 400 });
  }

  // Get user session
  const session = await getServerSession();
  const userId = session?.user?.id;

  try {
    // Use the real third-party API service to get actual ads
    const adDiscoveryService = new AdDiscoveryService();
    const relevantAds = await adDiscoveryService.getAllAds(product, platform || 'facebook', industry || 'ecommerce');

    // Always return results - the system is designed to find relevant ads for any product
    const results = relevantAds.map((ad, index) => ({
      link: `#ad-example-${index + 1}`,
      title: ad.title,
      snippet: ad.snippet,
      successFactors: ad.successFactors,
      copy: ad.copy,
      visualElements: ad.visualElements,
      targetAudience: ad.targetAudience,
      results: ad.results,
      platform: ad.platform,
      industry: ad.industry,
      productCategory: ad.productCategory,
      ctr: ad.ctr,
      conversionRate: ad.conversionRate,
      costPerClick: ad.costPerClick,
      actualResults: ad.actualResults,
      whySuccessful: ad.whySuccessful,
      platformSpecificTips: ad.platformSpecificTips,
      relevanceScore: ad.relevanceScore,
      semanticTags: ad.semanticTags,
      realLink: ad.realLink,
      adId: ad.adId,
      advertiser: ad.advertiser,
      spend: ad.spend,
      impressions: ad.impressions,
      clicks: ad.clicks,
      conversions: ad.conversions
    }));

    // Save to database if user is authenticated
    if (userId) {
      try {
        await prisma.adInspiration.create({
          data: {
            userId,
            platform: platform || 'facebook',
            industry: industry || 'ecommerce',
            product,
            results: JSON.stringify(results),
          },
        });
      } catch (error) {
        console.error('Failed to save ad inspiration to database:', error);
        // Don't fail the request if database save fails
      }
    }

    return NextResponse.json({ results });
  } catch (error) {
    console.error('Ad discovery error:', error);
    return NextResponse.json({
      error: 'Failed to discover ads. Please try again.',
      results: []
    }, { status: 500 });
  }
} 