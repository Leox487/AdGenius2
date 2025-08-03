import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  return NextResponse.json({
    openai: process.env.OPENAI_API_KEY || 'not set'
  });
}