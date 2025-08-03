import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/db';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession();
  const { id } = await params;
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const adInspiration = await prisma.adInspiration.findFirst({
      where: {
        id: id,
        userId: session.user.id
      }
    });

    if (!adInspiration) {
      return NextResponse.json({ error: 'Ad inspiration not found' }, { status: 404 });
    }

    const results = JSON.parse(adInspiration.results);
    
    return NextResponse.json({
      id: adInspiration.id,
      platform: adInspiration.platform,
      industry: adInspiration.industry,
      product: adInspiration.product,
      results: results,
      createdAt: adInspiration.createdAt
    });
  } catch (error) {
    console.error('Failed to fetch ad inspiration:', error);
    return NextResponse.json({ error: 'Failed to fetch ad inspiration' }, { status: 500 });
  }
} 