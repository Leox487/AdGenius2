import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/db';

export async function GET(req: NextRequest) {
  const session = await getServerSession();
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Fetch all user activities
    const [adInspirations, campaignAnalyses, linkAnalyses, adAnalyses] = await Promise.all([
      prisma.adInspiration.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.campaignAnalysis.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.linkAnalysis.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.adAnalysis.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: 'desc' }
      })
    ]);

    // Combine and format all activities
    const history = [
      ...adInspirations.map((item: any) => ({
        id: item.id,
        type: 'ad-inspiration',
        title: `Ad Inspiration for ${item.product}`,
        description: `Generated inspiration for ${item.product} in ${item.industry} industry on ${item.platform}`,
        date: item.createdAt.toISOString(),
        data: {
          platform: item.platform,
          industry: item.industry,
          product: item.product,
          results: JSON.parse(item.results)
        }
      })),
      ...campaignAnalyses.map((item: any) => ({
        id: item.id,
        type: 'campaign-analysis',
        title: `Campaign Analysis`,
        description: `Analyzed campaign at ${item.campaignUrl}`,
        date: item.createdAt.toISOString(),
        data: {
          campaignUrl: item.campaignUrl,
          analysis: JSON.parse(item.analysis)
        }
      })),
      ...linkAnalyses.map((item: any) => ({
        id: item.id,
        type: 'link-analysis',
        title: `Link Analysis`,
        description: `Analyzed link at ${item.linkUrl}`,
        date: item.createdAt.toISOString(),
        data: {
          linkUrl: item.linkUrl,
          analysis: JSON.parse(item.analysis)
        }
      })),
      ...adAnalyses.map((item: any) => ({
        id: item.id,
        type: 'ad-analysis',
        title: `Ad Analysis: ${item.title}`,
        description: `Analyzed ad with title: ${item.title}`,
        date: item.createdAt.toISOString(),
        data: {
          title: item.title,
          snippet: item.snippet,
          analysis: item.analysis
        }
      }))
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return NextResponse.json({ history });
  } catch (error) {
    console.error('Failed to fetch history:', error);
    return NextResponse.json({ error: 'Failed to fetch history' }, { status: 500 });
  }
} 